"use client";
import img1 from "@/src/assets/no_task.png"

const EmptyState = () => {
  return (
    <>
      <div className="text-center my-8">
        <div className="size-96 mx-auto mb-4">
          <img
            alt="No tasks"
            className="w-full h-full object-contain"
            src={img1.src}
          />
        </div>
        <h3 className="text-xl text-[#1F1F1F] font-semibold mb-2">
          No Task is Available yet, Please Add your New Task
        </h3>
      </div>
    </>
  );
};

export default EmptyState;
