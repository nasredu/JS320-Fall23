'use strict';
let btn_start = document.querySelector("button");//game-start button
let nber_cells = document.querySelector("#nber-cells");
let main_board = document.querySelector("#main-board");

let matrix = [];

let targetCount = 0;
let userBingoHits = 0;
let selectedColor;
let rgbCodedColors  = {"red":"0", green:1, blue:2};
let cheat=true; //false;
let gameSession = {}
let listGameSessions=[];
//initially, 
// create the default game (3 tiles, easy, red)
//  create an empty table for stats
function gameInit(){
// start_game();
createBoard();
btn_start.disabled = true;
// updateStats();
}
function updateStats(){
    const tableHeading =['player', 'rowXcol','nberClicks', 'level', 'completion'];
    let tableData=listGameSessions, parent=document.querySelector('#stats-row');
    
   createTable(tableHeading, tableData, parent, true, 1); //true is for sortable, and 1 is ASC order

    // // this is a closure function that will use parent function scope
    // // when you click on any th, the stat table is sorted out according to that th 
    // function handleSorting(){
    // tableHeading.forEach((field)=>{
    //     document.querySelector('th#'+field).addEventListener('click',(event)=>{
    //         tableData.sort(fieldComparatorFn(field));
    //         // not sure if it is good to put it here
    //         createTable(tableHeading, tableData, parent);
    //     });
    // })}
    // return handleSorting;
}

gameInit();
btn_start.addEventListener('click', start_game);

// create the borad (2 loops rows and columns)
// each cell is a button; add
function createBoard(){
    let visibility = (document.querySelector("#cheat").checked) ?'visible':'hidden';

    for (let i=1; i<=nber_cells.value; i++){
        
        let row = createElement(main_board, "section", {"id":"row-"+i, "class":"row", });
        let rowData = new Array();// to hold one particular row of data

        for (let j=1; j<=nber_cells.value; j++){
            let randomNumber = randomBetwen(1,20);
            let wrapper = createElement(row, 'section', {'id':'cell-'+i+j, 'class':'cell-wrapper'})
            wrapper.style.display='flex';
            wrapper.style.flexDirection='column';

            let cellBGDColor = randomHtmlColor(gameComplexityLevel);
            // create and array of the three values that are extracted from rgb string
            // then get the index (0 (red),1 (green) or 2(blue)) of max channel 
            const bgdColorArr= extract3ValuesFromRGB(cellBGDColor)
            let maxIndexChannel= getMax3Values(bgdColorArr)

            maxIndexChannel = (maxIndexChannel==0) ? "0" : maxIndexChannel;

            const cell = createElement(wrapper, "button", {"id":String(i)+String(j), "class":"cell", "textContent": maxIndexChannel, 
            'background':cellBGDColor, "bgdColor": maxIndexChannel });
            const colorNote = createElement(cell, "section", {"id":'color'+String(i)+String(j), "class":"cell-rgb", "textContent": cellBGDColor, 
            "visibility":visibility });

            //compute targetCount:
            // i.e., count how many tiles are of the same color as the selectedColor
           if (maxIndexChannel == rgbCodedColors[selectedColor]) 
                targetCount++;
            // create the matrix to hold the numbers
            rowData[j-1] = randomNumber;
            }
            matrix.push(rowData)
            //take any cell from the current row and add it tothe targetCount
            // targetCount += rowData[randomBetwen(0,nber_cells.value)];

    }
}
/**
 * 
 * @param {Event} event 
 */
