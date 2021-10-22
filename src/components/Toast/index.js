import React, { useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { toastContext } from './../../context/Toast/toastContext';

const stylesToastTypes = {
    warning: {
        className: 'bg-yellow-500 text-white',
        iconTheme: {
            primary: '#fff',
            secondary: '#FBBF24',
        },
    },
    success: {
        className: 'bg-green-400 text-white',
        iconTheme: {
            primary: '#fff',
            secondary: '#FBBF24',
        },
    },
    error: {
        className: 'bg-red-500 text-white',
        iconTheme: {
            primary: '#fff',
            secondary: '#DC2626',
        },
    },
};

export default function Toast() {
    const toastState = useContext(toastContext);
    const handleEvent = (type) => {
        switch (type) {
            case 'success':
                toast.success(toastState.message, {
                    ...stylesToastTypes.success,
                    duration: 4000,
                });
                break;
            case 'warning':
                toast.error(toastState.message, {
                    ...stylesToastTypes.warning,
                    duration: 4000,
                });
                break;
            case 'error':
                toast.error(toastState.message, {
                    ...stylesToastTypes.error,
                    duration: 4000,
                });
                break;
            default:
                toast(toastState.message);
                break;
        }
    };

    useEffect(() => {
        if (toastState.show) {
            handleEvent(toastState.type);
        } else {
            toast.remove();
        }
    }, [toastState.id_log]);

    return <Toaster position="top-right" reverseOrder={false} />;
}
