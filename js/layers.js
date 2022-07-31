
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
      t:new Decimal(100),
      tlimit:new Decimal(100),
      alove:{
        aloveLevel:new Decimal(0),
        aloveReq:new Decimal(45)
      },
      number:new Decimal(0)
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasAchievement("g", 13)) mult = mult.times(2.23)
        if(hasAchievement("g", 25)) mult = mult.times(5)
        if(hasAchievement("g", 34)) mult = mult.times(2)
        if(hasAchievement("g", 75)) mult = mult.times(new Decimal(player.p.alove.aloveLevel).pow(3).add(1))
        if(hasAchievement("g", 81)) mult = mult.times(new Decimal(player.p.alove.aloveLevel).pow(3).add(1))
        if(hasUpgrade("hyp", 11)) mult = mult.times(3)
        if(hasUpgrade("hyp", 13)) mult = mult.times(player.hyp.points.add(1).sqrt())
        mult = mult.times(player.p.number.add(3).log(3))
        if(hasUpgrade("ma", 11)) mult = mult.times(10)
        if(hasUpgrade("ma", 13)) mult = mult.times(10)
        if(hasUpgrade("ma", 15)) mult = mult.times(32)
        if(hasUpgrade("ma", 21)) mult = mult.times(64)
        if(hasUpgrade("psqur", 22)) mult = mult.times(1000)
        if(hasUpgrade("psqur", 23)) mult = mult.times(256)
        if(hasUpgrade("psqur", 24)) mult = mult.times(256)
        if(hasUpgrade("psqur", 25)) mult = mult.times(256)
        if(hasUpgrade("pcub", 12)) mult = mult.times(80)
        if(hasUpgrade("pcub", 13)) mult = mult.times(45)
        if(hasUpgrade("pcub", 14)) mult = mult.times(1000)
        if(hasUpgrade("pcub", 15)) mult = mult.times(100)
        if(hasUpgrade("pcub", 21)) mult = mult.times(256)
        if(hasUpgrade("pcub", 22)) mult = mult.times(256)
        if(hasUpgrade("pcub", 23)) mult = mult.times(256)
        if(hasUpgrade("pcub", 24)) mult = mult.times(256)
        if(hasUpgrade("pcub", 25)) mult = mult.times(256)
        if(hasUpgrade("pm", 12)) mult = mult.times(1e5)
        if(hasUpgrade("pm", 13)) mult = mult.times(1e3)
        if(hasUpgrade("pm", 22)) mult = mult.times(1e5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    clickables: {
    11: {
        title:"Adjust T",
        display() {return "T By 15"},
        canClick() {return !hasAchievement("g", 32)},
        onClick() {
          if(!player.p.t.gte(player.p.tlimit)) {
          player.p.t = player.p.t.add(15)
        }
        }
    }
   },
  automate() {
    if(player.p.t.gt(0)) {
    player.p.t = player.p.t.sub(5)
    }
    
    player.p.tlimit = new Decimal(100).add(buyableEffect("p", 21))
    
    if (player.p.points.gte(player.p.alove.aloveReq)) {
      player.p.alove.aloveLevel = player.p.alove.aloveLevel.add(1)
      player.p.alove.aloveReq = player.p.alove.aloveReq.mul(5)
    }
    
    if(hasAchievement("g", 32)) {
      player.p.t = player.p.tlimit
    }
    
    if(player.g.bc >= 3) {
      player.p.number = player.p.number.add(1)
    }
    
    if(hasAchievement("g", 42)) {
      buyBuyable("p", 11)
      buyBuyable("p", 12)
      buyBuyable("p", 13)
      buyBuyable("p", 21)
    }
  },
  buyables: {
    11: {
        cost(x) { return new Decimal.pow(18, x).mul(1e5) },
        display() { return "<h2>c<sub>1</sub> (With lrobt97.)</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal.pow(new Decimal(2), x)
        return l
      }
    },
    12: {
        cost(x) { return new Decimal.pow(3, x).mul(10) },
        display() { return "<h2>r<sub>1</sub> (With lrobt97.)</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal(x.add(1))
        return l
      }
    },
    13: {
        cost(x) { return new Decimal.pow(8, x).mul(15) },
        display() { return "<h2>r<sub>2</sub> (With lrobt97.)</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal.pow(new Decimal(2), x)
        return l
      }
    },
    21: {
        cost(x) { return new Decimal.pow(1e6, x).mul(1e4) },
        display() { return "<h2>T<sub>&uparrow;</sub> (With lrobt97.)</h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
      effect(x) {
        let l = new Decimal(0).add(x.mul(25))
        return l
      }
    },
},
  tabFormat: {
    "Main": {
        content: [
          "main-display",
          "prestige-button",
          ["display-text",
        function() { return 'Upgrades' },
        { "color": "blue", "font-size": "39px", "font-family": "Consolas" }],
          "buyables",
          "clickables",
        ],
    },
    "Alove": {
        content: [
          "main-display",
          "prestige-button",
          ["display-text",
        function() { return 'Alove Level:' + player.p.alove.aloveLevel },
        { "color": "blue", "font-size": "39px", "font-family": "Consolas" }],
          ["display-text",
        function() { return '<h2 class="alove">Req:P >= ' + player.p.alove.aloveReq + "</h2>" },
        { "color": "blue", "font-size": "39px", "font-family": "Consolas" }],
        ],
      unlocked() {return player.g.bc >= 1}
    },
    "The Number": {
        content: [
          "main-display",
          "prestige-button",
          ["display-text",
        function() { return "Number:" + player.p.number },
        { "color": "blue", "font-size": "39px", "font-family": "Consolas" }],
        ],
      unlocked() {return player.g.bc >= 3}
    },
},
 passiveGeneration() {
        let passivebase = 0
        if (hasAchievement('g', 62)) passivebase = 1
        return passivebase
    },
})

