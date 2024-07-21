"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Navigation() {
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 text-gray-400">
      <button onClick={() => router.back()} aria-label="Go back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          data-icon="SvgChevronLeft"
          aria-hidden="true"
        >
          <path d="M14.9 6L12 9l-2.9 3 2.9 3 2.9 3"></path>
        </svg>
      </button>
      <button onClick={() => router.forward()} aria-label="Go forward">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          data-icon="SvgChevronRight"
          aria-hidden="true"
        >
          <path d="M9.1 18l2.9-3 2.9-3L12 9 9.1 6"></path>
        </svg>
      </button>
    </div>
  );
}
