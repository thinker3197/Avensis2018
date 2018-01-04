const App = {
  activateSlider() {
    const content = [{
      auth: 'Prof. KP Chaudhary',
      msg: 'I am delighted to announce the commencement of AVENSIS 2017.Due to the ingenuity and vivacity of our students this fest has attained a marked grandeur with time so much so that it now seems to embody the pride of our institution'
    }, {
      auth: 'Dr. Rinky Dwivedi',
      msg: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
    }];

    const $msgText = document.getElementById('js-message-txt'),
      $msgAuth = document.getElementById('js-message-auth'),
      $slider = document.getElementById('js-slider');

    $slider.addEventListener('click', (e) => {
      const index = +e.target.dataset.index;

      $msgText.innerHTML = content[index].msg;
      $msgAuth.innerHTML = '- ' + content[index].auth;

      $slider.children[index].classList.add('active');
      $slider.children[index !== 0 ? 0 : 1].classList.remove('active');
    });
  },
  activateTimer(date) {
    const endDate = new Date("Jan 10, 2018 00:00:00").getTime(),
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
    const pos = document.getElementById('js-' + state + '-section').offsetTop || 0;

    window.location.hash = state;

    window.scroll({
      top: pos,
      left: 0,
      behaviour: "smooth"
    });
  },
  activateNavbar() {
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
    this.activateNavbar();
    this.activateTimer();
    this.activateSlider();
  }
}

window.onload = () => {
  App.init();
}