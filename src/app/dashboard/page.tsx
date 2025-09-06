'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Package, User, History } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // Layout handles auth check
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome, @{user.username}!</h1>
        <p className="text-muted-foreground">Here&apos;s a quick overview of your account.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/listings">
          <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Listings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View & Manage</div>
              <p className="text-xs text-muted-foreground">Your products for sale</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/profile">
          <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Edit Profile</div>
              <p className="text-xs text-muted-foreground">Update your public information</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/history">
          <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Purchase History</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View History</div>
              <p className="text-xs text-muted-foreground">Your past orders</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
