/* styles */
import '../assets/scss/_Input.scss';

/* components */
import Svg from './Svg'

/* dependencies */
import React from 'react';

const Input = (props) => {
    const [inputFocus, setInputFocus] = React.useState(false)
    
    const handleFocusIn = () => {
        setInputFocus(true)
    }

    const handleFocusOut = () => {
        setInputFocus(false)
    }

    return (
        <div className="input">
            <div className="input__container">
                <div className={inputFocus ? "input__wrapper input__wrapper--focus" : "input__wrapper"}>
                    <div className="input__bar">
                        <Svg name="#glass" />
                        <input
                            className="input__area"
                            onFocus={handleFocusIn}
                            onBlur={handleFocusOut}
                            onChange={(e) => props.name.setNameValue(e.target.value)}
                            value={props.name.nameValue}
                            type="text"
                            placeholder='Filter by name...'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Input