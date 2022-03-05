import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { LinkPayload } from '../../common/src/models';

export interface LinkItemProps {
    item: LinkPayload;
}

const ToggleButton: NextPage<LinkItemProps> = ({ item }) => {
    const onClick = () => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id + ((item.isActive) ? '/disable' : '/enable');

        axios.get(url)
            .then(res => {
                console.log(res);
            });
    }
    return (
        <label htmlFor={"toggle" + item.id} className="flex items-center cursor-pointer pr-[5px] scale-75" onClick={onClick}>
            <div className="relative">
                <input type="checkbox" id={"toggle" + item.id} className="sr-only" checked={item.isActive} />
                <div className="block bg-gray-200 w-14 h-8 rounded-full" />
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
            </div>
        </label>
    )
}

const LinkItem: NextPage<LinkItemProps> = ({ item }) => {

    return (
        <div className="bg-white min-w-[32rem] flex m-[5px]">
            <div className="border-r p-[10px] align-middle">
                <svg viewBox="0 0 16 16" color="palette.blueGrey5" enableBackground="new 0 0 24 24" className="h-full cursor-pointer position-dots">
                    <path d="M6 2C6 0.9 6.9 0 8 0C9.1 0 10 0.9 10 2C10 3.1 9.1 4 8 4C6.9 4 6 3.1 6 2M6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8M6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16C6.9 16 6 15.1 6 14"/>
                </svg>
            </div>
            <div className="p-[20px] m-[10px]">
                <div className="flex"><p className="font-bold pr-[5px]">{item.text}</p><FontAwesomeIcon className="cursor-pointer" icon={faPencil} /></div>
                <div className="flex"><p className="pr-[5px]">{item.url}</p><FontAwesomeIcon className="cursor-pointer" icon={faPencil} /></div>
            </div>
            <div className="w-full pt-[5px]">
                <div className="flex items-center justify-end w-full mb-12">
                    <ToggleButton item={item}  />
                    {/*<label htmlFor={"toggle" + item.id} className="flex items-center cursor-pointer pr-[5px] scale-75">*/}
                    {/*    <div className="relative">*/}
                    {/*        <input type="checkbox" id={"toggle" + item.id} className="sr-only" />*/}
                    {/*        <div className="block bg-gray-200 w-14 h-8 rounded-full" />*/}
                    {/*        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />*/}
                    {/*    </div>*/}
                    {/*</label>*/}
                </div>
                <div className="flex items-end justify-end w-full">
                    <FontAwesomeIcon className="cursor-pointer pr-[20px]" icon={faTrashCan} color="#f57a7a" />
                </div>
            </div>
        </div>
    )
}

export default LinkItem;
