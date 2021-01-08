$(function () {
  const $movieRow = $(".movieRow");

  let watchlistJSON = localStorage.getItem("watchlist");
  console.log("watchlistJSON", watchlistJSON);
  let watchlist = JSON.parse(watchlistJSON);

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
              <a href="#" id="${movie.imdbID}"class="btn movieSearch">Unwatched</a>
            </div>
          </div>
        </div>  
        `);
      $(`#${movie.imdbID}`).on("click", function () {
        const styles = {
          "background-color": "#007cc7",
        };
        $(this).css(styles).text("Watched");
      });
    });
  };

  renderMovies(watchlist);
});
