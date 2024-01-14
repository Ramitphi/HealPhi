// Components
"use client";

import MeetingCard from "@/components/MeetingCards/MeetingCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

interface IMeeting {
  title: string;
  avatar: string;
  link: string;
}

export default function Home() {
  let meetings: IMeeting[] = [{ title: "12", avatar: "`", link: "`12" }];
  useEffect(() => {
    async () => {
      const res = await getMeeting();
      meetings.push(res);
    };
  }, []);

  const getMeeting = async () => {
    const res = await axios.get(
      "https://api.huddle01.com/api/v1/live-meetings",
      {
        headers: { "Content-Type": "application/json", "x-api-key": "kkkk" },
      }
    );
    return res.data;
  };

  return (
    <div className="w-screen relative top-36 left-24  bg-[#B1D27B] h-screen ">
      <div className="grid grid-cols-3 h-[9/10]  w-full">
        {meetings.map((meeting, i) => (
          <MeetingCard
            key={i}
            title={meeting.title}
            avatar={meeting.avatar}
            roomLink={meeting.link}
          />
        ))}
      </div>
    </div>
  );
}
