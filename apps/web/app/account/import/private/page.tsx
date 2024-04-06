import { ImportAccountSecret } from '@paybox/common'
import React from 'react'
import { PrivateKeyForm } from './import-private'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/util'

export default async function PrivateImportPage() {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user.jwt;
    return (
        <>
            <div className="h-screen flex items-center justify-center">
                <PrivateKeyForm jwt={jwt}/>
            </div>
        </>
    )
}
