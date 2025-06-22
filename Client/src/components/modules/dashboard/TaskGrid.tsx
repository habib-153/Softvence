import TaskCard from "@/src/components/modules/dashboard/TaskCard";
import EmptyState from "@/src/components/modules/dashboard/EmptyState";
import { TTask } from "@/src/types";

interface TaskGridProps {
  tasks: TTask[];
  onTaskClick?: (task: TTask) => void;
  onEditTask?: (task: TTask) => void;
  onDeleteTask?: (task: TTask) => void;
  onStartTask?: (task: TTask) => void;
}

const TaskGrid = ({
  tasks,
  onTaskClick,
  onEditTask,
  onDeleteTask,
  onStartTask,
}: TaskGridProps) => {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDeleteClick={onDeleteTask}
          onEditClick={onEditTask}
          onStartClick={onStartTask}
          onTaskClick={onTaskClick}
        />
      ))}
    </div>
  );
};

export default TaskGrid;