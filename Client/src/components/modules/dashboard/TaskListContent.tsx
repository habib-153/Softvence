import { Card, CardBody } from "@heroui/react";

import TaskListHeader from "./TaskListHeader";
import TaskGrid from "./TaskGrid";
import TaskDetailsPage from "./TaskDetailsPage";

import { TTask } from "@/src/types";

interface TaskListContentProps {
  tasks: TTask[];
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onAddTask: () => void;
  onTaskClick?: (task: TTask) => void;
  onEditTask?: (task: TTask) => void;
  onDeleteTask?: (task: TTask) => void;
  onStartTask?: (task: TTask) => void;
  // New props for task details view
  selectedTask?: TTask | null;
  onBackToList?: () => void;
}

const TaskListContent = ({
  tasks,
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  onAddTask,
  onTaskClick,
  onEditTask,
  onDeleteTask,
  onStartTask,
  selectedTask,
  onBackToList,
}: TaskListContentProps) => {
  if (selectedTask && onBackToList) {
    return (
      <TaskDetailsPage
        task={selectedTask}
        onBack={onBackToList}
        onEditTask={onEditTask}
      />
    );
  }

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
          <TaskGrid
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onStartTask={onStartTask}
            onTaskClick={onTaskClick}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default TaskListContent;