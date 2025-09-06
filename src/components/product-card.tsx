"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      addToCart(product);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-[4/3]">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={400}
              height={300}

              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2 font-headline text-lg leading-tight">{product.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4">
        <p className="text-xl font-bold text-primary">Rs.{product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm" aria-label={`Add ${product.title} to cart`}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
