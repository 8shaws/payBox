import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  Facebook,
  Twitter,
  Mail,
  MemoryStick,
  Castle,
  Linkedin,
  CheckCheck,
  Pocket,
  Send,
  PhoneCall,
  PhoneCallIcon,
  LucideIcon,
} from "lucide-react";

export interface ShareIcons {
  brand: string;
  icon: LucideIcon;
  shareButton: React.ReactNode;
}

export const shareIcons = [
  {
    brand: "facebook",
    icon: Facebook,
    shareButton: FacebookShareButton,
  },
  {
    brand: "twitter",
    icon: Twitter,
    shareButton: TwitterShareButton,
  },
  {
    brand: "email",
    icon: Mail,
    shareButton: EmailShareButton,
  },
  {
    brand: "linkedin",
    icon: Linkedin,
    shareButton: LinkedinShareButton,
  },

  {
    brand: "ok",
    icon: CheckCheck,
    shareButton: OKShareButton,
  },
  {
    brand: "pocket",
    icon: Pocket,
    shareButton: PocketShareButton,
  },
  {
    brand: "telegram",
    icon: Send,
    shareButton: TelegramShareButton,
  },

  {
    brand: "viber",
    icon: PhoneCall,
    shareButton: ViberShareButton,
  },
  {
    brand: "whatsapp",
    icon: PhoneCallIcon,
    shareButton: WhatsappShareButton,
  },
];
