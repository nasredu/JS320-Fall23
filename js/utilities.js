
/**
 * @description
 * create an element of type tagName
 * set all its possible properties from properties
 * append ot to parent
 * @param {HTMLElement} parent 
 * @param {string} tagName 
 * @param {Object} properties 
 * @returns {HTMLElement}
 */
function createElement(parent, tagName, properties, where="bottom" ){
    let newElement = document.createElement(tagName);
    if (properties['id']) newElement.id= properties['id'];
    if (properties['style']) newElement.style= properties['style'];
    if (properties['background']) newElement.style.background= properties['background'];
    if (properties['color']) newElement.style.color= properties['color'];
    if (properties['visibility']) newElement.style.visibility= properties['visibility'];
    if (properties['display']) newElement.style.display= properties['display'];

    if (properties['class']) newElement.className= properties['class'];
    if (properties['textContent']) newElement.textContent= properties['textContent'];
    if (properties['innerHTML']) newElement.innerHTML= properties['innerHTML'];
    
    if (properties['value']) newElement.value= properties['value'];
    if (properties['placeholder']) newElement.placeholder= properties['placeholder'];
  if (where=="bottom") parent.append(newElement);
   else parent.prepend(newElement);
    return newElement;   
}

/**
 * @description
 * generate a random (whole) number between min and max 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
function randomBetwen(min, max){
    return Math.floor(Math.random()*(max-min))
  }

  /**
   * 
   * @param {Number} start 
   * @param {Number} end 
   * @returns {Number} # random number between start and end inclusive 
   */
  function random(start, end){

    return  Math.floor(Math.random()*(end-start)+1)
  }

  function randomHtmlColor(gameComplexity){
    if (gameComplexity=='easy')
    return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`

    if (gameComplexity=='medium')
      complexityThreshold = 80
    else if (gameComplexity=='difficult')
    complexityThreshold = 50
    else
    complexityThreshold = 10
    

    let redChannel = random(0,255), 
    greenChannel = random(0,255), 
    blueChannel=  random(0,255);
    
    while (   Math.abs(redChannel-greenChannel)>=complexityThreshold 
          ||  Math.abs(redChannel-blueChannel)>=complexityThreshold){
      redChannel = random(0,255), 
      greenChannel = random(0,255), 
      blueChannel=  random(0,255);
    }
    
    //highlight the channel with highest intensity
    // let index = getMax3Values([redChannel, greenChannel, blueChannel])
    
    // if (index ==0) redChannel= `<span style='font-weight:bold>${redChannel}'</span>`;
    // else if (index ==1) greenChannel= `<span style='font-weight:bold>${greenChannel}'</span>`;
    // else  blueChannel= `<span style='font-weight:bold>${blueChannel}'</span>`;
    
    return `rgb(${redChannel}, ${greenChannel}, ${blueChannel})`
  
  }

/**
 * @extract val1, val2 and val3 from String
 * @param {String} rgbString # in the format rgb(val1, val2, val3)
 * @returns arr [val1, val2, val3]
 */
  function extract3ValuesFromRGB(rgbString){
    let rgbArr =[]
    let firstComma = rgbString.indexOf(",")
6
let secondComma = rgbString.lastIndexOf(",")

rgbArr.push(+(rgbString.substring(4, firstComma)))
rgbArr.push(+rgbString.substring(firstComma+1, secondComma))
rgbArr.push(+rgbString.substring(secondComma+1, rgbString.length-1) )

return rgbArr
  }
/**
 * 
 * @param  {...any} arr 
 * @returns 
 */
  function getMax3Values(arr){
    if (arr[0]> arr[1])
      if (arr[0]>arr[2])
          return 0;
      else
          return 2;
    else
      if (arr[1]>arr[2])
        return 1;
      else
          return 2;
  }
/**
 * 
 * @param {Array} tableHeading 
 * @param {Array} tableData 
 * @param {HTMLElement} parent 
 */
  function createTable(tableHeading, tableData, parent, sortable=false, sortOrder=1){
    // remove the table if it already exists
    let table = document.querySelector('table');
    if (table) table.remove(); 
    
    // create a new fresh table!
    table = createElement(parent, 'table', {});
  
    //first row Table Headings
    let tr = createElement(table, 'tr', {});
    for (let data of tableHeading){
      let th =  createElement(tr, "th", {id:data, "textContent":data, sortOrder:sortOrder}); //sortOrder:"ASC"});
      if (sortable) th.addEventListener('click', (event)=>{
        tableData.sort(fieldComparatorFn(data, sortOrder));
        sortOrder=-sortOrder;
        createTable(tableHeading, tableData, parent, true, sortOrder); //flip from to -1 after each each click
        ;});
    }
//first row Table Headings
  for (let row of tableData){
      tr = createElement(table, 'tr', {});
      for (let data of Object.values(row)){
          let td =  createElement(tr, "td", {"textContent":data});
  }}
  }
  /**  generic comparator to be used with array.sort(...) on 
   * any property of the objects elements
   *  returns a comparator function based on field 
   * e.g [{...,age: valueX, },{...,age: valueY, }].sort(fieldComparatorFn('age'))
   * @param {String} field 
   * @param {String} order 
   * @returns 
   */
  function fieldComparatorFn(field, sortOrder=1) { //sortOrder="ASC"){
    return function(elem1, elem2){
      // let output = (order==="ASC")?1:-1;
          if (elem1[field]>= elem2[field]) return sortOrder*1;
          return sortOrder*(-1)
    }
  }