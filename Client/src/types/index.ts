import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};


export type TTaskCategory =
  | "arts-and-craft"
  | "nature"
  | "family"
  | "sport"
  | "meditation"
  | "friends";
  export type TStatus = "pending" | "ongoing" | "done" | "collaborative-task";

  export type TTask = {
    _id?: string;
    title: string;
    description: string;
    status?: TStatus;
    priority: string;
    deadline: Date;
    category: TTaskCategory;
    createdAt?: Date;
    updatedAt?: Date;
  };

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface IUser {
  _id?: string;
  name: string;
  role: string
  email: string;
  password: string;
  status: string;
  passwordChangedAt?: Date;
  mobileNumber?: string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
