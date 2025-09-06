
'use client';

import { notFound, useParams } from 'next/navigation';
import { useMockDataStore } from '@/store/mock-data-store';
import Image from 'next/image';
import ProductCard from '@/components/product-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export default function SellerProfilePage() {
  const params = useParams();
  const { users, products } = useMockDataStore();
  const user = users.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }

  const userProducts = products.filter((p) => p.sellerId === user.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden">
        <div className="h-32 bg-muted" />
        <CardContent className="p-6">
            <div className="-mt-16 flex items-end gap-4">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="text-3xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h1 className="pb-1 font-headline text-3xl font-bold">@{user.username}</h1>
            </div>
            <p className="mt-4 text-muted-foreground">{user.bio}</p>
        </CardContent>
      </Card>

      <h2 className="mb-6 font-headline text-2xl font-bold">Items for Sale</h2>
      {userProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {userProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">This user has no items for sale right now.</p>
      )}
    </div>
  );
}
