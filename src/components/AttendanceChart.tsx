"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
const data = [
  {
    name: "Mon",
    persent: 30,
    absent: 20,
  },
  {
    name: "Tue",
    persent: 40,
    absent: 25,
  },
  {
    name: "Wed",
    persent: 35,
    absent: 22,
  },
  {
    name: "Thu",
    persent: 50,
    absent: 30,
  },
  {
    name: "Fri",
    persent: 45,
    absent: 28,
  },
  {
    name: "Sat",
    persent: 60,
    absent: 40,
  },
  {
    name: "Sun",
    persent: 50,
    absent: 35,
  },
];

function AttendanceChart() {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "Lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20", paddingBottom: "20px" }}
          />
          <Bar
            dataKey="persent"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 10, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 10, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
