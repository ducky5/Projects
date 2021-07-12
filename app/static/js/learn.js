document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // unhide first card
    document.getElementById('learn-card-1').classList.remove('hide')
    cards = document.querySelectorAll('[id^="learn-card-"]')
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
  }
}
