/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

export default function CreateAvatar({
  seed,
  scale,
}: {
  seed: string;
  scale?: string;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/profile")}
      className={`relative h-[60px] w-[60px] min-w-[60px] rounded-full ${scale}`}
    >
      <img
        src={`https://api.dicebear.com/6.x/initials/svg?radius=50&seed=${seed}&scale=100&fontWeight=500`}
        alt="User"
        className="rounded-full"
        height={50}
        width={50}
      />
    </div>
  );
}
