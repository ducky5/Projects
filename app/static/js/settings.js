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
    // to catch an error which doesn't disrupt anything
    try {
      for (let i = 0; ; i++) {
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
    }
    catch (error) {
      console.log(error)
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
  }
}
