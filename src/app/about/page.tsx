import { Leaf, Users, Recycle } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-headline text-4xl font-bold md:text-5xl">About EcoFind</h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          We are dedicated to building a community that values sustainability and conscious consumption.
          EcoFind is more than just a marketplace; it&apos;s a movement towards a greener future.
        </p>
      </div>

      <div className="relative mb-16 h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <Image
          src="https://picsum.photos/1200/400?random=2"
          alt="Team working together in a green office"
          layout="fill"
          objectFit="cover"
          data-ai-hint="team collaboration"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h2 className="absolute bottom-6 left-6 font-headline text-3xl font-bold text-white">
          Our Mission
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Leaf className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-headline text-2xl font-semibold">Promote Sustainability</h3>
          <p className="text-muted-foreground">
            We empower individuals to make eco-friendly choices by giving pre-loved items a second life,
            reducing waste and conserving resources for a healthier planet.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-headline text-2xl font-semibold">Build Community</h3>
          <p className="text-muted-foreground">
            Our platform connects like-minded people who share a passion for sustainability,
            fostering a supportive network of buyers and sellers committed to making a difference.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Recycle className="h-8 w-8" />
          </div>
          <h3 className="mb-2 font-headline text-2xl font-semibold">Encourage Upcycling</h3>
          <p className="text-muted-foreground">
            From vintage furniture to unique clothing, we celebrate the art of upcycling and the creativity
            of our sellers who transform old items into new treasures.
          </p>
        </div>
      </div>
    </div>
  );
}
