import {variable} from './checkExp.js';

const verify = document.querySelector("#btm");
const text = document.querySelector("#expr");
const form = document.querySelector("#form");


form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(variable(text.value));
});

