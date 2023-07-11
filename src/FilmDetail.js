import './FilmDetail.css'

const posterPathServerURL = 'https://image.tmdb.org/t/p/w780'
const backdropPathServerURL = 'https://image.tmdb.org/t/p/w1280'

function FilmDetail({filmDetailEmpty, title, overview, poster_path, backdrop_path}) {
  
  return (
    // Check if there is no film selected, then call FilmDetailEmpty(). Otherwise, show the film details
    filmDetailEmpty
      ?
        FilmDetailEmpty()
      :
      <div className="FilmDetail is-hydrated">
        <figure className="film-backdrop">
          <img src={backdropPathServerURL+backdrop_path} alt="Baby Driver backdrop" />
          <h1 className="film-title">{title}</h1>
        </figure>
      <div className="film-meta">
        <p className="film-detail-overview">
          <img src={posterPathServerURL+poster_path} className="film-detail-poster" alt={'Baby driver poster'} />          
        </p>
      </div>
      </div>
    
  )
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
    <p>
      <i className="material-icons">subscriptions</i>
      <span>No film selected</span>
    </p>

  </div>
  )
}

export default FilmDetail