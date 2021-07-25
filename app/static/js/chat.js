document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
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
          document.getElementById('text-to-send').value = ''
          console.log(this.responseText)
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
            document.getElementById('text-to-send').value = ''
            console.log(this.responseText)
          }
        }

        xhr.open('POST', '/save-message', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    }
  }
}
