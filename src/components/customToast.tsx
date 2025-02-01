import React, { useEffect, useState } from 'react'
//react icons
import { HiCheckCircle, HiXCircle, HiExclamationCircle, HiX } from 'react-icons/hi'
import { toast } from 'react-hot-toast'

interface CustomToastProps {
    status: 'success' | 'warn' | 'err' | 'info';
    title: string;
    id: string;
    duration: number;}

function CustomToast({ status, title, id, duration}: CustomToastProps) {
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const getProgressBarColor = () => {
        switch (status) {
            case 'success':
                return 'bg-green-500';
            case 'warn':
                return 'bg-orange-500';
            case 'err':
                return 'bg-red-500';
            case 'info':
                return 'bg-blue-500';
            default:
                return 'bg-blue-500';
        }
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const increment = 100 / (duration / 50);
                    if (prev >= 100) {
                        clearInterval(interval);
                        toast.dismiss(id);
                        return 100;
                    }
                    return prev + increment;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isHovered, id, duration]);

    return (
        <div
            className={`rounded-md p-4 w-80 bg-toast text-toast-foreground mr-5 mb-4`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-between items-start">
                <div className="fcc">
                    <div className="flex-shrink-0 ml-1">
                        {status === 'success' && <HiCheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />}
                        {status === 'warn' && <HiExclamationCircle className="h-5 w-5 text-orange-500" aria-hidden="true" />}
                        {status === 'err' && <HiXCircle className="h-5 w-5 text-red-500" aria-hidden="true" />}
                        {status === 'info' && <HiExclamationCircle className="h-5 w-5 text-blue-500" aria-hidden="true" />}
                    </div>
                    <div className='text-sm'>{title}</div>
                </div>
                <button onClick={() => toast.dismiss(id)}>
                    <HiX className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
            <div className="h-1 bg-gray-200 mt-2">
                <div className={`h-full ${getProgressBarColor()}`} style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    )
}

export default CustomToast