import React, { FunctionComponent } from 'react';
import { NextPage } from 'next';

import { LinkPayload } from '../../common/src/models';
import LinksList from './links-list';

export interface LinksProps {
    links: LinkPayload[]
}

const LinksPanel: NextPage<LinksProps> = ({ links }) => {
    return (
        <>
            <div className="w-10/12 hidden md:block">
                <div className="border-b border-r p-[20px] text-sm">
                    <ul className="flex">
                        <li className="font-bold pl-[20px] pr-[20px]">Links</li>
                        <li className="font-bold pl-[20px] pr-[20px]">Appearance</li>
                    </ul>
                </div>
                <div className="h-[calc(100%-62px)] w-full bg-[#f5f6f8]">
                    <div className="h-full border-r">
                        <LinksList links={links} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LinksPanel;
