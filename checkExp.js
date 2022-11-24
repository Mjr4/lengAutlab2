//const expIf = new RegExp("ab");
const expId = /[a-z]+(\d|[a-z]|-|_)*/g; // eq ^[a-z]([a-z]|[0-9]|-)*
const expResvW = /(def|if|while)/g
const expObj = /(?<name>([a-z]+(\d|[a-z]|-|_)))*\(/g
const expParOp = /\(/g
const expParCl = /\)/g


function setToken(token='', val='', lastIdx=0){
  return {token, val, lastIdx}
}

function getIds(input = "") {
  //Funcion retorna id encontrados y sus posiciones
  if ((find = expId.exec(input)) !== null){
    let find2 = find;
    if (!(expResvW.test(find2[0]))){
      return (setToken('id', find2[0],expId.lastIndex))
    }
  }
  return null
}

function testOpenPar(input = ''){
  if ((find = expParOp.exec(input)) != null){
    return (setToken('OpenPar', find[0], expParOp.lastIndex))
  }
  return null
}

function testClosPar(input = ''){
  if ((find = expParCl.exec(input)) != null){
    return (setToken('ClosPar', find[0], expParCl.lastIndex))
  }
  return null
}

function testObject(input=''){
  if ((find = expObj.exec(input)) !== null){
    if((n = getIds(find.groups.name)) != null){
      return (n)
    }
  }
  return null
}

function testResvWord(input = ""){
  if ((find = expResvW.exec(input)) !== null){
    return (setToken('resvW', find[0],expResvW.lastIndex))
  }
  return null
}

function getToken(objet){
  const {token,val} = objet
  return [token, val]
}

function identifSyntx(input = "") {
  //Funcion principal que identifica sintaxis y realiza los procedimientos
  let inputList = input.split(' ')
  inputList.map((element)=>{
    if ((r = testResvWord(element)) !== null|undefined){
      console.log(r)
    }else if ((r = testOpenPar(element)) !== null|undefined){
      console.log(r)
    }else if ((r = testClosPar(element)) !== null|undefined){
      console.log(r)
    }else if ((r = getIds(element)) !== null|undefined){
      console.log(r)
    }
  })
  //console.log(allTokens)
}

identifSyntx('while ( true )')
// def main( a , b ):
// identifSyntx('if (a<b)')
// identifSyntx('while(a>1)')
