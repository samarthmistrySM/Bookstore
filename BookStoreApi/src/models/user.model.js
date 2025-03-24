import { Schema, model } from 'mongoose';

const userSchema = new Schema(
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
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cart: [
      {
        book: {
          type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: 'Book',
      }
    ]
  },
);

export default model('User', userSchema);
