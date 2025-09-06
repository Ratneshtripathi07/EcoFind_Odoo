"use client";

import { useState, useEffect } from 'react';
import { useMockDataStore } from '@/store/mock-data-store';
import { categories } from '@/lib/mock-data';
import type { Product, Category, SortOption } from '@/lib/types';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const sortOptions: { value: SortOption, label: string }[] = [
  { value: 'date', label: 'Sort by Date' },
  { value: 'price-asc', label: 'Sort by Price: Low to High' },
  { value: 'price-desc', label: 'Sort by Price: High to Low' },
  { value: 'rating', label: 'Sort by Rating' },
];

export default function Home() {
  const { products } = useMockDataStore();
  const searchParams = useSearchParams();
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date');

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    let tempProducts = [...productList];

    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      tempProducts = tempProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sorting logic
    tempProducts.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredProducts(tempProducts);
  }, [searchQuery, selectedCategory, productList, sortOption]);

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mb-8 overflow-hidden rounded-lg">
        <div className="relative h-64 w-full">
            <Image
                src="https://picsum.photos/1200/400?random=1"
                alt="Banner image for sustainable products"
                fill
                data-ai-hint="nature banner"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Find Your Next Sustainable Treasure</h1>
                <p className="mt-2 max-w-2xl">Discover unique, pre-loved, and eco-friendly items from sellers who care.</p>
            </div>
        </div>
      </div>
      
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
        </div>

        <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Filter:</span>
                <Select
                    value={selectedCategory}
                    onValueChange={(value: Category | 'all') => setSelectedCategory(value)}
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                        {cat}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort:</span>
                <Select
                  value={sortOption}
                  onValueChange={(value: SortOption) => setSortOption(value)}
                >
                  <SelectTrigger className="w-full sm:w-[220px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
        </div>
      </div>
      
      {searchQuery && (
         <h2 className="mb-6 font-headline text-2xl font-bold">
          Searching for &quot;{searchQuery}&quot;
        </h2>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <h2 className="text-2xl font-semibold">No products found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
