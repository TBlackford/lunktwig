import React, { useCallback, useEffect, useState } from 'react';
import { NextPage } from 'next';
import update from 'immutability-helper'

import LinkItem from './link-item';

import { LinkPayload } from '../../../common/src/models';
import { useStore } from '../../app/store';

export interface LinksListProps {
    links: LinkPayload[];
}

const LinksList: NextPage<LinksListProps> = ({ links }) => {
    const user = useStore(state => state.user);
    const updateUser = useStore(state => state.updateUser);
    const updateLink = useStore(state => state.updateLink);
    const incrementReloader = useStore(state => state.incrementReloader);
    const [draggableLinks, setLinks] = useState(links);

    if(!links) {
        return <div />
    }

    const moveLink = useCallback((dragIndex: number, hoverIndex: number) => {
        setLinks((prevLinks: LinkPayload[]) => {
            prevLinks[dragIndex].position = hoverIndex + 1;
            prevLinks[hoverIndex].position = dragIndex + 1;

            updateLink(prevLinks[dragIndex]);
            updateLink(prevLinks[hoverIndex]);

            return update(prevLinks, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevLinks[dragIndex] as LinkPayload],
                ],
            })
        });
        incrementReloader();
    }, []);

    const renderLinkItem = useCallback(
        (link: LinkPayload, index: number) => {
            return (
                <LinkItem
                    key={link.id}
                    index={index}
                    item={link}
                    moveLink={moveLink}
                />
            )
        },
        [],
    );

    return (
        <div className="pt-[80px] m-auto flex flex-col items-center">
            {draggableLinks.map((link, index) => renderLinkItem(link, index))}
        </div>
    )
}

export default LinksList;
