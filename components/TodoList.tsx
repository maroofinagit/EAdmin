"use client";

import { useState } from "react";
import {
    CalendarIcon,
    Check,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};

const initialTodoItems: TodoItem[] = [
    {
        id: 1,
        text: "Review and confirm new customer orders.",
        completed: false,
    },
    {
        id: 2,
        text: "Update product inventory for recently sold items.",
        completed: true,
    },

];

export default function TodoList() {
    const [todoItems, setTodoItems] =
        useState<TodoItem[]>(initialTodoItems);

    // Keeps track of the last saved version
    const [savedTodoItems, setSavedTodoItems] =
        useState<TodoItem[]>(initialTodoItems);

    const [date, setDate] = useState<Date>();
    const [open, setOpen] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState("");
    const [isNewTask, setIsNewTask] = useState(false);
    const [newTaskText, setNewTaskText] = useState("");


    // Check whether there are unsaved changes
    const hasUnsavedChanges =
        JSON.stringify(todoItems) !== JSON.stringify(savedTodoItems);

    const toggleTodo = (id: number) => {
        setTodoItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        completed: !item.completed,
                    }
                    : item
            )
        );
    };

    const startEditing = (item: TodoItem) => {
        setEditingId(item.id);
        setEditingText(item.text);
    };

    const saveEdit = (id: number) => {
        const text = editingText.trim();

        if (!text) return;

        if (isNewTask) {
            const newTodo: TodoItem = {
                id,
                text,
                completed: false,
            };

            setTodoItems((prev) => [...prev, newTodo]);

            toast.success("Task added successfully!");
        } else {
            setTodoItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            text,
                        }
                        : item
                )
            );

            toast.success("Task updated successfully!");
        }

        setEditingId(null);
        setEditingText("");
        setIsNewTask(false);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingText("");
        setIsNewTask(false);
    };

    const deleteTodo = (id: number) => {
        setTodoItems((prev) =>
            prev.filter((item) => item.id !== id)
        );

    };

    const addTodo = () => {
        const newId = Date.now();

        setEditingId(newId);
        setEditingText("New vendor task");
        setIsNewTask(true);
        setNewTaskText("New vendor task");
    };

    const savePendingTasks = () => {
        setSavedTodoItems(todoItems);

        toast.success("Tasks saved successfully!");
    };

    const handleSaveNewTask = () => {
        const text = newTaskText.trim();

        if (!text) return;

        const newTodo: TodoItem = {
            id: Date.now(),
            text,
            completed: false,
        };

        setTodoItems((prev) => [...prev, newTodo]);
        setIsNewTask(false);
        setNewTaskText("");    };

    return (
        <div className="flex flex-col h-full">
            <div className="mb-6 flex items-center justify-between gap-2">
                <h1 className="md:text-lg font-medium">
                    Vendor Tasks
                </h1>

                <div className="flex md:flex-row flex-col gap-2">
                    {hasUnsavedChanges && (
                        <Button
                            size="sm"
                            className="cursor-pointer"
                            onClick={savePendingTasks}
                        >
                            <Check />
                            Save Pending Task
                        </Button>
                    )}

                    <Button
                        className="cursor-pointer"
                        size="sm"
                        onClick={addTodo}
                    >
                        <Plus />
                        Add Task
                    </Button>
                </div>
            </div>

            <Popover
                open={open}
                onOpenChange={setOpen}
            >
                <PopoverTrigger
                    render={
                        <Button className="w-full">
                            <CalendarIcon />
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    }
                />

                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>

            {isNewTask && (
                <Card className="mt-4 p-4 flex justify-center">
                    <div className="flex items-center gap-3">
                        <Checkbox disabled />

                        <Input
                            autoFocus
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            className="flex-1 text-xs md:text-sm"
                        />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            onClick={handleSaveNewTask}
                        >
                            <Check />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-pointer"
                            onClick={() => {
                                setIsNewTask(false);
                                setNewTaskText("");
                            }}
                        >
                            <X />
                        </Button>
                    </div>
                </Card>
            )}

            {todoItems.length > 0 ? (
                <ScrollArea className="mt-4 h-full overflow-y-auto">
                    <div className="flex flex-col gap-3 p-2">
                        {todoItems.map((item) => (
                            <Card
                                key={item.id}
                                className="p-4"
                            >
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={item.completed}
                                        onCheckedChange={() =>
                                            toggleTodo(item.id)
                                        }
                                    />

                                    {editingId === item.id ? (
                                        <Input
                                            autoFocus
                                            value={editingText}
                                            onChange={(e) =>
                                                setEditingText(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    saveEdit(item.id);
                                                }

                                                if (e.key === "Escape") {
                                                    cancelEdit();
                                                }
                                            }}
                                            className="flex-1 text-xs md:text-sm"
                                        />
                                    ) : (
                                        <span
                                            className={`flex-1 text-sm md:text-base ${item.completed
                                                ? "text-muted-foreground line-through "
                                                : ""
                                                }`}
                                        >
                                            {item.text}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-1">
                                        {editingId === item.id ? (
                                            <>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="cursor-pointer"
                                                    onClick={() => saveEdit(item.id)}
                                                >
                                                    <Check />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="cursor-pointer"
                                                    onClick={cancelEdit}
                                                >
                                                    <X />
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="cursor-pointer"
                                                onClick={() => startEditing(item)}
                                            >
                                                <Pencil />
                                            </Button>
                                        )}

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive cursor-pointer"
                                            onClick={() =>
                                                deleteTodo(item.id)
                                            }
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="mt-4 text-center text-muted-foreground h-full flex items-center justify-center">
                    No tasks available. Click "Add Task" to create one.
                </div>
            )}
        </div>
    );
}