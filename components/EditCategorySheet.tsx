"use client";

import { useEffect, useState } from "react";
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
import { Category } from "@/types/Product";


interface EditCategorySheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: Category | null;
    onCategoryUpdate: (category: Category) => void;
}

export function EditCategorySheet({
    open,
    onOpenChange,
    category,
    onCategoryUpdate
}: EditCategorySheetProps) {
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setIsActive(category.isActive);
            setProductCount(category.productCount);
        }
    }, [category]);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!category || !name.trim()) return;

        const updatedCategory = {
            ...category,
            name: name.trim(),
            isActive,
            productCount,
        };
        onCategoryUpdate(updatedCategory as Category);

        console.log("Updated category:", updatedCategory);

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
            <SheetContent className="pt-6 pb-12 px-4">
                <SheetHeader>
                    <SheetTitle>Edit Category</SheetTitle>

                    <SheetDescription>
                        Update the details of this product category.
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
                        
                        <div className="space-y-4">
                            <Label htmlFor="category-product-count">
                                Product Count
                            </Label>

                            <Input
                                id="category-product-count"
                                placeholder="e.g. 10"
                                value={productCount}
                                onChange={(e) => setProductCount(parseInt(e.target.value) || 0)}
                                type="number"
                                min="0"
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

                        <Button
                            type="submit"
                            className="cursor-pointer"
                        >
                            Update Category
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}