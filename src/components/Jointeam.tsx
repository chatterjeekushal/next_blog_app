import React from 'react';
import Image from 'next/image';

const TeamSection = () => {
    const teamImages = [
        "https://pagedone.io/asset/uploads/1696238644.png",
        "https://pagedone.io/asset/uploads/1696238665.png",
        "https://pagedone.io/asset/uploads/1696238684.png",
    ];

    return (
        <section className="py-5 bg-gray-50 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center flex-col lg:flex-row md:mt-20">
                    <div className="w-full lg:w-1/2">
                        <h2 className="font-manrope text-5xl text-gray-900 dark:text-gray-100 font-bold leading-[4rem] mb-7 text-center lg:text-left">
                            Our leading, strong & creative team
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-16 text-center lg:text-left">
                            These people work on making our product best.
                        </p>
                        <button className="cursor-pointer py-3 px-8 w-60 bg-indigo-600 dark:bg-indigo-500 text-white text-base font-semibold transition-all duration-500 block text-center rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-600 mx-auto lg:mx-0">
                            Join our team
                        </button>
                    </div>
                    <div className="w-full lg:w-1/2 lg:mt-0 md:mt-40 mt-16 max-lg:max-w-2xl">
                        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-8">
                            {teamImages.map((src, index) => (
                                <div key={index} className="flex justify-center">
                                    <Image
                                        src={src}
                                        alt="Team member"
                                        width={176} // 44px * 4 (scaling factor)
                                        height={224} // 56px * 4 (scaling factor)
                                        className="rounded-2xl object-cover md:mt-20"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
