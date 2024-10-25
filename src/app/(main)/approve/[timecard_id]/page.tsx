import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
  Grid,
  GridCol,
  Badge,
} from "@mantine/core";

import TableContent from "./table";
import dayjs from "dayjs";
import { ApprovalButtons } from "@/components/ApprovalButtons";
import { getTimecard } from "@/app/actions/timeCard";
import { notFound } from "next/navigation";

export default async function ApprovalPage({
  params,
}: {
  params: { timecard_id: string };
}) {
  const { tclData, tcdData } = await getTimecard(params.timecard_id);
  if (!tcdData || !tclData) {
    return notFound();
  }

  const date = dayjs(tcdData.fieldData.date).format("dddd, MMMM D, YYYY");
  console.log(tcdData.fieldData);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap={"md"}>
        <Stack gap={"xs"}>
          <Group justify="space-between" gap={"xs"}>
            <Title order={2}>
              {tcdData.fieldData["TCD_CON__Contact::Name_Full_nl_c"]}
            </Title>
            <ApprovalBadge
              status={tcdData.fieldData.employeeApprovalStatus}
              size="lg"
            />
          </Group>
          <Title order={5} my={0} c={"gray"}>
            {date}
          </Title>
        </Stack>
        {/* Details Grid */}
        <Grid grow>
          <GridCol span={{ base: 6, md: 3 }}>
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Rating
              </Text>
              <Text>{tcdData.fieldData["TCD_RAT__Rating::name"]}</Text>
            </Box>
          </GridCol>

          <GridCol span={{ base: 6, md: 3 }}>
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Department
              </Text>
              <Text>{tcdData.fieldData["TCD_DEP__Department::name"]}</Text>
            </Box>
          </GridCol>

          <GridCol span={{ base: 6, md: 3 }}>
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Venue
              </Text>
              <Text>{tcdData.fieldData["TCD_CLL_VEN__Venue::Name"]}</Text>
            </Box>
          </GridCol>

          <GridCol span={{ base: 6, md: 3 }}>
            <Box>
              <Text size="sm" fw={500} c="dimmed">
                Contract
              </Text>
              <Text>{tcdData.fieldData.contractName}</Text>
            </Box>
          </GridCol>
        </Grid>
        <TableContent data={tclData.map((d) => d.fieldData)} />
        {tcdData.fieldData.employeeApprovalStatus === "Sent" ? (
          <ApprovalButtons tcdId={params.timecard_id} />
        ) : (
          <Group justify="flex-end">
            <ApprovalBadge
              status={tcdData.fieldData.employeeApprovalStatus}
              size="lg"
            />
          </Group>
        )}
      </Stack>
    </Card>
  );
}

function ApprovalBadge({
  status,
  size = "lg",
}: {
  status: string;
  size?: "lg" | "md" | "sm";
}) {
  return (
    <Badge
      variant="light"
      size={size}
      color={status === "Approved" ? "green" : "red"}
    >
      {status}
    </Badge>
  );
}
