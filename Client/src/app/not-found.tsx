import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Link from "next/link";

import catImage from "@/src/assets/not-found.png";
import bg from "@/src/assets/reset-bg.png";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-40 bg-gradient-to-r from-[#60E5AE] via-black to-[#193a36] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img
          alt=""
          className="w-80 absolute opacity-55 right-14 top-0 h-full object-cover"
          src={bg.src}
        />
        <div className="absolute top-4 right-4 opacity-30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/30 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* 404 Content */}
      <div className="relative -mt-16 flex items-center justify-center px-4 sm:px-6 lg:px-16">
        <Card className="w-full bg-white shadow-xl rounded-2xl">
          <CardBody className="p-16 max-w-xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 ">
              <div className="relative">
                <div className="relative mx-auto mb-4">
                  <img
                    alt="404 Cat Illustration"
                    className="w-96 relative z-10"
                    src={catImage.src}
                  />
                </div>
              </div>

              <Button
                as={Link}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium mt-6"
                href="/"
                size="lg"
              >
                Back to Home
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
