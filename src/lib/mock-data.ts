import type { Product, User, Category } from '@/lib/types';

export const users: User[] = [
  {
    id: 'user-1',
    username: 'greenThumb',
    email: 'sarah.green@gmail.com',
    avatar: '/avatars/user1.jpg',
    bio: 'Lover of all things green and sustainable. Selling my pre-loved items to a good home!',
  },
  {
    id: 'user-2',
    username: 'ecoWarrior',
    email: 'mike.eco@outlook.com',
    avatar: '/avatars/user2.jpg',
    bio: 'Fighting for a better planet, one reused item at a time. Check out my shop!',
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'Hand-Knit Wool Sweater',
    description:
      'Cozy and warm hand-knit sweater made from 100% ethically sourced wool. Perfect for chilly evenings. Barely worn, in excellent condition.',
    price: 45.0,
    category: 'Clothing',
    images: ['/products/sweater1.jpg', '/products/sweater2.jpg'],
    sellerId: 'user-1',
    rating: 4.5,
    createdAt: '2023-10-01T12:00:00Z',
  },
  {
    id: 'prod-2',
    title: 'Vintage Leather Armchair',
    description:
      'A beautiful mid-century modern armchair with original leather upholstery. Shows some signs of love and wear which add to its character. A true statement piece.',
    price: 250.0,
    category: 'Furniture',
    images: ['/products/chair1.jpg', '/products/chair2.jpg'],
    sellerId: 'user-2',
    rating: 4.8,
    createdAt: '2023-09-15T10:30:00Z',
  },
  {
    id: 'prod-3',
    title: 'Upcycled Wooden Bookshelf',
    description:
      'Sturdy bookshelf made from reclaimed pallet wood. Sanded and finished with a natural, non-toxic oil. Adds a rustic charm to any room.',
    price: 80.0,
    category: 'Furniture',
    images: ['/products/bookshelf.jpg'],
    sellerId: 'user-1',
    rating: 4.2,
    createdAt: '2023-10-05T14:00:00Z',
  },
  {
    id: 'prod-4',
    title: 'Classic Sci-Fi Novel Collection',
    description: 'A set of 5 classic science fiction novels from the 70s. Paperback, in good reading condition. Includes works by Asimov and Clarke.',
    price: 25.0,
    category: 'Books',
    images: ['/products/books.jpg'],
    sellerId: 'user-2',
    rating: 4.9,
    createdAt: '2023-09-20T18:45:00Z',
  },
  {
    id: 'prod-5',
    title: 'Portable Bluetooth Speaker',
    description:
      'A reliable and portable Anker Bluetooth speaker. Great sound quality and long battery life. Comes with charging cable. Used for about a year.',
    price: 30.0,
    category: 'Electronics',
    images: ['/products/speaker.jpg'],
    sellerId: 'user-1',
    rating: 4.0,
    createdAt: '2023-10-02T09:00:00Z',
  },
  {
    id: 'prod-6',
    title: 'Set of Ceramic Mugs',
    description:
      'Four handmade ceramic mugs with a beautiful earthy glaze. Dishwasher and microwave safe. No chips or cracks.',
    price: 20.0,
    category: 'Home Goods',
    images: ['/products/mugs.jpg'],
    sellerId: 'user-2',
    rating: 5.0,
    createdAt: '2023-10-10T11:00:00Z',
  },
  {
    id: 'prod-7',
    title: 'Organic Cotton T-Shirt',
    description: 'A soft, comfortable t-shirt made from 100% organic cotton. Size medium, unisex fit. Worn a few times, like new.',
    price: 15.0,
    category: 'Clothing',
    images: ['/products/tshirt.jpg'],
    sellerId: 'user-2',
    rating: 4.6,
    createdAt: '2023-10-08T16:20:00Z',
  },
  {
    id: 'prod-8',
    title: 'Antique Desk Lamp',
    description: 'A charming antique brass desk lamp with an adjustable arm. Works perfectly, bulb included. Adds a touch of vintage elegance.',
    price: 60.0,
    category: 'Home Goods',
    images: ['/products/lamp1.jpg', '/products/lamp2.jpg'],
    sellerId: 'user-1',
    rating: 4.7,
    createdAt: '2023-09-25T08:00:00Z',
  }
];

export const categories: Category[] = ['Electronics', 'Furniture', 'Clothing', 'Home Goods', 'Books'];
