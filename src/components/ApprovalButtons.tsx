"use client";

import { openModal } from "@mantine/modals";
import { Button, Group } from "@mantine/core";
import { approveTimecard } from "@/app/actions/approveTimecard";
import { notifications } from "@mantine/notifications";
export function ApprovalButtons({ tcdId }: { tcdId: string }) {
  const handleApprove = async () => {
    const result = await approveTimecard(tcdId);
    console.log(result);
    if (!result.success) {
      notifications.show({
        title: "Error",
        message: result.error || "An unknown error occurred",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Timecard approved",
        color: "green",
      });
    }
  };
  return (
    <>
      <Group justify="end">
        <Button
          variant="default"
          color="red"
          onClick={() => openIssueModal(tcdId)}
        >
          Report Issue
        </Button>
        <Button onClick={handleApprove}>Approve</Button>
      </Group>
    </>
  );
}

function openIssueModal(tcdId: string) {
  openModal({
    title: "Report Issue",
    children: <IssueModal tcdId={tcdId} />,
  });
}

function IssueModal({ tcdId }: { tcdId: string }) {
  return <div>IssueModal</div>;
}
