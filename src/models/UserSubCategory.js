import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
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

export default mongoose.model("Subcategory", subCategorySchema);