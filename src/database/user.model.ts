import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for the password
  },
  links: [[
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
        trim: true,
        match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, 'Please enter a valid URL'],
      }
    }
  ]],
  image: {
    type: String,
    default:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
  }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
