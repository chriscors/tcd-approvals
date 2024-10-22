"use client";

import { closeModal, openModal } from "@mantine/modals";
import { Button, Group, Stack } from "@mantine/core";
import {
  approveTimecard,
  declineTimecard,
} from "@/app/actions/approveTimecard";
import { notifications } from "@mantine/notifications";
import { fmsScripts } from "@/utils/constants";
import { z } from "zod";
import { createFormProvider } from "rhf-mantine";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ApprovalButtons({ tcdId }: { tcdId: string }) {
  const handleApprove = async () => {
    const result = await approveTimecard(tcdId);
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

const modalId = "issueModal";
function openIssueModal(tcdId: string) {
  openModal({
    modalId,
    title: "Report Issue",
    children: <IssueModal tcdId={tcdId} />,
  });
}

const schema = fmsScripts.submitApproval.input;
type FormValues = z.infer<typeof schema>;
const Form = createFormProvider<FormValues>();

function IssueModal({ tcdId }: { tcdId: string }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      action: "reject",
      tcdId,
      comment: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.comment) {
      notifications.show({
        title: "Error",
        message: "Please provide a comment",
        color: "red",
      });
      return;
    }
    const result = await declineTimecard(data.tcdId, data.comment);
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
    closeModal(modalId);
  };
  return (
    <Form {...form} onSubmit={onSubmit}>
      <Stack>
        <Form.Textarea
          autoFocus
          name="comment"
          label="Please provide a comment"
        />
        <Group justify="right">
          <Button variant="subtle" onClick={() => closeModal(modalId)}>
            Cancel
          </Button>
          <Button type="submit" color="red">
            Submit Issue
          </Button>
        </Group>
      </Stack>
    </Form>
  );
}

