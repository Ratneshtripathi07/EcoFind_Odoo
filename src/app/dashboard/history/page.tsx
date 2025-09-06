import { Card, CardContent } from '@/components/ui/card';
import { History } from 'lucide-react';

export default function PurchaseHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Purchase History</h1>
        <p className="text-muted-foreground">A record of items you have purchased.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-16 text-center">
            <History className="h-12 w-12 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">No Purchases Yet</h2>
            <p className="mt-2 text-muted-foreground">
              Your purchase history will appear here once you buy an item.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
