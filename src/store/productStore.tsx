import { create } from "zustand";
import {Product, Sizes, Colors} from "../types/ProductType";

type TypeActionWithPayload = ({name, id, price, description, sizes, colors}: Product) => void;


type ProductStore = {
    products: Product[];
    cart: Product[];
    fetchProducts: () => Promise<void>;
    add: TypeActionWithPayload;
    addToCart: TypeActionWithPayload;
};

const API_URL = "http://10.0.2.2:3000/products";

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  cart: [],

  fetchProducts: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      set({ products: data,});
  },

  add: (product) =>{
    set((state) => ({
      products: [...state.products, product],
    }));
  },
  addToCart: (product) => {
    set((state) => ({
      cart: [...state.cart, product],
    }));
  },
}));