import { useState } from "react";
import FilmDetail from "./FilmDetail";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import TMDB from "./TMDB";

function FilmLibrary() {
  
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [favFilms, setFavFilms] =  useState([])
  const [selectAllView, setSelectAllView] = useState(true)

  const handleAddOrRemoveFavFilm = (idAddOrRemove, indexAddOrRemove) => {

    // Find the film id to decide add or remove
    if (favFilms.length > 0 && favFilms.find((favFilm)=> favFilm.id === idAddOrRemove)) {
      setFavFilms(favFilms.filter((favFilm) => favFilm.id !== idAddOrRemove))
    } else {
      setFavFilms(favFilms=>[...favFilms,{id: idAddOrRemove, index: indexAddOrRemove}])
    }

  }

  const handleChangeFilmView = isAll => {

    //Only change if user clicks on different category view
    if (selectAllView !== isAll) {
      setSelectAllView(isAll)
      setSelectedFilm(null)
    }    
  }

  const handleSelectFilm = filmID => {
    
    const getFilmByID = TMDB.films.filter((film)=>film.id === filmID)
        
    if (getFilmByID.length > 0) {
      setSelectedFilm(getFilmByID[0])
    } else {
      setSelectedFilm(null)
    }
  }
  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className={selectAllView ? 'film-list-filter is-active' : 'film-list-filter'}
                  onClick={()=>handleChangeFilmView(true)}
          >
            ALL
            <span className="section-count">{TMDB.films.length}</span>
          </button>
          <button className={selectAllView ? 'film-list-filter' : 'film-list-filter is-active'}
                  onClick={()=>handleChangeFilmView(false)}
          >
            FAVES
            <span className="section-count">{favFilms.length}</span>
          </button>
        </div>
        { selectAllView
          ?
            TMDB.films.map((film, index) =>          
              <FilmRow key={index}                  
                  imgURL={film.poster_path}
                  title={film.title}
                  year={new Date(film.release_date).getFullYear()}
                  handleSelectFilm={()=>handleSelectFilm(film.id)}
                  handleAddOrRemoveFavFilm={()=>handleAddOrRemoveFavFilm(film.id, index)}
                  isInFavFilms={favFilms.find((favFilm)=> favFilm.id === film.id)}
              />
            )
          :
          favFilms.map((favFilm, index) =>
            <FilmRow key={index}              
              imgURL={TMDB.films[favFilm.index].poster_path}
              title={TMDB.films[favFilm.index].title}
              year={new Date(TMDB.films[favFilm.index].release_date).getFullYear()}
              handleSelectFilm={()=>handleSelectFilm(favFilm.id)}
              handleAddOrRemoveFavFilm={()=>handleAddOrRemoveFavFilm(TMDB.films[favFilm.index].id, index)}
              isInFavFilms={true}
            />          
          )
      
        }
        
      </div>

      <div className="film-details">
        
        { selectedFilm === null
          ?
            <FilmDetail filmDetailEmpty={true} />
          :
          <>
            <h1 className="section-title">{selectedFilm.title}</h1>
            <FilmDetail
              filmDetailEmpty={false}
              title={selectedFilm.title}
              overview={selectedFilm.overview}
              poster_path={selectedFilm.poster_path}
              backdrop_path={selectedFilm.backdrop_path}
            />
          </>
        }
      </div>
    </div>
  );
}

export default FilmLibrary