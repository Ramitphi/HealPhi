// Components
"use client";

import MeetingCard from "@/components/MeetingCards/MeetingCard";
import { useRouter } from "next/navigation";

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRandomRoom = async () => {
  const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
    method: "POST",
    body: JSON.stringify({
      title: "Test Room",
    }),
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
    cache: "no-store",
  });
  const data: RoomDetails = await res.json();
  const { roomId } = data.data;
  return roomId;
};

export default async function Home() {
  const { push } = useRouter();

  return (
    <div className="w-full  bg-[#B1D27B] h-full  flex  justify-center items-center">
      <button
        className="h-full my-56"
        onClick={() => {
          // push("/meetings");

          alert("meetings");
        }}
      >
        click me to route
      </button>
    </div>
  );
}
