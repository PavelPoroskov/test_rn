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
  transformResult: oResult =>
    Object.keys(oResult).map(key => {
      const { last, highestBid, percentChange } = oResult[key]
      return { pair: key, key, last, highestBid, percentChange }
    }),

}
