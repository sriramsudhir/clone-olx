import ConversationList from '@/components/messaging/ConversationList';
import MessageView from '@/components/messaging/MessageView';
import { conversations } from '@/lib/data';

export default function MessagesPage({
  searchParams,
}: {
  searchParams?: { conversationId?: string };
}) {
  const currentConversationId = searchParams?.conversationId || conversations[0]?.id;
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  
  return (
    <div className="flex h-[calc(100vh-10rem)] bg-card border rounded-lg overflow-hidden">
      <div className="hidden md:block md:w-1/3 lg:w-1/4 border-r">
        <ConversationList conversations={conversations} activeConversationId={currentConversationId} />
      </div>
      <div className="flex-1 flex flex-col">
        {currentConversation ? (
          <MessageView conversation={currentConversation} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
             <div className="text-center">
                <h2 className="text-2xl font-semibold">Select a conversation</h2>
                <p>Choose a chat from the left to start messaging.</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
