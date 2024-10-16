import {
  timecardLayout,
  timecardlineLayout,
} from "@/config/schemas/filemaker/client";
import { Stack, Text, Title } from "@mantine/core";
import React from "react";

import TableContent from "./table";
export default async function TablePage({
  params,
}: {
  params: { timecard_id: string };
}) {
  const { data: tclData } = await timecardlineLayout.find({
    query: [{ _timecard_id: params.timecard_id, isPay: "1" }],
  });
  const { data: tcdData } = await timecardLayout.findFirst({
    query: [{ __id: params.timecard_id }],
  });

  return (
    <Stack>
      <Title order={1}>
        {tcdData.fieldData["TCD_CON__Contact::Name_Full_lfm_c"]}
      </Title>
      <Text>Contract: {tcdData.fieldData.contractName}</Text>
      <Text>Rating: {tcdData.fieldData["TCD_RAT__Rating::name"]}</Text>
      <Text>Department: {tcdData.fieldData["TCD_DEP__Department::name"]}</Text>
      <Text>
        Contract Job Title:{" "}
        {tcdData.fieldData["TCD_CJT__ContractJobTitle::Name"]}
      </Text>
      <TableContent data={tclData.map((d) => d.fieldData)} />
    </Stack>
  );
}
