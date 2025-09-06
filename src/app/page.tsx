import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-primary mb-4">Welcome to EcoFinds</h1>
                <p className="text-lg text-muted-foreground">Your sustainable marketplace for eco-friendly products</p>
                <div className="flex gap-4 justify-center">
                    <Button>Shop Now</Button>
                    <Button variant="outline">Learn More</Button>
                </div>
            </div>
        </main>
    )
}