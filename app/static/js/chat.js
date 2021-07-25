document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    document.getElementById('send-text').onclick = function() {
      console.log(document.getElementById('text-to-send').value)
    }
  }
}
