"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/src/components/ui/badge";
import { Checkbox } from "@/src/components/ui/checkbox";

import { labels, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon, CounterClockwiseClockIcon } from "@radix-ui/react-icons";
import {
  NotifType,
  SOLSCAN_ACCOUNT_URL,
  SOLSCAN_TXN_URL,
  getAccountUrl,
  getTransactionUrl,
} from "@paybox/common";
import Link from "next/link";
import { get } from "http";
import { Clock4 } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clientJwtAtom, notifsAtom } from "@paybox/recoil";
import { toast } from "sonner";
import { updateNotif } from "@/src/lib/helper";

export const columns: ColumnDef<NotifType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notif Id" />
    ),

    cell: ({ row }) => (
      // make the cluster dynamic

      <div className="w-[80px]">
        Notif-{(row.getValue("id") as string).split("-")[1]}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Avatar" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.image
      );
      // Give the label as Network type and fill the sender address or his name
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.title
      );
      // Give the label as Network type and fill the sender address or his name
      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Body" />
    ),
    cell: ({ row }) => {

      return (
        <div className="font-medium">
          {row.original.body}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tag",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tag" />
    ),
    cell: ({ row }) => {

      const label = labels.find(
        (label) => label.value === row.original.tag
      );

      return (
        <div className="font-medium">
          {label?.label}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const blockDate = new Date(row.original.timestamp);
      const formattedDate = format(blockDate, "do MMM yy");
      return (
        <div className="flex items-center space-x-2">
          <CalendarIcon />
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => {
      const blockDate = new Date(row.original.timestamp);
      const formattedtime = format(blockDate, "h:mm a");
      return (
        <div className="flex items-center space-x-2">
          <CounterClockwiseClockIcon />
          <span>{formattedtime}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "viewed",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tick" />
  //   ),
  //   cell: ({ row }) => {
  //     const jwt = useRecoilValue(clientJwtAtom);
  //     const setNotifs = useSetRecoilState(notifsAtom);
  //     return (
  //       <div className="flex ml-2">
  //         {<Checkbox
  //           checked={row.getValue("viewed")}
  //           onCheckedChange={(value) => {
  //             toast.promise(updateNotif(jwt as string, row.original.id), {
  //               loading: "Updating...",
  //               success: () => {
  //                 setNotifs((oldNotifs) => {
  //                   return oldNotifs.map((notif) => {
  //                     if (notif.id === row.original.id) {
  //                       return { ...notif, viewed: true };
  //                     }
  //                     return notif;
  //                   });
  //                 });
  //                 return "Notification Marked as Viewed.."
  //               },
  //               error: "Error updating notification",
  //             })
  //           }}
  //           className="translate-y-[2px]"
  //         />}
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
