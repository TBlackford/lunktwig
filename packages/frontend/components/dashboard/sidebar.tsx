import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useStore } from '../../app/store';

import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar'

const config = genConfig({} as AvatarConfig)

const Sidebar: NextPage = () => {
    const fetchUser = useStore(state => state.fetchUser);

    useEffect(() => {
        console.log(Avatar);
    })

    return (
        <div className="min-w-[70px] border hidden md:block">
            <div className="w-full h-full flex items-end m-auto">
                <Avatar className="w-full h-12 m-[8px]" {...config} />
            </div>
        </div>
    )
}

export default Sidebar;
