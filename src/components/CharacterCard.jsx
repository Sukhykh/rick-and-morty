/* styles */
import '../assets/scss/_CharacterCard.scss';

/* components */


/* dependencies */
import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = (props) => {
    const item = props.data
    const charName = item.name.toLowerCase().split(' ').join('-')

    const linkName = `${charName.split("'").join('')}-id-${item.id}`

    const setLocalStorage = () => {
        localStorage.setItem('id', `${item.id}`);
        localStorage.setItem('nameValue', `${props.nameValue}`);
    }

    return (
        <Link className="char-card"
            to={`/${linkName}`}
            onClick={setLocalStorage}>
            <div className="char-card__img-wrapper">
                <img className="char-card__img" src={item.image} alt="character.img"  />
            </div>
            <div className="char-card__text-wrapper">
                <h2 className="char-card__title">{item.name}</h2>
                <p className="char-card__descr">{item.species}</p>
            </div>
        </Link>
    )
}
export default CharacterCard