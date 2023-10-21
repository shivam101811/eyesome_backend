const { error, success } = require("../helper/baseResponse");
const ProductModel = require('../Models/product');
const categoryModel = require('../Models/category');

// ...

const updateProduct = async (req, res) => {
    try {
        const { name, newPrice } = req.body;

        if (!name || newPrice === undefined) {
            return res.status(422).json(error("Name and new price are required!", 422));
        }

        // Find the product by name and update its price
        const filter = { name };
        const update = { $set: { price: newPrice } };
        const updatedProduct = await ProductModel.findOneAndUpdate(filter, update, { returnOriginal: false });

        if (!updatedProduct) {
            return res.status(404).json(error("Product not found", 404));
        }

        return res.status(200).json(success(`${name} updated successfully`, updatedProduct, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(422).json(error("Name is required!", 422);
        }

        // Find the product by name and delete it
        const filter = { name };
        const deletedProduct = await ProductModel.findOneAndDelete(filter);

        if (!deletedProduct) {
            return res.status(404).json(error("Product not found", 404));
        }

        return res.status(200).json(success(`${name} deleted successfully`, deletedProduct, 200));
    } catch (err) {
        return res.status(500).json(error(err.message, 500));
    }
};

module.exports = {
    // ... your other functions ...
    updateProduct,
    deleteProduct,
};
