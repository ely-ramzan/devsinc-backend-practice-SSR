import mongoose from "mongoose";
import UserSubCategory from "./UserSubCategory.js";

const transactionSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required : true
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  notes: {
    type: String,
    min: 3,
    max: 100,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
},{ timestamps: true });


transactionSchema.pre("save", async function (next) {
  try {
    if (
      typeof this.category !== "string" ||
      !["income", "expense"].includes(this.category.toLowerCase().trim())
    ) {
      throw new Error("Category should be either income or expense");
    }

    const subCatExists = await UserSubCategory.findOne({
      name: this.subCategory,
      owner: this.user,
      category: this.category,
    });

    
    if (subCatExists) {
      return next(); 
    } else {
      await UserSubCategory.create({
        name: this.subCategory,
        category: this.category,
        owner: this.user,
      });
      console.log(`New sub-category inserted: "${this.subCategory}"`);
      return next(); 
    }
  } catch (err) {
    return next(err);
  }
});

export default mongoose.model("Transaction", transactionSchema);
