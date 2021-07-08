document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // unhide first card
    document.getElementById('learn-card-1').classList.remove('hide')
































    // let current_card = 1
    // let next_buttons = document.querySelectorAll('span.next')
    // let i = 0
    // // next card
    // for (let length = next_buttons.length; i < length-1; i++) {
    //   next_buttons[i].onclick = function() {
    //     current_card++
    //     cards_list =
    //     document.querySelectorAll('[id^="learn-card-"]:not(#learn-card-' + current_card + ')')
    //     for (let i = 0, list_length = cards_list.length; i < list_length; i++) {
    //       cards_list[i].classList.add('hide')
    //     }
    //     // unhide current card
    //     document.getElementById('learn-card-' + current_card).classList.remove('hide')
    //   }
    // }
    // // previous card
    // for (let length = next_buttons.length; i < length-1; i++) {
    //   next_buttons[i].onclick = function() {
    //     current_card--
    //     cards_list =
    //     document.querySelectorAll('[id^="learn-card-"]:not(#learn-card-' + current_card + ')')
    //     for (let i = 0, list_length = cards_list.length; i < list_length; i++) {
    //       cards_list[i].classList.add('hide')
    //     }
    //     // unhide current card
    //     document.getElementById('learn-card-' + current_card).classList.remove('hide')
    //   }
    // }
  }
}
