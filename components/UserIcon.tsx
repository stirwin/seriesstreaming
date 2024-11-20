"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function UserIcon() {

    const session = useSession();

    console.log(session);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-8 h-8 rounded cursor-pointer">
                    <Image src={session.data?.user?.image || '/default-image.png'} alt="User Icon" height={32} width={32} className="rounded" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className='flex items-center justify-center'>
                    <LogOut/>
                    <span className='font-medium'>Cerrar Sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        // <div className="w-8 h-8 rounded cursor-pointer">
        //     <Image src={session.data?.user?.image || '/default-image.png'} alt="User Icon" height={32} width={32} className="rounded" />
        // </div>
    )
}
