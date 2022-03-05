import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord, Identifier } from 'dnd-core'

import { useStore } from '../../app/store';

import { LinkPayload } from '../../../common/src/models';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


export interface LinkItemProps {
    item: LinkPayload;
    index: number
    moveLink: (dragIndex: number, hoverIndex: number) => void
}

export interface ToggleProps {
    item: LinkPayload;
}

export interface DragItem {
    index: number
    id: string
    type: string
}

const ToggleButton: NextPage<ToggleProps> = ({ item }) => {
    const toggleLink = useStore(state => state.toggleLink);
    const incrementReloader = useStore(state => state.incrementReloader);

    const onClick = () => {
        toggleLink(item).then(res => {
            item.isActive = res;
        })
        incrementReloader();
    }

    return (
        <label htmlFor={"toggle" + item.id} className="flex items-center cursor-pointer pr-[5px] scale-75" onClick={onClick}>
            <div className="relative">
                <input type="checkbox" id={"toggle" + item.id} className="sr-only" defaultChecked={item.isActive} />
                <div className="block bg-gray-200 w-14 h-8 rounded-full" />
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
            </div>
        </label>
    );
}

const InputTextbox: NextPage<{ item: LinkPayload, type: 'TEXT' | 'URL', icon: IconDefinition, isBold: boolean }> = ({item, type, icon, isBold }) => {
    const [isEdit, setIsEdit] = useState(false);
    const updateLink = useStore(state => state.updateLink);
    const incrementReloader = useStore(state => state.incrementReloader);

    const onClick = () => {
        setIsEdit(true);
    }
    const onChange = (e) => {
        if (e.type === 'keydown' && e?.key === 'Enter') {
            const value = e.target.value;
            setIsEdit(false);

            item[type.toLowerCase()] = value;
            updateLink(item);
            incrementReloader();
        }
    };
    if(isEdit) {
        return (
            <div className="flex">
                <input className={isBold ? "font-bold pr-[5px]" : "pr-[5px]"} defaultValue={item[type.toLowerCase()]} readOnly={false} required={true} onBlur={onChange} onKeyDown={onChange} />
            </div>
        );
    } else {
        return (
            <div className="flex">
                <p className={isBold ? "font-bold pr-[5px] min-w-[90px]" : "pr-[5px] min-w-[90px]"}>{item[type.toLowerCase()]}</p><FontAwesomeIcon className="cursor-pointer" icon={icon} onClick={onClick}/>
            </div>
        );
    }
}

const LinkItem: NextPage<LinkItemProps> = ({ item, index, moveLink }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop<
            DragItem,
            void,
            { handlerId: Identifier | null }
        >({
        accept: 'LINK',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (!dragIndex) {
                return;
            }

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveLink(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ opacity }, drag, preview] = useDrag(() => ({
        type: 'LINK',
        item: () => {
            return { index }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
        }),
    }));

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <div ref={preview} className="border bg-white min-w-[32rem] flex m-[5px]"  style={{ opacity }}>
                <div className="border-r p-[10px] align-middle">
                    <svg viewBox="0 0 16 16" color="palette.blueGrey5" enableBackground="new 0 0 24 24" className="h-full cursor-pointer position-dots">
                        <path d="M6 2C6 0.9 6.9 0 8 0C9.1 0 10 0.9 10 2C10 3.1 9.1 4 8 4C6.9 4 6 3.1 6 2M6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8M6 14C6 12.9 6.9 12 8 12C9.1 12 10 12.9 10 14C10 15.1 9.1 16 8 16C6.9 16 6 15.1 6 14"/>
                    </svg>
                </div>
                <div className="p-[20px] m-[10px]">
                    <InputTextbox item={item} type={'TEXT'} icon={faPencil} isBold={true} />
                    <InputTextbox item={item} type={'URL'} icon={faPencil} isBold={false} />
                </div>
                <div className="w-full pt-[5px]">
                    <div className="flex items-center justify-end w-full mb-12">
                        <ToggleButton item={item} />
                    </div>
                    <div className="flex items-end justify-end w-full">
                        <FontAwesomeIcon className="cursor-pointer pr-[20px]" icon={faTrashCan} color="#f57a7a" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkItem;
