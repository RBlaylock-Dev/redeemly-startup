"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { sendMessage, getMessages, getAllUsers } from "@/app/actions/chat";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Users, Circle } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

interface User {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  isOnline?: boolean;
}

interface PresenceUser {
  user_id: string;
  presence_ref: string;
}

export function ChatDrawer({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUserIds, setOnlineUserIds] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Load users
  useEffect(() => {
    async function loadUsers() {
      const data = await getAllUsers();
      setUsers(data as User[]);
    }
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  // Presence
  useEffect(() => {
    const channel = supabase.channel("online-users");

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as unknown as Record<
          string,
          PresenceUser[]
        >;
        const ids = new Set<string>();
        for (const id in state) {
          if (state[id][0]?.user_id) ids.add(state[id][0].user_id);
        }
        setOnlineUserIds(ids);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        setOnlineUserIds((prev) => {
          const next = new Set(prev);
          const presences = newPresences as unknown as PresenceUser[];
          if (presences[0]?.user_id) next.add(presences[0].user_id);
          return next;
        });
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        setOnlineUserIds((prev) => {
          const next = new Set(prev);
          const presences = leftPresences as unknown as PresenceUser[];
          if (presences[0]?.user_id) next.delete(presences[0].user_id);
          return next;
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            user_id: currentUserId,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, supabase]);

  // Messages Subscription
  useEffect(() => {
    if (!selectedUser) return;

    // Load initial messages
    getMessages(selectedUser.id).then((data) => setMessages(data as Message[]));

    const channel = supabase
      .channel(`chat:${currentUserId}:${selectedUser.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=in.(${currentUserId},${selectedUser.id})`,
          // Note: Simple filter might accept messages not meant for this pair if logic isn't perfect,
          // but we filter extensively in UI or rely on RLS.
          // Better filter: (sender=Me AND receiver=Them) OR (sender=Them AND receiver=Me)
          // Realtime filters are limited. simpler to subscribe to all my messages.
        },
        async (payload) => {
          const msg = payload.new as Message;
          if (
            (msg.sender_id === currentUserId &&
              msg.receiver_id === selectedUser.id) ||
            (msg.sender_id === selectedUser.id &&
              msg.receiver_id === currentUserId)
          ) {
            setMessages((prev) => [...prev, msg]);
            setTimeout(
              () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
              100
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUser, currentUserId, supabase]);

  // Handle Send
  async function handleSend() {
    if (!newMessage.trim() || !selectedUser) return;

    const formData = new FormData();
    formData.append("content", newMessage);
    formData.append("receiverId", selectedUser.id);

    // Optimistic Update
    const optimisticMsg: Message = {
      id: crypto.randomUUID(),
      sender_id: currentUserId,
      receiver_id: selectedUser.id,
      content: newMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setNewMessage("");
    setTimeout(
      () => scrollRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );

    const result = await sendMessage(formData);
    if (result?.error) {
      toast.error("Failed to send message");
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            {selectedUser ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto mr-2"
                  onClick={() => setSelectedUser(null)}
                >
                  ← Back
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedUser.avatar_url} />
                  <AvatarFallback>
                    {selectedUser.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedUser.full_name}</span>
              </div>
            ) : (
              "Messages"
            )}
          </SheetTitle>
        </SheetHeader>

        {selectedUser ? (
          // Chat Interface
          <>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => {
                  const isMe = msg.sender_id === currentUserId;
                  return (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-full",
                        isMe ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                          isMe
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p>{msg.content}</p>
                        <p
                          className={cn(
                            "text-[10px] mt-1 opacity-70",
                            isMe
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {formatDistanceToNow(new Date(msg.created_at), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          // User List
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {users.map((user) => (
                <button
                  key={user.id}
                  className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>
                        {user.username?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {onlineUserIds.has(user.id) && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
