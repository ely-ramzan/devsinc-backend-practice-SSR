const mongoose = require("mongoose");
const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum : ['expense','income'],
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model("Subcategory", subcategorySchema);