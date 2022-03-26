import type { NextPage } from 'next'
import React from 'react';

const Home: NextPage = () => {
    return (
        <div>
            <nav className="border-b border-r p-[20px] text-sm flex">
                <ul className="flex items-start w-6/12 text-center">
                    <li className="font-bold pl-[20px] pr-[20px] px-4 py-2">Links</li>
                    <li className="font-bold pl-[20px] pr-[20px] px-4 py-2">Appearance</li>
                </ul>

                <ul className="flex items-end w-6/12 flex-row-reverse text-center">
                    <a href="/signup">
                        <li className="font-bold pl-[20px] pr-[20px] px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded-lg shadow-sm">
                            Sign up
                        </li>
                    </a>

                    <a href="/login">
                        <li className="font-bold pl-[20px] pr-[20px] px-4 py-2">Login</li>
                    </a>
                </ul>
            </nav>

            <div className="container">
                <p>Home Page</p>
            </div>
        </div>
    )
}

export default Home
