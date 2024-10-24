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
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function ApprovalButtons({ tcdId }: { tcdId: string }) {
  const handleApprove = async () => {
    notifications.show({
      id: "approve-approval",
      title: "Submitting",
      message: "Please wait...",
      loading: true,
      color: "blue",
    });
    const result = await approveTimecard(tcdId);
    if (!result.success) {
      notifications.update({
        id: "approve-approval",
        title: "Error",
        message: result.error || "An unknown error occurred",
        color: "red",
        loading: false,
      });
    } else {
      notifications.update({
        id: "approve-approval",
        title: "Success",
        message: "Timecard approved",
        color: "green",
        loading: false,
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
    console.log(data);
    if (!data.comment) {
      notifications.show({
        title: "Error",
        message: "Please provide a comment",
        color: "red",
      });
      return;
    }
    notifications.show({
      id: "reject-approval",
      title: "Submitting",
      message: "Please wait...",
      loading: true,
      color: "blue",
    });
    const result = await declineTimecard(data.tcdId, data.comment);
    console.log(result);
    if (!result.success) {
      notifications.update({
        id: "reject-approval",
        title: "Error",
        message: result.error || "An unknown error occurred",
        color: "red",
        loading: false,
      });
    } else {
      notifications.update({
        id: "reject-approval",
        title: "Success",
        message: "Timecard rejected",
        color: "green",
        loading: false,
       });
    }
    closeModal(modalId);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };
  return (
    <Form {...form} onSubmit={onSubmit} onError={onError}>
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

