let mongoose = require('mongoose');

let DonationSchema = new mongoose.Schema({
        paymenttype: String,
        amount: Number,
        upvotes: {type: Number, default: 0}
    },
    { collection: 'donations' });

module.exports = mongoose.model('Donation', DonationSchema);


// const donations = [
//     {id: 1000000, paymenttype: 'PayPal', amount: 1600, upvotes: 1},
//     {id: 1000001, paymenttype: 'Direct', amount: 1100, upvotes: 2},
//     {id: 1000002, paymenttype: 'Visa', amount: 1000, upvotes: 1}
// ];
//
// module.exports = donations;