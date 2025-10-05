import { HeaderItem } from "@/types/menu";
import { FaTelegram, FaDiscord, FaTwitter, FaMailBulk } from "react-icons/fa";



export const headerData: HeaderItem[] = [
  {
    label: "Telegram",
    href: "https://t.me/yourchannel",
    icon: <FaTelegram />,
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/yourserver",
    icon: <FaDiscord />,
    external: true,
  },
  {
    label: "Twitter(X)",
    href: "https://twitter.com/yourprofile",
    icon: <FaTwitter />,
    external: true,
  },
  {
    label: "Support",
    href: "/#upgrade", // внутренняя ссылка, без external
    icon: <FaMailBulk />,
  },
];