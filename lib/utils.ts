import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeUrl(url: string) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export function toHref(value: string) {
  const raw = value.trim();

  if (!raw) return "";

  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("mailto:") ||
    raw.startsWith("tel:")
  ) {
    return raw;
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
  if (isEmail) {
    return `mailto:${raw}`;
  }

  const looksLikePhone = /^[+()\d\s-]+$/.test(raw);
  if (looksLikePhone) {
    const normalizedPhone = raw.replace(/[^\d+]/g, "");
    return `tel:${normalizedPhone}`;
  }

  return `https://${raw}`;
}

export function isWebUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isPhoneHref(href: string) {
  return href.startsWith("tel:");
}
