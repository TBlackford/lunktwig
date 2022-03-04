import React, { FunctionComponent } from 'react';
import { NextPage } from 'next';

import { LinkPayload } from '../../common/src/models';

export interface PreviewProps {
    links: LinkPayload[]
}

const PreviewPanel: NextPage<PreviewProps> = ({ links }) => {
    if(!links) {
        return <div />
    }
    return (
        <div className="w-10/12 border">
            {links.map((link: LinkPayload) => {
                return (
                    <div>
                        <p>{link.text}</p>
                        <p>{link.url}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default PreviewPanel;
