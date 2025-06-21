"use client";
import { useState } from "react";
import { useDisclosure } from "@heroui/react";

import DashboardHeader from "@/src/components/modules/dashboard/DashboardHeader";
import TaskListContent from "@/src/components/modules/dashboard/TaskListContent";
import SpinWheelContent from "@/src/components/modules/dashboard/SpinWheelContent";
import AddTaskModal from "@/src/components/modules/dashboard/AddTaskModal";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tasklist");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Mock task data
  const tasks = [
    // {
    //   id: 1,
    //   title: "Art and Craft",
    //   description:
    //     "Create beautiful art that you could use for decoration. Learn about arts and arts.",
    //   status: "pending",
    //   priority: "high",
    //   category: "arts-and-craft",
    //   deadline: "Friday, April 6 - 2024",
    //   progress: 0,
    // },
    // {
    //   id: 2,
    //   title: "Art and Craft",
    //   description: "Create beautiful art that you could use for decoration.",
    //   status: "ongoing",
    //   priority: "medium",
    //   category: "arts-and-craft",
    //   deadline: "Friday, April 6 - 2024",
    //   progress: 45,
    // },
  ];

  return (
    <>
      <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 pb-6 relative">
        {activeTab === "tasklist" && (
          <TaskListContent
            selectedCategory={selectedCategory}
            selectedStatus={selectedStatus}
            tasks={tasks}
            onAddTask={onOpen}
            onCategoryChange={setSelectedCategory}
            onStatusChange={setSelectedStatus}
          />
        )}

        {activeTab === "spin" && <SpinWheelContent />}

        <AddTaskModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </main>
    </>
  );
};

export default Dashboard;