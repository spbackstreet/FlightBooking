import { useState } from 'react';
import useGlobalState from './useGlobalState';
import { performLoadingOperation } from '../action';

const useLoader = () => {
    const [, dispatch] = useGlobalState();

    const triggerAction = async (action) => {
        try {
            dispatch(performLoadingOperation(true));
            return await action();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(performLoadingOperation(false));
        }
    }


    return [
        triggerAction
    ]
}

export default useLoader;