"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import z from "zod";
import { infer as ZodInfer } from "zod"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { F, DeafultProps } from "./data";

const fields: F[] = [
  {
    name: "roles",
    label: "Choose preferred roles",
    schema: z
            .array(z.string())
            .min(1, "Please select at least one notification type.")
            .refine((value) => value.every((task) => task.length > 0), {
                message: "Invalid notification type selected.",
              }
            ),
    render: "checkbox",
    description: "Select the tasks you want to perform",
    items: [
      {
        value: "swe",
        label: "Software Engineer",
      },
      {
        value: "pm",
        label: "Product Manager",
      },
    ]
  },
  {
    name: "employement",
    label: "Choose employement type",
    schema: z
            .array(z.string())
            .min(1, "Please select at least one employement type.")
            .refine((value) => value.every((task) => task.length > 0), {
                message: "Invalid employement type selected.",
              }
            ),
    render: "radio",
    description: "Select your present employement status",
    items: [
      {
        value: "student",
        label: "Student",
      },
      {
        value: "freelancher",
        label: "Freelancher",
      },
      {
        value: "employed",
        label: "Employed",
      },
    ]
  },
  {
    name: "location",
    label: "Choose your location",
    schema: z
            .string()
            .min(1, "Please select your location.")
            .refine((val) => val !== "auto", {
              message:
                "Auto-detection is not allowed. Please select a specific location.",
            }),
    render: "select",
    description: "Select your present location",
    items: [
      {
        value: "india",
        label: "India",
      },
      {
        value: "japan",
        label: "Japan",
      }
    ]
  }
];

function buildSchema(fields: F[]) {
  return z.object(Object.fromEntries(fields.map((f) => [f.name, f.schema])));
} 

export default function({ identifier, key, onSubmit, fields }: DeafultProps) {
    const schema = buildSchema(fields);
    type FV = ZodInfer<typeof schema>;

    const form = useForm<FV>({
        resolver: zodResolver(schema),
    })
    return (
      <form id={identifier} key={key} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {fields.map((point, index) => (
            <Controller
              name={point.name}
              key={index}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${identifier}-${point.name}`}>{point.label}</FieldLabel>
                  {/* <Input
                    type={point.render as HTMLInputElement["type"]}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value as string}
                    id={`${identifier}-${point.name}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  /> */}
                  {point.render === "textarea" && (
                    <InputGroup>
                      <InputGroupTextarea
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value as string}
                        id={`${identifier}-${point.name}`}
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {(field.value as string).length}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  )}
                  {point.render === "checkbox" && (
                    <>
                      <FieldGroup data-slot="checkbox-group">
                        {point.items!.map((item) => (
                          <Field
                            key={item.value}
                            orientation="horizontal"
                            data-invalid={fieldState.invalid}
                          >
                            <Checkbox
                              id={`${identifier}-${item.value}`}
                              name={field.name}
                              aria-invalid={fieldState.invalid}
                              checked={(field.value as string[]).includes(item.value)}
                              onCheckedChange={(checked: boolean) => {
                                const newValue = checked
                                  ? [...(field.value as string[]), item.value]
                                  : (field.value as string[]).filter(
                                      (value) => value !== item.value
                                    )
                                field.onChange(newValue)
                              }}
                            />
                            <FieldLabel
                              htmlFor={`${identifier}-${item.value}`}
                              className="font-normal"
                            >
                              {item.label}
                            </FieldLabel>
                          </Field>
                        ))}
                      </FieldGroup>
                    </>
                  )}
                  {point.render === "radio" && (
                    <>
                      <RadioGroup
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      >
                        {point.items!.map((item) => (
                          <FieldLabel
                            key={item.value}
                            htmlFor={`form-rhf-radiogroup-${item.value}`}
                          >
                            <Field
                              orientation="horizontal"
                              data-invalid={fieldState.invalid}
                            >
                              <FieldContent>
                                <FieldLabel>{item.label}</FieldLabel>
                              </FieldContent>
                              <RadioGroupItem
                                value={item.value}
                                id={`form-rhf-radiogroup-${item.value}`}
                                aria-invalid={fieldState.invalid}
                              />
                            </Field>
                          </FieldLabel>
                        ))}
                      </RadioGroup>
                    </>
                  )}
                  {point.render === "select" && (
                    <>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={`${identifier}-${point.name}`}
                          aria-invalid={fieldState.invalid}
                          className="min-w-[120px]"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent align="start">
                          {point.items!.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                  {point.render === "file" && (
                    <></>
                  )}
                  {point.render === "textarea" && (
                    <></>
                  )}
                  {point.description && (
                    <FieldDescription>{point.description}</FieldDescription>
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </FieldGroup>
      </form>
    )
}