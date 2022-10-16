import {identifSyntx} from './checkExp.js';

const verify = document.querySelector("#btm");
const text = document.querySelector("#expr");
const form = document.querySelector("#form");
const contDivResp = document.querySelector("#respDiv0")
const container = document.querySelector("#contain")
const tableR = document.querySelector(".responsTable")

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
  const respIdf = identifSyntx(text.value);
  let end = respIdf.length
  for(i=1; i<end; i++){
    cloneNode("respDiv".concat(i));
  }
  for(i=0; i<end; i++){
    let textResp = document.querySelector("#respDiv"+i).lastElementChild.id
    document.querySelector("#"+textResp).innerHTML = respIdf[i][0]
    let check = document.querySelector("#check_"+i)
    let cross = document.querySelector("#cross_"+i)
    
    if (respIdf[i][1]){
      cross.style.display="none";
      check.style.display="block"
    }else{
      cross.style.display="block";
      check.style.display="none"
    }
  }

});

function cloneNode(index){
  let newR = contDivResp.cloneNode(true)
  newR.id = index
  newR.lastElementChild.id = "resp_".concat(index.slice(-1))
  newR.childNodes[1].id = "check_".concat(index.slice(-1));
  newR.childNodes[3].id = "cross_".concat(index.slice(-1));
  container.appendChild(newR)
}