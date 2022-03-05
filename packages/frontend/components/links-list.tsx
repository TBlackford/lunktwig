import React from 'react';
import { NextPage } from 'next';

import LinkItem from './LinkItem';

import { LinkPayload } from '../../common/src/models';

export interface LinksListProps {
    links: LinkPayload[]
}

const LinksList: NextPage<LinksListProps> = ({ links }) => {
    if(!links) {
        return <div />
    }

    links.sort((a: LinkPayload, b: LinkPayload) => {
        if (a.position > b.position) {
            return 1
        } else {
            return -1;
        }
    })

    return (
        <div className="pt-[30px] m-auto flex flex-col items-center">
            {links.map((link: LinkPayload) => <LinkItem item={link} /> )}
        </div>
    )
}

export default LinksList;
