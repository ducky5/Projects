"use strict"

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // these have the same length
    let add_buttons = document.querySelectorAll('button[class="add"]')
    // let unadd_buttons = document.querySelectorAll('button[class="unadd"]')

    // // on page load
    // for (let i = 0, length = add_buttons.length; i < length; i++) {
    //   if (add_buttons[i].parentElement.parentElement.classList
    //   .contains('added')) {
    //     add_buttons[i].classList.add('hide')
    //   }
    //   else {
    //     unadd_buttons[i].classList.add('hide')
    //   }
    // }

    // ajax for adding users
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      add_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        let data = {'id': add_buttons[i].getAttribute('USER_ID')}

        xhr.onload = function() {
          if (this.status == 200 && this.responseText == 'success') {
            add_buttons[i].parentElement.parentElement.remove()
          }
        }

        xhr.open('POST', '/adduser', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      })
    }

      // ajax for unadding users
      // for (let i = 0, length = unadd_buttons.length; i < length; i++) {
      //   unadd_buttons[i].addEventListener('click', function() {
      //     let xhr = new XMLHttpRequest()
      //
      //     let data = {'id': unadd_buttons[i].getAttribute('USER_ID')}
      //
      //     xhr.onload = function() {
      //       if (this.status == 200 && this.responseText == 'success') {
      //         unadd_buttons[i].parentElement.parentElement.classList
      //         .remove('added')
      //         add_buttons[i].classList.remove('hide')
      //         unadd_buttons[i].classList.add('hide')
      //       }
      //     }
      //
      //     xhr.open('POST', '/unadduser', true)
      //     xhr.setRequestHeader('Content-Type', 'application/json')
      //     xhr.send(JSON.stringify(data))
      //   })
      // }

      // ajax for loading more users

      // the variables
      let listings = document.querySelectorAll('.list-item-wrapper')
      try {
        var id_of_latest_listing = listings[listings.length-1]
        .getAttribute('USER_ID')
      }
      catch (TypeError) {
        var id_of_latest_listing = 1
      }

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
              let json_to_html = '<div class="list-item-wrapper" USER_ID="' +
              json_from_server.load[i][0].id + '"' + '>' +
              '<span class="action-buttons">' +
              '<button type="button" name="add_user" class="add" title="add"'
              + 'USER_ID="' + json_from_server.load[i][0].id + '">' +
              '<i class="fas fa-plus-circle"></i>' + '</button>' + '</span>' +
              '<li>' + '<span class="username">' + json_from_server.load[i][0]
              .username + '</span>' + '<span class="meta-data">' +
              '<span class=' + '"gender ' +
              json_from_server.load[i][0].gender +
              '">' + '[<i class="fas fa-' +
              json_from_server.load[i][0].gender +
              '" name="gender"></i>]</span>' + '<span class="compatibility">'
              + '[' + json_from_server.load[i][1] + '%]' + '</span>' +
              '<span class="age">' + '[' + json_from_server.load[i][0].age +
              ']</span>' + '</span>' + '</li>' + '</div>'

              finished += json_to_html
            }
            // append to list of users
            document.getElementById('list_of_users').innerHTML += finished
            // send new id_of_latest_listing to server
            // try...catch simply prevents logging an error after there is
            // no more data
            try {
              id_of_latest_listing = json_from_server.load[json_from_server.load
                .length-1][0].id
            }
            catch (TypeError) {
              id_of_latest_listing++
            }
            // add the functionality to remove once added(to loaded via ajax)
            let add_buttons = document.querySelectorAll('button[class="add"]')
            for (let i = 0, length = add_buttons.length; i < length; i++) {
              add_buttons[i].addEventListener('click', function() {
                let xhr = new XMLHttpRequest()

                let data = {'id': add_buttons[i].getAttribute('USER_ID')}

                xhr.onload = function() {
                  if (this.status == 200 && this.responseText == 'success') {
                    add_buttons[i].parentElement.parentElement.remove()
                  }
                }

                xhr.open('POST', '/adduser', true)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify(data))
              })
            }

          }
        }

        xhr.open('POST', '/load_more', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }

  }
}
