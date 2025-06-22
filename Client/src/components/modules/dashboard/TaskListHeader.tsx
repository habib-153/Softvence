import { Button, Select, SelectItem } from "@heroui/react";

import { categoryOptions, statusOptions } from "@/src/constant";

interface TaskListHeaderProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onAddTask: () => void;
}

const TaskListHeader = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  onAddTask,
}: TaskListHeaderProps) => {

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-t-lg p-6">
      <h3 className="text-xl font-bold">All Task List</h3>
      <div className="flex flex-wrap gap-3 items-center">
        <Select
          className="w-48"
          placeholder="Select Task Category"
          selectedKeys={[selectedCategory]}
          size="sm"
          onSelectionChange={(keys) =>
            onCategoryChange(Array.from(keys)[0] as string)
          }
        >
          {categoryOptions.map((category) => (
            <SelectItem key={category.key}>{category.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="w-32"
          placeholder="All Status"
          selectedKeys={[selectedStatus]}
          size="sm"
          onSelectionChange={(keys) =>
            onStatusChange(Array.from(keys)[0] as string)
          }
        >
          {statusOptions.map((status) => (
            <SelectItem key={status.key}>{status.label}</SelectItem>
          ))}
        </Select>

        <Button
          color="primary"
          startContent={
            <svg
              fill="none"
              height="20"
              viewBox="0 0 18 20"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.236 0.761963H4.584C2.525 0.761963 0.75 2.43096 0.75 4.49096V15.34C0.75 17.516 2.408 19.115 4.584 19.115H12.572C14.632 19.115 16.302 17.4 16.302 15.34V6.03796L11.236 0.761963Z"
                stroke="#1F1F1F"
              />
              <path
                d="M10.9766 0.750244V3.65924C10.9766 5.07924 12.1256 6.23124 13.5456 6.23424C14.8616 6.23724 16.2086 6.23824 16.2996 6.23224"
                stroke="#1F1F1F"
              />
              <path
                d="M10.7994 10.9141H5.89844"
                stroke="#1F1F1F"
              />
              <path
                d="M8.34375 13.3654V8.46436"
                stroke="#1F1F1F"
              />
            </svg>
          }
          onPress={onAddTask}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};

export default TaskListHeader;
