"use client";

import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "@/types/menu";
import { usePathname } from "next/navigation";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const baseClasses = `text-17 flex items-center gap-2 font-medium hover:text-primary capitalize transition-colors ${
    path === item.href ? "text-primary" : "text-muted"
  }`;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.external ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {item.icon && <span className="text-xl">{item.icon}</span>}
          <span>{item.label}</span>
        </a>
      ) : (
        <Link href={item.href} className={baseClasses}>
          {item.icon && <span className="text-xl">{item.icon}</span>}
          <span>{item.label}</span>

          {item.submenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m7 10l5 5l5-5"
              />
            </svg>
          )}
        </Link>
      )}

      {submenuOpen && item.submenu && (
        <div
          className={`absolute py-2 left-0 mt-0.5 w-60 bg-white dark:bg-darklight dark:text-white shadow-lg rounded-lg z-10`}
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              className={`block px-4 py-2 transition-colors ${
                path === subItem.href
                  ? "bg-primary text-white"
                  : "text-black dark:text-white hover:bg-primary"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
