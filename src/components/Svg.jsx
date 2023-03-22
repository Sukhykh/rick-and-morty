/* styles */
import '../assets/scss/_Svg.scss';
import sprite from '../assets/img/sprite.svg';

const Svg = (props) => {
    return (
        <div className="svg">
            <svg className="svg__wrapper">
                <use className="svg__icon" xlinkHref={`${sprite}${props.name}`}/>
            </svg>
        </div>
    )
}

export default Svg