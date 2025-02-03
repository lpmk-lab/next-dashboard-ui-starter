import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { role } from "@/ulti/sessionUtils";
import { MenuItem, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type MenuList = MenuItem;
const columns = [
  {
    header: "Info",
    accessor: "Info",
  },
  {
    header: "Category",
    accessor: "Category",
    className: "hidden md:table-cell",
  },
  {
    header: "Herf",
    accessor: "Herf",
    className: "hidden md:table-cell",
  },
  {
    header: "Visible",
    accessor: "phone",
    className: "hidden md:table-cell",
  },

  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];
const renderRow = (item: MenuList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.icon || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="felx flex-col">
        <h3 className="font-semibold">{item.label}</h3>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.category}</td>
    <td className="hidden md:table-cell">{item.href}</td>
    <td className="hidden md:table-cell">
      {item.visible.map((visible) => visible).join(",")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="menu" type="update" data={item} />

            <FormModal table="menu" type="delete" id={item.id.toString()} />
          </>
        )}
      </div>
    </td>
  </tr>
);
const MenuListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  // URL PARMS CONDITION
  const query: Prisma.MenuItemWhereInput = {};

  const [data, count] = await prisma.$transaction([
    prisma.menuItem.findMany({
      where: query,

      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.menuItem.count({
      where: query,
    }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className=" flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Menus</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="menu" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}

      <Pagination page={p} count={count} />
    </div>
  );
};

export default MenuListPage;
