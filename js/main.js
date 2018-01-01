const App = {
  setState(state) {
    // TODO - Add router and use state to show history changes
    window.location.hash = state;
  },
  addEventListeners() {
    const $navMenu = document.getElementById("js-nav-menu"),
      $navList = document.getElementById("js-nav-list"),
      $navWrapper = document.getElementById("js-nav-wrapper");

    const closeMenu = () => {
      document.body.classList.remove("no-scroll");

      $navMenu.classList.remove("open");
      $navWrapper.classList.add("invisible");
    }

    const openMenu = () => {
      document.body.classList.add("no-scroll");

      $navMenu.classList.add("open");
      $navWrapper.classList.remove("invisible");
    }


    $navMenu.addEventListener("click", (e) => {
      if ($navMenu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $navList.addEventListener("click", (e) => {
      const state = e.target.nodeName === "A" ? e.target.parentNode.dataset.state : e.target.dataset.state;

      this.setState(state);

      closeMenu();
    });
  },
  init() {
    this.addEventListeners();
    this.setState("");
  }
}

window.onload = () => {
  App.init();
}