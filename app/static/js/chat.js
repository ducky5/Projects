document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    let socket = io()
    // send recipient id on connect
    socket.on('connect', function(msg) {
      socket.emit('send_latest_msg_to_client',
      document.getElementById('send-text').getAttribute('RECIPIENT_ID'))
    })

    // get sender msg on successfull send
    // socket.on('get_sender_msg', function(msg) {
    //   // console.log(msg.message.message)
    // })

    // let all_visible_messages = document.getElementsByClassName('messages')
    // get the latest msg in database
    socket.on('get_latest_msg', function(msg) {
      // if (msg.emit_finished) {
      let message_to_html = '<div class="recipient-pronoun">' +
      msg.recipient_pronoun + '</div>' + '<div class="recipient-message">' +
      msg.message + '</div>'

      document.getElementById('recipient_msg_from_websocket').innerHTML
      = message_to_html

        // chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)
        //
        // document.getElementById('text-to-send').disabled = false
        // document.getElementById('text-to-send').focus()
      // }
      // console.log(msg.id, Number(all_visible_messages[all_visible_messages.length-1].getAttribute('MESSAGE_ID')))
    })
    // console.log(all_visible_messages[all_visible_messages.length-1])

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
            // send to socket as well
            // socket.emit('send_message', data)

            let message_to_html = '<div class="sender-pronoun">You</div>' +
            '<div class="sender-message">' + data.message + '</div>'

            document.getElementById('current_user_msg_from_client_js')
            .innerHTML = message_to_html

            // chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)

            // document.getElementById('text-to-send').disabled = true
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
              // send to socket as well
              // socket.emit('send_message', data)

              let message_to_html = '<div class="sender-pronoun">You</div>' +
              '<div class="sender-message">' + data.message + '</div>'

              document.getElementById('current_user_msg_from_client_js')
              .innerHTML = message_to_html

              // chat_scrollable.scrollTo(0, chat_scrollable.scrollHeight)

              // document.getElementById('text-to-send').disabled = true
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
