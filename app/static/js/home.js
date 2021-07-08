document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // function to check/uncheck filter-by buttons
    function filter_by_check_uncheck(...nameAttributes) {
      let checkMark
      for (let i = 0; i < nameAttributes.length; i++) {
        document.querySelector('button[name="' + nameAttributes[i] + '"]')
        .onclick = function() {
          checkMark = document.getElementById(nameAttributes[i])
          if (checkMark.style.opacity == '0')
            checkMark.style.opacity = '1'
          else
            checkMark.style.opacity = '0'
        }
      }
    }
    // call function
    filter_by_check_uncheck('added-only', 'my-age', 'older-than-me', 'female',
    'male')
    //
    
  }
}
