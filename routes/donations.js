var Donation = require('../Models/donations');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/donationsdb');

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Donation.find(function(err, donations) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(donations,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Donation.find({"_id": req.params.id}, function (err, donation) {
        if (err)
            res.send(err);
        // return a suitable error message
        else
            res.send(JSON.stringify(donation, null, 5));

        // return the donation
    });
}

router.addDonation = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var donation = new Donation();

    donation.paymenttype = req.body.paymenttype// the requested value
        donation.amount = req.body.amount// the requested value

            donation.save(function(err) {
                if (err)
                    res.json({messge: 'Donation NOT added!'});
                // return a suitable error message
                else
                    res.json({messge: 'Donation added!'});
                // return a suitable success message
            });
}

router.incrementUpvotes = (req, res) => {

    Donation.findById({"_id": req.params.id}, function(err,donation) {
        if (err)
            res.json({message:'could not find ID'})
        // return a suitable error message
        else {
            donation.upvotes += 1;
            donation.save(function (err) {
                if (err)
                    res.json({message:'could not add upvote'})
                // return a suitable error message
                else
                    res.json({message:'Upvote added'})
                // return a suitable success message
            });
        }
    });
}

router.deleteDonation = (req, res) => {
    //Delete the selected donation based on its id
    var donation = getByValue(donations, req.params.id)

    var position = donations.indexOf(donation);

    if(position != -1)
    {
        donations.splice(position,1);
        res.json({message: 'donation removed'})
    }
    else
    {
        res.json({message: 'donation could not be found'})
    }
}

router.getTotalUpvotes = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var TotalVotes = 0;

    donations.forEach(function(element){
        var upvote = element.upvotes
        TotalVotes = TotalVotes + upvote;
    });

    res.send(JSON.stringify(TotalVotes,null,5));
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

function getTotalVotes(array) {
    let totalVotes = 0;
    array.forEach(function(obj) { totalVotes += obj.upvotes; });
    return totalVotes;
}

module.exports = router;