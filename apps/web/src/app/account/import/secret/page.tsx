import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/app/api/auth/[...nextauth]/util'

import { Wrapper } from './wrapper'


export default async function PrivateImportPage() {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user.jwt;
    return (
        <>
            <div className="flex items-center justify-center p-4">
                <Wrapper jwt={jwt}/>
            </div>
        </>
    )
}
