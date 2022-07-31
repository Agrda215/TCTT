let modInfo = {
	name: "The Control Theory Tree",
	id: "TCTT",
	author: "nobody",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.1.0",
	name: "More Owo",
}

let changelog = `<h1>Changelog:</h1><br>
  <h3>v1.1.0 - More Owo</h3><br>
		- Imporved {PM, PE}.<br>
    - Add 2 Layers<br>
    - Balanced Up To 53 Goals.<br>
	<h3>v1.0.0 - Learn Layers</h3><br>
		- Imporved {P, P<sup>2</sup>, P<sup>3</sup>, H, M} and {Alove, Number, Buyables}.<br>
		- Imporved Goals.<br>
    - Add 5 Layers<br>
    - Balanced Up To 33 Goals.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  if(hasAchievement("g", 11)) gain = gain.times(1.3)
  if(hasAchievement("g", 23)) gain = gain.times(player.points.add(10).log2())
  if(hasUpgrade("hyp", 12)) gain = gain.times(10)
  if(hasUpgrade("hyp", 14)) gain = gain.times(690)
  if(hasUpgrade("hyp", 21)) gain = gain.times(10)
  if(hasUpgrade("psqur", 12)) gain = gain.times(player.psqur.points.add(1.1).log(1.1))
  if(hasUpgrade("psqur", 14)) gain = gain.times(player.psqur.points.add(3).log(3))
  if(hasUpgrade("psqur", 15)) gain = gain.times(new Decimal(2048).sqrt())
  if(hasUpgrade("psqur", 21)) gain = gain.times(new Decimal(2048).sqrt())
  gain = gain.times(player.p.t.div(100))
  gain = gain.times(buyableEffect("p", 11))
  gain = gain.times(buyableEffect("p", 12))
  gain = gain.times(buyableEffect("p", 13))
  gain = gain.times(player.p.alove.aloveLevel + 1)
  gain = gain.times(buyableEffect("psqur", 11))
  gain = gain.times(buyableEffect("psqur", 12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.g.points.gte(new Decimal("53"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}