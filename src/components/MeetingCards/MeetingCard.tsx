import React from "react";

const MeetingCard = () => {
  return (
    <div className="flex w-72 h-56 flex-col justify-between border-white border p-4 rounded-md">
      <div className="flex justify-between ">
        <p className="text-lg"> title</p>
        <div>avatar</div>
      </div>

      <div className="w-full border flex mt-10 justify-center py-2 rounded-md  bg-slate-400">
        <button onClick={() => alert("Join Room")}>Join Room</button>
      </div>
    </div>
  );
};

export default MeetingCard;
