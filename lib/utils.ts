import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatHours = (h: number) => `${h} ч`;

export const siteConfig = {
  name: "Институт вокальной психологии",
  short: "ИВП",
  description:
    "Профессиональное образование в вокальной психологии для педагогов по вокалу, психологов и артистов-педагогов. Первый в России профильный институт.",
  url: "https://ivp.example",
  email: "hello@ivp.example",
  phone: "+7 (000) 000-00-00",
  lmsUrl: process.env.NEXT_PUBLIC_LMS_URL ?? "#",
};
