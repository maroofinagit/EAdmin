"use client";

import { useState } from "react";
import {
    Bell,
    Lock,
    User,
    Palette,
    Shield,
    CreditCard,
    Globe,
    ChevronRight,
    Moon,
    Sun,
    Monitor,
    Mail,
    Smartphone,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsClient() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    const [twoFactor, setTwoFactor] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-5xl px-6 py-10">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Settings
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage your account, preferences, and notifications.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                    {/* Sidebar */}
                    <aside className="hidden md:block">
                        <nav className="sticky top-8 space-y-1">
                            <a
                                href="#account"
                                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-sm font-medium"
                            >
                                <User className="size-4" />
                                Account
                            </a>

                            <a
                                href="#notifications"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <Bell className="size-4" />
                                Notifications
                            </a>

                            <a
                                href="#appearance"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <Palette className="size-4" />
                                Appearance
                            </a>

                            <a
                                href="#security"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <Shield className="size-4" />
                                Security
                            </a>

                            <a
                                href="#billing"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <CreditCard className="size-4" />
                                Billing
                            </a>
                        </nav>
                    </aside>

                    {/* Main */}
                    <main className="space-y-10">
                        {/* Account */}
                        <section id="account">
                            <div className="mb-4">
                                <h2 className="text-base font-semibold">
                                    Account
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Your personal account information.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card">
                                <div className="flex items-center justify-between p-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex size-11 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                                            M
                                        </div>

                                        <div>
                                            <p className="font-medium">
                                                Maroof
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                maroof@example.com
                                            </p>
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm">
                                        Edit profile
                                    </Button>
                                </div>

                                <Separator />

                                <SettingRow
                                    icon={<Globe className="size-4" />}
                                    title="Language"
                                    description="Choose your preferred language."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            English
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Globe className="size-4" />}
                                    title="Currency"
                                    description="Currency used throughout Cyber Mart."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            INR (₹)
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />
                            </div>
                        </section>

                        {/* Notifications */}
                        <section id="notifications">
                            <div className="mb-4">
                                <h2 className="text-base font-semibold">
                                    Notifications
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Decide how Cyber Mart keeps you updated.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card">
                                <SettingRow
                                    icon={<Mail className="size-4" />}
                                    title="Email notifications"
                                    description="Receive important updates through email."
                                    action={
                                        <Switch
                                            checked={emailNotifications}
                                            onCheckedChange={
                                                setEmailNotifications
                                            }
                                        />
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Smartphone className="size-4" />}
                                    title="Push notifications"
                                    description="Get notifications directly on your device."
                                    action={
                                        <Switch
                                            checked={pushNotifications}
                                            onCheckedChange={
                                                setPushNotifications
                                            }
                                        />
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Bell className="size-4" />}
                                    title="Order updates"
                                    description="Notifications about orders, shipping and delivery."
                                    action={
                                        <Switch
                                            checked={orderUpdates}
                                            onCheckedChange={setOrderUpdates}
                                        />
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Mail className="size-4" />}
                                    title="Marketing emails"
                                    description="Receive offers, promotions and product news."
                                    action={
                                        <Switch
                                            checked={marketingEmails}
                                            onCheckedChange={
                                                setMarketingEmails
                                            }
                                        />
                                    }
                                />
                            </div>
                        </section>

                        {/* Appearance */}
                        <section id="appearance">
                            <div className="mb-4">
                                <h2 className="text-base font-semibold">
                                    Appearance
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Customize how Cyber Mart looks for you.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card">
                                <SettingRow
                                    icon={
                                        darkMode ? (
                                            <Moon className="size-4" />
                                        ) : (
                                            <Sun className="size-4" />
                                        )
                                    }
                                    title="Dark mode"
                                    description="Use a darker appearance throughout the application."
                                    action={
                                        <Switch
                                            checked={darkMode}
                                            onCheckedChange={setDarkMode}
                                        />
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Monitor className="size-4" />}
                                    title="Interface density"
                                    description="Control how much content is displayed on screen."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            Comfortable
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />
                            </div>
                        </section>

                        {/* Security */}
                        <section id="security">
                            <div className="mb-4">
                                <h2 className="text-base font-semibold">
                                    Security
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Keep your Cyber Mart account secure.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card">
                                <SettingRow
                                    icon={<Lock className="size-4" />}
                                    title="Change password"
                                    description="Update your account password."
                                    action={
                                        <Button variant="outline" size="sm">
                                            Change
                                        </Button>
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Shield className="size-4" />}
                                    title="Two-factor authentication"
                                    description="Add an extra layer of security to your account."
                                    action={
                                        <Switch
                                            checked={twoFactor}
                                            onCheckedChange={setTwoFactor}
                                        />
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<Shield className="size-4" />}
                                    title="Active sessions"
                                    description="Review devices currently signed into your account."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            View
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />
                            </div>
                        </section>

                        {/* Billing */}
                        <section id="billing">
                            <div className="mb-4">
                                <h2 className="text-base font-semibold">
                                    Billing
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Manage payment and billing preferences.
                                </p>
                            </div>

                            <div className="rounded-xl border bg-card">
                                <SettingRow
                                    icon={<CreditCard className="size-4" />}
                                    title="Payment methods"
                                    description="Manage your saved payment methods."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            Manage
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />

                                <Separator />

                                <SettingRow
                                    icon={<CreditCard className="size-4" />}
                                    title="Billing history"
                                    description="View your previous transactions and invoices."
                                    action={
                                        <Button
                                            variant="ghost"
                                            className="gap-1"
                                        >
                                            View
                                            <ChevronRight className="size-4" />
                                        </Button>
                                    }
                                />
                            </div>
                        </section>

                        {/* Danger Zone */}
                        <section>
                            <div className="mb-4">
                                <h2 className="text-base font-semibold text-destructive">
                                    Danger Zone
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Irreversible actions for your account.
                                </p>
                            </div>

                            <div className="rounded-xl border border-destructive/30 bg-destructive/5">
                                <SettingRow
                                    icon={<Trash2 className="size-4" />}
                                    title="Delete account"
                                    description="Permanently delete your Cyber Mart account and associated data."
                                    action={
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                        >
                                            Delete account
                                        </Button>
                                    }
                                />
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

function SettingRow({
    icon,
    title,
    description,
    action,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-6 p-5">
            <div className="flex min-w-0 items-center gap-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            <div className="shrink-0">{action}</div>
        </div>
    );
}