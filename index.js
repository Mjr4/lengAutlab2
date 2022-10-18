import {identifSyntx} from './checkExp.js';

const text = document.querySelector("#expr");
const form = document.querySelector("#form");
const contDivResp = document.querySelector("#respDiv0")
const container = document.querySelector("#contain")
const respCont = document.querySelector("#responsContainer")
const resp0 = document.querySelector("#resp_0")
const check_0 = document.querySelector("#check_0")
const cross_0 = document.querySelector("#cross_0")

text.addEventListener('keydown', function(e){
  if (e.key == 'Tab'){
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    this.value = this.value.substring(0, start)+"\t"+this.value.substring(end);
    this.selectionStart = this.selectionEnd = start + 1;
  }
})

form.addEventListener("submit", (event) => {
  let i = 0
  event.preventDefault();
  let input = text.value.toString()
  const respIdf = identifSyntx(input.toLowerCase());
  let end = respIdf.flat().length
  let endOfList = respIdf.length
  
  cleanResults()
  if (end >2){
    for(i=1; i<endOfList; i++){
      cloneNode("respDiv".concat(i));
    }
    for(i=0; i<endOfList; i++){
      let textResp = document.querySelector("#respDiv"+i).lastElementChild.id
      document.querySelector("#"+textResp).innerHTML = respIdf[i][0]
      let check = document.querySelector("#check_"+i)
      let cross = document.querySelector("#cross_"+i)
      setDisplay(check, cross, respIdf[i][1])
    }
  }else{
      resp0.innerHTML = respIdf[0]
      setDisplay(check_0, cross_0, respIdf[1])
  }
});

function setDisplay(check,cross,val){
  if(val){
    cross.style.display="none";
    check.style.display="block"
  }else{
    cross.style.display="block";
    check.style.display="none"
  }
}

function cleanResults(){
  let childCount = respCont.childElementCount-1
  if (childCount > 0){
    for (let i=0; i<childCount; i++){
      respCont.removeChild(respCont.lastElementChild)
    }
  }
}

function cloneNode(index){
  let newR = contDivResp.cloneNode(true)
  newR.id = index
  newR.lastElementChild.id = "resp_".concat(index.slice(-1))
  newR.childNodes[1].id = "check_".concat(index.slice(-1));
  newR.childNodes[3].id = "cross_".concat(index.slice(-1));
  respCont.appendChild(newR)
}