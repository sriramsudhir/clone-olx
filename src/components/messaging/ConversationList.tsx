"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Conversation, User } from '@/lib/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

// Assuming current user is user-1 for mock purposes
const CURRENT_USER_ID = 'user-1';

const getOtherParticipant = (participants: User[]): User | undefined => {
    return participants.find(p => p.id !== CURRENT_USER_ID);
}

export default function ConversationList({ 
    conversations,
    activeConversationId
}: { 
    conversations: Conversation[],
    activeConversationId?: string
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold font-headline">Messages</h2>
        <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search messages..." className="pl-10"/>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
        {conversations.map((convo) => {
            const otherUser = getOtherParticipant(convo.participants);
            const lastMessage = convo.messages[convo.messages.length - 1];

            return (
          <Link href={`/messages?conversationId=${convo.id}`} key={convo.id}>
            <div
              className={cn(
                'flex items-start p-3 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors',
                convo.id === activeConversationId && 'bg-accent'
              )}
            >
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={otherUser?.avatarUrl} alt={otherUser?.name} data-ai-hint="person face"/>
                <AvatarFallback>{otherUser?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{otherUser?.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {isClient ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.listing.title}</p>
                <p className="text-sm text-muted-foreground truncate">{lastMessage.text}</p>
              </div>
            </div>
          </Link>
        )})}
        </div>
      </ScrollArea>
    </div>
  );
}
