"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getColors } from "@/data/Colors";

interface AddColorSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddColorSheet({
    open,
    onOpenChange,
}: AddColorSheetProps) {
    const [name, setName] = useState("");
    const [hex, setHex] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedHex = hex.trim();

        if (!trimmedName || !trimmedHex) return;

        const colors = await getColors();

        const colorExists = colors.some(
            (color) =>
                color.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (colorExists) {
            toast.error("This color already exists.");
            return;
        }

        const newColor = {
            name: trimmedName,
            hex: trimmedHex,
        };

        console.log("New color:", newColor);

        // TODO: Add newColor to your API/database

        toast.success("Color added successfully!");

        setName("");
        setHex("");
        onOpenChange(false);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setName("");
            setHex("");
        }

        onOpenChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent className="pt-6 pb-12 px-4">
                <SheetHeader>
                    <SheetTitle>Add Color</SheetTitle>

                    <SheetDescription>
                        Create a new product color for your store.
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col"
                >
                    <div className="flex-1 space-y-6 px-4 py-6">
                        <div className="space-y-4">
                            <Label htmlFor="color-name">
                                Color Name
                            </Label>

                            <Input
                                id="color-name"
                                placeholder="e.g. Cyan"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="color-hex">
                                Hex Code
                            </Label>

                            <div className="flex items-center gap-3">
                                <Input
                                    id="color-hex"
                                    placeholder="#00FFFF"
                                    value={hex}
                                    onChange={(e) => setHex(e.target.value)}
                                    required
                                />

                                {hex && (
                                    <div
                                        className="size-10 shrink-0 rounded-full border"
                                        style={{
                                            backgroundColor: hex,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <SheetFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="cursor-pointer"
                        >
                            Add Color
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}