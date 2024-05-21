'use client';

import ProductGridSection from '@/components/product-grid-section';
import { Button } from '@/components/ui/button';
import { useLatestProducts } from '@/hooks/useProducts';
import { LoaderCircle } from 'lucide-react';

export default function Home() {
  const { error, status } = useLatestProducts();

  const content =
    status === 'pending' ? (
      <div className="flex justify-center mt-[40vh]">
        <Loader />
      </div>
    ) : status === 'error' ? (
      <div className="flex justify-center mt-[40vh] text-xl font-semibold text-red-500">
        {error.message}
      </div>
    ) : (
      <ProductGridSection />
    );

  return (
    <main className="bg-neutral-200 p-4">
      <div className="min-h-screen flex flex-col bg-white px-4 lg:px-8 xl:px-20 py-10 md:py-14 xl:py-24 rounded-md shadow">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium">Latest Arrivals</h2>
          <Button variant={'outline'} className="shadow">
            View all
          </Button>
        </div>
        {content}
      </div>
    </main>
  );
}

export const Loader = () => {
  return <LoaderCircle className="size-10 animate-spin" />;
};
