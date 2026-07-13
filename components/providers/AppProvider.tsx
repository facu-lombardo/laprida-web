"use client";

import QueryProvider from "./QueryProvider";

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({
  children,
}: Props) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}