/* styles */
import '../assets/scss/_Logo.scss';
import logoPng from '../assets/img/logo.png'
import logoWebp from '../assets/img/logo.webp'

/* components */

/* dependencies */
import React from 'react';

const Logo = () => {
    return (
        <div className="logo">
            <div className="logo__container">
                <div className="logo__wrapper">
                    <picture>
                        <source
                            srcSet={logoWebp}
                            type="image/webp" />
                        <img className="logo__img" src={logoPng}
                            width="600"
                            height="200"
                            alt='logo' />
                    </picture>
                </div>
            </div>
        </div>
    )
}
export default Logo