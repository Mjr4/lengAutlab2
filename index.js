import {identifSyntx} from './checkExp.js';

const verify = document.querySelector("#btm");
const text = document.querySelector("#expr");
const form = document.querySelector("#form");
const resp = document.querySelector("#respons");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(text.value);
  resp.innerHTML = identifSyntx(text.value);
  
});

