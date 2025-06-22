"use client";
import { Card, CardBody, Button, Select, SelectItem } from "@heroui/react";
import { RotateCcw, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

interface SpinWheelProps {
  onNavigateToTask?: (category: string) => void;
}

const SpinWheel = ({ onNavigateToTask }: SpinWheelProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: "sport", label: "Sport", color: "#3B82F6" },
    { key: "family", label: "Family", color: "#A5B4FC" },
    { key: "nature", label: "Nature", color: "#FB923C" },
    { key: "arts-and-craft", label: "Arts and Craft", color: "#FBBF24" },
    { key: "meditation", label: "Meditation", color: "#34D399" },
    { key: "friends", label: "Friends", color: "#10B981" },
  ];

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((cat) => cat.key === selectedCategory);

  const segmentAngle = 360 / filteredCategories.length;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);

    // Generate random rotation (3-5 full rotations + random angle)
    const minRotation = 1080; // 3 full rotations
    const maxRotation = 1800; // 5 full rotations
    const randomRotation =
      Math.random() * (maxRotation - minRotation) + minRotation;
    const finalRotation = currentRotation + randomRotation;

    setCurrentRotation(finalRotation);

    // Calculate which segment we land on
    const normalizedAngle = (360 - (finalRotation % 360)) % 360;
    const segmentIndex = Math.floor(normalizedAngle / segmentAngle);
    const selectedTask = filteredCategories[segmentIndex];

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(selectedTask.key);
      toast.success(`You got: ${selectedTask.label}!`);
    }, 3000);
  };

  const handleGoToTask = () => {
    if (spinResult && onNavigateToTask) {
      onNavigateToTask(spinResult);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] gap-8">
      {/* Main Content - Spin Wheel and Category Selection */}
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-6xl">
        {/* Spin Wheel Section */}
        <div className="flex flex-col items-center flex-1">
          <div className="relative mb-8">
            {/* Custom SVG Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 z-30">
              <svg
                className="drop-shadow-lg"
                fill="none"
                height="42"
                viewBox="0 0 143 134"
                width="45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_17929_6556)">
                  <path
                    d="M64.5754 17.0725C67.5678 11.8896 75.0488 11.8896 78.0411 17.0725L115.072 81.2116C118.064 86.3946 114.324 92.8733 108.339 92.8733H34.2775C28.2928 92.8733 24.5523 86.3946 27.5447 81.2116L64.5754 17.0725Z"
                    fill="#2F911E"
                  />
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="132.688"
                    id="filter0_d_17929_6556"
                    width="142.633"
                    x="-0.0078125"
                    y="0.685318"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="14" />
                    <feGaussianBlur stdDeviation="13.25" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.184314 0 0 0 0 0.568627 0 0 0 0 0.117647 0 0 0 0.5 0"
                    />
                    <feBlend
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="effect1_dropShadow_17929_6556"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_17929_6556"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Wheel Container with border */}
            <div className="relative">
              <div
                ref={wheelRef}
                className="relative w-80 h-80 rounded-full transition-transform duration-[3000ms] ease-out shadow-2xl"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  background: "#DC2626", // Red border
                  padding: "6px",
                }}
              >
                {/* Inner Wheel */}
                <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                  {/* Wheel Segments */}
                  <svg
                    className="absolute inset-0"
                    height="100%"
                    viewBox="0 0 200 200"
                    width="100%"
                  >
                    {filteredCategories.map((category, index) => {
                      const startAngle = index * segmentAngle;
                      const endAngle = (index + 1) * segmentAngle;

                      // Convert to radians
                      const startRad = (startAngle - 90) * (Math.PI / 180);
                      const endRad = (endAngle - 90) * (Math.PI / 180);

                      // Calculate path coordinates
                      const radius = 90;
                      const centerX = 100;
                      const centerY = 100;

                      const x1 = centerX + radius * Math.cos(startRad);
                      const y1 = centerY + radius * Math.sin(startRad);
                      const x2 = centerX + radius * Math.cos(endRad);
                      const y2 = centerY + radius * Math.sin(endRad);

                      const largeArc = segmentAngle > 180 ? 1 : 0;

                      const pathData = [
                        `M ${centerX} ${centerY}`,
                        `L ${x1} ${y1}`,
                        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                        "Z",
                      ].join(" ");

                      // Text position
                      const textAngle = startAngle + segmentAngle / 2;
                      const textRad = (textAngle - 90) * (Math.PI / 180);
                      const textRadius = 55;
                      const textX = centerX + textRadius * Math.cos(textRad);
                      const textY = centerY + textRadius * Math.sin(textRad);

                      return (
                        <g key={category.key}>
                          <path
                            d={pathData}
                            fill={category.color}
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          <text
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                            x={textX}
                            y={textY}
                          >
                            {category.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Center Circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-3 border-gray-200 flex items-center justify-center z-10 shadow-md">
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>

                  {/* White dots around the wheel */}
                  {Array.from({ length: 12 }).map((_, index) => {
                    const angle = index * 30 * (Math.PI / 180);
                    const dotRadius = 140;
                    const dotX = 50 + (dotRadius / 2) * Math.cos(angle);
                    const dotY = 50 + (dotRadius / 2) * Math.sin(angle);

                    return (
                      <div
                        key={index}
                        className="absolute w-2 h-2 bg-white rounded-full shadow-sm"
                        style={{
                          left: `${dotX}%`,
                          top: `${dotY}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6 text-center font-medium">
            Spin Wheel to pick your task
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex-1 max-w-sm">
          <Card className="shadow-lg">
            <CardBody className="p-6">
              <h4 className="font-semibold mb-4 text-lg">
                Select Task Category
              </h4>
              <Select
              aria-label="Select category"
                placeholder="Select category"
                selectedKeys={[selectedCategory]}
                variant="bordered"
                onSelectionChange={(keys) =>
                  setSelectedCategory(Array.from(keys)[0] as string)
                }
              >
                {[
                  <SelectItem key="all">All Categories</SelectItem>,
                  ...categories.map((category) => (
                    <SelectItem key={category.key}>{category.label}</SelectItem>
                  )),
                ]}
              </Select>

              <div className="mt-6 space-y-3">
                <h5 className="font-medium text-sm text-gray-700">
                  Available Categories:
                </h5>
                {filteredCategories.map((category) => (
                  <div key={category.key} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-sm"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      {category.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button
          className="bg-primary text-white px-8 py-2 rounded-lg font-medium"
          color="primary"
          isLoading={isSpinning}
          size="lg"
          startContent={!isSpinning ? <RotateCcw size={18} /> : null}
          onPress={handleSpin}
        >
          {isSpinning ? "Spinning..." : "Spin 🎯"}
        </Button>

        {spinResult && !isSpinning && (
          <Button
            className="bg-green-500 text-white px-8 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
            size="lg"
            startContent={<ArrowRight size={18} />}
            onPress={handleGoToTask}
          >
            Go To Task
          </Button>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;