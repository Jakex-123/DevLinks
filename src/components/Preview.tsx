import Mockup from '/public/images/illustration-phone-mockup.svg';
import Arrow from '/public/images/icon-arrow-right.svg'
import { formatPlatformName, options } from '@/utils/options';
import Image from 'next/image';
import Link from 'next/link';

const getColour = (platform: string) => {
    return options.find(option => option.value === platform)?.color;
}

const PreviewLink = ({ link }: { link: any }) => {
    const color = getColour(link?.platform); // Use link.value for the color
    return (
        <Link href={link.url} target='_blank'>
        <button
            style={{ backgroundColor: color }}
            className={`cursor-pointer w-[237px] h-[44px] border rounded-lg flex items-center justify-between p-2 ${color === "#FFFFFF" ? 'text-black' : 'text-white'}`}
        >
            <div className='x flex items-center'>
                <Image src={`/images/icon-${link.platform}.svg`} width={20} height={20} alt={link.label} />
                <p className='ml-2'>{formatPlatformName(link.platform)}</p> 
            </div>
            <div className='w-4 h-4'>
                <Arrow/>
            </div>
        </button>
        </Link>
    );
};

const Preview = ({ links }: { links: any[] }) => {
    return (
        <div className='w-full lg:w-[40%] p-[100px] flex justify-center bg-white rounded-xl'>
            <div className="relative">
                <Mockup />
                <div className='absolute top-[278px] left-9 flex flex-col gap-5'>
                    {links?.map((link) => (
                        <PreviewLink key={link?.id} link={link} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preview;
