'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    toast({
      title: 'Message Sent!',
      description: 'Thanks for reaching out. We will get back to you shortly.',
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-headline text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have a question, feedback, or just want to say hello? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-muted-foreground">Send us an email for any inquiries.</p>
              <a href="mailto:support@ecofind.com" className="font-medium text-primary hover:underline">
                support@ecofind.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-muted-foreground">Our support team is available Mon-Fri.</p>
              <a href="tel:+1234567890" className="font-medium text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Office</h3>
              <p className="text-muted-foreground">123 Green Way, Eco City, 54321</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    rows={6}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
