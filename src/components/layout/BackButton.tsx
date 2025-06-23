'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
    const router = useRouter();
    return (
        <Button variant="ghost" size="icon" onClick={() => router.back()} className={className}>
            <ArrowLeft className="w-5 h-5" />
        </Button>
    );
}
