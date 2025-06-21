"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Progress,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Calendar, MoreVertical, Edit, Trash2, Play } from "lucide-react";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    deadline: string;
    progress: number;
  };
}

const TaskCard = ({ task }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "ongoing":
        return "primary";
      case "done":
        return "success";
      default:
        return "default";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "arts-and-craft":
        return "🎨";
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

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getCategoryIcon(task.category)}</span>
          <div>
            <h4 className="font-semibold">{task.title}</h4>
            <Chip
              color={getPriorityColor(task.priority)}
              size="sm"
              variant="flat"
            >
              {task.priority}
            </Chip>
          </div>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <MoreVertical size={16} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="edit" startContent={<Edit size={16} />}>
              Edit
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              startContent={<Trash2 size={16} />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="pt-0">
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            <span>{task.deadline}</span>
          </div>

          {task.status === "ongoing" && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress color="primary" size="sm" value={task.progress} />
            </div>
          )}

          <div className="flex justify-between items-center">
            <Chip color={getStatusColor(task.status)} size="sm" variant="flat">
              {task.status}
            </Chip>
            {task.status === "pending" && (
              <Button
                color="primary"
                size="sm"
                startContent={<Play size={14} />}
              >
                Start
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TaskCard;