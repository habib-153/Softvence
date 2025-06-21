"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import registerValidationSchema from "@/src/schema/registerSchema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import registerBg from "@/src/assets/register.png"; 

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();
  const { setIsLoading: userRegLoading } = useUser();
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    // console.log("User Registration Data:", userData);
    handleUserRegistration(userData);
    userRegLoading(true);
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tl from-primary via-black to-bg_secondary relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-md mx-auto text-center">
          <img
            alt="Registration Illustration"
            className="w-full max-w-sm mx-auto"
            src={registerBg.src}
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-2 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-3 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-text_secondary text-sm">
              To Create Account, Please Fill in the From Below.
            </p>
          </div>

          <FXForm
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="space-y-3">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <FXInput
                  label="Name"
                  name="name"
                  type="text"
                  variant="bordered"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <FXInput
                  label="john@example.com"
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
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper:
                      "border-gray-300 hover:border-gray-400 focus-within:border-primary",
                  }}
                  label="Password"
                  name="password"
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
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper:
                      "border-gray-300 hover:border-gray-400 focus-within:border-primary",
                  }}
                  label="Retype your password"
                  name="confirmPassword"
                  type="password"
                  variant="bordered"
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium mt-6"
                isLoading={isPending}
                size="lg"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </FXForm>

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500">Or</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="mt-0 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/">
              <span className="text-primary hover:text-primary/80 font-medium">
                Login
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}