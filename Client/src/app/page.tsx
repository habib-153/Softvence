"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import loginValidationSchema from "@/src/schema/loginSchema";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import loginBg from "@/src/assets/reset-bg.png"; 

const DemoCredentials = () => (
  <Card className="mb-4 bg-gray-50 border border-gray-200">
    <CardHeader className="pb-2">
      <h3 className="text-sm font-semibold text-gray-700">Demo Credentials</h3>
    </CardHeader>
    <CardBody className="pt-0">
      <div className="space-y-2 text-xs">
        <div>
          <span className="font-medium">Email:</span> user@example.com
        </div>
        <div>
          <span className="font-medium">Password:</span> 123456
        </div>
      </div>
    </CardBody>
  </Card>
);

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-emerald-700 to-slate-800 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-md mx-auto text-center">
          <img
            alt="Task Management Illustration"
            className="w-full max-w-sm mx-auto mb-8"
            src={loginBg.src}
          />
        </div>
        <div className="absolute top-6 right-6 opacity-30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/40 rounded-full" />
            <div className="w-3 h-3 bg-white/30 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
            <p className="text-[#667085]">
              WelcomeBack,Please Enter your Details to Log In.
            </p>
          </div>

          {/* Demo Credentials */}
          <DemoCredentials />

          <FXForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="space-y-3">
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
                  type="email"
                  variant="bordered"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <FXInput
                  label="••••••••••••"
                  name="password"
                  type="password"
                  variant="bordered"
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox color="primary" size="sm">
                  <span className="text-sm text-gray-600">Remember me</span>
                </Checkbox>
                <Link href="/forgot-password">
                  <span className="text-sm text-primary hover:text-primary/80">
                    Forgot password?
                  </span>
                </Link>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
                isLoading={isPending}
                size="lg"
                type="submit"
              >
                Login
              </Button>
            </div>
          </FXForm>

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500">Or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="mt-2 text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link href="/register">
              <span className="text-primary hover:text-primary/80 font-medium">
                Sign up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;