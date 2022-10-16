import {identifSyntx} from './checkExp.js';

const verify = document.querySelector("#btm");
const text = document.querySelector("#expr");
const form = document.querySelector("#form");
const resp = document.querySelector("#respons");
const check = document.querySelector("#check")
const cross = document.querySelector("#cross")
const contDivResp = document.querySelector("#responsTable")
const container = document.querySelector("#contain")



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
  event.preventDefault();
  const respIdf = identifSyntx(text.value);
  resp.innerHTML = respIdf[0][0]
  if (respIdf[0][1]){
    cross.style.display="none";
    check.style.display="block"
  }else{
    cross.style.display="block";
    check.style.display="none"
  }
});