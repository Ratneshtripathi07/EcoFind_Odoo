
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { categories } from '@/lib/mock-data';
import type { Category } from '@/lib/types';
import { Upload, Package, BookOpen } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useListingStore } from '@/store/listing-store';
import { useMockDataStore } from '@/store/mock-data-store';
import { useAuth } from '@/hooks/use-auth';

export default function ConfirmationPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { product, setProductField, reset } = useListingStore();
    const { addProduct } = useMockDataStore();

    const handleInputChange = (field: keyof typeof product, value: any) => {
        setProductField(field, value);
    };

    const handleDimensionChange = (field: 'length' | 'width' | 'height', value: string) => {
        setProductField('dimensions', {
            ...product.dimensions,
            [field]: value ? parseFloat(value) : 0
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast({ title: 'Error', description: 'You must be logged in to create a listing.', variant: 'destructive' });
            return;
        }

        const newProduct = {
            ...product,
            id: `prod-${Date.now()}`,
            sellerId: user.id,
            rating: Math.floor(Math.random() * 5) + 1, // Mock rating
            createdAt: new Date().toISOString(),
            images: product.images.length > 0 ? product.images : ['/products/default-product.jpg'],
            category: product.category as Category,
        }

        addProduct(newProduct);

        toast({
            title: 'Listing Created!',
            description: `Your new product "${product.title}" is now for sale.`,
        });
        reset(); // Clear the store
        router.push('/dashboard/listings');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Review Your Listing (Step 2 of 2)</CardTitle>
                <CardDescription>Please review and confirm the details of your product.</CardDescription>
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
                            <Input id="title" value={product.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="e.g., Hand-Knit Wool Sweater" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Product Category</Label>
                            <Select value={product.category} onValueChange={(value: Category) => handleInputChange('category', value)} required>
                                <SelectTrigger id="category"><SelectValue placeholder="Select a category" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Textarea id="description" value={product.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Describe your item in detail..." required rows={6} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (Rs.)</Label>
                            <Input id="price" type="number" value={product.price || ''} onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)} placeholder="e.g., 2500.00" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" value={product.quantity} onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)} placeholder="e.g., 1" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Input id="condition" value={product.condition} onChange={(e) => handleInputChange('condition', e.target.value)} placeholder="e.g., Like New, Gently Used, etc." />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workingCondition">Working Condition Description</Label>
                        <Textarea id="workingCondition" value={product.workingCondition} onChange={(e) => handleInputChange('workingCondition', e.target.value)} placeholder="Describe the functional state of the item..." rows={3} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand</Label>
                            <Input id="brand" value={product.brand} onChange={(e) => handleInputChange('brand', e.target.value)} placeholder="e.g., Anker" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" value={product.model} onChange={(e) => handleInputChange('model', e.target.value)} placeholder="e.g., SoundCore" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="year">Year of Manufacture (if applicable)</Label>
                            <Input id="year" type="number" value={product.yearOfManufacture || ''} onChange={(e) => handleInputChange('yearOfManufacture', parseInt(e.target.value) || undefined)} placeholder="e.g., 2021" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="material">Material</Label>
                            <Input id="material" value={product.material} onChange={(e) => handleInputChange('material', e.target.value)} placeholder="e.g., Reclaimed Wood, Organic Cotton" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Dimensions (L x W x H)</Label>
                            <div className="flex gap-2">
                                <Input type="number" value={product.dimensions?.length || ''} onChange={(e) => handleDimensionChange('length', e.target.value)} placeholder="L" />
                                <Input type="number" value={product.dimensions?.width || ''} onChange={(e) => handleDimensionChange('width', e.target.value)} placeholder="W" />
                                <Input type="number" value={product.dimensions?.height || ''} onChange={(e) => handleDimensionChange('height', e.target.value)} placeholder="H" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight (kg)</Label>
                            <Input id="weight" type="number" value={product.weight || ''} onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)} placeholder="e.g., 1.5" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" value={product.color} onChange={(e) => handleInputChange('color', e.target.value)} placeholder="e.g., Forest Green" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="originalPackaging" checked={product.originalPackaging} onCheckedChange={(checked) => handleInputChange('originalPackaging', !!checked)} />
                            <Label htmlFor="originalPackaging" className="flex items-center gap-2 text-sm font-normal">
                                <Package className="h-4 w-4" /> Original Packaging Included
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="manualIncluded" checked={product.manualIncluded} onCheckedChange={(checked) => handleInputChange('manualIncluded', !!checked)} />
                            <Label htmlFor="manualIncluded" className="flex items-center gap-2 text-sm font-normal">
                                <BookOpen className="h-4 w-4" /> Manual/Instructions Included
                            </Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Back to Edit</Button>
                        <Button type="submit">Add Item</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
