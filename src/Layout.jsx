import React from 'react';
import useGlobalState from './hooks/useGlobalState';
import LinearProgress from '@material-ui/core/LinearProgress';

const Layout = ({ children }) => {
    const [{ app: { loading } }] = useGlobalState();   
    return (
        <>
            <div style={{
                position: 'fixed',
                width: '100%',
                zIndex: 2,
            }}>
                {loading ? <LinearProgress /> : ''}
            </div>
            {children}

        </>
    )
}

export default Layout;