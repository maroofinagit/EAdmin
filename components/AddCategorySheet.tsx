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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AddCategorySheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddCategorySheet({
    open,
    onOpenChange,
}: AddCategorySheetProps) {
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;

        const category = {
            name: name.trim(),
            productCount: 0,
            isActive,
        };

        console.log("New category:", category);

        // TODO: Send category to your API/database

        toast.success("Category added successfully!");
        setName("");
        setIsActive(true);
        onOpenChange(false);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setName("");
            setIsActive(true);
        }

        onOpenChange(open);
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent className=" pt-6 pb-12 px-4">
                <SheetHeader>
                    <SheetTitle>Add Category</SheetTitle>
                    <SheetDescription>
                        Create a new product category for your store.
                    </SheetDescription>
                </SheetHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col"
                >
                    <div className="flex-1 space-y-6 px-4 py-6">
                        <div className="space-y-4">
                            <Label htmlFor="category-name">
                                Category Name
                            </Label>

                            <Input
                                id="category-name"
                                placeholder="e.g. Watches"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <Label htmlFor="category-active">
                                    Active
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Make this category available in your store.
                                </p>
                            </div>

                            <Switch
                                id="category-active"
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
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

                        <Button type="submit" className="cursor-pointer">
                            Add Category
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}