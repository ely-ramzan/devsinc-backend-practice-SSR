import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import UserSubCategory from "./UserSubCategory.js";
import { generateSubCategories } from "../utils/constants.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
    },
    lastName: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lower: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default:false
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.post("save", async function (doc, next) { 
  const isNewUser = this.isNew;
  if (!isNewUser) {
    return next();
  }

  try {

    const subCats = await UserSubCategory.find({ owner: doc._id });
    if (subCats.length > 0) {
      return next();
    }
    const subCatsToInsert = generateSubCategories(doc._id);
    await UserSubCategory.insertMany(subCatsToInsert);
    console.log("Default user sub-categories created");
    next();
  } catch (err) {
    console.error("Failed to seed sub-categories for new user:", err);
    next(new Error("Failed to seed sub-cats"));
  }
});

export default mongoose.model("User", userSchema);
