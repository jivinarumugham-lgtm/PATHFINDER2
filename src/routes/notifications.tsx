import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, CalendarDays, Inbox, MessageCircle } from "lucide-react";
import { useState } from "react";
import { AppBar, Screen, SectionTitle } from "@/components/pathfinder/MobileShell";
import { notifications, type NotificationItem } from "@/lib/community-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — PathFinder" },
      {
        name: "description",
        content:
          "Connection updates, new messages, badges you have unlocked and upcoming event reminders.",
      },
      { property: "og:title", content: "Notifications — PathFinder" },
      {
        property: "og:description",
        content: "Stay on top of mentor replies, badges and events.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotificationsScreen,
});

const iconFor = {
  request: Inbox,
  message: MessageCircle,
  badge: Award,
  event: CalendarDays,
} as const;

const linkFor: Record<NotificationItem["kind"], string> = {
  request: "/requests",
  message: "/messages",
  badge: "/progress",
  event: "/community",
};

function NotificationsScreen() {
  const [read, setRead] = useState<string[]>([]);

  return (
    <Screen>
      <AppBar
        title="Notifications"
        subtitle={`${notifications.length - read.length} unread`}
        action={
          <button
            type="button"
            onClick={() => setRead(notifications.map((n) => n.id))}
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold"
          >
            Mark all read
          </button>
        }
      />

      <div className="-mt-4 space-y-4 rounded-t-3xl bg-background px-5 pt-6">
        <SectionTitle>Recent activity</SectionTitle>
        <ul className="space-y-3">
          {notifications.map((n) => {
            const Icon = iconFor[n.kind];
            const isRead = read.includes(n.id);
            return (
              <li key={n.id}>
                <Link
                  to={linkFor[n.kind]}
                  onClick={() => setRead((prev) => (prev.includes(n.id) ? prev : [...prev, n.id]))}
                  className={`card-soft flex gap-3 p-4 ${isRead ? "opacity-60" : ""}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-soft text-teal-foreground">
                    <Icon className="size-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{n.title}</p>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Screen>
  );
}
