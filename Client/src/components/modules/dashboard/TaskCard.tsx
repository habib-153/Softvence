"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Trash2 } from "lucide-react";

import DeleteConfirmModal from "./DeleteConfirmModal";

import { TTask } from "@/src/types";
import { useDeleteTask } from "@/src/hooks/task.hook";

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "arts-and-craft":
      return (
        <svg
          fill="none"
          height="43"
          viewBox="0 0 43 43"
          width="43"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="21.5" cy="21.5" fill="#60E5AE" r="21.5" />
          <path
            d="M31.9989 25.5V28.5C31.9989 29.88 30.8789 31 29.4989 31H22.3589C21.4689 31 21.0289 29.93 21.6489 29.3L27.5189 23.3C27.7089 23.11 27.9689 23 28.2289 23H29.4989C30.8789 23 31.9989 24.12 31.9989 25.5Z"
            fill="#1F1F1F"
          />
          <path
            d="M28.3722 20.29L25.6622 23L23.2022 25.45C22.5722 26.08 21.4922 25.64 21.4922 24.75C21.4922 21.54 21.4922 16.26 21.4922 16.26C21.4922 15.99 21.6022 15.74 21.7822 15.55L22.7022 14.63C23.6822 13.65 25.2622 13.65 26.2422 14.63L28.3622 16.75C29.3522 17.73 29.3522 19.31 28.3722 20.29Z"
            fill="#1F1F1F"
          />
          <path
            d="M17.5 11H14.5C13 11 12 12 12 13.5V27C12 27.27 12.03 27.54 12.08 27.8C12.11 27.93 12.14 28.06 12.18 28.19C12.23 28.34 12.28 28.49 12.34 28.63C12.35 28.64 12.35 28.65 12.35 28.65C12.36 28.65 12.36 28.65 12.35 28.66C12.49 28.94 12.65 29.21 12.84 29.46C12.95 29.59 13.06 29.71 13.17 29.83C13.28 29.95 13.4 30.05 13.53 30.15L13.54 30.16C13.79 30.35 14.06 30.51 14.34 30.65C14.35 30.64 14.35 30.64 14.35 30.65C14.5 30.72 14.65 30.77 14.81 30.82C14.94 30.86 15.07 30.89 15.2 30.92C15.46 30.97 15.73 31 16 31C16.41 31 16.83 30.94 17.22 30.81C17.33 30.77 17.44 30.73 17.55 30.68C17.9 30.54 18.24 30.34 18.54 30.08C18.63 30.01 18.73 29.92 18.82 29.83L18.86 29.79C19.56 29.07 20 28.08 20 27V13.5C20 12 19 11 17.5 11ZM16 28.5C15.17 28.5 14.5 27.83 14.5 27C14.5 26.17 15.17 25.5 16 25.5C16.83 25.5 17.5 26.17 17.5 27C17.5 27.83 16.83 28.5 16 28.5Z"
            fill="#1F1F1F"
          />
        </svg>
      );
    case "nature":
      return "🌿";
    case "family":
      return "👨‍👩‍👧‍👦";
    case "sport":
      return "⚽";
    case "meditation":
      return "🧘";
    case "friends":
      return "👥";
    default:
      return "📋";
  }
};

interface TaskCardProps {
  task: TTask;
  onTaskClick?: (task: TTask) => void;
  onDeleteClick?: (task: TTask) => void;
}

const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "ongoing":
      case "inprogress":
        return "primary";
      case "done":
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const handleCardClick = () => {
    if (onTaskClick) {
      onTaskClick(task);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteOpen();
  };

  const confirmDelete = () => {
    if (!task._id) return;

    deleteTask(task._id as string, {
      onSuccess: () => {
        onDeleteOpenChange();
      },
    });
  };

  const formatDate = (dateInput: string | Date) => {
    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateInput.toString();
    }
  };

  return (
    <>
      <Card
        isPressable
        className="h-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onPress={handleCardClick}
      >
        <CardHeader className="flex items-start gap-4 pb-2">
          <div className="flex-shrink-0">{getCategoryIcon(task.category)}</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center w-full">
              <h4 className="font-semibold text-lg">{task.title}</h4>
              <Button
                isIconOnly
                className="text-red-500 hover:bg-red-50"
                color="danger"
                size="sm"
                variant="light"
                onClick={handleDeleteClick}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="text-gray-600 text-start text-sm mb-4 line-clamp-2">
              {task.description}
            </div>
          </div>
        </CardHeader>

        <CardBody className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2V5"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M16 2V5"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.5 9.08997H20.5"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M19.211 15.77L15.671 19.31C15.531 19.45 15.401 19.71 15.371 19.9L15.181 21.25C15.111 21.74 15.451 22.0801 15.941 22.0101L17.291 21.82C17.481 21.79 17.751 21.66 17.881 21.52L21.421 17.9801C22.031 17.3701 22.321 16.6601 21.421 15.7601C20.531 14.8701 19.821 15.16 19.211 15.77Z"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M18.7031 16.28C19.0031 17.36 19.8431 18.2 20.9231 18.5"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5V12"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.9945 13.7H12.0035"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M8.29138 13.7H8.30036"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M8.29138 16.7H8.30036"
                  stroke="#1F1F1F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <span>{formatDate(task.deadline)}</span>
            </div>

            <Chip
              className="capitalize"
              color={getStatusColor(task.status as string)}
              size="sm"
              variant="flat"
            >
              {task.status === "ongoing" ? "InProgress" : task.status}
            </Chip>
          </div>
        </CardBody>
      </Card>
      <DeleteConfirmModal
        isLoading={isDeleting}
        isOpen={isDeleteOpen}
        taskTitle={task.title}
        onConfirm={confirmDelete}
        onOpenChange={onDeleteOpenChange}
      />
    </>
  );
};

export default TaskCard;
