import { getNotifs } from '@/src/lib/helper';
import React from 'react'
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { SetNotifs } from './set-notif';
import { TopicTypes } from '@paybox/common';

export default async function MailsTab({
    jwt
}: {
    jwt: string
}) {
    const notifs = await getNotifs({
        jwt,
        topic: TopicTypes.Msg
    });
    return (
        <>
            <SetNotifs notifs={notifs} tab='Mails'>
                {notifs && <DataTable data={notifs} columns={columns} tab={"Mails"} />}
            </SetNotifs>
        </>
    )
}
