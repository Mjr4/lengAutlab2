//const expIf = new RegExp("ab");
const expVarName = /^\D(\D|\d|-|_)*/; // equivalente a ^[a-zA-Z]([a-zA-Z]|[0-9]|-)*
const expGetIfPar = /(?<vn>(\w+|\"(\w*\s*)*\"))\s*(?<op>(>|<|==|<=|>=))\s*(?<con>(\w+|\"(\w*\s*)*\"))/; //expresion obtener parametros if
const expIfDecl = /if\s*\(\s*(\w+|\"(\w*\s*)*\")\s*(>|<|==|<=|>=)\s*(\w+|\"(\w*\s*)*\")\s*\)\:/; //exp declaracion if
const expStrg = /^\"\w*|\s*\"/
//const input = 'if(abc==8):'

function chcVarName(varName) {
  return expVarName.test(varName);
}


function getIfparam(syntax){
  let match = expGetIfPar.exec(syntax);
  let comp1 = match.groups.vn;
  let opert = match.groups.op;
  let comp2 = match.groups.con;

  return [comp1, opert, comp2];
}



function validStrgs(inp){
  return expStrg.test(inp)
}

export function identifSyntx(input) {
  if (expIfDecl.test(input)) {
    const [comp1, opert, conp2] = getIfparam(input)
    

    if(chcVarName(comp1) && chcVarName(conp2)){
      return 'correct syntax for IF statemen'
    }else if (validStrgs(comp1) && validStrgs(conp2) && opert=='==') {
      return 'correct'
    }else if (chcVarName(comp1) && validStrgs(conp2) && opert=='=='){
      return 'correct'
    }else if (validStrgs(comp1) && chcVarName(conp2) && opert=='=='){
      return 'correct'
    }

    return 'incorrect syntax for IF statemen'
  }
  return 'not if statemen'
}


//console.log(identifSyntx('if (b == "a"):'))
//console.log(chcVarName('1a'))