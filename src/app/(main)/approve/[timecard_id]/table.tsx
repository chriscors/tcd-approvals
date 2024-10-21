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
import { Badge, Box, Text } from "@mantine/core";

dayjs.extend(customParseFormat);

type TData = Ttimecardline;

const columns: MRT_ColumnDef<TData>[] = [
  {
    header: "Hours",
    id: "time",
    Cell: ({ row }) => {
      const timeIn = dayjs(row.original.time_in, "HH:mm:ss").format("h:mm A");
      const timeOut = dayjs(row.original.time_out, "HH:mm:ss").format("h:mm A");
      return timeIn === "Invalid Date" ? (
        ""
      ) : (
        <Box>
          <Box>
            <Text size="sm" fw={500} c="dimmed">
              Time In
            </Text>
            <Text>{`${timeIn} - ${timeOut}`}</Text>
          </Box>
          {row.original.hrsWorked_num_c && (
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Worked Hours
              </Text>
              <Text>{`${row.original.hrsWorked_num_c || 0}`}</Text>
            </Box>
          )}

          {row.original.hrsUnworked_num_c && (
            <Box display={"inline"}>
              <Text size="sm" fw={500} c="dimmed">
                Unworked Hours
              </Text>
              <Text>{`${row.original.hrsUnworked_num_c}`}</Text>
            </Box>
          )}
        </Box>
      );
    },
  },
  {
    id: "job",
    header: "Job",
    Cell: ({ row }) => {
      return (
        <Box>
          <Box>
            <Text size="sm" fw={500} c="dimmed">
              Call
            </Text>
            <Text>
              {row.original["TCL_EVS__EventSchedule::vl_display_evs_c"]}
            </Text>
          </Box>
          <Box>
            <Text size="sm" fw={500} c="dimmed">
              Position
            </Text>
            <Text>
              {row.original["TCL_CJT__ContractJobTitle::Name"]}

              <Badge variant="light" ml={"sm"}>
                {row.original["TCL_RTC__RateCard::name"]}
              </Badge>
            </Text>
          </Box>
        </Box>
      );
    },
  },
  {
    id: "pay",
    header: "Pay",
    Cell: ({ row }) => {
      return (
        <Box>
          <Box>
            <Text size="sm" fw={500} c="dimmed">
              Rate
            </Text>
            <Text>{row.original.rateFinal_c}</Text>
          </Box>
          <Box>
            <Text size="sm" fw={500} c="dimmed">
              Pay
            </Text>
            <Text>{row.original.dollarsTotalPay_c}</Text>
          </Box>
        </Box>
      );
    },
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
    mantinePaperProps: {
      shadow: "none",
      withBorder: true,
    },
  });
  return <MantineReactTable table={table} />;
}
