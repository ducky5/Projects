document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // uncheck all filter-by buttons in the beginning
    btns = document.querySelectorAll('.buttons > button')
    for (let i = 0, length = btns.length; i < length; i++) {
      btns[i].querySelector('.fa-check-circle').style.opacity = 0
    }
    // for (let i = 0, length = doument)
    // function to check/uncheck filter-by buttons
    function filter_by_check_uncheck(...nameAttributes) {
      let checkMark
      for (let i = 0, length = nameAttributes.length; i < length; i++) {
        document.querySelector('button[name="' + nameAttributes[i] + '"]')
        .onclick = function() {
          checkMark = document.getElementById(nameAttributes[i])
          // if unchecked
          if (checkMark.style.opacity == '0') {
            // check
            checkMark.style.opacity = '1'
          }
          else {
            // uncheck
            checkMark.style.opacity = '0'
          }
        }
      }
    }
    // call function
    filter_by_check_uncheck('added-only', 'my-age', 'older-than-me', 'female',
    'male')

    // the actual filter-by functionality
    listings = document.querySelectorAll('.list-item-wrapper')

    // my-age button
    document.querySelector('button[name="my-age"]')
    .addEventListener('click', function() {
      if (this.querySelector('i').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (listings[i].querySelector('.age').innerHTML
          .match(/(\d+)/)[0] != 18) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
      }
    })

    // older-than-me button
    document.querySelector('button[name="older-than-me"]')
    .addEventListener('click', function() {
      if (this.querySelector('i').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (listings[i].querySelector('.age').innerHTML
          .match(/(\d+)/)[0] <= 18) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
      }
    })

    // female button
  }
}
