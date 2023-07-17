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
      className={`relative h-[45px] w-[45px] min-w-[45px] rounded-full bg-white ${scale}`}
    >
      <img
        src={`https://api.dicebear.com/6.x/initials/svg?radius=30&seed=${seed}&scale=100&fontWeight=500`}
        alt="User"
        className="rounded-full"
        height={45}
        width={45}
      />
    </div>
  );
}
