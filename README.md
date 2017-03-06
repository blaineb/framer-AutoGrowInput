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
| - | - |
| reflowSiblings | Boolean, will move siblings on the same parent it as it changes height |
| resizeParent | Boolean, will resize the parent if things get too long |
| padding | CSS shorthand property.  Add any padding you'd like. |
| placeholder | String, whatever you want the placeholder text to be. |
| value | String, starter value if you want text already in there. |

