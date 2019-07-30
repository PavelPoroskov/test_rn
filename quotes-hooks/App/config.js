
const sortBy = (key) => {
  return (o1, o2) => {
    if (o1[key] < o2[key]) {
      return -1;
    }
    if (o1[key] > o2[key]) {
      return 1;
    }
    return 0;
  };
}

export default {
  URL: 'https://poloniex.com/public?command=returnTicker',

  transformResult: oResult => {
    let ar = Object.keys(oResult).map(key => {
      const { last, highestBid, percentChange } = oResult[key]
      if (!last || !highestBid) {
        throw new Error("Parser error")
      }
      return { key, last, highestBid, percentChange }
    })

    return ar.sort( sortBy('key') )
  },
 
}
