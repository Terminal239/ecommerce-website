import axios from "axios";
const BASE_URL = "http://192.168.1.12:5000";

const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/api/products`);
  return response.data;
};

const getBestSellers = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${BASE_URL}/api/products/bestsellers`);
  return response.data;
};

const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${BASE_URL}/api/products/${id}`);
  return response.data;
};

const getCategoryList = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${BASE_URL}/api/categories`);
  return response.data;
};

const getCartItems = async (token: string): Promise<CartItem[]> => {
  const response = await axios.get<CartItem[]>(`${BASE_URL}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const onAddToCart = async ({ id, token }: { id: string; token: string }): Promise<CartItem> => {
  const response = await axios.post<CartItem>(`${BASE_URL}/api/cart`, { id }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const onDeleteFromCart = async ({ id, token }: { id: string; token: string }): Promise<string> => {
  await axios.delete(`${BASE_URL}/api/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return id;
};

const onItemCountIncrement = async ({ id, token }: { id: string; token: string }): Promise<CartItem> => {
  const response = await axios.post<CartItem>(`${BASE_URL}/api/cart/increment`, { id }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const onItemCountDecrement = async ({ id, token }: { id: string; token: string }): Promise<CartItem> => {
  const response = await axios.post<CartItem>(`${BASE_URL}/api/cart/decrement`, { id }, { headers: { Authorization: `Bearer ${token}` } });
  return response.data;
};

const onUserLogin = async (email: string, password: string): Promise<User> => {
  const response = await axios.post<User>(`${BASE_URL}/api/auth/login`, { email, password });
  return response.data;
};

const onUserSignUp = async (email: string, password: string, username: string): Promise<User> => {
  const response = await axios.post<User>(`${BASE_URL}/api/auth/signup`, { email, password, username });
  return response.data;
};

export { getBestSellers, getCartItems, getCategoryList, getProduct, getProducts, onAddToCart, onDeleteFromCart, onItemCountDecrement, onItemCountIncrement, onUserLogin, onUserSignUp };
