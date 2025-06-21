import TaskCard from "@/src/components/modules/dashboard/TaskCard";
import EmptyState from "@/src/components/modules/dashboard/EmptyState";

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

interface TaskGridProps {
  tasks: Task[];
}

const TaskGrid = ({ tasks }: TaskGridProps) => {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskGrid;