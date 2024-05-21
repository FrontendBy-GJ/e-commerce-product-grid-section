'use client';

import { Product } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

interface Data {
  data: Product[];
}

async function fetchProducts() {
  try {
    const latestProductsURL = process.env.NEXT_PUBLIC_LATEST_PRODUCTS_URL;
    if (!latestProductsURL) {
      throw new Error(
        'LATEST_PRODUCTS_URL environment variable is not defined'
      );
    }
    const res = await fetch(latestProductsURL);
    return await res.json();
  } catch (error) {
    console.error("Couldn't fetch products:", (error as Error).message);
  }
}

export const useLatestProducts = () => {
  return useQuery<Data>({
    queryKey: ['latest-products'],
    queryFn: fetchProducts,
    staleTime: Infinity,
  });
};
