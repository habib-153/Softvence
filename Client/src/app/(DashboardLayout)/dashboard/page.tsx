"use client";
import { useState } from "react";
import { useDisclosure } from "@heroui/react";

import DashboardHeader from "@/src/components/modules/dashboard/DashboardHeader";
import TaskListContent from "@/src/components/modules/dashboard/TaskListContent";
import SpinWheelContent from "@/src/components/modules/dashboard/SpinWheelContent";
import AddTaskModal from "@/src/components/modules/dashboard/AddTaskModal";
import { useGetAllTasks } from "@/src/hooks/task.hook";
import envConfig from "@/src/config/envConfig";
import { TTask } from "@/src/types";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tasklist");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null);

  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure();

  const apiUrl = `${envConfig.baseApi}/tasks`;
  const { data } = useGetAllTasks(apiUrl);
  const tasks = data?.data || [];

  const handleTaskClick = (task: TTask) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  const handleEditTask = (task: TTask) => {
    // You can open edit modal here or navigate to edit page
    console.log("Edit task:", task);
  };

  const handleDeleteTask = (task: TTask) => {
    // Handle delete confirmation
    console.log("Delete task:", task);
  };

  const handleStartTask = (task: TTask) => {
    // Handle start task logic
    console.log("Start task:", task);
  };

  return (
    <>
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 pb-6 relative">
        {activeTab === "tasklist" && (
          <TaskListContent
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            selectedTask={selectedTask}
            tasks={tasks}
            onAddTask={onAddModalOpen}
            onBackToList={handleBackToList}
            onCategoryChange={setSelectedCategory}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onStartTask={handleStartTask}
            onStatusChange={setSelectedStatus}
            onTaskClick={handleTaskClick}
          />
        )}

        {activeTab === "spin" && <SpinWheelContent />}

        <AddTaskModal
          isOpen={isAddModalOpen}
          onOpenChange={onAddModalOpenChange}
        />
      </main>
    </>
  );
};

export default Dashboard;