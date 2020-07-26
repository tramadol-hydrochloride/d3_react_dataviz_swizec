import React from 'react';

import PreloaderImg from '../assets/preloading.png'

const Preloader = () => {
    return (
        <div className="App container">
            <img src={PreloaderImg} style={{width: '100%'}} alt="pre-loading" role="presentation"/>
        </div>
    );
};

export default Preloader;
