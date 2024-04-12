import { getNotifs } from '@/lib/helper';
import React from 'react'
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { SetNotifs } from './set-notif';
import { TopicTypes } from '@paybox/common';

export default async function NotifTab({
    jwt
}: {
    jwt: string
}) {
    const notifs = await getNotifs({
        jwt,
        topic: TopicTypes.Notif
    });
    return (
        <>
            <SetNotifs notifs={notifs} tab='Notif'>
                {notifs && <DataTable data={notifs} columns={columns} tab="Notif" />}
            </SetNotifs>
        </>
    )
}
