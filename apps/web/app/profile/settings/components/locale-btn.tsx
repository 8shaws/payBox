"use client";
import { CommandMenu } from '@/components/combo-box';
import { Button } from '@/components/ui/button';
import { langs } from '@/lib/contants';
import { updateLocale } from '@/lib/helper';
import { getLocaleName } from '@/lib/utils';
import { Locales } from '@paybox/common';
import { clientJwtAtom, localeAtom } from '@paybox/recoil';
import { ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

function LocaleButton({
    locale
}: {
    locale: Locales
}) {
    const [open, setOpen] = React.useState(false);
    let [changedLocale, setChangedLocale] = React.useState<string>();
    const [localeState, setLocale] = useRecoilState(localeAtom);
    const jwt = useRecoilValue(clientJwtAtom);

    useEffect(() => {
        setLocale(locale);
    }, [locale]);

    useEffect(() => {
        if (changedLocale) {
            if(jwt) {
                toast.promise(updateLocale(jwt, changedLocale as Locales), {
                    loading: 'Updating locale...',
                    success: () => {
                        setLocale(changedLocale as Locales);
                        return 'Locale updated successfully';
                    },
                    error: ({msg}) => {
                        return msg || 'Failed to update locale';
                    }
                });
            } else {
                toast.error('Auth Token not found. Please login again.');

            }
        }
    }, [changedLocale]);

    return (
        <>
            <div className='w-full' onClick={() => {
                setOpen(true);
            }}>
                <Button variant={"secondary"} className="w-full justify-between">
                    <span className="">Display Language</span>
                    <span className="text-muted-foreground flex gap-x-1 items-center">{getLocaleName(locale)} <ChevronRight className="w-4 h-4" /></span>
                </Button>
            </div>
            <CommandMenu
                onSelect={setChangedLocale}
                options={langs}
                setOpen={setOpen}
                strokeKey='l'
                open={open}
                heading='Languages'
                selected={localeState}
            />
        </>
    )
}

export default LocaleButton