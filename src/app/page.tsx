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

type Props = {
  title: string;
};

interface IMeeting {
  title: string;
  avatar: string;
  link: string;
}

export default function Home() {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const [meetingTitle, setMeetingTitle] = useState<string>("");
  const createRandomRoom = async (title: string) => {
    const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
      cache: "no-store",
    });

    const data: RoomDetails = await res.json();

    const { roomId } = data.data;
    return { roomId };
  };

  useEffect(() => {
    const res = async () => {
      const res = await getMeeting();
      console.log({ res });

      setMeetings([...meetings, ...res.liveMeetings]);
    };
    res();
  }, []);

  const getMeeting = async () => {
    const res = await axios.get(
      "https://api.huddle01.com/api/v1/live-meetings",
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    console.log({ res });

    return res.data;
  };

  return (
    <div className="w-screen relative items-center  top-36 left-24  flex flex-col bg-[#B1D27B] h-screen ">
      <div className="flex  my-3 text-gray-700">
        Enter the space title
        <input
          className="bg-green-600 mx-4 text-white w-56"
          onChange={(e) => {
            setMeetingTitle(e.target.value);
          }}
        />
      </div>
      <button
        className="my-6 border-2 px-5 py-2 border-green-700 text-gray-700 rounded-md"
        onClick={async () => {
          const res = await createRandomRoom(meetingTitle);
          const meeting = {
            title: meetingTitle,
            avatar: "sdd",
            link: res.roomId,
          };

          setMeetings([...meetings, meeting]);
        }}
      >
        Create Space
      </button>
      <div className="grid grid-cols-3 h-[9/10] overflow-y-auto  w-full">
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
