import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phoneNumber: {
      type: Number,
      required: true,
        default: 1234567890
    },
    password: {
      type: String,
      required: true
    },
    cart: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      }
    ]
  },
);

export default mongoose.model('User', userSchema);
