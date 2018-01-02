const App = {
  activateTimer(date) {
    const endDate = new Date("Jan 22, 2018 12:00:00").getTime(),
      $timer = document.getElementById("js-timer");

    let days, hours, minutes;

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime(),
        distance = endDate - currentTime;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const timeLeft = `${days} days : ${hours} hours : ${minutes} minutes`;

      if (timeLeft !== $timer.innerHTML) {
        $timer.innerHTML = timeLeft;
      }

      if (distance < 0) {
        clearInterval(intervalId);

        $timer.innerHTML = "0 days : 0 hours : 0 minutes";
      }
    }, 1000);
  },
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
    this.activateTimer();
  }
}

window.onload = () => {
  App.init();
}