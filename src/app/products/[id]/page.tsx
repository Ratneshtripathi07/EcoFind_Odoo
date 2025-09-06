
'use client';

import { notFound, useParams } from 'next/navigation';
import { useMockDataStore } from '@/store/mock-data-store';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ClientAddToCart from './client-add-to-cart';

export default function ProductDetailPage() {
  const params = useParams();
  const { products, users } = useMockDataStore();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const seller = users.find((u) => u.id === product.sellerId);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/3]">
                      <Image
                        src={src}
                        alt={`${product.title} - image ${index + 1}`}
                        width={600}
                        height={450}
                        data-ai-hint={`${product.category.toLowerCase()} product`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-primary">{product.category}</p>
            <h1 className="font-headline text-3xl font-bold lg:text-4xl">{product.title}</h1>
            <p className="mt-4 text-3xl font-bold text-primary">Rs.{product.price.toFixed(2)}</p>
          </div>
          <p className="text-muted-foreground">{product.description}</p>

          {seller && (
             <Card>
                <CardContent className="flex items-center gap-4 p-4">
                    <Avatar>
                        <AvatarImage src={seller.avatar} alt={seller.username} />
                        <AvatarFallback>{seller.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Sold by</p>
                        <Link href={`/${seller.username}`} className="font-semibold hover:underline">
                        @{seller.username}
                        </Link>
                    </div>
                </CardContent>
            </Card>
          )}

          <ClientAddToCart product={product} />
        </div>
      </div>
    </div>
  );
}
