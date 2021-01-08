$(function () {
  const $movieRow = $(".movieRow");
  let $input = $("#searchInput");
  const $button = $("#movieGoSearch");

  const movieSearch = () => {
    let inputValue = $input.val();
    $.get(`http://www.omdbapi.com/?s=${inputValue}&apikey=bc83d03c`).done(
      function (data) {
        renderMovies(data.Search);
      }
    );
  };
  $button.click("click", (event) => {
    event.preventDefault();
    movieSearch();
  });
  const renderMovies = (movieArray) => {
    $movieRow.empty();
    movieArray.map((movie) => {
      console.log(movie);
      $movieRow.append(`
        <div class="col-sm-4 mb-3">
          <div class="card-body mb-3">
            <img src="${movie.Poster}" alt="Movie poster" class="card-img-top" />
            <h5 class="card-title mt-2">${movie.Title}</h5>
            <p class="card-text">${movie.Year}</p>
            <a href="#" id="${movie.imdbID}"class="btn movieSearch">Add to watchlist</a>
          </div>
        </div>
      </div>  
      `);
      $(`#${movie.imdbID}`).on("click", () => {
        saveToWatchList(movieArray, `${movie.imdbID}`);
      });
    });
  };

  const saveToWatchList = (movieArray, movieId) => {
    console.log(movieId);
    const movieToAdd = movieArray.find((movie) => movie.imdbID === movieId);
    console.log(movieToAdd);
    let watchlistJSON = localStorage.getItem("watchlist");
    console.log("watchlistJSON", watchlistJSON);
    let watchlist = JSON.parse(watchlistJSON);
    console.log("watchlist", watchlist);
    if (watchlist === null) {
      watchlist = [];
      console.log("null case");
      watchlist.push(movieToAdd);
      console.log(watchlist);
      watchlistJSON = JSON.stringify(watchlist);
      localStorage.setItem("watchlist", watchlistJSON);
    } else {
      watchlist.push(movieToAdd);
      console.log(watchlist);
      watchlistJSON = JSON.stringify(watchlist);
      localStorage.setItem("watchlist", watchlistJSON);
    }
  };
});
