import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useStore } from '../app/store';

import { LinkPayload } from '../../common/src/models';

const UserLinkList: NextPage<{links?: Record<number, LinkPayload> | null;}> = ({ links }) => {
    if(!links) {
        return null;
    }
    return (
        <>
            {Object.keys(links).map((key, index) => {
                if (links[key].isActive) {
                    return (
                        <div
                            className="min-h-[60px] border-4 border-indigo-600 mt-5 first:mt-0 flex justify-center items-center hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
                            key={links[key].id}>
                            <a href={"https://" + links[key].url}
                               className="align-middle w-full text-center">{links[key].text}</a>
                        </div>
                    )
                }
            })}
        </>
    )
}

const LinkPage: NextPage = () => {
    const user = useStore(state => state.user);
    const links = useStore(state => state.links);
    const fetchUser = useStore(state => state.fetchUser);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;

        const username = String(router.query.username);
        fetchUser(username, router, setIsLoading);
    }, [router]);

    if (isLoading) {
        return (
            <div className="max-w-[680px] m-auto pt-[60px] flex-col justify-evenly pt-[24px] pb-[12px]">
                Loading...
            </div>
        )
    }
    return (
        <>
            {/* This is the background colour */}
            <div className="fixed bg-cover bg-amber-300 bg-no-repeat bg-center z-[-1] w-full h-full" />

            <div className="max-w-[680px] m-auto pt-[60px] flex-col justify-evenly pt-[24px] pb-[12px]">
                <h1 className="text-3xl text-center pb-[60px]">@{ user.username }</h1>
                <div className="max-w-full max-h-full m-[20px]">
                    <UserLinkList links={links} />
                </div>
            </div>
        </>
    )
}

export default LinkPage;
