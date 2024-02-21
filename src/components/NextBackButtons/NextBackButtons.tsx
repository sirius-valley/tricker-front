import React from 'react';
import Body1 from '@utils/typography/body1/body1'

export type NavProps = {
    onNext: () => void;
    onBack: () => void;
}

const PageNavigation: React.FC<NavProps> = ({onBack, onNext}) => {
    return (
        <div className='w-full flex justify-center '>
            <button
                className='w-[273px] h-[51px] gap-3 rounded-xl bg-transparent hover:bg-gray-400 border border-primary-400 text-white px-4 mr-6 transition-all duration-300 ease-in-out focus:outline-none'
                onClick={onBack}
            >
                <Body1>Back</Body1>
            </button>
            <button
                className='w-[273px] h-[51px] gap-3 rounded-xl bg-primary-400 hover:bg-primary-500 text-black px-4 transition-all duration-300 ease-in-out focus:outline-none'
                onClick={onNext}
            >
                <Body1>Next</Body1>
            </button>
        </div>
    );
};

export default PageNavigation;