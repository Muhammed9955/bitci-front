export default function processData(srcList, type, desc, res) {
  //https://api.hitbtc.com/api/2/public/orderbook/ETHBTC
  // Convert to data points
  var list = new Array(srcList.length)

  for (var i = 0; i < srcList.length; i++) {
    /*list[i] = {
      value: Number(list[i][0]),
      volume: Number(list[i][1]),
    }*/
    list[i] = {
      value: Number(srcList[i].price),
      volume: Number(srcList[i].size),
    }
  }

  list = list.reverse()
  // Sort list just in case
  // list.sort(function (a, b) {
  //   if (a.value > b.value) {
  //     return 1
  //   }
  //   else if (a.value < b.value) {
  //     return -1
  //   }
  //   else {
  //     return 0
  //   }
  // })

  // Calculate cummulative volume
  if (desc) {
    for (var i = list.length - 1; i >= 0; i--) {
      if (i < (list.length - 1)) {
        list[i].totalvolume = list[i + 1].totalvolume + list[i].volume
      }
      else {
        list[i].totalvolume = list[i].volume
      }
      var dp = {}
      dp["value"] = list[i].value
      dp[type + "volume"] = list[i].volume
      dp[type + "totalvolume"] = list[i].totalvolume
      res.unshift(dp)
    }
  }
  else {
    for (var i = 0; i < list.length; i++) {
      if (i > 0) {
        list[i].totalvolume = list[i - 1].totalvolume + list[i].volume
      }
      else {
        list[i].totalvolume = list[i].volume
      }
      var dp = {}
      dp["value"] = list[i].value
      dp[type + "volume"] = list[i].volume
      dp[type + "totalvolume"] = list[i].totalvolume
      res.push(dp)
    }
  }

}
