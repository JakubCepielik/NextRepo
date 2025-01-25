'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { usePathname } from 'next/navigation';

function Protected({children}) {
    const { user } = useAuth();

    useLayoutEffect(() => {
        if (!user){
            redirect(`/user/login`);
        }
    }, []);
    return ( <>
    { children }
    </> );
}

export default Protected;