document.onreadystatechange=function(){if("complete"===document.readyState){add_buttons=document.querySelectorAll('button[class="add"]'),unadd_buttons=document.querySelectorAll('button[class="unadd"]');for(let t=0,e=add_buttons.length;t<e;t++)add_buttons[t].parentElement.parentElement.classList.contains("added")?add_buttons[t].classList.add("hide"):unadd_buttons[t].classList.add("hide");for(let t=0,e=add_buttons.length;t<e;t++)add_buttons[t].addEventListener("click",function(){let e=new XMLHttpRequest,d={id:add_buttons[t].getAttribute("ASSUMPTION_ID")};e.onload=function(){200==this.status&&(add_buttons[t].parentElement.parentElement.classList.add("added"),unadd_buttons[t].classList.remove("hide"),add_buttons[t].classList.add("hide"))},e.open("POST","/addassumption",!0),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(d))});for(let t=0,e=unadd_buttons.length;t<e;t++)unadd_buttons[t].addEventListener("click",function(){let e=new XMLHttpRequest,d={id:unadd_buttons[t].getAttribute("ASSUMPTION_ID")};e.onload=function(){200==this.status&&(unadd_buttons[t].parentElement.parentElement.classList.remove("added"),add_buttons[t].classList.remove("hide"),unadd_buttons[t].classList.add("hide"))},e.open("POST","/unaddassumption",!0),e.setRequestHeader("Content-Type","application/json"),e.send(JSON.stringify(d))})}};