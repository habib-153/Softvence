import { Card, CardHeader, CardBody } from "@heroui/react";

import SpinWheel from "./SpinWheel";

interface SpinWheelContentProps {
  onNavigateToTask?: (category: string) => void;
}

const SpinWheelContent = ({ onNavigateToTask }: SpinWheelContentProps) => {
  return (
    <div className="space-y-6">
      <Card className="relative -mt-6 lg:-mt-16 z-20 shadow-lg">
        <CardHeader className="bg-white rounded-t-lg p-6 border-b">
          <h3 className="text-xl font-bold">Spin Wheel</h3>
        </CardHeader>
        <CardBody className="">
          <SpinWheel onNavigateToTask={onNavigateToTask} />
        </CardBody>
      </Card>
    </div>
  );
};

export default SpinWheelContent;