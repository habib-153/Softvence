import { Card, CardHeader, CardBody } from "@heroui/react";
import SpinWheel from "./SpinWheel";

const SpinWheelContent = () => {
  return (
    <div className="space-y-6">
      <Card className="relative -mt-8 z-20 shadow-lg">
        <CardHeader className="bg-white rounded-t-lg">
          <h3 className="text-xl font-bold">🎯 Spin Wheel</h3>
        </CardHeader>
        <CardBody>
          <SpinWheel />
        </CardBody>
      </Card>
    </div>
  );
};

export default SpinWheelContent;
