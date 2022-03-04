import React, { FunctionComponent } from 'react';

import { AppUserPayload } from '../../common/src/models';
import { NextPage } from 'next';

export interface PreviewProps {
    user: AppUserPayload
}

const PreviewPanel: NextPage<PreviewProps> = ({ user }) => {
    const url = process.env.NEXT_PUBLIC_URL + '/' + user?.username;
    return (
        <>
            <div className="h-auto border hidden md:block">
                <div className="border p-[20px] text-sm">
                    <p><span className="font-bold">My Lunktwig:</span> <a target="_blank" className="underline" href={url}>{url}</a></p>
                </div>
                <div className="flex h-[calc(100%-62px)] w-full align-middle items-center content-center p-[100px]">
                    <div className="left-[50%] bg-iphone">
                        <iframe className="w-full h-full w-[375px] h-[812px] rounded-[2rem]" src="http://localhost:3000/jdoe" title="Your Links" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviewPanel;
