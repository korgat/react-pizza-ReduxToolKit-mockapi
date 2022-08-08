import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaTileHolder: React.FC = () => {
    return (
        <ContentLoader
            className="pizza-block"
            speed={2}
            width={260}
            height={465}
            viewBox="0 0 260 465"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <circle cx="130" cy="122" r="122" />
            <rect x="0" y="270" rx="10" ry="10" width="260" height="20" />
            <rect x="0" y="315" rx="10" ry="10" width="260" height="87" />
            <rect x="0" y="423" rx="10" ry="10" width="90" height="27" />
            <rect x="119" y="416" rx="20" ry="20" width="140" height="45" />
        </ContentLoader>
    );
};

export default PizzaTileHolder;
