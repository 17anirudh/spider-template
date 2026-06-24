"use client";

import type { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";
import type { Schema } from "./data";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

type Props = {
    field: ControllerRenderProps<Record<string, unknown>, string>
    fieldState: ControllerFieldState
    point: Schema
    identifier: string
}

export default function({ field, fieldState, point, identifier }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    function previewFile(file: File): void {
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob);
        window.open(url);
    }
    return (
        <>
            <Input
                type="file"
                onChange={(e) => {
                    field.onChange(e.target.files)
                    setFiles([...files, ...Array.from(e.target.files || [])])
                }}
                onBlur={field.onBlur}
                value={field.value as string}
                id={`${identifier}-${point.name}`}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                hidden
                multiple
                ref={fileInputRef}
            />
            <Button
                type="button"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    fileInputRef.current?.click()
                }}
                variant="outline"
            >
                Upload files
            </Button>
            <div>
                {files!.length > 0 && (
                    <>
                        {Array.from(files!).map((file, index) => (
                            <p key={index}>
                                <span>{file.name}</span>
                                <span>{file.size}</span>
                                <Button onClick={() => previewFile(file)}>Preview</Button>
                                <Button 
                                    variant="destructive"
                                    onClick={() => {
                                        const newFiles = Array.from(files!).filter((_, i) => i !== index)
                                        setFiles(newFiles)
                                    }}
                                >
                                    Remove</Button>
                            </p>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}