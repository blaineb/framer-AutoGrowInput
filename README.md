# framer-AutoGrowInput
An Autogrowing Text input for Framer


After adding the module, add this to your Framer prototype:
`{AutoGrowInput} = require "AutoGrowInput"`

Then you can write cool stuff like:
```
text = new AutoGrowInput
  reflowSiblings: true or false, will move stuff under it as it changes height.
  resizeParent: true or false, will resize the parent if things get too long.
  padding: ex: "16px 16px 36px 16px" - just a CSS declaration for any padding you'd like.
  placeHolder: ex: "Type your comments" - whatever you want the placeholder text to be.
  value: ex: "Silt is..." - starter value if you want text already in there.
```
