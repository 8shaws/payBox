import {
  Archive,
  ArchiveX,
  Inbox,
  Send,
  Trash2,
  File,
  Wallet,
  LayoutDashboard,
  Lock,
  VenetianMask,
  Bitcoin,
  PencilLine,
  FilePlus,
  FilePlus2Icon,
  GanttChart,
  Settings,
  UserRound,
  UserRoundCog,
  BookA,
} from "lucide-react";
import { LinksProps } from "../../../components/sidebar";

export const commonNavLinks = [
  {
    id: "all",
    title: "Manage Accounts",
    label: "",
    icon: GanttChart,
    variant: "ghost",
    link: "/account/all",
  },
  {
    id: "book",
    title: "Address Book",
    label: "128",
    icon: BookA,
    variant: "ghost",
    link: "/account/import/book",
  },
  {
    id: "create",
    title: "Create Account",
    label: "128",
    icon: FilePlus2Icon,
    variant: "ghost",
    link: "/account/import/create",
  },
  {
    id: "secret",
    title: "Import Secret",
    label: "9",
    icon: FilePlus,
    variant: "ghost",
    link: "/account/import/secret",
  },
  {
    id: "private",
    title: "Import Private-Key",
    label: "",
    icon: Lock,
    variant: "ghost",
    link: "/account/import/private",
  },
];

export const getNavLinks = (id: string) => {
  return [
    {
      id: "dashboard",
      title: "Dashboard",
      label: "128",
      icon: LayoutDashboard,
      variant: "ghost",
      link: `/account/${id}/#`,
    },
    {
      id: "statements",
      title: "Statements",
      label: "9",
      icon: Bitcoin,
      variant: "ghost",
      link: `/account/${id}/statements`,
    },
    {
      id: "privatekey",
      title: "Private-Key",
      label: "",
      icon: Lock,
      variant: "ghost",
      link: `/account/${id}/privatekey`,
    },
    {
      id: "secretPhrase",
      title: "Secret",
      label: "23",
      icon: VenetianMask,
      variant: "ghost",
      link: `/account/${id}/secret`,
    },
    {
      id: "update",
      title: "Update",
      label: "",
      icon: PencilLine,
      variant: "ghost",
      link: `/account/${id}/update`,
    },
    {
      id: "remove",
      title: "Remove",
      label: "",
      icon: Trash2,
      variant: "ghost",
      link: `/account/${id}/remove`,
    },
  ];
};

export const clientNavLinks = (name: string | undefined): LinksProps[] => {
  return [
    {
      id: "profile",
      link: `/profile`,
      icon: UserRoundCog,
      title: `${name || "Profile"}`,
      variant: "ghost",
      label: "",
    },
    {
      id: "setting",
      link: `/profile`,
      icon: Settings,
      title: "Settings",
      variant: "ghost",
      label: "",
    },
  ];
};
