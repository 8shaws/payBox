import { FriendshipType } from "@paybox/common";
import { BellIcon, CogIcon, HomeIcon, MailIcon, UsersIcon } from "lucide-react";

export const sidenavLinks = [
  {
    id: "Dashboard",
    variant: "ghost",
    title: "Dashboard",
    link: "/friendship/",
    icon: HomeIcon,
  },
  {
    id: "friends",
    variant: "ghost",
    title: "Friends",
    link: "/friendship/friends",
    icon: UsersIcon,
  },
  {
    id: "messages",
    variant: "ghost",
    title: "Messages",
    link: "/friendship/chat",
    icon: MailIcon,
  },
  {
    id: "notifications",
    variant: "ghost",
    title: "Notifications",
    link: "/friendship/notifications",
    icon: BellIcon,
  },
  {
    id: "settings",
    variant: "ghost",
    title: "Settings",
    link: "/friendship/settings",
    icon: CogIcon,
  },
];

export const getFriendsTab = (friendships: FriendshipType[]) => {
  return friendships.map((friendship) => {
    return {
      id: friendship.id,
      variant: "ghost",
      title: friendship.friend?.firstname + " " + friendship.friend?.lastname,
      link: `/friendship/chat/${friendship.id}`,
      //todo: pass the account image or the icon
      icon: UsersIcon,
    };
  });
};
