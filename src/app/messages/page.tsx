
'use client'

import { useSearchParams } from 'next/navigation';
import ConversationList from '@/components/messaging/ConversationList';
import MessageView from '@/components/messaging/MessageView';
import { conversations } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import { MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();
  const conversationId = searchParams.get('conversationId');

  const activeConversationId = conversationId || conversations[0]?.id;
  const currentConversation = conversations.find(c => c.id === activeConversationId);

  const showConversationList = !isMobile || (isMobile && !conversationId);
  const showMessageView = !isMobile || (isMobile && !!conversationId);
  
  return (
    <div className="flex h-[calc(100vh-10rem)] bg-card border rounded-lg overflow-hidden">
      {showConversationList && (
        <div className="w-full md:w-1/3 lg:w-1/4 border-r">
          <ConversationList conversations={conversations} activeConversationId={activeConversationId} />
        </div>
      )}
      
      {showMessageView && currentConversation ? (
        <div className="flex-1 flex flex-col">
            <MessageView conversation={currentConversation} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 flex-col items-center justify-center text-muted-foreground bg-secondary/50">
           <div className="text-center">
              <MessageCircle className="mx-auto h-16 w-16 text-muted-foreground/50"/>
              <h2 className="text-2xl font-semibold mt-4">Select a conversation</h2>
              <p>Choose a chat from the left to start messaging.</p>
            </div>
        </div>
      )}
    </div>
  );
}
