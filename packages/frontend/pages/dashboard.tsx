import React, { useEffect } from 'react';
import type { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useStore } from '../app/store';

import PreviewPanel from '../components/dashboard/preview-panel';
import LinksPanel from '../components/dashboard/links-panel';
import Sidebar from '../components/dashboard/sidebar';


const DashboardPage: NextPage = () => {
    const fetchUser = useStore(state => state.fetchUser);

    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;

        const username = String('jdoe');
        fetchUser(username, router, null);
    }, [router]);

    return (
        <>
            <div className="flex absolute h-full w-full">
                <Sidebar />

                {/* Links Panel */}
                <LinksPanel />

                {/* iPhone Panel */}
                <PreviewPanel />
            </div>
        </>
    )
}

export default DashboardPage;
