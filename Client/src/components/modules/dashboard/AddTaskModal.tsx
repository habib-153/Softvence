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
import { CalendarDays, Star } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { PressEvent } from "@react-types/shared";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import CTSelect from "@/src/components/form/CTSelect";
import FXTextarea from "@/src/components/form/FXTextArea";
import CTDatePicker from "@/src/components/form/CTDatePicker";
import { useCreateTask } from "@/src/hooks/task.hook";
import { categories, priorityOptions } from "@/src/constant";
import { createTaskSchema } from "@/src/schema/taskSchema";

interface AddTaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTaskModal = ({ isOpen, onOpenChange }: AddTaskModalProps) => {
  const { mutate: createTask, isPending } = useCreateTask();
  const formRef = useRef<HTMLFormElement>(null);

  const defaultValues = {
    title: "",
    description: "",
    priority: "",
    points: "",
    deadline: "",
    category: "",
  };

  const handleCreateTask: SubmitHandler<FieldValues> = async (data) => {
    try {
      const taskData = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        points: parseInt(data.points),
        deadline: new Date(data.deadline),
        category: data.category,
        status: "pending" as const,
      };

      createTask(taskData);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    } else {
      console.error("Form reference is not set");}
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose: ((e: PressEvent) => void) | undefined) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-[#214f3b] via-[#0F2027] to-[#193a36] text-white rounded-t-lg">
              <div className="flex items-center gap-1">
                <svg
                  fill="none"
                  height="20"
                  viewBox="0 0 22 20"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0182 11.0417C19.0182 15.0667 15.4249 18.3333 10.9974 18.3333C6.5699 18.3333 2.97656 15.0667 2.97656 11.0417C2.97656 7.01667 6.5699 3.75 10.9974 3.75C15.4249 3.75 19.0182 7.01667 19.0182 11.0417Z"
                    stroke="white"
                  />
                  <path d="M11 6.6665V10.8332" stroke="white" />
                  <path d="M8.25 1.6665H13.75" stroke="white" />
                </svg>
                <h2 className="text-xl font-bold">Add New Task</h2>
              </div>
              <p className="text-sm text-white/80">
                Create a new task to track your progress
              </p>
            </ModalHeader>

            <ModalBody className="p-6">
              <div className="w-full">
                <FXForm
                  ref={formRef}
                  defaultValues={defaultValues}
                  resolver={zodResolver(createTaskSchema)}
                  onSubmit={handleCreateTask}
                >
                  {/* <FormDebugger /> */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="title"
                      >
                        Task Title
                      </label>
                      <FXInput
                        label="Enter task title"
                        name="title"
                        variant="bordered"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium text-gray-700"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <FXTextarea
                        label="Describe your task in detail..."
                        name="description"
                        variant="bordered"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                          htmlFor="priority"
                        >
                          <Star className="w-4 h-4" />
                          Priority
                        </label>
                        <CTSelect
                          label="Select priority level"
                          name="priority"
                          options={priorityOptions}
                          variant="bordered"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                          htmlFor="points"
                        >
                          <span className="text-yellow-500">⭐</span>
                          Points
                        </label>
                        <FXInput
                          label="Enter points (1-100)"
                          name="points"
                          type="number"
                          variant="bordered"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700"
                          htmlFor="category"
                        >
                          Category
                        </label>
                        <CTSelect
                          label="Select category"
                          name="category"
                          options={categories}
                          variant="bordered"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                          htmlFor="deadline"
                        >
                          <CalendarDays className="w-4 h-4" />
                          Deadline
                        </label>
                        <CTDatePicker
                          label="Select deadline"
                          name="deadline"
                          variant="bordered"
                        />
                      </div>
                    </div>
                  </div>
                </FXForm>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className="flex-1"
                color="danger"
                isDisabled={isPending}
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                color="primary"
                isLoading={isPending}
                onPress={handleSubmit}
              >
                {isPending ? "Creating Task..." : "Create Task"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;