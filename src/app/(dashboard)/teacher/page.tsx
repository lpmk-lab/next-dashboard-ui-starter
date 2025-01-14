import Announcements from "@/components/Announcements";

import BigCalendarContainer from "@/components/BigCalendarContainer";
import { CurrentUserId } from "@/ulti/sessionUtils";
import React from "react";

function TeacherPage() {
  return (
    <div className=" flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={CurrentUserId} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
}

export default TeacherPage;
