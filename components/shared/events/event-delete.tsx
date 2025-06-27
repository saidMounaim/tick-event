"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteEventAction } from "@/lib/actions/event";
import { usePathname } from "next/navigation";

export function EventDelete({ eventId }: { eventId: string }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    startTransition(async () => {
      const res = await deleteEventAction(eventId, pathname);
      if (res?.success === false) {
        toast.error(res.message || "Failed to delete event.");
        return;
      }
      toast.success("Event deleted.");
    });
  };

  return (
    <div className="mt-4 flex gap-2">
      <Button
        variant="destructive"
        size="sm"
        className="flex-1"
        onClick={handleDelete}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
