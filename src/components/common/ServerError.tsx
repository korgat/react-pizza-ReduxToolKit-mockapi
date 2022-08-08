import React from 'react';

const ServerError: React.FC = () => {
    return (
        <div className="container container--server-error">
            <div className="cart cart--empty">
                <h2>
                    Sorry we have server problem <span>😕</span>
                </h2>
                <p>
                    We will fix it as soon as possible
                    <br />
                    Try aga again in a minute
                </p>
            </div>
        </div>
    );
};

export default ServerError;
