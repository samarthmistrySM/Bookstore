import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      required: true
    }
  }
);

export default model('Book', bookSchema);
