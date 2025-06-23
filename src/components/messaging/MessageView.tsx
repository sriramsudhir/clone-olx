"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Conversation } from "@/lib/types";
import { Send, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

// Assuming current user is user-1 for mock purposes
const CURRENT_USER_ID = 'user-1';

export default function MessageView({ conversation }: { conversation: Conversation }) {

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
            <Link href="/messages">
                <ArrowLeft />
            </Link>
        </Button>
        <div className="relative h-12 w-12 mr-4 hidden sm:block">
            <Image src={conversation.listing.images[0]} alt={conversation.listing.title} layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="product image"/>
        </div>
        <div>
            <h3 className="font-semibold">{conversation.listing.title}</h3>
            <p className="text-sm text-muted-foreground">Messaging about your listing</p>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
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
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender?.avatarUrl} alt={sender?.name} data-ai-hint="person face"/>
                    <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2",
                    isCurrentUser
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary rounded-bl-none"
                  )}
                >
                  <p>{message.text}</p>
                </div>
                 {isCurrentUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender?.avatarUrl} alt={sender?.name} data-ai-hint="person face" />
                    <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <footer className="p-4 border-t">
        <div className="relative">
          <Input placeholder="Type your message..." className="pr-12" />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
