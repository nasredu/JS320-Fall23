let userName =  document.querySelector("#name");
let radioColors = document.querySelectorAll('[name=radio-colors]')
let gameComplexityLevel="easy";

userName.addEventListener('change', (event)=>{
    if (/^[aA-zZ]\w{3,8}$/.test(userName.value))
     {btn_start.disabled= false;
        btn_start.style.background= document.querySelector("[name=radio-colors]:checked").value;
        event.target.style.background = "lightgreen"; //correct
      }
    else {btn_start.disabled= true;
    event.target.style.background = "orange"; //error
    event.target.placeholder="min 3 max 9 alphanumeric chars"
    event.target.focus()
    event.target.value=""

    }
});

radioColors.forEach(function(elem){
  elem.addEventListener('click', function(){
    if(!btn_start.disabled)
        btn_start.style.background= elem.value;
    let innerHTML=` find all tiles that have the highest <span style='background:${elem.value};color:white'>${elem.value}</span> channel intesnisty. Click on em all!`;
    let sec= document.querySelector('#radio_color');
    if (sec) {sec.remove()}
    sec= createElement(document.querySelector("#playground"), 'section', {'innerHTML':innerHTML, 'id': 'radio_color'}, "top");

  });
});

  //----------------
  let radio_levels = document.querySelectorAll('[name=radio-levels]');
  radio_levels.forEach(function(elem){
    elem.addEventListener('click', function(){
        let innerHTML=` You choose LEVEL ${elem.value}`;
    let sec= document.querySelector('#radio_level');
    if (sec) {sec.remove()}
    // sec= createElement(elem.parentElement.parentElement, 'section', {'innerHTML':innerHTML, 'id': 'radio_level'})
    sec= createElement(document.querySelector("#playground"), 'section', {'innerHTML':innerHTML, 'id': 'radio_level'},"top")
    gameComplexityLevel = elem.value;
    });

    
});


//cheat 
let cheatCheck = document.querySelector("#cheat");
cheatCheck.addEventListener('click', (event)=>{
    document.querySelectorAll('.cell-rgb').forEach((cell)=>{
        cell.style.visibility= event.target.checked ?'visible':'hidden';
    });
});