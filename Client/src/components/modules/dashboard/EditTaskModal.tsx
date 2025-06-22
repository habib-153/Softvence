"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import CTSelect from "@/src/components/form/CTSelect";
import FXTextarea from "@/src/components/form/FXTextArea";
import CTDatePicker from "@/src/components/form/CTDatePicker";
import { useUpdateTask } from "@/src/hooks/task.hook";
import { categories, priorityOptions } from "@/src/constant";
import { createTaskSchema } from "@/src/schema/taskSchema";
import { TTask } from "@/src/types";

interface EditTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  task: TTask | null;
}

const EditTaskModal = ({ isOpen, onOpenChange, task }: EditTaskModalProps) => {
  const { mutate: updateTask, isPending } = useUpdateTask();
  const formRef = useRef<HTMLFormElement>(null);

  const defaultValues = {
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "",
    points: task?.points?.toString() || "",
    deadline: task?.deadline
      ? new Date(task.deadline).toISOString().split("T")[0]
      : "",
    category: task?.category || "",
  };

  const handleUpdateTask: SubmitHandler<FieldValues> = async (data) => {
    if (!task?._id) return;

    try {
      const taskData = {
        ...task,
        title: data.title,
        description: data.description,
        priority: data.priority,
        points: parseInt(data.points),
        deadline: new Date(data.deadline),
        category: data.category,
      };

      updateTask(
        { id: task._id, data: taskData }
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-[#214f3b] via-[#0F2027] to-[#193a36] text-white rounded-t-lg">
              <h2 className="text-xl font-bold">Edit Task</h2>
              <p className="text-sm text-white/80">Update your task details</p>
            </ModalHeader>

            <ModalBody className="p-6">
              <div className="w-full">
                <FXForm
                  ref={formRef}
                  defaultValues={defaultValues}
                  resolver={zodResolver(createTaskSchema)}
                  onSubmit={handleUpdateTask}
                >
                  <div className="space-y-4">
                    <FXInput
                      label="Enter task title"
                      name="title"
                      variant="bordered"
                    />

                    <FXTextarea
                      label="Describe your task in detail..."
                      name="description"
                      variant="bordered"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CTSelect
                        label="Select priority level"
                        name="priority"
                        options={priorityOptions}
                        variant="bordered"
                      />

                      <FXInput
                        label="Enter points (1-100)"
                        name="points"
                        type="number"
                        variant="bordered"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CTSelect
                        label="Select category"
                        name="category"
                        options={categories}
                        variant="bordered"
                      />

                      <CTDatePicker
                        label="Select deadline"
                        name="deadline"
                        variant="bordered"
                      />
                    </div>
                  </div>
                </FXForm>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isLoading={isPending}
                onPress={handleSubmit}
              >
                Update Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;