
import { LinksProps } from "@/src/components/sidebar";
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
    BellRing,
    User
} from "lucide-react";

export const topNavLinks = [
    {
        id: "",
        title: "Notifcations",
        label: "",
        icon: BellRing,
        variant: "ghost",
        link: "/notif",
    },
    {
        id: "profile",
        title: "Profile",
        label: "9",
        icon: UserRoundCog,
        variant: "ghost",
        link: "/profile",
    },
    {
        id: "setting",
        title: "Settings",
        label: "128",
        icon: Settings,
        variant: "ghost",
        link: "/notif/settings",
    },
]

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
    ]
}