addLayer("hyp", {
    name: "hyper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["p"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF00FF",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "hyper", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("psqur", 11)) mult = mult.times(2)
        if(hasUpgrade("hyp", 15)) mult = mult.times(2)
        if(hasUpgrade("ma", 14)) mult = mult.times(4)
        if(hasAchievement("g", 55)) mult = mult.times(1.7)
        if(hasAchievement("g", 91)) mult = mult.times(1000)
        if(hasAchievement("g", 101)) mult = mult.times(2e5)
        mult = mult.times(new Decimal.pow(1e11, player.pe.points))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
      exp = new Decimal(1)
      if(hasUpgrade("ma", 12)) exp = exp.add(0.75)
      return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasAchievement("g", 21)},
    upgrades:{
      11:{
        title:"Triples lol",
        description:"Triple your prestige point gain.",
        cost:new Decimal(1)
      },
      12:{
        title:"x10 gain",
        description:"you having this have gain.",
        cost:new Decimal(2)
      },
      13:{
        title:"Boost your prestige point gain.",
        description:"You and where: \u221A(H + 1) Gain.",
        cost:new Decimal(5)
      },
      14:{
        title:"x690 gain",
        description:"you having this have gain.",
        cost:new Decimal(2000)
      },
      15:{
        title:"x2 hyper gain",
        description:"whatttttttt",
        cost:new Decimal(1e6)
      },
      21:{
        title:"x10 gain",
        description:"you having this have gain.",
        cost:new Decimal(5e9)
      },
    },
  passiveGeneration() {
        let passivebase = 0
        if (hasAchievement('g', 72)) passivebase = 1
        return passivebase
    },
  automate() {
    if(hasAchievement("g", 81)) {
      buyUpgrade("hyp", 11)
      buyUpgrade("hyp", 12)
      buyUpgrade("hyp", 13)
      buyUpgrade("hyp", 14)
      buyUpgrade("hyp", 15)
      buyUpgrade("hyp", 21)
    }
  }
})

