//const expIf = new RegExp("ab");
const expPrint = /printf'(a-b)'/
const expVar = /^\D(\D|\d|-|_)*/
// equivalente a ^[a-zA-Z]([a-zA-Z]|[0-9]|-)*

function variable(input){
    return expVar.test(input);
}


const test = ["0gb","mod_1","1-a","Ac--12","A","sumin1","sumon"]

test.forEach(element => {
   // console.log(element, variable(element));    
});

