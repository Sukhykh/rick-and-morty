/* styles */
import '../assets/scss/_AllCharacters.scss';

/* components */
import Input from './Input'
import CharacterCard from './CharacterCard'
import Svg from "./Svg"

/* dependencies */
import React from 'react';
import axios from 'axios';
import { useWidthValue } from '../hooks/useWidthValue';

const AllCharacters = () => {
    const [nameValue, setNameValue] = React.useState('');
    const [dataValue, setDataValue] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [pageList, setPageList] = React.useState(1);

    /* fetching */
    const getAllCharacters = async () => {
        try {
            const response = await axios({
                url: 'https://rickandmortyapi.com/api/character',
                method: 'GET',
                responseType: 'json'
            });
            const dataValue = await response.data
            const pages = dataValue.info.pages;
            let pagesCount = [...Array(pages).keys()].map(i => i + 1);
            let urlValue = pagesCount.map(i => `https://rickandmortyapi.com/api/character/?page=${i}`)
            const resp = await axios.all(urlValue.map(urlItem => axios({
                                        url: urlItem,
                                        method: 'GET',
                                        responseType: 'json'
                                                                      })
                                                    )
                                        );
            const data = resp.map(response => response.data.results)
            const caracterList = []
            data.forEach(el => {
                let arr = [...el];
                    arr.forEach(el => {
                        caracterList.push(el)
                    })
            }) 
            let caracterListSort = caracterList.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
            setDataValue([...caracterListSort])
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getAllCharacters()
        getItemFromLocalStorage()
    }, [])

    /* filter */
    const createCaracterListFilter = (arr, value) => {
        return arr.filter(element => element.name.toLowerCase().includes(value.toLowerCase()))
    }

    const getItemFromLocalStorage = () => {
        if (localStorage.getItem('nameValue') !== null) {
        setNameValue(localStorage.getItem('nameValue'));
        }
    }

    /* pagination */
    const charactersOnPage = 16;
    const lastItemIndex = page * charactersOnPage;
    const firstItemIndex = lastItemIndex - charactersOnPage;
    const dataForShow = createCaracterListFilter(dataValue, nameValue).slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(createCaracterListFilter(dataValue, nameValue).length / charactersOnPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    /* pagination for pagination */
    const pagesOnList = 5;
    const lastPageIndex = pageList * pagesOnList;
    const firstPageIndex = lastPageIndex - pagesOnList;
    const pagesForShow = pageNumbers.slice(firstPageIndex, lastPageIndex);
    const totalPageLists = Math.ceil(pageNumbers.length / pagesOnList);

    const pageListNumbers = [];
    for (let i = 1; i <= totalPageLists; i++) {
        pageListNumbers.push(i);
    }

    const pageForvard = () => {
        if (pageList === pageListNumbers.length) {
            return
        }
        setPageList(pageList + 1)
    }

    const pageBack = () => {
        if (pageList === 1) {
            return
        }
        setPageList(pageList - 1)
    }

    return (
        <div className="all-char">
            <div className="all-char__container">
                <div className="all-char__wrapper">
                    <Input name={{ nameValue, setNameValue }} />
                    <div className="all-char__card-bar">
                        {dataForShow.map(element => <CharacterCard key={element.id} data={element} nameValue={nameValue} />)}
                    </div>
                    <div className="all-char__pagination">
                        <div className="all-char__pagination-sector">
                            <div className={pageList === 1 ? "all-char__pagination-btn" : "all-char__pagination-btn all-char__pagination-btn--activ"}
                                onClick={pageBack}><Svg name="#arrow" /></div>
                            {pageList !== 1 && <div className={1 === page ?
                                "all-char__pagination-item all-char__pagination-item--active" :
                                "all-char__pagination-item"}
                                onClick={() => setPage(1)}>01</div>}
                            {pageList !== 1 && <div className="all-char__pagination-div">...</div>}
                        </div>
                        {useWidthValue() > 750 && pagesForShow.map(element => <div className={element === page ?
                            "all-char__pagination-item all-char__pagination-item--active" :
                            "all-char__pagination-item"}
                            key={element}
                            onClick={() => setPage(element)}>{element > 9 ? `${element}` : `0${element}`}</div>)}
                        <div className="all-char__pagination-sector">
                            {pageList !== pageListNumbers.length && <div className="all-char__pagination-div">...</div>}
                            {pageList !== pageListNumbers.length && <div className={pageNumbers.length === page ?
                                "all-char__pagination-item all-char__pagination-item--active" :
                                "all-char__pagination-item"}
                                onClick={() => setPage(pageNumbers.length)}>{pageNumbers.length > 9 ? `${pageNumbers.length}` : `0${pageNumbers.length}`}
                            </div>}
                            <div className={pageList === pageListNumbers.length ? "all-char__pagination-btn all-char__pagination-btn--rotate" : "all-char__pagination-btn all-char__pagination-btn--rotate all-char__pagination-btn--activ"}
                                onClick={pageForvard}><Svg name="#arrow" /></div>
                        </div>
                    </div>
                    {useWidthValue() <= 750 && <div className="all-char__pagination-mobile">
                        {pagesForShow.map(element => <div className={element === page ?
                            "all-char__pagination-item all-char__pagination-item--active" :
                            "all-char__pagination-item"}
                            key={element}
                            onClick={() => setPage(element)}>{element > 9 ? `${element}` : `0${element}`}</div>)}
                    </div>}
               </div>
            </div>
        </div>
    )
}

export default AllCharacters