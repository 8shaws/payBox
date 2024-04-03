import { ImportAccountSecret } from '@paybox/common'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/util'
import { ImportSecret } from './import-secret';

export default async function PrivateImportPage() {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const jwt = session?.user.jwt;
    return (
        <>
            <div className="">
                <ImportSecret jwt={jwt}/>
            </div>
        </>
    )
}
