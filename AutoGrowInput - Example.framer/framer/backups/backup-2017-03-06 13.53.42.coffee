{AutoGrowInput} = require 'AutoGrowInput'

pd = 48 # short for padding, not Portland
	
Screen.backgroundColor = "#F8F8F8"

card = new Layer
	width: 460
	height: 700
	x: Align.center
	y: pd
	backgroundColor: "white"
	borderRadius: 4
	borderWidth: 1
	borderColor: "#ececec"

logo = new Layer
	parent: card
	backgroundColor: "#4285f4"
	width: 48
	height: 48
	borderRadius: 3
	y: pd
	x: Align.center

text = new AutoGrowInput
	borderColor: "#ececec"
	borderRadius: 4
	borderWidth: 1
	parent: card
	width: card.width - 96
	x: Align.center
	y: logo.maxY + 48
	style: "box-sizing" : "border-box"
	
	# Custom options
	reflowSiblings: true
	resizeParent: true
	fontSize: 24
	padding: "16px 16px 36px 16px"
	parentBottomPadding: pd
	placeHolder: "Say something"
	
# To show the reflowing stuff...
somethingElse = new Layer
	backgroundColor: "#dedede"
	borderRadius: 3
	height: 48
	parent: card
	width: text.width
	x: Align.center
	y: text.maxY + 24