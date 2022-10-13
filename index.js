import {identifSyntx} from './checkExp.js';

const verify = document.querySelector("#btm");
const text = document.querySelector("#expr");
const form = document.querySelector("#form");
const resp = document.querySelector("#respons");

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
  console.log(text.value);
  resp.innerHTML = identifSyntx(text.value);
  
});

