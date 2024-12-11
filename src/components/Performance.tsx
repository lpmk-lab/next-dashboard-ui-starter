"use client";

import Image from "next/image";
import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Group A", value: 70, fill: "#C3EBFA" },
  { name: "Group B", value: 30, fill: "#FAE27C" },
];

function Performance() {
  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%" // Center x
            cy="50%" // Center y
            innerRadius={70}
            startAngle={180} // Start at 0 degrees
            endAngle={0} // End at 90 degrees
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h1>9.2</h1>
        <p>of 10 max LTS</p>
      </div>
    </div>
  );
}

export default Performance;
