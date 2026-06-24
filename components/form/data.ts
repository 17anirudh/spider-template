import type { Key } from "react";
import type { ZodType } from "zod";

type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "textarea"
  | "checkbox"
  | "radio"
  | "calendar"
  | "select"
  | "file";

export type F = {
  name: string;
  label: string;
  schema: ZodType;
  render: InputType;
  description: string;
  items?: {
    value: string;
    label: string;
    description?: string;
  }[];
};

export type DeafultProps = {
  identifier: string;
  key?: Key;
  onSubmit: (data: any) => Promise<void>;
  fields: F[];
};