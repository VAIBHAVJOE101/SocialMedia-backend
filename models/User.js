const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
      username: {
            type: String,
            required: true,
            unique: true,
            min: 3,
            max: 20,
      },
      password: {
            type: String,
            required: true,
            min: 3,

      },
      email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
      },
      profilePicture: {
            type: String,
            default: "",
      },
      coverPicture: {
            type: String,
            default: "",
      },
      followers: {
            type: Array,
            default: [],
      },
      followings: {
            type: Array,
            default: [],
      },
      isAdmin: {
            type: Boolean,
            default: false,
      },
      desc: {
            type: String,
            default: "",
            max: 50,
      },
      city: {
            type: String,
            default: "",
            max: 50,
      },
      from: {
            type: String,
            default: "",
            max: 50,
      },
      relationship: {
            type: Number,
            enum: [1, 2, 3]
      },
},
      { timestamps: true, }
);


module.exports = mongoose.model("User",UserSchema);