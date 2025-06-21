import { Button, Select, SelectItem } from "@heroui/react";
import { Plus } from "lucide-react";

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
  const categories = [
    { key: "all", label: "All Categories" },
    { key: "arts-and-craft", label: "Arts and Craft" },
    { key: "nature", label: "Nature" },
    { key: "family", label: "Family" },
    { key: "sport", label: "Sport" },
    { key: "meditation", label: "Meditation" },
    { key: "friends", label: "Friends" },
  ];

  const statusOptions = [
    { key: "all", label: "All Status" },
    { key: "pending", label: "Pending" },
    { key: "ongoing", label: "Ongoing" },
    { key: "done", label: "Done" },
  ];

  return (
    <div className="flex justify-between items-center bg-white rounded-t-lg p-6">
      <h3 className="text-xl font-bold">All Task List</h3>
      <div className="flex gap-3 items-center">
        <Select
          className="w-48"
          placeholder="Select Task Category"
          selectedKeys={[selectedCategory]}
          size="sm"
          onSelectionChange={(keys) =>
            onCategoryChange(Array.from(keys)[0] as string)
          }
        >
          {categories.map((category) => (
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
          startContent={<Plus size={16} />}
          onPress={onAddTask}
        >
          Add New Task
        </Button>
      </div>
    </div>
  );
};

export default TaskListHeader;
