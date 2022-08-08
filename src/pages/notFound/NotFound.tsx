import React from 'react';
import style from './notFound.module.scss';

const NotFound: React.FC = () => {
    return (
        <>
            <div className={style.main}>
                <h1>
                    Page not found <span>😕</span>
                </h1>
                <p>This page doesn't exist</p>
            </div>
        </>
    );
};

export default NotFound;
