document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // unhide first card
    document.getElementById('learn-card-1').classList.remove('hide')
    cards = document.querySelectorAll('[id^="learn-card-"]')
    // unhide cards-wrapper in the beginning for certain media query
    media_query = '(min-width: 769px)'
    matched = window.matchMedia(media_query).matches
    if (matched) {
      document.getElementById('cards-wrapper').classList.remove('hide')
    }
    // card switching
    for (let i = 0; cards[i]; i++) {
      // show next card
      if (cards[i+1]) {
        cards[i].querySelector('[title="next"]').onclick = function() {
          cards[i].classList.add('hide')
          cards[i+1].classList.remove('hide')
        }
      }
      // show previous card
      if (cards[i-1]) {
        cards[i].querySelector('[title="previous"]').onclick = function() {
          cards[i].classList.add('hide')
          cards[i-1].classList.remove('hide')
        }
      }
    }
    // collapse "PMT questions"
    document.getElementById('pmt-questions').onclick = function() {
      if (document.getElementById('cards-wrapper').classList.contains('hide')){
        document.getElementById('cards-wrapper').classList.remove('hide')
        document.getElementById('pmt-questions').querySelector('i').classList
        .remove('fa-caret-square-down')
        document.getElementById('pmt-questions').querySelector('i').classList
        .add('fa-caret-square-up')
      }
      else {
        document.getElementById('cards-wrapper').classList.add('hide')
        document.getElementById('pmt-questions').querySelector('i').classList
        .remove('fa-caret-square-up')
        document.getElementById('pmt-questions').querySelector('i').classList
        .add('fa-caret-square-down')
      }
    }

    // add/unadd assumption to user
    add_buttons = document.querySelectorAll('button[name="add"]')
    unadd_buttons = document.querySelectorAll('button[name="unadd"]')

    // dynamic hiding of buttons on page load
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      if (add_buttons[i].parentElement.classList.contains('added')) {
        add_buttons[i].classList.add('hide')
      }
      else {
        unadd_buttons[i].classList.add('hide')
      }
    }

    // ajax for add/unadd assumptions to user
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      add_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        xhr.onload = function() {
          if (this.status == 200) {
            add_buttons[i].classList.add('hide')
            unadd_buttons[i].classList.remove('hide')
          }
        }

        xhr.open('GET', '/addassumption/' + add_buttons[i]
        .getAttribute('ASSUMPTION_ID'), true)

        xhr.send()
      })
    }

    for (let i = 0, length = unadd_buttons.length; i < length; i++) {
      unadd_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        xhr.onload = function() {
          if (this.status == 200) {
            unadd_buttons[i].classList.add('hide')
            add_buttons[i].classList.remove('hide')
          }
        }

        xhr.open('GET', '/unaddassumption/' + unadd_buttons[i]
        .getAttribute('ASSUMPTION_ID'), true)

        xhr.send()
      })
    }
  }
}
