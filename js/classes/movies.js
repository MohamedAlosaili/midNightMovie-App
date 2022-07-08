import MainClass from "./mainClass.js";
import { getNewDiscoverPageCards } from "../functions.js";

class Movies extends MainClass {
  pageName = "movie";
  filterBtn;
  genreList;
  cardContainer;
  discoverPage;
  navBtn;
  loadMoreBtn;

  rendermainPageElement(movieObj, generList) {
    this._mainPage.innerHTML = `
            ${this._getHomeHeaderSection(movieObj)}
            <section class="discover-section" id="first-section">
                <div class="container">
                    <header class="discover-header">
                        <div class="top">
                            <h2 class="section-title">Discover in Movies</h2>
                            <div class="filter-wrap">
                                <button class="filter btn" data-filter>Filter <i class="icon fa-solid fa-filter"></i></button>
                            </div>
                            <ul class="genre-list" data-genre-list>
                               ${this._getGenerList(generList)}
                            </ul>
                        </div>
                        <nav class="discover-nav">
                            <div class="nav-back" data-nav-back></div>
                            <button class="btn active" data-discover-page="popular">Popular</button>
                            <button class="btn" data-discover-page="trending">Trending</button>
                            <button class="btn" data-discover-page="top_rated">Top Rated</button>
                        </nav>
                    </header>
                    <div class="card-container popular" data-discover-container>
                        ${this._getSectionCards(movieObj)}
                    </div>
                    <button class="btn" data-load-more>Load More</button>
                </div>
            </section>
        `;

    this.filterBtn = this._mainPage.querySelector("[data-filter]");
    this.genreList = this._mainPage.querySelector("[data-genre-list]");
    this.navBtn = this._mainPage.querySelectorAll("[data-discover-page]");
    this.cardContainer = this._mainPage.querySelector(
      "[data-discover-container]"
    );
    this.loadMoreBtn = this._mainPage.querySelector("[data-load-more]");
    this.watchlistBtns = this._mainPage.querySelectorAll(
      "[data-watchlist-btn]"
    );

    this._discoverNavListener();
    this._discoverFilterListener();
    this._watchlistBtnListener();
  }

  _discoverNavListener() {
    const navBack = document.querySelector("[data-nav-back]");

    this.navBtn.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        this.cardContainer.className = "card-container";

        this.navBtn.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        this.discoverPage = btn.dataset.discoverPage;
        getNewDiscoverPageCards(this.discoverPage);

        const parentWidth =
          parseInt(
            getComputedStyle(btn.parentElement).getPropertyValue("width")
          ) / 3;
        navBack.style.left = `${idx * parentWidth}px`;
      });
    });
  }

  _discoverFilterListener() {
    this.filterBtn.addEventListener("click", () => {
      this.genreList.classList.toggle("active");
    });
  }

  getNewDiscoverPage(pageData) {
    this.cardContainer.className = `card-container ${this.discoverPage}`;
    this.cardContainer.innerHTML = this._getSectionCards(pageData);
  }
}

export default new Movies();
