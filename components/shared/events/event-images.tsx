/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { useState } from "react";

export function EventImages({
  featuredImage,
  additionalImages = [],
  title,
}: {
  featuredImage: string;
  additionalImages: any[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState(featuredImage);

  return (
    <div className="space-y-4">
      <div className="aspect-video overflow-hidden rounded-lg relative">
        <Image
          src={selectedImage}
          alt={title}
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setSelectedImage(featuredImage)}
          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 relative ${
            selectedImage === featuredImage
              ? "border-blue-500"
              : "border-gray-200"
          }`}
        >
          <Image
            src={featuredImage}
            alt="Featured"
            className="w-full h-full object-cover"
            fill
          />
        </button>
        {additionalImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image.url)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 relative ${
              selectedImage === image.url
                ? "border-blue-500"
                : "border-gray-200"
            }`}
          >
            <Image
              src={image.url}
              alt={`Additional ${index + 1}`}
              className="w-full h-full object-cover"
              fill
            />
          </button>
        ))}
      </div>
    </div>
  );
}
