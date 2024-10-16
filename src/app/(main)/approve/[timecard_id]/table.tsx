"use client";

import { Ttimecardline } from "@/config/schemas/filemaker/timecardline";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type TData = Ttimecardline;

const columns: MRT_ColumnDef<TData>[] = [
  {
    header: "Time In",
    id: "time",
    Cell: ({ row }) => {
      const timeIn = dayjs(row.original.time_in, "HH:mm:ss").format("h:mm A");
      const timeOut = dayjs(row.original.time_out, "HH:mm:ss").format("h:mm A");
      return timeIn === "Invalid Date" ? (
        ""
      ) : (
        <span>{`Time: ${timeIn} - ${timeOut}`}</span>
      );
    },
  },
  {
    header: "Hours",
    id: "hrs",
    Cell: ({ row }) => {
      return (
        <div>
          <div>{`Worked Hours: ${row.original.hrsWorked_num_c || 0}`}</div>
          <div>{`Unworked Hours: ${row.original.hrsUnworked_num_c || 0}`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "TCL_EVS__EventSchedule::vl_display_evs_c",
    header: "Location",
  },
  {
    accessorKey: "TCL_CJT__ContractJobTitle::Name",
    header: "Job Title",
  },
  {
    accessorKey: "display_modifiers_c",
    header: "Modifiers",
  },
];

export default function MyTable({ data }: { data: TData[] }) {
  const table = useMantineReactTable({
    data,
    columns,
    enableColumnActions: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableSorting: false,
  });
  return <MantineReactTable table={table} />;
}
