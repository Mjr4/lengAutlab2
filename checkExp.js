//const expIf = new RegExp("ab");
const expVarName = /^[a-z]+(\d|[a-z]|-|_)*$/; // equivalente a ^[a-zA-Z]([a-zA-Z]|[0-9]|-)*
const expGetIfPar =
  /(?<vn>(\w+|\"(\w*\s*)*\"))\s*(?<op>(>|<|==|<=|>=))\s*(?<con>(\w+|\"(\w*\s*)*\"))/; //expresion obtener parametros if
const expIfDecl = /if\s*\((\w*|\W*)*\)\:\n(\t|\s{4})(pass)$/; //exp declaracion if
const expStrg = /^\"\w*|\s*\"/;
const expFunct = /^def [a-z]+\((\w|,|\s)*\)\:$/;
const expWhile = /^while\s*\((\w*|\D*)*\):$/;
const expGetFunctPar = /\((?<p>(\w+|\s*|,)*\w+)*\)/;
const expLogOp = /\((?<logOp>(true|false))\)/;
//const input = 'if(abc==8):'

function isValidVarName(varName = "") {
  return expVarName.test(varName);
}

function getIfparam(syntax = "") {
  let match = expGetIfPar.exec(syntax);
  let param1 = match.groups.vn;
  let opert = match.groups.op;
  let param2 = match.groups.con;

  return [param1, opert, param2];
}

function isValidStrgs(input = "") {
  return expStrg.test(input);
}

function getFunctionParam(syntax = "") {
  const param = expGetFunctPar.exec(syntax);
  let paramList = param.groups.p.split(",");
  return paramList;
}

function isValidIfDecl(syntax = "") {
  return expIfDecl.test(syntax);
}

function arValidIfParam(input = "") {
  return expGetIfPar.test(input);
}

function isValidFunctDecl(syntax = "") {
  return expFunct.test(syntax);
}

function arValidFunctParam(input = "") {
  return expGetFunctPar.test(input);
}

function isValidWhileDecl(syntax = "") {
  return expWhile.test(syntax);
}

function isValidLogOp(syntax=""){
  return expLogOp.test(syntax)
}

function getLogOp(syntax=""){
  const logOp = expLogOp.exec(syntax);
  return logOp.groups.logOp
}

function validateIfParam(param1, opert, param2) {
  if (isValidVarName(param1) && isValidVarName(param2)) {
    return "Correcta declaracion de sentencia If y nombres de variables";
  } else if (isValidStrgs(param1) && isValidStrgs(param2) && opert == "==") {
    return "Correcta declaracion de sentencia If y validacion de cadenas";
  } else if (isValidVarName(param1) && isValidStrgs(param2) && opert == "==") {
    return "Correcta declaracion de sentencia If, nombres de variables y validacion de cadenas";
  } else if (isValidStrgs(param1) && isValidVarName(param2) && opert == "==") {
    return "Correcta declaracion de sentencia If, nombres de variables y validacion de cadenas";
  }
  // todo: añadir condicional para numeros
  return "Error de parametros";
}

function isValidParam(functParmList) {
  let validParam = false;
  functParmList.forEach((element) => {
    if (expVarName.test(element)) {
      validParam = true;
    } else {
      validParam = false;
    }
  });
  return validParam;
}

export function identifSyntx(input = "") {
  let result = [];
  if (isValidIfDecl(input)) {
    result.push(['Encontrada sentencia valida if():', true]);
    if (!arValidIfParam(input)) {
      result.push(["Error en condicional no declarada", false]);
      return result;
    }
    let [param1, opert, param2] = getIfparam(input);
    let val = validateIfParam(param1, opert, param2)
    result.push([val, true])
    return result
  } else if (isValidFunctDecl(input)) {
    if (!arValidFunctParam(input)) {
      //return "Error de parametros";
    }
    let functParmList = getFunctionParam(input);
    let validIfParam = isValidParam(functParmList);
    /*return validIfParam
      ? "Correcta declaracion de funcion"
      : "Error de parametros";*/
  } else if (isValidWhileDecl(input)) {
    if(arValidIfParam(input) | isValidLogOp(input)) {
      //return "Syntaxis correcta para sentencia While";
    }
    //return "Error de parametros o operadores"
  }
  //return "No se identifica la sintaxis introducida";
}

//console.log(identifSyntx('if (b == "a"):'))
//console.log(identifSyntx('if (1a>b):\n\tpass'));
