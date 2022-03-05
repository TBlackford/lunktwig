import React from 'react';
import { NextPage } from 'next';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useStore } from '../../app/store';

import LinksList from './links-list';


const LinksPanel: NextPage = () => {
    const user = useStore(state => state.user);
    const links = useStore(state => state.links);
    const addLink = useStore(state => state.addLink);
    if(!links) {
        return <div className="w-10/12 hidden md:block" />
    }

    const onClick = () => {
        addLink();
    }

    return (
        <>
            <div className="w-10/12 hidden md:block">
                <div className="border-b border-r p-[20px] text-sm">
                    <ul className="flex">
                        <li className="font-bold pl-[20px] pr-[20px]">Links</li>
                        <li className="font-bold pl-[20px] pr-[20px]">Appearance</li>
                    </ul>
                </div>
                <div className="flex h-[calc(100%-62px)] w-full bg-[#f5f6f8] border-r flex-col">
                    <div className="h-[50px] w-full pt-[30px] m-auto flex flex-col items-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]" onClick={onClick}>
                            Add Link
                        </button>
                    </div>

                    <div className="h-full">
                        <DndProvider backend={HTML5Backend}>
                            <LinksList links={user.links} />
                        </DndProvider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LinksPanel;
