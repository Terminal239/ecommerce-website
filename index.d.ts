interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
  discountPercentage: number;
  discountedPrice: number;
  features: string[];
  rating: Rating;
  reviews: Review[];
}

interface CartItem {
  id: string;
  count: number;
  item: Product;
}

interface LoginResponse {
  token: string;
  email: string;
  username: string;
  cart: CartItem[];
}

interface User {
  username: string;
  email: string;
  token: string;
}
