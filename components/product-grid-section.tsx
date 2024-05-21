import ProductCard from './product-card';
import { useLatestProducts } from '@/hooks/useProducts';

export default function ProductGridSection() {
  const { data } = useLatestProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-14">
      {data?.data.map((product) => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}
