import { Details } from "./detils.module.js";
import { Ui } from "./ui.module.js";

export class Home {
  constructor() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        this.changeActiveLink(link);

        const category = link.dataset.category;
        this.getGamesApi(category);
      });
    });

    this.loading = document.querySelector(".loading");
    this.details = document.getElementById("details");
    this.games = document.getElementById("games");

    this.ui = new Ui();
    this.detailsSection = new Details();

    this.getGamesApi("MMORPG");
  }

  async changeActiveLink(link) {
    document.querySelector(".navbar-nav .active").classList.remove("active");
    link.classList.add("active");
  }

  async getGamesApi(cat) {
    this.loading.classList.remove("d-none");

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff387fdf6emsh00f898a2ab78e7ep1c17f7jsnbea3172d3da9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let httpreq = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,
      options
    );
    let response = await httpreq.json();
    this.loading.classList.add("d-none");
    this.ui.displayGames(response);

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none");
        this.games.classList.add("d-none");
        new Details(card.dataset.id);
      });
    });
  }
}
