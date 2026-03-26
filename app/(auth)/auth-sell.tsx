import React from "react";

export default function AuthSell(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className="flex">
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