function start_game(event){

    // create a player instance 
    gameSession= {'player':document.querySelector("#name").value, 
    rowXcol: document.querySelector("#nber-cells").value,
    nberClicks:0,
    level:gameComplexityLevel, completion:'-' ,}
    

    // listGameSessions.push(gameSession);
    // updateStats();
    event.preventDefault()
    // create the matrix to hold all rows of data
    matrix = new Array();
    targetCount = 0;
    selectedColor = document.querySelector('[name=radio-colors]:checked').value;
    // btn_start.style.background = selectedColor;
    
    // 1. if rows already there, remove them (its a new game)
    let allRows = document.getElementsByClassName("row");
    if (allRows.length>0)
        for (let i =allRows.length-1; i>=0; i--) 
            {allRows[i].remove();
            }

    // 2. create the rows (nber_cells rows)
    // then in each row suff nber_cells of buttons

   createBoard();
    console.log('matrix:',matrix)
    // 3. create the last row and append it to last-row
    let lastRow = document.querySelector("#last-row")
    let solutionRow = createElement(lastRow, "section", {"id":"solution-row", "class":"row", });
    
    

    let pathSection = createElement(solutionRow, 'section', {"id":"path"})
    pathSection.innerHTML=`click to select <span style='color:white; background:${selectedColor}'>${selectedColor} </span>, click another time to unselect`

    let btnSubmitGuess = createElement(solutionRow, 'button', {"id":"submit-guess", "class":"cell enabled", "textContent":  "Submit Your Guesses", 
// background:selectedColor
}); //targetCount
    btnSubmitGuess.classList.add("enabled");
    pathSection.style.flex= (nber_cells.value-1)/nber_cells.value;
    btnSubmitGuess.style.flex = 1/nber_cells.value;

    
    main_board.addEventListener('click', handleTiles);


    btnSubmitGuess.addEventListener('click', function(){
        //disable this button (ganme session fincished)
        btnSubmitGuess.classList.remove("enabled");
        btnSubmitGuess.classList.add("disabled");
        btnSubmitGuess.setAttribute('disabled', true)
        
        
        //show the rgb values in each tile
        // play success otr failure sounds
        document.querySelectorAll('.cell-rgb').forEach(function(elem){
            elem.style.visibility="visible"
            elem.style.color='black';
            document.querySelector('audio').play()
          });
        //update game session result and an entry to the table
        gameSession['completion'] = ((userBingoHits / targetCount)*100).toFixed(2);
        // listGameSessions.push(gameSession);
        listGameSessions.push(gameSession);
        updateStats();

        // stop listneing to tile clicks 
        // remove the event
        main_board.removeEventListener('click', handleTiles);
        userBingoHits = 0; 
    });



    // //3. create the last row and append it to last-row
    
    // let lastRowSum = document.querySelector("#last-row")
    // // let solutionRow = createElement(lastRowSum, "section", {"id":"solution-row", "class":"row", });
    
    // for (let j=1; j<=nber_cells.value; j++){
    //     // let randomNumber = randomBetwen(0,20);
    //     let cell = createElement(lastRowSum, "button", {"id":"col"+String(j), "class":"cell", "textContent":  randomBetwen(0,20)});
    //     }
    
}


// function 

let pathSolution="", sum=0;



function handleTiles(event){
    event.stopPropagation();
    console.log('clicked', event.target.id )
    if (event.target.selected)
        {event.target.selected=false;
            event.target.parentElement.style.border='0px solid yellow'; 

            gameSession.nberClicks++;
            if (event.target.textContent.substring(0,1)==rgbCodedColors[selectedColor])
            userBingoHits--;
        
        }
    else{event.target.selected=true;
        event.target.parentElement.style.border='4px solid yellow'; 
        gameSession.nberClicks++;
        if (event.target.textContent.substring(0,1)==rgbCodedColors[selectedColor])
            userBingoHits++;
    }
    
        // gameSession.sum+= Number(event.target.textContent);
        document.querySelector('#path').textContent =`Need to guess ${targetCount} ${selectedColor}] [Your finding: ${gameSession.sum}`;
        

    if (targetCount == gameSession.sum)
        {document.querySelector('#path').style.border-"5px solid orange";
        document.querySelector('#path').style.background = "yellow";
    }      
    else
    {    document.querySelector('#path').style.background = "white";}
        

    // if admin is setting the game (sum)
    // pathSolution= pathSolution +","+event.target.id
}