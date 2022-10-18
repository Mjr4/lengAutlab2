//const expIf = new RegExp("ab");
const expVarName = /^[a-z]+(\d|[a-z]|-|_)*$/; // eq ^[a-z]([a-z]|[0-9]|-)*
const expGetIfPar =/(?<vn>(\w+|\"(\w*\s*)*\"))\s*(?<op>(>|<|==|<=|>=))\s*(?<con>(\w+|\"(\w*\s*)*\"))/; //expresion obtener parametros if equivale {[(]([a-z][ ])*[)][ ]*([>]|[<]|[==]|[<=]|[>=])([a-z]["]([a-z]*[ ]*)*["])}
const expIfDecl = /if\s*\((\w*|\W*)*\)\:\n(\t|\s{4})(pass)$/; //exp declaracion if equivale a {if[ ]*[(]([a-z]*|[0-9]*)*[):][\t|\s\s\s\s][pass]}
const expStrg = /^\"\w*|\s*\"/;
const expFunct = /^def [a-z]+\((\w|,|\s)*\)\:\n(\t|\s{4})(pass)$/;
const expWhile = /^while\s*\((\w*|\D*)*\):\n(\t|\s{4})(pass)$/;
const expGetFunctPar = /\((?<p>(\w+|\s*|,)*\w+)*\)/; //exp obtener parametros de funcion {[(](([a-z]*|[ ]|[,])*[a-z]+)*}
const expLogOp = /\((?<logOp>(true|false))\)/; //exp operador logico {([true]|[false])}
const expNumb = /^[0-9]+$/;

function isValidVarName(varName = "") {
  //Funcion que valida un nombre de variable
  return expVarName.test(varName);
}

function getIfparam(syntax = "") {
  //Funcion que obtiene parametros del if
  let match = expGetIfPar.exec(syntax);
  let param1 = match.groups.vn;
  let opert = match.groups.op;
  let param2 = match.groups.con;

  return [param1, opert, param2];
}

function isValidStrgs(input = "") {
  //Funcion que valida cadenas literales
  return expStrg.test(input);
}

function isValidNumb(input = "") {
  //Funcion que valida constantes numericas
  return expNumb.test(input);
}

function getFunctionParam(syntax = "") {
  //Funcion que obtiene parametros de funcion
  const param = expGetFunctPar.exec(syntax);
  let paramList = param.groups.p;
  return paramList.split(",");
}

function isValidIfDecl(syntax = "") {
  //Funcion que valida la declaracion if
  return expIfDecl.test(syntax);
}

function arValidIfParam(input = "") {
  //Funcion que valida parametros del if
  return expGetIfPar.test(input);
}

function isValidFunctDecl(syntax = "") {
  //Funcion que valida declaracion de funcion
  return expFunct.test(syntax);
}

function arValidFunctParam(input = "") {
  //funcion que valida parametros de funcion
  return expGetFunctPar.test(input);
}

function isValidWhileDecl(syntax = "") {
  //funcion que valida declaracion de while
  return expWhile.test(syntax);
}

function isValidLogOp(syntax = "") {
  //funcion que valida operadores logicos
  return expLogOp.test(syntax);
}

function validateIfParam(param1, opert, param2) {
  //funcion que valida combinaciones de parametros
  if (isValidVarName(param1) && isValidVarName(param2)) {
    return ["Correcta declaracion de nombres de variable " + param1 + ", " + param2,true];
  } else if (isValidStrgs(param1) && isValidStrgs(param2) && opert == "==") {
    return ["Correcta declaracion de literales " + param1 + ", " + param2,true];
  } else if (isValidVarName(param1) && isValidStrgs(param2) && opert == "==") {
    return ["Correcta declaracion de nombre de variable " +param1 +" y literal " +param2,true];
  } else if (isValidStrgs(param1) && isValidVarName(param2) && opert == "==") {
    return ["Correcta declaracion de nombre de variable " +param2 +" y literal " +param1,true];
  } else if (isValidVarName(param1) && isValidNumb(param2)) {
    return ["Correcta declaracion de nombre de variable " +param1 +" y constante " +param2,true];
  } else if (isValidNumb(param1) && isValidVarName(param2)) {
    return ["Correcta declaracion de nombre de variable " +param2 +" y constante " +param1,true];
  } else {
    return ["Error de parametros", false];
  }
}

function isValidParam(functParmList) {
  //Funcion que verifica si todos los parametros son validos
  let validParam = true;
  functParmList.forEach((element) => {
    if (!expVarName.test(element)) {
      validParam = false;
      return validParam;
    }
  });
  return validParam;
}

export function identifSyntx(input = "") {
  //Funcion principal que identifica sintaxis y realiza los procedimientos
  let result = [];
  if (isValidIfDecl(input)) {
    result.push(["Encontrada declaracion valida de condicional if", true]);
    if (!arValidIfParam(input)) {
      result.push(["Error en parametros de condicional no declarados", false]);
      return result;
    }
    let [param1, opert, param2] = getIfparam(input);
    let val = validateIfParam(param1, opert, param2);
    result.push(val);
    return result;
  } else if (isValidFunctDecl(input)) {
    result.push(["Encontrada declaracion valida de funcion", true]);
    if (!arValidFunctParam(input)) {
      result.push(["Error de parametros de funcion:", false]);
      return result;
    }
    let functParmList = getFunctionParam(input);
    if(functParmList.length==1){
      return result
    }
    if (isValidParam(functParmList)) {
      result.push(["Correcta declaracion de parametros en funcion", true]);
    } else {
      result.push(["Error de declaracion de parametros", false]);
    }
    return result;
  } else if (isValidWhileDecl(input)) {
    result.push(["Encontrada declaracion valida de ciclo while", true]);

    if (arValidIfParam(input)) {
      let [param1, opert, param2] = getIfparam(input);
      let val = validateIfParam(param1, opert, param2);
      result.push(val);
      return result;
    }
    if (isValidLogOp(input)) {
      result.push(["Correcta declaracion de operador logico", true]);
      return result;
    }
    result.push(["Syntaxis incorrecta para argumentos de ciclo while", false]);
    return result;
  }
  return ["No se puede identificar la sintaxis introducida", false];
}
