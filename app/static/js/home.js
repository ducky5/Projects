document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // uncheck all filter-by buttons in the beginning
    btns = document.querySelectorAll('.buttons > button')
    for (let i = 0, length = btns.length; i < length; i++) {
      btns[i].querySelector('.fa-check-circle').style.opacity = 0
    }

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
    buttons = document.querySelectorAll('.buttons > [type="button"]')

    // my-age button
    document.querySelector('button[name="my-age"]')
    .addEventListener('click', function() {
      if (this.querySelector('i').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (!listings[i].classList.contains('my-age')) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
        // uncheck all other filter-buttons except male/female
        for (let i = 0, length = buttons.length-2; i < length; i++) {
          buttons[i].querySelector('i').style.opacity = 0
        }
        // uncheck male/female buttons
        document.getElementById('male').style.opacity = 0
        document.getElementById('female').style.opacity = 0
      }
    })

    // older-than-me button
    document.querySelector('button[name="older-than-me"]')
    .addEventListener('click', function() {
      if (this.querySelector('i').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (!listings[i].classList.contains('older-than-me')) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
        // uncheck all other filter-buttons except male/female
        for (let i = 0, length = buttons.length-2; i < length; i++) {
          buttons[i].querySelector('i').style.opacity = 0
        }
        // uncheck male/female buttons
        document.getElementById('male').style.opacity = 0
        document.getElementById('female').style.opacity = 0
      }
    })

    // female button
    document.querySelector('button[name="female"]')
    .addEventListener('click', function() {
      if (this.querySelector('[id="female"]').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (!listings[i].querySelector('[name="gender"]').classList
          .contains('fa-female')) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
        // uncheck all other filter-buttons except male/female
        for (let i = 0, length = buttons.length-2; i < length; i++) {
          buttons[i].querySelector('i').style.opacity = 0
        }
        // uncheck male/female buttons
        document.getElementById('male').style.opacity = 0
        document.getElementById('female').style.opacity = 0
      }
    })

    // male button
    document.querySelector('button[name="male"]')
    .addEventListener('click', function() {
      if (this.querySelector('[id="male"]').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (!listings[i].querySelector('[name="gender"]').classList
          .contains('fa-male')) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
        // uncheck all other filter-buttons except male/female
        for (let i = 0, length = buttons.length-2; i < length; i++) {
          buttons[i].querySelector('i').style.opacity = 0
        }
        // uncheck male/female buttons
        document.getElementById('male').style.opacity = 0
        document.getElementById('female').style.opacity = 0
      }
    })

    // added-only button
    document.querySelector('button[name="added-only"]')
    .addEventListener('click', function() {
      if (this.querySelector('[id="added-only"]').style.opacity == 1) {
        for (let i = 0, length = listings.length; i < length; i++) {
          if (!listings[i].classList.contains('added')) {
            listings[i].classList.add('hide')
          }
        }
      }
      else {
        for (let i = 0, length = listings.length; i < length; i++) {
          listings[i].classList.remove('hide')
        }
        // uncheck all other filter-buttons except male/female
        for (let i = 0, length = buttons.length-2; i < length; i++) {
          buttons[i].querySelector('i').style.opacity = 0
        }
        // uncheck male/female buttons
        document.getElementById('male').style.opacity = 0
        document.getElementById('female').style.opacity = 0
      }
    })

    add_buttons = document.querySelectorAll('button[class="add"]')
    unadd_buttons = document.querySelectorAll('button[class="unadd"]')

    // ajax for adding users
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      add_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        xhr.open('GET', '/adduser/' + add_buttons[i].getAttribute('USER_ID'),
        true)

        xhr.send()
      })
    }

      // ajax for unadding users
      for (let i = 0, length = unadd_buttons.length; i < length; i++) {
        unadd_buttons[i].addEventListener('click', function() {
          let xhr = new XMLHttpRequest()

          xhr.open('GET', '/unadduser/' + unadd_buttons[i].getAttribute('USER_ID'),
          true)

          xhr.send()
        })
      }

  }
}
