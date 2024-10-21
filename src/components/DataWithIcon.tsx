import { Text } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { Icon } from "@tabler/icons-react";
export function DataWithIcon(
  props: React.PropsWithChildren<{
    value?: string;
    iconColor?: string;
    icon: (props: Icon) => JSX.Element;
    hasChanged?: boolean;
    weight?: number;
  }>,
) {
  return (
    <Text
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 8,
        fontWeight: props.weight || 400,
      }}
    >
      (
      <IconExclamationCircle
        color="orange"
        size="1rem"
        style={{ minWidth: "1rem", marginTop: 4.5 }}
      />
      ){props.value ? <Text>{props.value}</Text> : props.children}
    </Text>
  );
}
