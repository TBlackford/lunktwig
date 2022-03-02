import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { LinkPayload } from '../../common/src/models';

const LinkPage: NextPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>();
    const [links, setLinks] = useState([]);


    useEffect(() => {
        if(!router.isReady) return;

        const { username } = router.query;
        setUsername(username as string);

        axios.get(process.env.NEXT_PUBLIC_API_URL + '/users/' + username)
            .then(res => {
                console.log(res.data);
                setLinks(res.data.links);
            })
    }, [setUsername, router])

    return (
        <div>
            <h1 className="title">{ username }</h1>
            <ul>
                {links.map((link: LinkPayload) => {
                    return <li key={link.id}>{link.text}</li>
                })}
            </ul>
        </div>
    )
}

export default LinkPage;
