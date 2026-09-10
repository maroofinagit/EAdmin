"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, "Full name must be at least 2 characters!")
        .max(50, "Full name must be at most 50 characters."),

    email: z
        .string()
        .email("Invalid email address!"),

    phone: z
        .string()
        .min(10, "Phone number must be at least 10 characters.")
        .max(15, "Phone number must be at most 15 characters."),

    address: z
        .string()
        .min(2, "Address must be at least 2 characters."),

    city: z
        .string()
        .min(2, "City must be at least 2 characters."),
})

const EditUser = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "John Doe",
            email: "john.doe@gmail.com",
            phone: "+1 234 5678",
            address: "123 Main St",
            city: "New York",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
    }

    return (
        <SheetContent>
            <div className="p-4 sm:p-6">
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>

                    <SheetDescription>
                        Update the user's information below.
                    </SheetDescription>
                </SheetHeader>

                <form
                    id="edit-user-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-6"
                >
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-user-full-name">
                                        Full Name
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="edit-user-full-name"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="name"
                                    />

                                    <FieldDescription>
                                        Enter user full name.
                                    </FieldDescription>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-user-email">
                                        Email
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="edit-user-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="email"
                                    />

                                    <FieldDescription>
                                        Only admin can see the user's email.
                                    </FieldDescription>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-user-phone">
                                        Phone
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="edit-user-phone"
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="tel"
                                    />

                                    <FieldDescription>
                                        Only admin can see the user's phone number.
                                    </FieldDescription>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-user-address">
                                        Address
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="edit-user-address"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="street-address"
                                    />

                                    <FieldDescription>
                                        Enter user address.
                                    </FieldDescription>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="city"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="edit-user-city">
                                        City
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id="edit-user-city"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="address-level2"
                                    />

                                    <FieldDescription>
                                        Enter user city.
                                    </FieldDescription>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Button type="submit">
                            Save Changes
                        </Button>
                    </FieldGroup>
                </form>
            </div>
        </SheetContent>
    )
}

export default EditUser