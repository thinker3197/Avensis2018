const App = {
  loadImagesAsync() {
    const $imgAsync = document.getElementsByClassName('load-async');

    [].forEach.call($imgAsync, (img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = function() {
        img.removeAttribute('data-src');
      };
    });
  },
  activateTiles() {
    let $activeTile = null;

    const $eventTile = document.getElementById('js-event-tile'),
      $eventDesc = document.getElementById('js-event-desc'),
      $eventCategory = document.getElementById('js-event-category'),
      $eventTag = document.getElementById('js-event-tag'),
      $eventCross = document.getElementById('js-event-cross');

    const getType = (node) => {
      if ((node.nodeName === 'DIV' && node.id === 'tile-technical') || (node.nodeName === 'H2' && node.innerHTML === 'Technical') || (node.nodeName === 'P' && node.innerHTML.indexOf('Ideate') !== -1)) {
        return 'technical';
      } else if ((node.nodeName === 'DIV' && node.id === 'tile-robotics') || (node.nodeName === 'H2' && node.innerHTML.indexOf('Robotics') !== -1) || (node.nodeName === 'P' && node.innerHTML.indexOf('Learn') !== -1)) {
        return 'robotics';
      } else if ((node.nodeName === 'DIV' && node.id === 'tile-literary') || (node.nodeName === 'H2' && node.innerHTML.indexOf('Literary') !== -1) || (node.nodeName === 'P' && node.innerHTML.indexOf('Come') !== -1)) {
        return 'literary';
      } else {
        return 'fnc';
      }
    }

    $eventTile.addEventListener('click', (e) => {
      const category = getType(e.target);

      $eventDesc.classList.remove('invisible');
      document.body.classList.add('no-scroll');

      if(category === 'technical') {
        $activeTile = document.getElementById('js-tile-technical');

        $eventCategory.innerHTML = 'Technical';
        $eventTag.innerHTML = 'Ideate. Innovate. Create.';
      } else if(category === 'robotics') {
        $activeTile = document.getElementById('js-tile-robotics');

        $eventCategory.innerHTML = 'Robotics';
        $eventTag.innerHTML = 'Learn to build. Build to play. Play to win.';
      } else if(category === 'literary') {
        $activeTile = document.getElementById('js-tile-literary');

        $eventCategory.innerHTML = 'Literary & Quiz';
        $eventTag.innerHTML = 'Come. See. Conquer.';
      } else {
        $activeTile = document.getElementById('js-tile-fnc');

        $eventCategory.innerHTML = 'Fun ’n’ Creativity';
        $eventTag.innerHTML = 'Fight for glory';
      }

      $activeTile.classList.remove('hidden');
    });

    $eventCross.addEventListener('click', (e) => {
      $activeTile.classList.add('hidden');
      $eventDesc.classList.add('invisible');
      document.body.classList.remove('no-scroll');      
    });
  },
  activateSlider() {
    const content = [{
      auth: 'Prof. KP Chaudhary',
      msg: 'Its a matter of great privilege and pleasure for me to announce the commencement of avensis 2018. With consistent hard work and perseverance of our students, they have embarked on this continuous journey with a passionate attitude to place our institute as a hallmark of technical and scientific excellence.'
    }, {
      auth: 'Dr. Rinky Dwivedi',
      msg: 'Avensis 2018 is back with a flavour innovative skill sets of our students who would showcase their strengths and competences which would raise the aspirations of every young mind. I take pride in elaborating the fact that our fellow students have put in lots of sincere efforts to ake this Avensis a grand success.'
    }];

    const $msgText = document.getElementById('js-message-txt'),
      $msgAuth = document.getElementById('js-message-auth'),
      $slider = document.getElementById('js-slider'),
      $msgContent = document.getElementById('js-msg-content');

    $slider.addEventListener('click', (e) => {
      const index = +e.target.dataset.index;

      if (e.target.nodeName === 'LI') {
        $msgContent.style.opacity = 0;

        setTimeout(() => {
          $msgText.innerHTML = content[index].msg;
          $msgAuth.innerHTML = '- ' + content[index].auth;

          $slider.children[index].classList.add('active');
          $slider.children[index !== 0 ? 0 : 1].classList.remove('active');

          $msgContent.style.opacity = 1;
        }, 300);
      }
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
      window.scroll({
        top: 0,
        left: 0
      });

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
    this.loadImagesAsync();
    this.activateNavbar();
    this.activateTimer();
    this.activateSlider();
    this.activateTiles();
  }
}

window.onload = () => {
  App.init();
}