    import UserSubCategory from "../models/UserSubCategory.js"

    export const createNewCategory = async (obj) => {
        const exists = await UserSubCategory.find({obj});
        if(exists) {
            throw new Error('Subcategory already exists');
        }
        const subCategory = await UserSubCategory.create(obj);
        return {
            message: "Sub-Category successfully added",
            sub_categories: subCategory
        }
    } 

    export const getAllCategoriesByUser = async (userId) => {
        const subCategories = await UserSubCategory.find({
            owner: userId
        });
        return {
            message: "Sub-Category",
            sub_categories: subCategories
        }
    } 
    export const getCategoriesDynamically = async (filter) => {
        const subCategories = await UserSubCategory.find(filter);
        return {
            message: "Sub-Category",
            sub_categories: subCategories
        }
    } 
    export const deleteCategoryById = async (id) => {
        const subCategories = await UserSubCategory.findByIdAndDelete(id);
        return {
            message: "Sub-Category",
            sub_categories: subCategories
        }
    } 
    export const updateCategoryById = async (id,obj) => {
        const subCategories = await UserSubCategory.findByIdAndUpdate(id, obj, {
        new: true,
        runValidators: true,
    });;
        return {
            message: "Sub-Category",
            sub_categories: subCategories
        }
    } 