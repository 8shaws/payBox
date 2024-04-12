"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/app/txn/components/data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { markViewed } from "@/lib/helper";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { clientJwtAtom, notifsAtom } from "@paybox/recoil";
import { responseStatus } from "@paybox/common";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  tab: "Mails" | "Notif"
}

export function DataTableToolbar<TData>({
  table,
  tab
}: DataTableToolbarProps<TData>) {
  const jwt = useRecoilValue(clientJwtAtom);
  const setNotifs = useSetRecoilState(notifsAtom);
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter ${tab}...`}
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {table.getColumn("timestamp") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {
          table.getSelectedRowModel().rows.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetRowSelection()
                //@ts-ignore
                const ids = table.getSelectedRowModel().rows.map(row => row.original.id);
                toast.promise(markViewed(jwt as string, ids), {
                  loading: "Marking as viewed...",
                  success: ({ status }) => {
                    setNotifs((oldNotifs) => {
                      return oldNotifs.filter((notif) => {
                        return !ids.includes(notif.id);
                      });
                    });
                    //todo: remove the row from the table
                    return "Marked as viewed";
                  },
                  error: "Failed to mark as viewed"
                });
              }}
              className="h-8 px-2 lg:px-3 flex gap-x-2"
            >
              <CheckCheck className="ml-2 h-4 w-4" />
              Mark as View
            </Button>
          )
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
