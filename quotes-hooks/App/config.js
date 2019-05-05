function compare(o1, o2) {
  if (o1.key < o2.key) {
    return -1;
  }
  if (o1.key > o2.key) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

export default {
  URL: 'https://poloniex.com/public?command=returnTicker',

  //transformResult: null,
  //transformResult: (result) => result,
  // transformResult: oResult => {
  //   let newResult = []

  //   let limit = 10
  //   //stupid error
  //   //for (let key of oResult) {
  //   for (let key in oResult) {
  //     const { last, highestBid, percentChange } = oResult[key]
  //     let newRow = { pair: key, key, last, highestBid, percentChange }
  //     newResult.push(newRow)

  //     limit--
  //     if (limit <= 0) {
  //       break
  //     }
  //   }

  //   return newResult
  // },
  transformResult: oResult => {
    let ar = Object.keys(oResult).map(key => {
      const { last, highestBid, percentChange } = oResult[key]
      return { key, last, highestBid, percentChange }
    })

    return ar.sort( compare )
  },
 

}
