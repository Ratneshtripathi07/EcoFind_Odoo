
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { categories } from '@/lib/mock-data';
import type { Category, Product } from '@/lib/types';
import { Upload, Package, BookOpen } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useMockDataStore } from '@/store/mock-data-store';
import { notFound } from 'next/navigation';

export default function EditListingPage() {
  const router = useRouter();
  const params = useParams();
  const { products, updateProduct } = useMockDataStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const productId = params.id as string;
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Handle case where product is not found
    }
  }, [params.id, products]);

  if (!product) {
    // You can show a loading state or a not found message
    return <div>Loading...</div>;
  }
  
  const handleInputChange = (field: keyof Product, value: any) => {
    setProduct(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleDimensionChange = (field: 'length' | 'width' | 'height', value: string) => {
      setProduct(prev => prev ? { ...prev, dimensions: { ...prev.dimensions, [field]: parseFloat(value) } } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(product) {
      updateProduct(product);
      toast({
        title: 'Listing Updated!',
        description: `Your product "${product.title}" has been updated.`,
      });
      router.push('/dashboard/listings');
    }
  };
  
  const handleCancel = () => {
    router.back();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Edit Product</CardTitle>
        <CardDescription>Update the details of your item for sale.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex items-center justify-center w-full">
                    <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" />
                    </Label>
                </div> 
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Product Title</Label>
                    <Input id="title" value={product.title} onChange={(e) => handleInputChange('title', e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Product Category</Label>
                    <Select value={product.category} onValueChange={(value: Category) => handleInputChange('category', value)} required>
                        <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                        <SelectContent>
                        {categories.map((cat) => ( <SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea id="description" value={product.description} onChange={(e) => handleInputChange('description', e.target.value)} required rows={6}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (Rs.)</Label>
                    <Input id="price" type="number" value={product.price || ''} onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" value={product.quantity || 1} onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)} required />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="condition">Condition</Label>
                <Input id="condition" value={product.condition || ''} onChange={(e) => handleInputChange('condition', e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                    <Checkbox id="originalPackaging" checked={product.originalPackaging} onCheckedChange={(checked) => handleInputChange('originalPackaging', !!checked)} />
                    <Label htmlFor="originalPackaging">Original Packaging</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="manualIncluded" checked={product.manualIncluded} onCheckedChange={(checked) => handleInputChange('manualIncluded', !!checked)} />
                    <Label htmlFor="manualIncluded">Manual Included</Label>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
      </CardContent>
    </Card>
  );
}
