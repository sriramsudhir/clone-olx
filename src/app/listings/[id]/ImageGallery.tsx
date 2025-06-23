'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Listing } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

export default function ImageGallery({ listing }: { listing: Listing }) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <Card>
            <CardContent className="p-4">
                <div className="relative">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                        <Image
                            src={listing.images[selectedImage]}
                            alt={listing.title}
                            layout="fill"
                            objectFit="cover"
                            className="bg-muted"
                            data-ai-hint="product image"
                        />
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                                <Share2 className="w-5 h-5" />
                            </Button>
                            <Button variant="secondary" size="icon" className="rounded-full bg-black/30 hover:bg-black/50 text-white">
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {listing.images.map((img, index) => (
                            <button key={index} onClick={() => setSelectedImage(index)} className={cn("aspect-square relative rounded-md overflow-hidden transition-all", selectedImage === index ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100')}>
                                    <Image
                                    src={img}
                                    alt={`${listing.title} thumbnail ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="bg-muted"
                                    />
                            </button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
