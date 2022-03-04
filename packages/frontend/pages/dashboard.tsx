import { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import PreviewPanel from '../components/preview-panel';
import LinksPanel from '../components/links-panel';

import { AppUserPayload } from '../../common/src/models';
import { useRouter } from 'next/router';
import axios from 'axios';

const DashboardPage: NextPage = () => {
    const [user, setUser] = useState<AppUserPayload>(null);

    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;

        axios.get(process.env.NEXT_PUBLIC_API_URL + '/users/jdoe')
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(res => {
                console.log(res);
            })
    }, [router]);

    return (
        <>
            <div className="flex absolute h-full w-full">
                {/* Links Panel */}
                <LinksPanel links={user?.links} />

                {/* iPhone Panel */}
                <PreviewPanel user={user} />
            </div>
        </>
    )
}

export default DashboardPage;
