"use client";
import React from 'react';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from 'react-share';
import { Facebook, FacebookIcon, LucideIcon, Mail, Phone, PhoneCall, Twitch, Twitter, XIcon } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

export function Share({
    url,
    title
}: {
    url: string,
    title: string,
}) {
    return (
        <>
            <div className="flex flex-row gap-x-2">
                <FacebookShareButton url={url} title={title}>
                    <Button
                        variant={"ghost"}
                        className='rounded-full px-2  text-muted-foreground dark:hover:bg-muted dark:hover:text-slate-100'
                    >
                        <Facebook className='w-5 h-5' />
                    </Button>
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                    <Button
                        variant={"ghost"}
                        className='rounded-full px-2  text-muted-foreground dark:hover:bg-muted dark:hover:text-slate-100'
                    >
                        <Twitter className={cn(
                            'w-5 h-5 '
                        )} />
                    </Button>
                </TwitterShareButton>
                <WhatsappShareButton url={url} title={title}>
                    <Button
                        variant={"ghost"}
                        className='rounded-full px-2 text-muted-foreground dark:hover:bg-muted dark:hover:text-slate-100'
                    >
                        <Phone className={cn(
                            'w-5 h-5 '
                        )} />
                    </Button>
                </WhatsappShareButton>
                <EmailShareButton url={url} title={title}>
                    <Button
                        variant={"ghost"}
                        className='rounded-full px-2 text-muted-foreground dark:hover:bg-muted dark:hover:text-slate-100'
                    >
                        <Mail className={cn(
                            'w-5 h-5 '
                        )} />
                    </Button>
                </EmailShareButton>
            </div>
        </>
    )
}
