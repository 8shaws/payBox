import { NotifTopics } from "@paybox/common";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: NotifTopics.FriendRequest,
    label: "Request",
  },
  {
    value: NotifTopics.FriendRequestAccepted,
    label: "Accepted",
  },
  {
    value: NotifTopics.FriendRequestRejected,
    label: "Rejected",
  },
  {
    value: NotifTopics.TxnAccept,
    label: "Txn Accept",
  },
  {
    value: NotifTopics.TxnReject,
    label: "Txn Reject",
  },
  {
    value: NotifTopics.Paid,
    label: "Paid",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
