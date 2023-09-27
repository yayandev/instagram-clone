import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export function formatRelativeTime(date: Date) {
  const timeAgo = formatDistanceToNow(date, { addSuffix: true, locale: id });
  return timeAgo.replace(/sekitar\s+/i, "");
}
