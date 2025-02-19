import axios from 'axios';
import { Product, Category, User } from '../types';

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (userData: Partial<User>): Promise<User> => {
  const response = await api.post('/users', userData);
  return response.data;
};