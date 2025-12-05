import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { placeholderImages } from "@/lib/placeholder-images.json"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomPlaceholderImage(id?: string): string {
  let images = placeholderImages;

  if (id) {
    const filteredImages = placeholderImages.filter(image => image.id === id);
    if (filteredImages.length > 0) {
      images = filteredImages;
    }
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex].imageUrl;
}
