import create, { GetState } from "zustand";

import { AppUserPayload, LinkPayload } from '../../common/src/models';
import { NextRouter } from 'next/router';
import axios from 'axios';

interface State {
    // Variables
    user?: AppUserPayload | null;
    links?: Record<number, LinkPayload> | null;
    iframeReloader: number;

    // Functions
    fetchUser: (username: string, router: NextRouter, setIsLoading: any) => void;
    updateUser: (user: AppUserPayload) => void;
    toggleLink: (item: LinkPayload) => Promise<boolean>;
    updateLink: (item: LinkPayload) => void;
    createLink: (item: LinkPayload) => void;
    addLink: () => void;
    incrementReloader: () => void;
}

const linksToMap = (links: LinkPayload[]): Record<number, LinkPayload> => {
    let map = {};
    links = links.sort((a: LinkPayload, b: LinkPayload) => {
        return (a.position > b.position) ? 1 : -1
    });
    for (const key in links) {
        map[links[key].position] = links[key];
    }
    return map;
}

const linkToMap = (get: GetState<State>, position: number, link: LinkPayload): Record<number, LinkPayload> => {
    let links = get().links
    let map = {};
    for (const key in links) {
        map[links[key].position] = links[key];
    }
    map[position] = link;
    return map;
}

export const useStore = create<State>((set, get) => ({
    // Variables
    user: null,
    links: null,
    iframeReloader: 0,

    // Functions
    fetchUser: async (username, router, setIsLoading) => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + '/users/' + username)
            .then(res => {
                res.data.links = res.data.links.sort((a: LinkPayload, b: LinkPayload) => {
                    return (a.position > b.position) ? 1 : -1
                });
                set({ user: res.data, links: linksToMap(res.data.links) });
                if(setIsLoading) {
                    setIsLoading(false);
                }
            })
            .catch(res => {
                router.replace('/404');
            })
    },
    updateUser: async (user: AppUserPayload) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/users/' + user.username;
        axios.post(url, user)
            .then(res => {
                set({ user: res.data, links: linksToMap(res.data.links) });
            })
            .catch(err => {
                console.log(err);
            })
    },
    toggleLink: async (item): Promise<boolean> => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id + ((item.isActive) ? '/disable' : '/enable');
        const response = await fetch(url);
        const json = await response.json();
        set({ links: linkToMap(get, item.id, json) });
        return json.isActive;
    },
    updateLink: async (item) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id;
        axios.post(url, item)
            .then(res => {
                set({ links: linkToMap(get, item.id, res.data) });
            })
            .catch(res => {
                console.log(res);
            })
    },
    createLink:  async (item) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/';
        axios.post(url, item)
            .then(res => {
                set({ links: linkToMap(get, item.id, res.data) });
            })
            .catch(res => {
                console.log(res);
            })
    },
    addLink: () => {
        const user = get().user;
        const link = {
            url: 'Enter URL',
            isActive: false,
            text: 'Enter text',
            userId: user.id,
            position: parseInt(String(get().user.links.length + 1))
        } as LinkPayload;
        user.links.push(link);

        set({user, links: linkToMap(get, parseInt(String(get().user.links.length)), link)});
    },

    incrementReloader: () => { set({ iframeReloader: get().iframeReloader + 1 })}
}));
