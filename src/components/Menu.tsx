import Link from "next/link";
import Image from "next/image";

import { role } from "@/ulti/sessionUtils";
import prisma from "@/lib/prisma";

const Menu = async () => {
  // Fetch menu items from database
  const menuItems = await prisma.menuItem.findMany();
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  return (
    <div className="mt-4 text-sm">
      {categories.map((category) => (
        <div className="flex flex-col gap-2" key={category}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {category}
          </span>
          {menuItems
            .filter(
              (item) =>
                item.category === category && item.visible.includes(role)
            )
            .map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
