"use client";
import { Modal, ModalContent, Button } from "@heroui/react";
import Image from "next/image";

import deleteImg from "@/src/assets/OBJECTS (2).png";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  taskTitle: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteConfirmModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      hideCloseButton
      className="max-w-md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Delete Image */}
          <div className="w-32 h-32 relative">
            <Image
              fill
              alt="Delete confirmation"
              className="object-contain"
              src={deleteImg}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">Are you Sure!!</h2>

          {/* Description */}
          <p className="text-gray-600 text-sm">
            Do you want to delete this Task on this app?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full pt-4">
            <Button
              className="flex-1 bg-primary text-white rounded-lg"
              isLoading={isLoading}
              onPress={onConfirm}
            >
              Yes
            </Button>
            <Button
              className="flex-1 bg-red-100 text-red-500 rounded-lg"
              variant="flat"
              onPress={() => onOpenChange(false)}
            >
              No
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmModal;