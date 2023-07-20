// Page Title
// Navbar - Mobile의 경우 하단 탭 형태, from sm -> 왼쪽에 배치

import React from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-96 flex flex-col items-center mt-10  relative">
        <h3 className="font-bold mb-10">{title}</h3>
        {children}
      </div>
    </div>
  );
}
