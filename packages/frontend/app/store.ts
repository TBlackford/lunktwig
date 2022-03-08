import create, { GetState } from "zustand";

import { AppUserPayload, LinkPayload } from '../../common/src/models';
import { NextRouter } from 'next/router';
import axios from 'axios';

interface State {
    // Variables
    user?: AppUserPayload | null;
    links?: LinkPayload[] | null;
    iframeReloader: number;

    // Functions
    fetchUser: (username: string, router: NextRouter, setIsLoading: any) => void;
    updateUser: (user: AppUserPayload) => void;
    toggleLink: (item: LinkPayload) => Promise<boolean>;
    updateLink: (item: LinkPayload) => void;
    createLink: (item: LinkPayload) => void;
    addLink: () => void;
    deleteLink: (id: number) => void;
    incrementReloader: () => void;
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
                set({ user: res.data, links: res.data.links });
                if(setIsLoading) {
                    setIsLoading(false);
                }
            })
            .catch(res => {
                console.log(res);
            })
    },
    updateUser: async (user: AppUserPayload) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/users/' + user.username;
        axios.post(url, user)
            .then(res => {
                set({ user: res.data, links: res.data.links });
            })
            .catch(err => {
                console.log(err);
            })
    },
    toggleLink: async (item): Promise<boolean> => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id + ((item.isActive) ? '/disable' : '/enable');
        const response = await fetch(url);
        const json = await response.json();
        set((state) => ({ ...state, links: [...state.links, json] }));
        return json.isActive;
    },
    updateLink: async (item) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id;
        axios.post(url, item)
            .then(res => {
                set({ links: [...get().links, res.data] });
            })
            .catch(res => {
                console.log(res);
            })
    },
    createLink:  async (item) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/';
        axios.post(url, item)
            .then(res => {
                set({ links: res.data });
            })
            .catch(res => {
                console.log(res);
            })
    },
    addLink: async () => {
        const user = get().user;
        const links = get().links;
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/user/' + user.username + '/create';
        await axios.get(url)
            .then(res => {
                user.links = [...links, { ...res.data } as LinkPayload]
                set((state) => ({ ...state, links: [...state.links, { ...res.data } as LinkPayload] }))
                // This is janky. TODO: find out why the state isn't being updated on the FE
                get().incrementReloader();
                console.log('during', get().links);
            })
            .catch(res => {
                console.log(res);
            });
    },
    deleteLink: (id: number) => {
        const user = get().user;
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + String(id);
        axios.delete(url)
            .then(res => {
                const links = get().links.filter(link => link.id !== id);
                user.links = links;

                set({ user: user, links: links });
                get().incrementReloader();
            })
            .catch(res => {
                console.log(res);
            });
    },
    incrementReloader: () => { set({ iframeReloader: get().iframeReloader + 1 })}
}));
