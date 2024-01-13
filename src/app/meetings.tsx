import MeetingCard from "@/components/MeetingCards/MeetingCard";
import React from "react";

const meetings = () => {
  return (
    <div className="w-full mx-4 bg-red grid top-10 h-full grid-cols-2 ">
      <MeetingCard />
      <MeetingCard />
      <MeetingCard />
      <MeetingCard />
    </div>
  );
};

export default meetings;
