"use client";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/react";
import { ArrowLeft, Clock, Mail } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";
import { resetPassword } from "@/src/services/AuthService";
import resetBg from "@/src/assets/reset-bg.png"

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const defaultValues = {
    email: email,
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit: SubmitHandler<{
    email: string;
    newPassword: string;
    confirmPassword: string;
  }> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Reset your password...");
    const res = await resetPassword(
      { email: data.email, newPassword: data.newPassword },
      token as string
    );

    if (res?.success) {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success("Password reset successful.", { id: toastId });
    } else {
      setIsLoading(false);
      toast.error(res?.message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-40 bg-gradient-to-r from-[#60E5AE] via-black to-[#193a36] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <img
          alt=""
          className="w-80 absolute opacity-55 right-14 top-0 h-full object-cover"
          src={resetBg.src}
        />
        <div className="absolute top-4 right-4 opacity-30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/30 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      <div className="relative -mt-16 flex items-center justify-center px-4 sm:px-6 lg:px-16">
        <Card className="w-full bg-white shadow-xl rounded-2xl">
          <CardBody className="p-8">
            {isSuccess ? (
              <div className="flex flex-col gap-4 items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Password Reset Successful
                </h2>
                <p className="text-gray-600">
                  Your password has been reset. Now you can login with your new
                  password.
                </p>
                <Button
                  as={Link}
                  className="mt-4"
                  color="primary"
                  href="/login"
                  size="lg"
                  startContent={<ArrowLeft size={16} />}
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <div className="space-y-6 max-w-md mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Reset your Password
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Strong passwords include numbers, letters, and punctuation
                    marks.
                  </p>
                </div>

                <FXForm defaultValues={defaultValues} onSubmit={onSubmit}>
                  <div className="space-y-5">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <FXInput
                        label="m3220@gmail.com"
                        name="email"
                        required={true}
                        type="email"
                        variant="bordered"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="newPassword"
                      >
                        Enter New Password
                      </label>
                      <FXInput
                        label="••••••••••••"
                        name="newPassword"
                        required={true}
                        type="password"
                        variant="bordered"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-2"
                        htmlFor="confirmPassword"
                      >
                        Confirm Password
                      </label>
                      <FXInput
                        label="Retype password"
                        name="confirmPassword"
                        required={true}
                        type="password"
                        variant="bordered"
                      />
                    </div>

                    <Button
                      className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-medium"
                      isLoading={isLoading}
                      size="lg"
                      spinner={<Spinner color="white" size="sm" />}
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </div>
                </FXForm>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;