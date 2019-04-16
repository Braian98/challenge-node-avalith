// Models
const FunctionMovie = require('../models/FunctionMovie');
const Purchase = require('../models/Purchase');

// Helpers
const { errorMessage, successMessage } = require('../helpers');

const index = async (req, res) => {
    const { _id:user } = req.user;

    try {
        const purchase = await Purchase.find({ user })
                                    .exec();
        successMessage(res, 'purchases', purchase);
    } catch (err) {
        errorMessage(res, err);
    }
}

const showAll = async (req, res) => {
    try {
        const purchases = await Purchase.find()
                                    .exec();
        successMessage(res, 'purchases', purchases);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {

    const { functionUpdated } = req;
    const { tickets, idfunction, total } = req.body;
    const { _id } = req.user;

    const newPurchase = new Purchase({
        user: _id,
        function: idfunction,
        tickets,
        total
    });

    try {
        const purchase = await newPurchase.save();

        await FunctionMovie.findByIdAndUpdate(idfunction, functionUpdated, { new:true })
                        .exec();
        successMessage(res, 'purchase', purchase, 'The purchase was made correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    index,
    showAll,
    store
}