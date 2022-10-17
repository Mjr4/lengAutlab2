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
const expNumb = /^[0-9]+$/
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

function isValidNumb(input = ""){
  return expNumb.test(input)
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
    return ["Correcta declaracion de nombres de variable "+param1+", "+param2, true];
  } else if (isValidStrgs(param1) && isValidStrgs(param2) && opert == "==") {
    return ["Correcta declaracion de literales "+param1+", "+param2, true];
  } else if (isValidVarName(param1) && isValidStrgs(param2) && opert == "==") {
    return ["Correcta declaracion de nombre de variable "+param1+" y literal "+param2, true];
  } else if (isValidStrgs(param1) && isValidVarName(param2) && opert == "==") {
    return ["Correcta declaracion de nombre de variable "+param2+" y literal "+param1, true];
  } else if(isValidVarName(param1) && isValidNumb(param2)){
    return ["Correcta declaracion de nombre de variable "+param1+" y constante "+param2, true];
  } else if(isValidNumb(param1) && isValidVarName(param2)){
    return ["Correcta declaracion de nombre de variable "+param2+" y constante "+param1, true];
  }else{
    return ["Error de parametros", false];
  }
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
    result.push(val)
    return result
  } else if (isValidFunctDecl(input)) {
    result.push(['Encontrada sentencia valida def nombre():', true]);
    if (!arValidFunctParam(input)) {
      result.push(['Error de parametros en def nombre():', false]);
      return result
    }
    let functParmList = getFunctionParam(input);
    let validIfParam = isValidParam(functParmList);
    if (validIfParam){
      result.push(["Correcta declaracion de parametros en funcion", true])
    }else{
      result.push(["Error de declaracion de parametros", false]);
    }
    return result

  } else if (isValidWhileDecl(input)) {
    result.push(["Encontrada sentencia valida de while():", true])
  
    if(arValidIfParam(input)){
    let [param1, opert, param2] = getIfparam(input);
    let val = validateIfParam(param1, opert, param2)
    result.push(val)
    return result
    }
    if (isValidLogOp(input)){
      result.push(["Valida declaracion de operador logico:", true]);
      return result
    }
    result.push(["Syntaxis incorrecta para argumentos de while():", false]);
    return result
  }
  return (["No se identifica la sintaxis introducida", false]);
}

//console.log(identifSyntx('def m("a"):'))
//console.log(identifSyntx('if (1a>b):\n\tpass'));
