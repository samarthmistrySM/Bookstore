export interface Book {
  _id: any;
  name: string;
  author: string;
  description: string;
  image: string;
  price: number;
  discount: number;
}

export interface Address {
  name: string;
  number: number;
  pinCode: number;
  locality: string;
  address: string;
  city: string;
  landmark: string;
  type: string;
}

export interface CartItemType {
  book: Book;
  quantity: number;
}

export interface User {
  _id: any;
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  cart: CartItemType[];
  wishList: Book[];
}
