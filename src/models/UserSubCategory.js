import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        enum : ['expense','income'],
        required: true,
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

subCategorySchema.index({ name: 1, category: 1, owner: 1 }, { unique: true });

export default mongoose.model("Subcategory", subCategorySchema);