addLayer("psqur", {
    name: "prestige squared", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P<sup>2</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["p"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#AAAAAA",
    requires: new Decimal(720), // Can be a function that takes requirement increases into account
    resource: "prestige squared", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasAchievement("g", 43)) mult = mult.times(1.5)
        if(hasAchievement("g", 51)) mult = mult.times(2.15)
        if(hasAchievement("g", 53)) mult = mult.times(2.15)
        if(hasUpgrade("pcub", 11)) mult = mult.times(4)
        if(hasUpgrade("pm", 11)) mult = mult.times(10)
        if(hasUpgrade("pm", 14)) mult = mult.times(100)
        if(hasUpgrade("pm", 15)) mult = mult.times(100)
        if(hasUpgrade("pm", 21)) mult = mult.times(1e4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.g.bc >= 2},
    upgrades:{
      11:{
        title:"Possible?",
        description:"Double your hyper gain.",
        cost:new Decimal(1)
      },
      12:{
        title:"xlog1.1(p^2) gain.",
        description:"what is than eher",
        cost:new Decimal(10)
      },
      13:{
        title:"Double prestige squared Gain.",
        description:"what is than feather?",
        cost:new Decimal(45)
      },
      14:{
        title:"xlog3(p^2) gain.",
        description:"what is than eher",
        cost:new Decimal(200)
      },
      15:{
        title:"xsqrt(2048) affacted",
        description:"hehe",
        cost:new Decimal(5e3)
      },
      21:{
        title:"xsqrt(2048) affacted II",
        description:"hehe",
        cost:new Decimal(1e6)
      },
      22:{
        title:"x1000 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e15),
        unlocked() {return hasMilestone("pm", 0)}
      },
       23:{
        title:"x256 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e19),
        unlocked() {return hasMilestone("pm", 0)}
      },
      24:{
        title:"x256 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e25),
        unlocked() {return hasMilestone("pm", 0)}
      },
      25:{
        title:"x256 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e33),
        unlocked() {return hasMilestone("pm", 0)}
      },
    },
    tabFormat: {
    "Main": {
        content: [
           "main-display",
           "prestige-button",
           "upgrades"
        ],
    },
    "Buyables": {
        content: [
           "main-display",
           "prestige-button",
           "buyables"
        ],
        unlocked() {return player.g.bc >= 4}
    },
},
  buyables: {
    11: {
        cost(x) { return new Decimal.pow(10, x).mul(1e3) },
        display() { return "<h2>a<sub>1</sub></h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return player.g.bc >= 4},
        effect(x) {
          let l = new Decimal.pow(2, x)
          return l
        }
    },
    12: {
        cost(x) { return new Decimal.pow(10, x).mul(1e6) },
        display() { return "<h2>a<sub>2</sub></h2>" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        unlocked() {return player.g.bc >= 4},
        effect(x) {
          let l = new Decimal.pow(2, x)
          return l
        }
    },
},
  passiveGeneration() {
        let passivebase = 0
        if (hasAchievement('g', 81)) passivebase = 1
        return passivebase
    },
})

addLayer("ma", {
    name: "mass", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["hyp"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#222222",
    requires: new Decimal(2048), // Can be a function that takes requirement increases into account
    resource: "mass", // Name of prestige currency
    baseResource: "hyper", // Name of resource prestige is based on
    baseAmount() {return player.hyp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return hasAchievement("g", 41)},
    upgrades:{
      11:{
        title:"Goaled Decuple",
        description:"x10 prestige point gain.",
        cost:new Decimal(2)
      },
      12:{
        title:"Hyper exponent by 0.75",
        description:"what speed?",
        cost:new Decimal(5)
      },
      13:{
        title:"Goaled Decuple II",
        description:"x10 prestige point gain.",
        cost:new Decimal(50)
      },
      14:{
        title:"What when?",
        description:"x4 hyper gain",
        cost:new Decimal(150)
      },
      15:{
        title:"x32 prestige point gain.",
        description:"wowowoow",
        cost:new Decimal(5e3)
      },
      21:{
        title:"x64 prestige point gain.",
        description:"wowowoow",
        cost:new Decimal(1e6)
      },
    },
    passiveGeneration() {
        let passivebase = 0
        if (hasAchievement('g', 112)) passivebase = 2
        return passivebase
    },
})

addLayer("pcub", {
    name: "prestige cubed", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P<sup>3</sup>", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["psqur"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "prestige cubed", // Name of prestige currency
    baseResource: "prestige squared", // Name of resource prestige is based on
    baseAmount() {return player.psqur.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row:2,
    layerShown(){return player.g.bc >= 5},
    upgrades:{
      11:{
        title:"Bug gain",
        description:"x4 Prestige squared gain",
        cost:new Decimal(4)
      },
      12:{
        title:"x80 prestige point gain",
        description:"epic idk",
        cost:new Decimal(15)
      },
      13:{
        title:"x70 prestige point gain",
        description:"epic idk",
        cost:new Decimal(45)
      },
      14:{
        title:"x1000 prestige point gain",
        description:"epic idk",
        cost:new Decimal(225)
      },
      15:{
        title:"x100 prestige point gain",
        description:"epic idk",
        cost:new Decimal(750)
      },
      21:{
        title:"x250 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e6),
        unlocked() {return hasMilestone("pm", 0)}
      },
      22:{
        title:"x250 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e9),
        unlocked() {return hasMilestone("pm", 0)}
      },
      23:{
        title:"x250 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e12),
        unlocked() {return hasMilestone("pm", 0)}
      },
      24:{
        title:"x250 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e14),
        unlocked() {return hasMilestone("pm", 0)}
      },
       25:{
        title:"x250 prestige point gain",
        description:"what what?",
        cost:new Decimal(1e20),
        unlocked() {return hasMilestone("pm", 2)}
      },
    },
    passiveGeneration() {
        let passivebase = 0
        if (hasAchievement('g', 112)) passivebase = 2
        return passivebase
    },
})

addLayer("pm", {
    name: "prestige mactive", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["ma"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#bac700",
    requires: new Decimal(1.5e12), // Can be a function that takes requirement increases into account
    resource: "prestige mactive", // Name of prestige currency
    baseResource: "prestige squared", // Name of resource prestige is based on
    baseAmount() {return player.psqur.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasMilestone("pm", 1)) mult = mult.times(1.4)
        if(hasMilestone("pm", 3)) mult = mult.times(1.9)
        if(hasUpgrade("pm", 23)) mult = mult.times(10)
        if(hasUpgrade("pm", 24)) mult = mult.times(1e4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.g.bc >= 6},
    upgrades:{
      11:{
        title:"When so win.",
        description:"Outpated x10 P<sup>2</sup> Gain.",
        cost:new Decimal(3)
      },
      12:{
        title:"When so win. II",
        description:"Outpated x100,000 P Gain.",
        cost:new Decimal(123)
      },
       13:{
        title:"What heven?",
        description:"Outpated x1,000 P Gain.",
        cost:new Decimal(1e3)
      },
      14:{
        title:"When so win.",
        description:"Outpated x100 P<sup>2</sup> Gain.",
        cost:new Decimal(4.5e4)
      },
      15:{
        title:"When so win. II",
        description:"Outpated x100 P<sup>2</sup> Gain.",
        cost:new Decimal(1e5)
      },
      21:{
        title:"When so win. III",
        description:"Outpated x10,000 P<sup>2</sup> Gain.",
        cost:new Decimal(2e6)
      },
      22:{
        title:"What what",
        description:"Outpated x100,000 P Gain.",
        cost:new Decimal(7.5e6)
      },
      23:{
        title:"What what",
        description:"Outpated x10 PM Gain.",
        cost:new Decimal(2e7)
      },
      24:{
        title:"What what",
        description:"Outpated x1e4 PM Gain.",
        cost:new Decimal(1.5e8)
      },
    },
    milestones: {
    0: {
        requirementDescription: "10 PM",
        effectDescription: "Unlock new four for p^3 and p^2 upgrades.",
        done() { return player.pm.points.gte(10) }
    },
    1: {
        requirementDescription: "1,000,000 PM",
        effectDescription: "Gain 40% more P^2.",
        done() { return player.pm.points.gte(1e6) },
        unlocked() {return player.g.bc >= 7}
    },
     2: {
        requirementDescription: "10,000,000 PM",
        effectDescription: "unlock one upgrade.",
        done() { return player.pm.points.gte(1e7) },
        unlocked() {return player.g.bc >= 7}
    },
    3: {
        requirementDescription: "123,456,789 PM",
        effectDescription: "Gain 90% more PM",
        done() { return player.pm.points.gte(123456789) },
        unlocked() {return player.g.bc >= 7}
    },
    4: {
        requirementDescription: "1e11 PM",
        effectDescription: "Unlock new layer.",
        done() { return player.pm.points.gte(1e11) },
        unlocked() {return hasAchievement("g", 105)}
    },
}
})

addLayer("pe", {
    name: "prestige earth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PE", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches:["pm"],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "cyan",
    effectDescription() {return "multiplying hyper gain by "+format(new Decimal.pow(1e11, player.pe.points))},
    requires: new Decimal(1e200), // Can be a function that takes requirement increases into account
    resource: "prestige earth", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1.95)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})

addLayer("g", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        name:"Unlock Alove",
        req:new Decimal(4),
        bc:0,
    }},
    color: "green",
    resource: "Goals", 
    symbol: "G",
    row: "side",
    layerShown(){return true},
    achievements: {
        11: {
            name: "You Played!",
            done() {return player.p.points.gte(1)},
            goalTooltip: "Reach 1 prestige point Reward:Gain 30% of point gain.",
            doneTooltip: "Reach 1 prestige point Reward:Gain 30% of point gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
        12: {
            name: "I Throng?",
            done() {return player.p.points.gte(10)},
            goalTooltip: "Reach 10 prestige points.",
            doneTooltip: "Reach 10 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
       13: {
            name: "I Super Mactive?",
            done() {return player.points.gte(100)},
            goalTooltip: "Reach 100 points. Reward:Gain 123% for prestige point gain.",
            doneTooltip: "Reach 100 points. Reward:Gain 123% for prestige point gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      14: {
            name: "Massive",
            done() {return player.p.points.gte(25)},
            goalTooltip: "Reach 25 prestige points.",
            doneTooltip: "Reach 25 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      15: {
            name: "A be Alove Increasing",
            done() {return player.p.alove.aloveLevel >= 1},
            goalTooltip: "Reach Alove level any 1.",
            doneTooltip: "Reach Alove level any 1. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      21: {
            name: "Im Hundreds",
            done() {return player.p.points.gte(100)},
            goalTooltip: "Reach 100 prestige points. Reward:Unlock new layer.",
            doneTooltip: "Reach 100 prestige points. Reward:Unlock new layer. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
     22: {
            name: "Uhm...",
            done() {return player.p.alove.aloveLevel >= 2},
            goalTooltip: "Reach Alove level any 2.",
            doneTooltip: "Reach Alove level any 2. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      23: {
            name: "Im Show Under?",
            done() {return player.p.points.gte(750)},
            goalTooltip: "Reach 750 prestige points. Reward:Gain xlog2(points + 10) gaining points",
            doneTooltip: "Reach 750 prestige points. Reward:Gain xlog2(points + 10) gaining points (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      24: {
            name: "AAAA",
            done() {return player.hyp.points.gte(4)},
            goalTooltip: "Reach 4 Hyper.",
            doneTooltip: "Reach 4 Hyper. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
       25: {
            name: "Ultra Game",
            done() {return player.p.points.gte(2048)},
            goalTooltip: "Reach 2,048 prestige points. Reward:Gain x5 prestige points",
            doneTooltip: "Reach 2,048 prestige points. Reward:Gain x5 prestige points (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      31: {
            name: "What Even gold?",
            done() {return player.p.alove.aloveLevel >= 7},
            goalTooltip: "Reach Alove level any 7.",
            doneTooltip: "Reach Alove level any 7. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      32: {
            name: "Mega Computed",
            done() {return player.hyp.points.gte(30)},
            goalTooltip: "Reach 30 Hyper. Reward:Can Automatticy T Prestige point.",
            doneTooltip: "Reach 30 Hyper. Reward:Can Automatticy T Prestige point. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      33: {
            name: "Relaction",
            done() {return player.p.alove.aloveLevel >= 9},
            goalTooltip: "Reach Alove level any 9.",
            doneTooltip: "Reach Alove level any 9. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      34: {
            name: "Mega Hyper",
            done() {return player.hyp.points.gte(100)},
            goalTooltip: "Reach 100 Hyper. Reward:Can be x2 prestige point gain.",
            doneTooltip: "Reach 100 Hyper. Reward:Can be x2 prestige point gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      35: {
            name: "Why Be 😱",
            done() {return player.p.alove.aloveLevel >= 13},
            goalTooltip: "Reach Alove level any 13.",
            doneTooltip: "Reach Alove level any 13. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      41: {
            name: "Current Year Hyper",
            done() {return player.hyp.points.gte(2022)},
            goalTooltip: "Reach 2,022 Hyper. Reward:Unlock new layer",
            doneTooltip: "Reach 2,022 Hyper. Reward:Unlock new layer (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      42: {
            name: "Macc",
            done() {return player.ma.points.gte(1)},
            goalTooltip: "Reach 1 Mass. Reward:can automaticy all buyables.",
            doneTooltip: "Reach 1 Mass. Reward:can automaticy all buyables. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      43: {
            name: "😂 Trillions 😂",
            done() {return player.p.points.gte(1e12)},
            goalTooltip: "Reach 1e12 prestige points. Reward:Gain 50% hyper gain.",
            doneTooltip: "Reach 1e12 prestige points. Reward:Gain 50% hyper gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      44: {
            name: "Why Be 😱 II",
            done() {return player.p.alove.aloveLevel >= 20},
            goalTooltip: "Reach Alove level any 20.",
            doneTooltip: "Reach Alove level any 20. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      45: {
            name: "Lucky 7",
            done() {return player.psqur.points.gte(777)},
            goalTooltip: "Reach 777 prestige squared. Reward:Gain 50% hyper gain.",
            doneTooltip: "Reach 777 prestige square. Reward:Gain 50% hyper gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      51: {
            name: "Major At 1̗̞̥͚̝̤̣̬̰̜̠̀̔͊̂͒̒̒͊̈̚0͕͚̬̞͊̆̓̆̀͆͌̃̅̚0̝̯̖̩͇̭̟̏͊͛̋͆̾Q̜̳̤͖̖̟͍̈̔̔̈́͑͆̈́̋̄͐̏͗ͅȋ̘͔͔͍͆͂͌͑̒̏̐̍",
            done() {return player.p.points.gte(1e20)},
            goalTooltip: "Reach 1e20 prestige points. Reward:Gain 115% presige squared gain..",
            doneTooltip: "Reach 1e20 prestige points. Reward:Gain 115% presige squared gain.. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      52: {
            name: "I am Strong? 🧐",
            done() {return player.p.alove.aloveLevel >= 30},
            goalTooltip: "Reach Alove level any 30.",
            doneTooltip: "Reach Alove level any 30. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      53: {
            name: "Prestige Points:𝟏𝟎^𝟐𝟓",
            done() {return player.p.points.gte(1e25)},
            goalTooltip: "Reach 1e25 prestige points. Reward:Gain 115% presige squared gain..",
            doneTooltip: "Reach 1e25 prestige points. Reward:Gain 115% presige squared gain.. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      54: {
            name: "Ｏｃｔｉｌｌｉｏｎ　＊　１０　ヲがゃ",
            done() {return player.p.points.gte(1e28)},
            goalTooltip: "Reach 1e28 prestige points.",
            doneTooltip: "Reach 1e28 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      55: {
            name: "Major Kambia",
            done() {return player.psqur.points.gte(1e8)},
            goalTooltip: "Reach 1e8 prestige squared. Reward:Gain 70% hyper gain.",
            doneTooltip: "Reach 1e8 prestige square. Reward:Gain 70% hyper gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      61: {
            name: "A Nonillion!",
            done() {return player.p.points.gte(1e30)},
            goalTooltip: "Reach 1e30 prestige points.",
            doneTooltip: "Reach 1e30 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      62: {
            name: "After Decillion",
            done() {return player.p.points.gte(1e33)},
            goalTooltip: "Reach 1e33 prestige points. Reward:Can get auto gain for prestige point.",
            doneTooltip: "Reach 1e33 prestige points. Reward:Can get auto gain for prestige point. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      63: {
            name: "To be Infinity Small",
            done() {return player.p.points.gte(3.6e38)},
            goalTooltip: "Reach 3.6e38 prestige points.",
            doneTooltip: "Reach 3.6e38 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      64: {
            name: "What alove find 🤬",
            done() {return player.p.alove.aloveLevel >= 56},
            goalTooltip: "Reach Alove level any 56.",
            doneTooltip: "Reach Alove level any 56. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      65: {
            name: "Alove Than Mulitiplayer",
            done() {return player.p.alove.aloveLevel >= 60},
            goalTooltip: "Reach Alove level any 60.",
            doneTooltip: "Reach Alove level any 60. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      71: {
            name: "Minecraftion Speed",
            done() {return player.p.points.gte(1e47)},
            goalTooltip: "Reach 1e47 prestige points.",
            doneTooltip: "Reach 1e47 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      72: {
            name: "What be speed?",
            done() {return player.p.points.gte(1e50)},
            goalTooltip: "Reach 1e50 prestige points. Reward:Affacted Hyper Exponent by 0.25 and Can get auto gain for hyper.",
            doneTooltip: "Reach 1e50 prestige points. Reward:Affacted Hyper Exponent by 0.25 and Can get auto gain for hyper. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      73: {
            name: "Major Kambia II",
            done() {return player.psqur.points.gte(1e12)},
            goalTooltip: "Reach 1e12 prestige squared.",
            doneTooltip: "Reach 1e12 prestige square. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      74: {
            name: "20% Absolution",
            done() {return player.psqur.points.gte(1.221e12)},
            goalTooltip: "Reach 1.221e12 prestige squared.",
            doneTooltip: "Reach 1.221e12 prestige squared. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      75: {
            name: "Another Layer?",
            done() {return player.pm.points.gte(1)},
            goalTooltip: "Reach 1 PM. Reward:This prestige points recived to alove level cubed gain.",
            doneTooltip: "Reach 1 PM. Reward:This prestige points recived to alove level cubed gain. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      81: {
            name: "aa",
            done() {return player.pm.points.gte(8)},
            goalTooltip: "Reach 8 PM. Reward:This prestige points recived to alove level cubed gain II and automatticy upgrades for hyper and can passiving p^2 generation.",
            doneTooltip: "Reach 8 PM. Reward:This prestige points recived to alove level cubed gain II and automatticy upgrades for hyper and can passiving p^2 generation. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      82: {
            name: "24% Absolution",
            done() {return player.psqur.points.gte(1e15)},
            goalTooltip: "Reach 1e15 prestige squared.",
            doneTooltip: "Reach 1e15 prestige squared. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      83: {
            name: "ANY ALOVE",
            done() {return player.p.alove.aloveLevel >= 111},
            goalTooltip: "Reach Alove level any 111.",
            doneTooltip: "Reach Alove level any 111. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      84: {
            name: "ALOVE RAINBOW",
            done() {return player.p.alove.aloveLevel >= 123},
            goalTooltip: "Reach Alove level any 123.",
            doneTooltip: "Reach Alove level any 123. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
       85: {
            name: "Mega Lol",
            done() {return hasUpgrade("pm", 12)},
            goalTooltip: "Reach PM Upgrader 12.",
            doneTooltip: "Reach PM Upgrader 12. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      91: {
            name: "If we googology we of now.",
            done() {return player.p.points.gte(1e100)},
            goalTooltip: "Reach 1e100 prestige points. Reward:Hyper Mulitipler by 1000",
            doneTooltip: "Reach 1e100 prestige points. Reward:Hyper Mulitipler by 1000 (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
       92: {
            name: "Cool Thousand",
            done() {return hasUpgrade("pm", 13)},
            goalTooltip: "Reach PM Upgrader 13.",
            doneTooltip: "Reach PM Upgrader 13. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      93: {
            name: "What of this?",
            done() {return player.p.points.gte(1e130)},
            goalTooltip: "Reach 1e130 prestige points.",
            doneTooltip: "Reach 1e130 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      94: {
            name: "ALOVE DOUBLE'S HUNDRED",
            done() {return player.p.alove.aloveLevel >= 200},
            goalTooltip: "Reach Alove level any 200.",
            doneTooltip: "Reach Alove level any 200. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
       95: {
            name: "1 Row Done on PM?",
            done() {return hasUpgrade("pm", 15)},
            goalTooltip: "Reach PM Upgrader 15.",
            doneTooltip: "Reach PM Upgrader 15. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      101: {
            name: "Out of Googol * (10^(100 - 50))",
            done() {return player.p.points.gte(1e150)},
            goalTooltip: "Reach 1e150 prestige points. Reward:Hyper Mulitipler by 2e5",
            doneTooltip: "Reach 1e150 prestige points. Reward:Hyper Mulitipler by 2e5 (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      102: {
            name: "2 milestone rows done",
            done() {return hasMilestone("pm", 1)},
            goalTooltip: "Reach 2 milestones done.",
            doneTooltip: "Reach 2 milestones done. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      103: {
            name: "3 milestone rows done",
            done() {return hasMilestone("pm", 2)},
            goalTooltip: "Reach 3 milestones done.",
            doneTooltip: "Reach 3 milestones done. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      104: {
            name: "Get of Out!",
            done() {return player.p.points.gte(1e166)},
            goalTooltip: "Reach 1e166 prestige points. Reward:Be First Mass Upgrader 12 more in order.",
            doneTooltip: "Reach 1e166 prestige points. Reward:Be First Mass Upgrader 12 more in order. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      105: {
            name: "4 milestone rows done",
            done() {return hasMilestone("pm", 3)},
            goalTooltip: "Reach 4 milestones done. Reward:Unlock one milestone.",
            doneTooltip: "Reach 4 milestones done. Reward:Unlock one milestone. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      111: {
            name: "Out Order?",
            done() {return player.pm.points.gte(1e10)},
            goalTooltip: "Reach 1e10 prestige mactive.",
            doneTooltip: "Reach 1e10 prestige mactive. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      112: {
            name: "Booster of think?",
            done() {return player.pm.points.gte(1e11)},
            goalTooltip: "Reach 1e11 prestige mactive. Reward:can automatticy gain mass and prestige cubed.",
            doneTooltip: "Reach 1e11 prestige mactive. Reward:can automatticy gain mass and prestige cubed. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
      113: {
            name: "Earth Nice",
            done() {return player.p.points.gte(1e200)},
            goalTooltip: "Reach 1e200 prestige points.",
            doneTooltip: "Reach 1e200 prestige points. (Completed)",
            onComplete() {player[this.layer].points = player[this.layer].points.add(1)},
        },
    },
  automate() {
    if(player.g.bc >= 0) {
      player.g.name = "Unlock Alove"
      player.g.req = new Decimal(4)
    }
    if(player.g.bc >= 1) {
      player.g.name = "Unlock Prestige Squared"
      player.g.req = new Decimal(8)
    }
    if(player.g.bc >= 2) {
      player.g.name = "Unlock The Number"
      player.g.req = new Decimal(13)
    }
    if(player.g.bc >= 3) {
      player.g.name = "Unlock Two Buyables"
      player.g.req = new Decimal(20)
    }
    if(player.g.bc >= 4) {
      player.g.name = "Unlock Prestige Cubed"
      player.g.req = new Decimal(25)
    }
    if(player.g.bc >= 5) {
      player.g.name = "Unlock Prestige Mactive"
      player.g.req = new Decimal(34)
    }
    if(player.g.bc >= 6) {
      player.g.name = "Unlock Three Milestone on PM"
      player.g.req = new Decimal(46)
    }
    if(player.g.bc >= 7) {
      player.g.name = "???"
      player.g.req = new Decimal("ee99999")
    }
  },
  clickables: {
    11: {
        display() {return "<h2>" + player.g.name + "</h2><br>Req:" + format(player.g.req) + " Goals."},
        canClick() {return player.g.points.gte(player.g.req)},
        onClick() {
          player.g.bc += 1
        }
    }
}
},
)
