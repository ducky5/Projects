document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    let socket = io()
    // send recipient id on connect
    socket.on('connect', function(msg) {
      socket.emit('send_latest_msg_to_client',
      document.getElementById('send-text').getAttribute('RECIPIENT_ID'))
    })

    // get the latest msg in database
    socket.on('get_latest_msg', function(msg) {
      let message_to_html = '<div class="recipient-pronoun">' +
      msg.recipient_pronoun + '</div>' + '<div class="recipient-message">' +
      msg.message + '</div>'

      document.getElementById('recipient_msg_from_websocket').innerHTML
      = message_to_html
    })

    // to show the most recent messages and not the beginning of conversation
    chat_scrollable = document.getElementById('scrollable-chat')
    chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)

    // ajax for sending json to server
    document.getElementById('send-text').addEventListener('click',
    function() {
      let xhr = new XMLHttpRequest()

      let data = {'recipient_id': this.getAttribute('RECIPIENT_ID'),
                  'message': document.getElementById('text-to-send').value}

      xhr.onload = function() {
        if (this.status == 200) {
          if (this.responseText == 'success') {
            document.getElementById('text-to-send').value = ''
            let message_to_html = '<div class="sender-pronoun">You</div>' +
            '<div class="sender-message">' + data.message + '</div>'

            document.getElementById('current_user_msg_from_client_js')
            .innerHTML = message_to_html

            chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)
          }
        }
      }

      xhr.open('POST', '/save-message', true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(data))
    })

    document.getElementById('text-to-send').onkeypress = function(event) {
      if (event.keyCode == 13) {
        event.preventDefault() // prevents new line in textarea

        let xhr = new XMLHttpRequest()

        let data = {'recipient_id': document.getElementById('send-text')
        .getAttribute('RECIPIENT_ID'),
                    'message': document.getElementById('text-to-send').value}

        xhr.onload = function() {
          if (this.status == 200) {
            if (this.responseText == 'success') {
              document.getElementById('text-to-send').value = ''
              let message_to_html = '<div class="sender-pronoun">You</div>' +
              '<div class="sender-message">' + data.message + '</div>'

              document.getElementById('current_user_msg_from_client_js')
              .innerHTML = message_to_html

              chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)
            }
          }
        }

        xhr.open('POST', '/save-message', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    }
  }
}
