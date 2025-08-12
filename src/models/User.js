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

userSchema.post("save", async function (doc) {
  try {
    const subCats = await UserSubCategory.find({ owner: doc._id });
    if (subCats.length !== 0) {
      console.log("User already have subcats", subCats);
      return;
    }
    const subCatsToInsert = generateSubCategories(doc._id);
    await UserSubCategory.insertMany(subCatsToInsert);
    console.log("User sub cats created");
  } catch (err) {
    throw new Error("Failed to seed sub-cats", err);
  }
});

export default mongoose.model("User", userSchema);
