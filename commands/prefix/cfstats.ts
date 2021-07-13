import { PrefixCommand } from "@tomasajt/cmd";

export default new PrefixCommand({
  names: ["cfstats", "coinflipstats"],
  action: ({ message, args }) => {
    var map = new Map<number, number>();
    var prevHeads = true;
    var inARow = 1
    if (args.length != 1) return
    var num = parseInt(args[0])
    if (isNaN(num)) return
    if (num > 10000) {
      message.channel.send("Number too large")
      return
    }

    for (let i = 0; i < num-1; i++) {
      var currHeads = Math.random() < 0.5
      if (currHeads != prevHeads) {
        prevHeads = currHeads;
        if (!map.has(inARow)) map.set(inARow, 0)
        map.set(inARow, map.get(inARow)! + 1)
        inARow = 0;
      }
      inARow++;
    }
    if (!map.has(inARow)) map.set(inARow, 0)
    map.set(inARow, map.get(inARow)! + 1)

    var arr = []
    for (const kvp of map) arr.push(kvp)
    arr.sort((a, b) => a[0] - b[0])
    var str = ""
    for (const skvp of arr) {
      str+=skvp[0]+" in a row: " + skvp[1]+"\n"
    }
    if (str.length != 0) {
      message.channel.send(str)
    }
  },
  description: 'Displays statistics about coinflips'
})