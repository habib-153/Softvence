"use client";
import { Modal, ModalContent, Button } from "@heroui/react";
import Image from "next/image";

import doneImg from "@/src/assets/Group 38045.png";

interface SuccessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  points?: number;
}

const SuccessModal = ({
  isOpen,
  onOpenChange,
  points = 20,
}: SuccessModalProps) => {
  return (
    <Modal className="max-w-md" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          
            <div className="w-32 h-32 relative z-10">
              <Image
                fill
                alt="Task completed"
                className="object-contain"
                src={doneImg}
              />
            </div>
          {/* Success Message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Successfully Completed the Task!
            </h3>
            <p className="text-gray-600 text-sm">
              Congratulations! you have successfully completed the task and you
              got {points} points.
            </p>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;