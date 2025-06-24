"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";
import { Send, ArrowLeft, Paperclip } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CURRENT_USER_ID = 'user-1';

const formatPrice = (price: number, priceTo?: number) => {
    const formatNumber = (num: number) => {
        return 'Rp' + new Intl.NumberFormat('id-ID').format(num);
    }
    if (priceTo && priceTo > price) {
        return `${formatNumber(price)} - ${formatNumber(priceTo)}`;
    }
    return formatNumber(price);
};

export default function MessageView({ conversation }: { conversation: Conversation }) {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-secondary/30">
      <header className="flex items-center p-3 border-b bg-card">
        <Button variant="ghost" size="icon" className="md:hidden mr-2 rounded-full" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <Link href={`/listings/${conversation.listing.id}`} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative h-12 w-12 shrink-0">
              <Image src={conversation.listing.images[0]} alt={conversation.listing.title} layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="product image"/>
          </div>
          <div>
              <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">{conversation.listing.title}</h3>
              <p className="text-sm text-primary font-bold">{formatPrice(conversation.listing.price, conversation.listing.priceTo)}</p>
          </div>
        </Link>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {conversation.messages.map((message) => {
            const isCurrentUser = message.senderId === CURRENT_USER_ID;
            const sender = conversation.participants.find(p => p.id === message.senderId);
            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8 self-start">
                    <AvatarImage src={sender?.avatarUrl} alt={sender?.name} data-ai-hint="person face"/>
                    <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2.5 leading-snug shadow-sm",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-card-foreground rounded-bl-none"
                  )}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t bg-card">
        <div className="relative flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost" className="shrink-0">
            <Paperclip className="h-5 w-5"/>
            <span className="sr-only">Attach file</span>
          </Button>
          <Input placeholder="Type a message..." className="pr-12 rounded-full bg-secondary" />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <Send className="h-4 w-4" />
             <span className="sr-only">Send message</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
