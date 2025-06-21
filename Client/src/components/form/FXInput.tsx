"use client";

import { Input } from "@heroui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  radius?: "sm" | "md" | "lg" | "none" | "full"
  classNames?: any
}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  radius = "lg",
  label,
  name,
  classNames
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const isPasswordField = type === "password";


  return (
    <Input
      {...register(name)}
      classNames={classNames}
      endContent={
        isPasswordField ? (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeOff
                className="text-2xl text-default-400 pointer-events-none"
                size={20}
              />
            ) : (
              <Eye
                className="text-2xl text-default-400 pointer-events-none"
                size={20}
              />
            )}
          </button>
        ) : null
      }
      errorMessage={errors?.[name] ? (errors?.[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      radius={radius}
      required={required}
      size={size}
      type={isPasswordField ? (isVisible ? "text" : "password") : type}
      variant={variant}
    />
  );
}