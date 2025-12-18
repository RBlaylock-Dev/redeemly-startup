"use client";

import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/app/actions/notifications";
import { createClient } from "@/utils/supabase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type: "reaction" | "comment" | "system" | "message";
  entity_id: string;
  sender: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
  created_at: string;
  read: boolean;
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      setNotifications(data as unknown as Notification[]);
      setUnreadCount(data?.filter((n: any) => !n.read).length || 0);
    }

    fetchNotifications();

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `recipient_id=eq.${userId}`,
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase]);

  async function fetchNotifications() {
    const data = await getNotifications();
    setNotifications(data as unknown as Notification[]);
    setUnreadCount(data?.filter((n: any) => !n.read).length || 0);
  }

  async function handleMarkAllRead() {
    await markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }

  async function handleNotificationClick(n: Notification) {
    if (!n.read) {
      await markAsRead(n.id);
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
    setOpen(false);

    // Navigate to post (Assuming all notifications link to posts currently)
    if (n.type === "message") {
      // Redirect to profile? Or just handle as generic.
      // Opening the chat drawer is hard from here without global state.
      // Best we can do is maybe route to their profile which has a "Message" button
      router.push(`/app/profile/${n.sender.username}`);
    } else {
      router.push(`/app/feed?postId=${n.entity_id}`);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-600 border-2 border-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
              onClick={handleMarkAllRead}
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  className={`w-full text-left flex gap-3 p-4 hover:bg-muted/50 transition-colors ${
                    !n.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={n.sender?.avatar_url} />
                    <AvatarFallback>
                      {n.sender?.username?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">
                        {n.sender?.full_name || "Someone"}
                      </span>{" "}
                      {n.type === "reaction" && "reacted to your post"}
                      {n.type === "comment" && "commented on your post"}
                      {n.type === "system" && "sent a system message"}
                      {n.type === "message" && "sent you a message"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(n.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
