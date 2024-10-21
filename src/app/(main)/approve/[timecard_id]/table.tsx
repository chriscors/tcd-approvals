"use client";

import { Ttimecardline } from "@/config/schemas/filemaker/timecardline";
import {
  MantineReactTable,
  MRT_ColumnDef,
  useMantineReactTable,
} from "mantine-react-table";
import React, { useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Badge, Box, Group, Text } from "@mantine/core";

dayjs.extend(customParseFormat);

type TData = Ttimecardline;
export default function MyTable({ data }: { data: TData[] }) {
  const totalPay = useMemo(() => {
    return data.reduce((acc, row) => {
      return acc + Number(row.dollarsTotalPay_c);
    }, 0);
  }, [data]);

  const columns: MRT_ColumnDef<TData>[] = [
    // {
    //   header: "Hours",
    //   id: "time",
    //   Cell: ({ row }) => {
    //     const timeIn = dayjs(row.original.time_in, "HH:mm:ss").format("h:mm A");
    //     const timeOut = dayjs(row.original.time_out, "HH:mm:ss").format("h:mm A");
    //     return timeIn === "Invalid Date" ? (
    //       ""
    //     ) : (
    //       <Box>
    //         <Box>
    //           <Text size="sm" fw={500} c="dimmed">
    //             Time In
    //           </Text>
    //           <Text>{`${timeIn} - ${timeOut}`}</Text>
    //         </Box>

    //       </Box>
    //     );
    //   },
    // },
    {
      id: "job",

      header: "Job",
      Cell: ({ row }) => {
        const timeIn = dayjs(row.original.time_in, "HH:mm:ss").format("h:mm A");
        const timeOut = dayjs(row.original.time_out, "HH:mm:ss").format(
          "h:mm A"
        );
        const Time =
          timeIn === "Invalid Date" ? (
            ""
          ) : (
            <Box>
              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Time In
                </Text>
                <Text>{`${timeIn} - ${timeOut}`}</Text>
              </Box>
            </Box>
          );
        return (
          <Box>
            {Time}
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Event
              </Text>
              <Group gap={"xs"}>
                <Text>{row.original["TCL_EVS_EVE__Event::Name"]}</Text>
                <Badge variant="dot">
                  {row.original["TCL_CJT__ContractJobTitle::Name"]}
                </Badge>
                <Badge variant="light">
                  {row.original["TCL_RTC__RateCard::name"]}
                </Badge>
              </Group>
            </Box>
          </Box>
        );
      },
    },
    {
      id: "pay",
      header: "Pay",
      mantineTableBodyCellProps: {
        style: { verticalAlign: "top" },
      },
      Cell: ({ row }) => {
        return (
          <Box>
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
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Rate
              </Text>
              <Text>${Number(row.original.rateFinal_c).toFixed(2)}</Text>
            </Box>
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Pay
              </Text>
              <Text>${Number(row.original.dollarsTotalPay_c).toFixed(2)}</Text>
            </Box>
          </Box>
        );
      },
      Footer: () => (
        <Box>
          <Text size="sm" fw={500} c="dimmed">
            Total Pay
          </Text>
          <Text>${totalPay.toFixed(2)}</Text>
        </Box>
      ),
    },
  ];

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
    enableStickyFooter: true,
  });
  return <MantineReactTable table={table} />;
}
