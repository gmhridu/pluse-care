import React from 'react';
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Image from "next/image";

interface ButtonProps {
    isLoading: boolean;
    className?: string;
    children: React.ReactNode;
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
    return (
        <Button type={'submit'} disabled={isLoading} className={cn('shad-primary-btn w-full', className)}>
            {
                isLoading ? (
                        <div className={'flex items-center gap-2'}>
                            <Image src={'/assets/icons/loader.svg'} alt={'loader'}
                                   width={24}
                                   height={24}
                                   className={'animate-spin'}
                            />
                            Loading ...
                        </div>
                    ) :
                    children

            }
        </Button>
    );
};

export default SubmitButton;