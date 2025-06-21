import { Card, CardBody } from "@heroui/react";

import TaskListHeader from "./TaskListHeader";
import TaskGrid from "./TaskGrid";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  deadline: string;
  progress: number;
}

interface TaskListContentProps {
  tasks: Task[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onAddTask: () => void;
}

const TaskListContent = ({
  tasks,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  onAddTask,
}: TaskListContentProps) => {

  return (
    <div className="space-y-6">

      <Card className="relative -mt-8 z-20 shadow-lg">
        <TaskListHeader
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onAddTask={onAddTask}
          onCategoryChange={onCategoryChange}
          onStatusChange={onStatusChange}
        />
        <CardBody>
          <TaskGrid tasks={tasks} />
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskListContent;