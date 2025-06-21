"use client";
import { Card, CardBody, Button, Select, SelectItem } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

const SpinWheel = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSpinning, setIsSpinning] = useState(false);

  const categories = [
    { key: "all", label: "All and Craft" },
    { key: "nature", label: "Nature" },
    { key: "family", label: "Family" },
    { key: "sport", label: "Sport" },
    { key: "meditation", label: "Meditation" },
    { key: "friends", label: "Friends" },
  ];

  const handleSpin = () => {
    setIsSpinning(true);
    // Add spin logic here
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center">
      {/* Spin Wheel */}
      <div className="flex-1 text-center">
        <div
          className={`relative w-64 h-64 mx-auto mb-4 ${isSpinning ? "animate-spin" : ""}`}
        >
          {/* Wheel SVG or Canvas would go here */}
          <div className="w-full h-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <RotateCcw size={24} />
            </div>
          </div>
          {/* Arrow pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-green-600" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Spin Wheel to pick your task
        </p>
        <Button
          color="primary"
          isLoading={isSpinning}
          size="lg"
          startContent={<RotateCcw size={16} />}
          onPress={handleSpin}
        >
          Spin
        </Button>
      </div>

      {/* Category Selection */}
      <div className="flex-1">
        <Card>
          <CardBody>
            <h4 className="font-semibold mb-4">Select Task Category</h4>
            <Select
              placeholder="Select category"
              selectedKeys={[selectedCategory]}
              onSelectionChange={(keys) =>
                setSelectedCategory(Array.from(keys)[0] as string)
              }
            >
              {categories.map((category) => (
                <SelectItem key={category.key}>
                  {category.label}
                </SelectItem>
              ))}
            </Select>
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <div key={category.key} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded-full" />
                  <span className="text-sm">{category.label}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SpinWheel;