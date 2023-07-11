import { useState } from 'react';
import './FilmRow.css';

export default function FilmRow({imgURL, title, year, overview, handleSelectFilm, handleAddOrRemoveFavFilm, isInFavFilms}) {
    const [toggle, setToggle] = useState(false)

    const handleShowMoreDetails = () => {
        setToggle(!toggle)
    }
        
    return(
        <div className="FilmRow">
            <button className='btn_select_film'
                onClick={handleSelectFilm}><img src={'https://image.tmdb.org/t/p/w780'+imgURL} alt="{film title} film poster" /></button>
            
            <div className="film-summary">
                <h3>{title}</h3>
                <p>{year}</p>
                {toggle && <div className='overview'>{overview}</div>}
                <div className="actions">
                    <button className="action"
                        onClick={handleAddOrRemoveFavFilm}
                    >
                        <span className="material-icons">{isInFavFilms ? 'remove_from_queue' : 'add_to_queue' }</span>
                    </button>
                    <button className="action"
                        onClick={handleShowMoreDetails}
                    >
                        <span className="material-icons">read_more</span>
                    </button>                    
                </div>

            </div>
        </div>
    )
}