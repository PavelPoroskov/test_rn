function color2arr10( _str ) {
  const str = _str.split('(#')[1]
  const sR = str.slice(0,2)
  const sG = str.slice(2,4)
  const sB = str.slice(4,6)

  return [ parseInt(sR, 16), parseInt(sG, 16), parseInt(sB, 16) ]
}

let sColor16 = 
//'chartreuse (#7fff00)' // light
//'forestgreen (#228b22)' // dark
//'green (#008000)' // dark
//'greenyellow (#adff2f)' // light
//'lawngreen (#7cfc00)' // light
//'lime (#00ff00)' 
//'limegreen (#32cd32)'
//'mediumspringgreen (#00fa9a)' // no 
//'springgreen (#00ff7f)' // no
//'yellowgreen (#9acd32)' // no
//'royalblue (#4169e1)'
//'mediumblue (#0000cd)'
'blue (#0000ff)'
