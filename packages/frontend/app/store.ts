import create, { GetState } from "zustand";

import { AppUserPayload, LinkPayload } from '../../common/src/models';

interface State {
    // Variables
    user?: AppUserPayload | null;
    links?: Record<number, LinkPayload> | null;

    // Functions
    fetchUser: (username: string) => void;
    toggleLink: (item: LinkPayload) => void;
}

const linksToMap = (links: LinkPayload[]): Record<number, LinkPayload> => {
    let map = {};
    for (const key in links) {
        map[links[key].id] = links[key];
    }
    return map;
}

const linkToMap = (get: GetState<State>, id: number, link: LinkPayload): Record<number, LinkPayload> => {
    let links = get().links
    let map = {};
    for (const key in links) {
        map[links[key].id] = links[key];
    }
    map[id] = link;
    return map;
}

export const useStore = create<State>((set, get) => ({
    // Variables
    user: null,
    links: null,

    // Functions
    fetchUser: async (username) => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users/' + username)
        const json = await response.json();
        console.log(json);
        set({ user: json.user, links: linksToMap(json.user.links) })
    },
    toggleLink: async (item) => {
        const url = process.env.NEXT_PUBLIC_API_URL + '/link/' + item.id + ((item.isActive) ? '/disable' : '/enable');
        const response = await fetch(url)
        const json = await response.json();
        console.log(json);
        set({ links: linkToMap(get, item.id, json.link) })
    }
}));
