"use client";
import { useState, useMemo } from "react";
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
  const allTasks = data?.data || [];

  // Filter tasks based on category and status
  const filteredTasks = useMemo(() => {
    return allTasks.filter((task: TTask) => {
      const categoryMatch =
        selectedCategory === "all" || task.category === selectedCategory;
      const statusMatch =
        selectedStatus === "all" || task.status === selectedStatus;

      return categoryMatch && statusMatch;
    });
  }, [allTasks, selectedCategory, selectedStatus]);

  const handleTaskClick = (task: TTask) => {
    setSelectedTask(task);
  };

  const handleBackToList = () => {
    setSelectedTask(null);
  };

  const handleSpinWheelNavigation = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("tasklist");
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
            tasks={filteredTasks}
            onAddTask={onAddModalOpen}
            onBackToList={handleBackToList}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
            onTaskClick={handleTaskClick}
          />
        )}

        {activeTab === "spin" && (
          <SpinWheelContent onNavigateToTask={handleSpinWheelNavigation} />
        )}

        <AddTaskModal
          isOpen={isAddModalOpen}
          onOpenChange={onAddModalOpenChange}
        />
      </main>
    </>
  );
};

export default Dashboard;