//const expIf = new RegExp("ab");
const expVarName = /\D(\D|\d|-|_)*/; // equivalente a ^[a-zA-Z]([a-zA-Z]|[0-9]|-)*
const expGetIfPar = /(?<vn>\w+)\s*(?<op>(>|<|==|<=|>=))\s*(?<con>\w+)/; //expresion obtener parametros if
const expIfDecl = /if\s*\(\s*\w+\s*(>|<|==|<=|>=)\s*\w+\s*\)\:/; //exp declaracion if

//const input = 'if(abc==8):'

function chcVarName(varName) {
  return expVarName.test(varName);
}

function alex(inp = "") {
  let match = expGetIfPar.exec(inp);
  let comp1 = match.groups.vn;
  let opert = match.groups.op;
  let comp2 = match.groups.con;

  return [comp1, opert, comp2];
}

function checkImp(input) {
  if (!expIfDecl.test(input)) {
    console.log("invalid declaration of syntax if");
    return 0;
  }
  console.log("valid declaration of syntax if");
  const [a, b, c] = alex(input);
  console.log("comparador 1: " + a, "operador: " + b, " comparador 2: " + c);
  return 1;
}

checkImp("if(v>3):");
