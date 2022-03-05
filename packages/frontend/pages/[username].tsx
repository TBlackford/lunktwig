import { NextPage } from 'next';
import { Router, useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { LinkPayload } from '../../common/src/models';

const LinkPage: NextPage = () => {
    const [username, setUsername] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [links, setLinks] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;

        const { username } = router.query;
        setUsername(username as string);

        axios.get(process.env.NEXT_PUBLIC_API_URL + '/users/' + username)
            .then(res => {
                setLinks(res.data.links);
                setIsLoading(false);
            })
            .catch(res => {
                console.log(res);
                router.replace('/404');
            })
    }, [setUsername, router]);

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
                <h1 className="text-3xl text-center pb-[60px]">@{ username }</h1>
                <div className="max-w-full max-h-full m-[20px]">
                    {links.map((link: LinkPayload) => {
                        if (link.isActive) {
                            return (
                                <div
                                    className="min-h-[60px] border-4 border-indigo-600 mt-5 first:mt-0 flex justify-center items-center hover:bg-indigo-600 hover:text-white hover:cursor-pointer"
                                    key={link.id}>
                                    <a href={"https://" + link.url}
                                       className="align-middle w-full text-center">{link.text}</a>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default LinkPage;
