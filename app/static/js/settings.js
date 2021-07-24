document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // these have the same length
    add_buttons = document.querySelectorAll('button[class="add"]')
    unadd_buttons = document.querySelectorAll('button[class="unadd"]')

    // on page load
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      if (add_buttons[i].parentElement.parentElement.classList
      .contains('added')) {
        add_buttons[i].classList.add('hide')
      }
      else {
        unadd_buttons[i].classList.add('hide')
      }
    }

    // ajax for adding assumptions
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      add_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        let data = {'id': add_buttons[i].getAttribute('ASSUMPTION_ID')}

        xhr.onload = function() {
          if (this.status == 200) {
            add_buttons[i].parentElement.parentElement.classList.add('added')
            unadd_buttons[i].classList.remove('hide')
            add_buttons[i].classList.add('hide')
          }
        }

        xhr.open('POST', '/addassumption', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      })
    }

      // ajax for unadding assumptions
      for (let i = 0, length = unadd_buttons.length; i < length; i++) {
        unadd_buttons[i].addEventListener('click', function() {
          let xhr = new XMLHttpRequest()

          let data = {'id': unadd_buttons[i].getAttribute('ASSUMPTION_ID')}

          xhr.onload = function() {
            if (this.status == 200) {
              unadd_buttons[i].parentElement.parentElement.classList
              .remove('added')
              add_buttons[i].classList.remove('hide')
              unadd_buttons[i].classList.add('hide')
            }
          }

          xhr.open('POST', '/unaddassumption', true)
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
        })
      }

  }
}
