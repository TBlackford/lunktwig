import React from 'react';

import { NextPage } from 'next';
import { useStore } from '../../app/store';


const PreviewPanel: NextPage = () => {
    const user = useStore(state => state.user);
    const iframeReloader = useStore(state => state.iframeReloader);

    const url = process.env.NEXT_PUBLIC_URL + '/' + user?.username;
    return (
        <>
            <div className="h-auto hidden md:block">
                <div className="border-b p-[20px] text-sm">
                    <p><span className="font-bold">My Lunktwig:</span> <a target="_blank" className="underline" href={url}>{url}</a></p>
                </div>
                <div className="flex h-[calc(100%-62px)] w-full align-middle items-center content-center p-[100px] bg-[#f5f6f8]">
                    <div className="left-[50%] bg-iphone">
                        <iframe key={iframeReloader} className="w-full h-full w-[375px] h-[812px] rounded-[2rem]" src="http://localhost:3000/jdoe" title="Your Links" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreviewPanel;
