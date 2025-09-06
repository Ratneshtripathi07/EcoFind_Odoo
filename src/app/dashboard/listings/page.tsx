'use client';

import { useAuth } from '@/hooks/use-auth';
import { useMockDataStore } from '@/store/mock-data-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function MyListingsPage() {
  const { user } = useAuth();
  const { products, deleteProduct } = useMockDataStore();
  
  if (!user) return null;
  
  const userProducts = products.filter((p) => p.sellerId === user.id);

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
    toast({
        title: "Listing Deleted",
        description: `Product (ID: ${productId}) has been removed.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground">Manage your products for sale.</p>
        </div>
        <Button asChild>
            <Link href="/dashboard/listings/new">Add New Listing</Link>
        </Button>
      </div>
      
      {userProducts.length > 0 ? (
        <Card>
            <CardContent className="p-0">
                <ul className="divide-y divide-border">
                    {userProducts.map((product) => (
                        <li key={product.id} className="flex items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-4">
                                <Image 
                                    src={product.images[0]}
                                    alt={product.title}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover"
                                />
                                <div>
                                    <p className="font-medium">{product.title}</p>
                                    <p className="text-sm text-muted-foreground">Rs.{product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" asChild>
                                    <Link href={`/dashboard/listings/edit/${product.id}`}><Pencil className="h-4 w-4" /></Link>
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            listing.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      ) : (
        <p className="text-muted-foreground">You have no active listings.</p>
      )}
    </div>
  );
}
