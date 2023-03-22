/* styles */
import '../assets/scss/_SingleCharacter.scss';

/* components */
import Svg from "./Svg"
import CharInfoField from './CharInfoField'

/* dependencies */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SingleCharacter = () => {
    const [characterData, setcharacterData] = React.useState([])
    const [origin, setOrigin] = React.useState(``)
    
    /* fetching */
    const getCharacter = async () => {
        try {
            const response = await axios({
                url: `https://rickandmortyapi.com/api/character/${localStorage.getItem('id')}`,
                method: 'GET',
                responseType: 'json'
            });
            const dataValue = await response.data
            setcharacterData(dataValue)
            const originValue = await dataValue.origin.name
            setOrigin(originValue)
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getCharacter()
    }, [])

    return (
        <div className="single-char">
            <div className="single-char__container">
                <div className="single-char__wrapper">
                    <div className="single-char__btn-container">
                        <Link to={`/`}
                            className="single-char__btn">
                            <Svg name="#arrow" />
                            <p className="single-char__btn-text">go back</p>
                        </Link>
                    </div>
                    <div className="single-char__img-wrapper">
                        <img className="single-char__img"
                            src={characterData.image} alt="character.img" />
                    </div>
                    <h2 className="single-char__title">{characterData.name}</h2>
                    <div className="single-char__information">
                        <p className="single-char__information-descr">
                            Informations
                        </p>
                        <div className="single-char__information-bar">
                            <CharInfoField title='Gender' descr={characterData.gender ? characterData.gender : "Unknown"} />
                            <div className="single-char__divider"></div>
                            <CharInfoField title='Status' descr={characterData.status ? characterData.status : "Unknown"} />
                            <div className="single-char__divider"></div>
                            <CharInfoField title='Specie' descr={characterData.species ? characterData.species : "Unknown"} />
                            <div className="single-char__divider"></div>
                            <CharInfoField title='Origin' descr={origin ? origin : "Unknown"} />
                            <div className="single-char__divider"></div>
                            <CharInfoField title='Type' descr={characterData.type ? characterData.type : "Unknown"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCharacter