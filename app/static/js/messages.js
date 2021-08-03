"use strict"

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // these have the same length
    let unadd_buttons = document.querySelectorAll('button[class="unadd"]')

      // ajax for unadding users
      for (let i = 0, length = unadd_buttons.length; i < length; i++) {
        unadd_buttons[i].addEventListener('click', function() {
          let xhr = new XMLHttpRequest()

          let data = {'id': unadd_buttons[i].getAttribute('USER_ID')}

          xhr.onload = function() {
            if (this.status == 200 && this.responseText == 'success') {
              let id_of_this_user = unadd_buttons[i].parentElement.parentElement
              .getAttribute('USER_ID')
              let all_messages_from_this_user = document
              .querySelectorAll('div[USER_ID="' + id_of_this_user + '"')
              // remove all messages from this user from the list
              for (let i = 0, length = all_messages_from_this_user.length;
              i < length; i++) {
                all_messages_from_this_user[i].remove()
              }
            }
          }

          xhr.open('POST', '/unadduser', true)
          xhr.setRequestHeader('Content-Type', 'application/json')
          xhr.send(JSON.stringify(data))
        })
      }
  }
}
