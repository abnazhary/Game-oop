import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById("details").classList.add("d-none");
      document.getElementById("games").classList.remove("d-none");
    });

    this.loading = document.querySelector(".loading");
    this.getApi(id);
  }

  async getApi(id) {
    this.loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ff387fdf6emsh00f898a2ab78e7ep1c17f7jsnbea3172d3da9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const response = await api.json();
    this.loading.classList.add("d-none");
    new Ui().displayDetails(response);
  }
}
