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
import { Badge, Box, Grid, GridCol, Group, Text } from "@mantine/core";

dayjs.extend(customParseFormat);

type TData = Ttimecardline;
export default function MyTable({ data }: { data: TData[] }) {
  const totalPay = useMemo(() => {
    return data.reduce((acc, row) => {
      return acc + Number(row.dollarsTotalPay_c);
    }, 0);
  }, [data]);

  const columns: MRT_ColumnDef<TData>[] = [
    {
      id: "job",

      header: "Job",
      mantineTableBodyCellProps: {
        style: { verticalAlign: "top" },
      },
      Cell: ({ row }) => {
        console.log(row.original);
        const timeIn = dayjs(row.original.time_in, "HH:mm:ss").format("h:mm A");
        const timeOut = dayjs(row.original.time_out, "HH:mm:ss").format(
          "h:mm A"
        );
        const time =
          timeIn === "Invalid Date" ? "N/A" : `${timeIn} - ${timeOut}`;

        return (
          <Grid>
            <GridCol span={{ base: 12, md: 4 }}>
              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Time In
                </Text>
                <Text>{time}</Text>
              </Box>
            </GridCol>
            <GridCol span={{ base: 12, md: 8 }}>
              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Event
                </Text>
                <Group gap={"xs"}>
                  <Text span>{row.original["TCL_EVS_EVE__Event::Name"]}</Text>
                  <Badge variant="dot">
                    {row.original["TCL_CJT__ContractJobTitle::Name"]}
                  </Badge>
                  <Badge variant="light">
                    {row.original["TCL_RTC__RateCard::name"]}
                  </Badge>
                </Group>
              </Box>
            </GridCol>
          </Grid>
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
          <Grid>
            {row.original.hrsWorked_num_c && (
              <GridCol span={{ base: 12, sm: 6, md: 4 }}>
                <Text size="sm" fw={500} c="dimmed">
                  Worked Hours
                </Text>
                <Group gap={"xs"}>
                  <Text>{`${row.original.hrsWorked_num_c || 0}`}</Text>
                  <Badge variant="outline">
                    {row.original.multiplier_final_rate_c}x
                  </Badge>
                  {row.original.display_modifiers_c && (
                    <Badge variant="outline" color="orange">
                      {row.original.display_modifiers_c}
                    </Badge>
                  )}
                </Group>
              </GridCol>
            )}

            {row.original.hrsUnworked_num_c && (
              <GridCol span={{ base: 12, sm: 6, md: 4 }}>
                <Text size="sm" fw={500} c="dimmed">
                  Unworked Hours
                </Text>
                <Group gap={"xs"}>
                  <Text>{`${row.original.hrsUnworked_num_c}`}</Text>
                  <Badge variant="outline">
                    {row.original.multiplier_final_rate_c}x
                  </Badge>
                  {row.original.display_modifiers_c && (
                    <Badge variant="outline" color="orange">
                      {row.original.display_modifiers_c}
                    </Badge>
                  )}
                </Group>
              </GridCol>
            )}
            <GridCol span={{ base: 12, sm: 6, md: 4 }}>
              <Text size="sm" fw={500} c="dimmed">
                Rate
              </Text>
              <Text>${Number(row.original.rateFinal_c).toFixed(2)}</Text>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6, md: 4 }}>
              <Text size="sm" fw={500} c="dimmed">
                Pay
              </Text>
              <Text>${Number(row.original.dollarsTotalPay_c).toFixed(2)}</Text>
            </GridCol>
          </Grid>
        );
      },
      Footer: () => (
        <Grid>
          <GridCol span={{ base: 12, sm: 6, md: 4 }} visibleFrom="md"></GridCol>
          <GridCol span={{ base: 12, sm: 6, md: 4 }} visibleFrom="md"></GridCol>
          <GridCol span={{ base: 12, sm: 6, md: 4 }}>
            <Text size="sm" fw={500} c="dimmed">
              Total Pay
            </Text>
            <Text>${totalPay.toFixed(2)}</Text>
          </GridCol>
        </Grid>
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
