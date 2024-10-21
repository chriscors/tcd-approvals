import {
  timecardLayout,
  timecardlineLayout,
} from "@/config/schemas/filemaker/client";
import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
  Grid,
  GridCol,
} from "@mantine/core";
import React from "react";

import TableContent from "./table";
import dayjs from "dayjs";
export default async function TablePage({
  params,
}: {
  params: { timecard_id: string };
}) {
  const { data: tclData } = await timecardlineLayout.find({
    query: [{ _timecard_id: params.timecard_id, isPay: "1" }],
    fetch: { next: { revalidate: 0 } },
  });
  const { data: tcdData } = await timecardLayout.findFirst({
    query: [{ __id: params.timecard_id }],
    fetch: { next: { revalidate: 0 } },
  });
  const date = dayjs(tcdData.fieldData.date).format("dddd, MMMM D, YYYY");

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap={"md"}>
        <Stack gap={"xs"}>
          <Title order={2}>
            {tcdData.fieldData["TCD_CON__Contact::Name_Full_lfm_c"]}
          </Title>
          <Title order={5} my={0} c={"gray"}>
            {date}
          </Title>
        </Stack>
        {/* Details Grid */}
        <Grid>
          <GridCol span={6}>
            <Group gap="xl">
              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Contract
                </Text>
                <Text>{tcdData.fieldData.contractName}</Text>
              </Box>

              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Rating
                </Text>
                <Text>{tcdData.fieldData["TCD_RAT__Rating::name"]}</Text>
              </Box>
            </Group>
          </GridCol>

          <GridCol span={6}>
            <Group gap="xl">
              <Box>
                <Text size="sm" fw={500} c="dimmed">
                  Department
                </Text>
                <Text>{tcdData.fieldData["TCD_DEP__Department::name"]}</Text>
              </Box>
            </Group>
          </GridCol>
        </Grid>
        <TableContent data={tclData.map((d) => d.fieldData)} />
      </Stack>
    </Card>
  );
}
