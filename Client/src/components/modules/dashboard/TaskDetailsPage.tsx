"use client";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Select,
  SelectItem,
} from "@heroui/react";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { getCategoryIcon } from "./TaskCard";

import { useUpdateTask, useDeleteTask } from "@/src/hooks/task.hook";
import { TTask } from "@/src/types";
import { statusOptions } from "@/src/constant";

interface TaskDetailsPageProps {
  task: TTask;
  onBack: () => void;
  onEditTask?: (task: TTask) => void;
}

const TaskDetailsPage = ({
  task,
  onBack,
  onEditTask,
}: TaskDetailsPageProps) => {
  const [selectedStatus, setSelectedStatus] = useState(task?.status || "");
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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

  const formatDate = (dateInput: string | Date) => {
    try {
      const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateInput.toString();
    }
  };

  const handleStatusUpdate = () => {
    if (!task || !selectedStatus) return;

    const taskId = task._id;

    if (!taskId) return;

    const updateData = {
      ...task,
      status: selectedStatus as any,
    };

    updateTask(
      { id: taskId, data: updateData }
    );
  };

  const handleDeleteTask = () => {
    if (!task) return;

    const taskId = task._id;

    if (!taskId) return;

    deleteTask(taskId);
  };

  const handleEditTask = () => {
    if (task && onEditTask) {
      onEditTask(task);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative -mt-8 z-20 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center bg-white rounded-t-lg p-6 border-b">
          <h2 className="text-xl font-bold">Task Details</h2>
          {task.points && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium text-[#C716F3]">
                {task.points} points
              </span>
            </div>
          )}
          <div className="flex gap-2">
            <Button
              className="bg-[rgba(255,170,0,0.1)] rounded-lg px-8 text-[#FFAB00]"
              startContent={<Edit2 size={16} />}
              variant="light"
              onPress={handleEditTask}
            >
              Edit Task
            </Button>
            <Button className="bg-primary rounded-lg px-6" color="primary" onPress={onBack}>
              Back
            </Button>
          </div>
        </div>

        <CardBody className="p-8">
          <div className="space-y-8">
            {/* Task Header */}
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">
                  {getCategoryIcon(task.category)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-3">{task.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Task Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">
                    End Date
                  </h4>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={20} />
                    <span className="text-lg">{formatDate(task.deadline)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">
                    Priority
                  </h4>
                  <Chip
                    className="text-base px-4 py-2"
                    color={getPriorityColor(task.priority)}
                    size="lg"
                    variant="flat"
                  >
                    {task.priority}
                  </Chip>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">
                    Status
                  </h4>
                  <div className="flex items-center gap-3">
                    <Chip
                      className="text-lg px-4 py-2"
                      color={getStatusColor(task.status as string)}
                      size="lg"
                      variant="flat"
                    >
                      ● {task.status === "ongoing" ? "InProgress" : task.status}
                    </Chip>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 text-lg">
                    Change Status
                  </h4>
                  <Select
                    aria-label="Select new status"
                    placeholder="Select new status"
                    selectedKeys={[selectedStatus]}
                    size="lg"
                    variant="bordered"
                    onSelectionChange={(keys) =>
                      setSelectedStatus(Array.from(keys)[0] as string)
                    }
                  >
                    {statusOptions.map((status) => (
                      <SelectItem key={status.key}>{status.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-5 pt-6 border-t">
              <Button
                className="rounded-lg px-8"
                color="danger"
                isLoading={isDeleting}
                size="lg"
                startContent={<Trash2 size={16} />}
                variant="solid"
                onPress={handleDeleteTask}
              >
                Delete Task
              </Button>
              <Button
                className="bg-primary rounded-lg px-12"
                color="primary"
                isDisabled={!selectedStatus || selectedStatus === task.status}
                isLoading={isUpdating}
                size="lg"
                onPress={handleStatusUpdate}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskDetailsPage;