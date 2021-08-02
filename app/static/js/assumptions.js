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

      // ajax for loading more assumptions

      // the variables
      let listings = document.querySelectorAll('.list-item-wrapper')
      let id_of_latest_listing = listings[listings.length-1]
      .getAttribute('ASSUMPTION_ID')

      // the event
      document.getElementById('load_more').onclick = function() {
        let xhr = new XMLHttpRequest()

        let data = {'id_of_latest_listing': id_of_latest_listing}

        xhr.onload = function() {
          if (this.status == 200) {
            let json_from_server = JSON.parse(this.responseText)
            let finished = ''
            // fill
            for (let i = 0, length = json_from_server.load.length; i < length;
            i++) {
              let json_to_html =
              '<div class="list-item-wrapper ' + json_from_server.load[i][1]
              + '" ASSUMPTION_ID="' + json_from_server.load[i][0].id + '"' + '>' 
              + '<span class="action-buttons">' +
              '<button type="button" name="unadd_assumption" class="unadd" ' +
              'title="unadd"' + 'ASSUMPTION_ID="' +
              json_from_server.load[i][0].id + '">' +
              '<i class="fas fa-minus-circle"></i>' + '</button>' +
              '<button type="button" name="add_assumption" class="add" ' +
              'title="add"' + 'ASSUMPTION_ID="' +
              json_from_server.load[i][0].id + '">' +
              '<i class="fas fa-plus-circle"></i>' + '</button>' + '</span>' +
              '<li ' + 'class="' + json_from_server.load[i][0].content_type +
              '">' + json_from_server.load[i][0].content + '</li>' + '</div>'

              finished += json_to_html
            }
            // append to list of users
            document.getElementById('list_of_assumptions').innerHTML += finished
            // send new id_of_latest_listing to server
            // try...catch simply prevents logging an error after there is
            // no more data
            try {
              id_of_latest_listing = json_from_server.load[json_from_server.load
                .length-1][0].id
            }
            catch (TypeError) {
              // do nothing
            }
            // add the functionality to add/unadd and display added as added
            // and unadded as unadded
            add_buttons = document.querySelectorAll('button[class="add"]')
            unadd_buttons = document.querySelectorAll('button[class="unadd"]')

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

        xhr.open('POST', '/load_more_assumptions', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }


  }
}
