import type { NextPage } from 'next';

const DashboardPage: NextPage = () => {
    return (
        <div className="flex p-[12px]">
            {/* Links Panel */}
            <div className="w-8/12">
                Links Panel
            </div>
            {/* iPhone Panel */}
            <div className="w-4/12 h-full">
                iPhone Panel

                <div className="flex justify-center relative w-[100%]">
                    <div className="bg-iphone">
                        <iframe className="w-full h-full" src="http://localhost:3000/jdoe" title="Your Links" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
