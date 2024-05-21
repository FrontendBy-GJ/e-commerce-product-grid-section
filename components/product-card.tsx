import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useLatestProducts } from '@/hooks/useProducts';
import { useState } from 'react';
import { Product } from '@/utils/types';

export default function ProductCard({ product }: { product: Product }) {
  const { colors, images, inventory, name } = product;
  const [defaultImage, setDefaultImage] = useState(images[0]?.image_url);
  const [defaultProductColor, setDefaultProductColor] = useState(colors[0]);
  const { isLoading } = useLatestProducts();

  const onColorChange = (clr: string) => {
    const colorIndex = images.findIndex((img) => img.color === clr);
    setDefaultImage(images[colorIndex]?.image_url);
    setDefaultProductColor(clr);
  };

  const productPrice =
    inventory[0].list_price > inventory[0].sale_price ? (
      <>
        <p>${inventory[0].sale_price}</p>
        <p className="line-through text-xs">${inventory[0].list_price}</p>
      </>
    ) : (
      <p>${inventory[0].list_price}</p>
    );

  return (
    <>
      {isLoading ? (
        <Card className="w-full h-[290px] animate-pulse bg-neutral-500"></Card>
      ) : (
        <Card>
          <CardHeader className="p-0">
            <Image
              src={defaultImage}
              alt={name}
              className="w-full h-[290px] object-cover rounded-xl"
              width={300}
              height={600}
            />
          </CardHeader>
          <CardContent className="p-2">
            <p className="capitalize text-xs text-neutral-500 my-1">
              {defaultProductColor}
            </p>
            <h3 className="capitalize font-medium">{name}</h3>
            <div className="text-neutral-500 my-3 flex items-center gap-2">
              {productPrice}
            </div>
            <div className="flex gap-3">
              {colors.map((clr) => (
                <TooltipProvider key={clr}>
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() => onColorChange(clr)}
                      style={{ backgroundColor: clr }}
                      className="size-4 rounded-full border border-neutral-200"
                    ></TooltipTrigger>
                    <TooltipContent>
                      <span className="capitalize">{clr}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
