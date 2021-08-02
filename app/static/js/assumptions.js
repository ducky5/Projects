document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // these have the same length
    add_buttons = document.querySelectorAll('button[class="add"]')

    // ajax for adding assumptions
    for (let i = 0, length = add_buttons.length; i < length; i++) {
      add_buttons[i].addEventListener('click', function() {
        let xhr = new XMLHttpRequest()

        let data = {'id': add_buttons[i].getAttribute('ASSUMPTION_ID')}

        xhr.onload = function() {
          if (this.status == 200 && this.responseText == 'success') {
            add_buttons[i].parentElement.parentElement.remove()
          }
        }

        xhr.open('POST', '/addassumption', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      })
    }

      // ajax for loading more assumptions

      // the variables
      let listings = document.querySelectorAll('.list-item-wrapper')
      try {
        var id_of_latest_listing = listings[listings.length-1]
        .getAttribute('ASSUMPTION_ID')
      }
      catch (TypeError) {
        var id_of_latest_listing = 25
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
              let json_to_html =
              '<div class="list-item-wrapper" ASSUMPTION_ID="' +
              json_from_server.load[i].id + '"' + '>'
              + '<span class="action-buttons">' +
              '<button type="button" name="add_assumption" class="add" ' +
              'title="add"' + 'ASSUMPTION_ID="' +
              json_from_server.load[i].id + '">' +
              '<i class="fas fa-plus-circle"></i>' + '</button>' + '</span>' +
              '<li ' + 'class="' + json_from_server.load[i].content_type +
              '">' + json_from_server.load[i].content + '</li>' + '</div>'

              finished += json_to_html
            }
            // append to list of users
            document.getElementById('list_of_assumptions').innerHTML += finished
            // try...catch simply prevents logging an error after there is
            // no more data
            try {
              id_of_latest_listing = json_from_server.load[json_from_server.load
              .length-1].id
            }
            catch (TypeError) {
              id_of_latest_listing++
            }
            add_buttons = document.querySelectorAll('button[class="add"]')

            // ajax for adding assumptions
            for (let i = 0, length = add_buttons.length; i < length; i++) {
              add_buttons[i].addEventListener('click', function() {
                let xhr = new XMLHttpRequest()

                let data = {'id': add_buttons[i].getAttribute('ASSUMPTION_ID')}

                xhr.onload = function() {
                  if (this.status == 200 && this.responseText == 'success') {
                    add_buttons[i].parentElement.parentElement.remove()
                  }
                }

                xhr.open('POST', '/addassumption', true)
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
