"use client";

import { X } from "lucide-react";

type TrailerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string;
  title: string;
};

export default function TrailerModal({
  isOpen,
  onClose,
  videoKey,
  title,
}: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute right-3 top-3 z-20 rounded-full bg-black/70 p-2 text-white transition hover:bg-gray-800"
        >
          <X size={22} />
        </button>

        {/* Video */}
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={`${title} Trailer`}
            className="h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Title */}
        <div className="px-5 py-4">
          <h2 className="text-lg font-semibold text-white">
            {title} - Trailer
          </h2>
        </div>
      </div>
    </div>
  );
}