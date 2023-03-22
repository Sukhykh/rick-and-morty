/* styles */
import '../assets/scss/_CharInfoField.scss';

/* components */

/* dependencies */
import React from 'react';

const CharInfoField = (props) => {
    
    return (
        <div className="field">
            <p className="field__title">{props.title}</p>
            <p className="field__descr">{props.descr}</p>
        </div>
    )
}

export default CharInfoField