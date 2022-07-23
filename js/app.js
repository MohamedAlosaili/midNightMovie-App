import {
  getDiscoverPage,
  getHomePage,
  getWatchlistPage,
  getMoviePage,
  getSearchResult,
  getCastPage,
} from "./functions.js";
import { mainPageHandler } from "./handlerFunctions.js";
import { moviePage } from "./classes/moviePage.js";
import SearchResult from "./classes/searchResult.js";
import Navbar from "./classes/navbar.js";
import Home from "./classes/home.js";
import Discover from "./classes/discover.js";
import Watchlist from "./classes/watchlist.js";
import CastPage from "./classes/castPage.js";

export const dataObj = {
  watchlist: [],
  discoverCurrentUrl: "",
  pageName: "",
  pageNum: 1,
  pages: {
    home: getHomePage,
    movie: getDiscoverPage,
    "movie-": getMoviePage,
    tv: getDiscoverPage,
    "tv-": getMoviePage,
    watchlist: getWatchlistPage,
    "search?q=": getSearchResult,
    "person-": getCastPage,
  },
  classes: {
    home: Home,
    movie: Discover,
    tv: Discover,
    watchlist: Watchlist,
    "movie-": moviePage,
    "tv-": moviePage,
    "search?q=": SearchResult,
    "person-": CastPage,
  },
  moviePage: {
    movieObj: {},
    cast: [],
    backdrops: [],
    posters: [],
  },
  searchResults: {
    person: [],
    movies: [],
  },
};

function getBookmarks() {
  if (localStorage.getItem("watchlist")) {
    dataObj.watchlist = JSON.parse(localStorage.getItem("watchlist"));
  }
}

const init = (function () {
  getBookmarks();
  Navbar.callClassFunctions();
  renderPage();
})();

function renderPage() {
  let urlHash = location.hash.slice(1);
  if (urlHash === "") urlHash = "home";
  if (urlHash.endsWith("/first_section"))
    urlHash = urlHash.slice(0, urlHash.indexOf("/first_section"));

  const reqex = /^[a-zA-Z]+([?q=]+|-|)/g;
  const pageRequest = urlHash.match(reqex).join("");

  let param = urlHash.slice(urlHash.indexOf(pageRequest.slice(-1)) + 1);
  if (!param) param = urlHash;

  if (dataObj.pages[pageRequest] && dataObj.classes[pageRequest]) {
    dataObj.pageName = pageRequest;
    dataObj.pages[pageRequest](param);

    Navbar.updateNavLinks();

    dataObj.classes[pageRequest].mainPageListener(mainPageHandler);
  } else wrongPageRequested();
}

const scrollTopBtn = document.querySelector("[data-scroll-top]");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) scrollTopBtn.classList.add("active");
  else scrollTopBtn.classList.remove("active");
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function wrongPageRequested() {
  console.log("wrong page");
}
