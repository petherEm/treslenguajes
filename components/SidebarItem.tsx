"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          width={24}
          height={24}
          className="mr-2"
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
