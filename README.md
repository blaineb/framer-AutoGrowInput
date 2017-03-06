# framer-AutoGrowInput
An Autogrowing Text input for Framer


After adding the module, add this to your Framer prototype:
`{AutoGrowInput} = require "AutoGrowInput"`

Then you can write cool stuff like:
```
text = new AutoGrowInput
  reflowSiblings: true
  resizeParent: true
  padding: "16px 16px 36px 16px"
  placeHolder: "Type your comments"
  value: "Silt is..."
```

| Custom properties | Description |
| ----------------- | ----------- |
| fontFamily | CSS property. Defaults to `"-apple-system, Helvetica"` |
| fontSize | CSS property. Defaults to `32` |
| fontWeight | CSS property. Defaults to `300` |
| minHeight | Integer. Defaults to the starting height of the layer when initialized. |
| padding | CSS shorthand property.  Add any padding you'd like. ex: `"14px 16px 0"` |
| parentBottomPadding | how much padding should be at the bottom of the parent.  Defaults to `0` |
| placeholder | String, whatever you want the placeholder text to be. Defaults to `"Type something"`|
| reflowSiblings | Boolean, will move siblings on the same parent it as it changes height. Defaults to `false` |
| resizeParent | Boolean, will resize the parent if things get too long. Defaults to `false` |
| value | String, starter value if you want text already in there. Defaults to `""` |

