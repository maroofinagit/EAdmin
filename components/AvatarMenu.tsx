"use client"

import {
    BadgeCheckIcon,
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";

const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log("Sign out clicked");
    toast.success("Signed out successfully!");
};

export function AvatarMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer' render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
                <AvatarImage src="/avatar.png" className="object-cover bg-yellow-500" alt="shadcn" />
                <AvatarFallback>LR</AvatarFallback>
            </Avatar></Button>} />
            <DropdownMenuContent align="end">
                <DropdownMenuGroup className="space-y-2">
                    <DropdownMenuItem className='cursor-pointer'>
                        <BadgeCheckIcon />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <CreditCardIcon />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>
                        <BellIcon />
                        Notifications
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" className="text-destructive cursor-pointer focus:text-destructive-foreground" onClick={() => {handleSignOut()}}>
                    <LogOutIcon />
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
