import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        index: true
    },
    category: {
        type: String,
        enum : ['expense','income'],
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

export default mongoose.model("Subcategory", subCategorySchema);