"use client";

import { ExternalLink, Calendar, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BookmarkBlockProps {
  id: string;
  link: string;
  title: string;
  content: string;
  favicon?: string;
  createdAt: string;
}

export default function BookmarkBlock({
  link,
  title,
  content,
  favicon,
  createdAt,
}: BookmarkBlockProps) {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {favicon && (
          <Image
            width={24}
            height={24}
            src={favicon}
            alt={title}
            className="w-6 h-6 rounded-sm border border-gray-200"
          />
        )}
        <h2 className="text-lg font-semibold flex-1 truncate">{title}</h2>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          Visit <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Summary */}
      <div className="prose prose-sm dark:prose-invert max-w-none mb-4 whitespace-pre-line leading-relaxed">
        {content || "No summary available."}
      </div>

      {/* Footer / Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1 truncate">
          <LinkIcon className="w-4 h-4" />
          <span className="truncate max-w-[250px]">{link}</span>
        </div>
      </div>
    </div>
  );
}
