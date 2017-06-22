############################################################
# AutoGrow Textarea
# By Blaine Billingsley May 29, 2016
#
# Frankensteined heavily from Jordan Dobson's InputField stuff 
# and the jQuery Autogrow plugin.
############################################################

# After adding the module, add this to your Framer prototype:
# {AutoGrowInput} = require "AutoGrowInput"

# Then you can write cool stuff like:
# text = new AutoGrowInput
#   reflowSiblings: true or false, will move stuff under it as it changes height.
#   resizeParent: true or false, will resize the parent if things get too long.
#   padding: ex: "16px 16px 36px 16px" - just a CSS declaration for any padding you'd like.
#   placeHolder: ex: "Type your comments" - whatever you want the placeholder text to be.
#   value: ex: "Silt is..." - starter value if you want text already in there.



class exports.AutoGrowInput extends Layer

  # Events
  Events.Input   = "AutoGrowInput.OnInput"
  Events.Focus   = "AutoGrowInput.OnFocus"
  Events.Blur    = "AutoGrowInput.OnBlur"
  
  constructor: (@options={}) ->
    @parentOgHeight = null
    @options.lineHeight = "#{@options.lineHeight}px" if @options.lineHeight?

    # Framer Layer Props
    @options.lineHeight       ?= "48px"
    @options.name             ?= "AutoGrowInput"
    @options.color            ?= "#212121"
    @options.backgroundColor  ?= "white"
    @options.height           ?= 200
    @options.borderRadius     ?= 0
    @options.width            ?= 400

    # Custom Layer Props    
    @options.fontSize             ?= 32
    @options.fontWeight           ?= 300
    @options.padding              ?= "0"
    @options.fontFamily           ?= "-apple-system, Helvetica Neue"
    @options.minHeight            ?= @.options.height
    @options.placeHolder          ?= "Type something"
    @options.resizeParent         ?= false
    @options.parentBottomPadding  ?= 0
    @options.reflowSiblings       ?= false

    super @options
    if @options.resizeParent == true then @parentOgHeight = @options.parent.height
    
    #Create the textarea
    @textarea = document.createElement "textarea"
    
    # Give it the content if some is defined
    @textarea.value = @options.value if @options.value?
    @textarea.placeholder = @options.placeHolder if @options.placeHolder?
    
    # Add it to the Framer Layer
    @_element.appendChild @textarea

    #Define styles for the textarea
    @_textAreaStyle =
      font: "#{@options.fontWeight} #{@options.fontSize}px/#{@options.lineHeight} #{@options.fontFamily}"
      outline: "none"
      backgroundColor: "transparent"
      height: "100%"
      width:  "100%"
      overflow: "hidden"
      resize: "none"
      padding : @options.padding
      margin: "0"
      "-webkit-appearance": "none"
      "box-sizing" : "border-box"

    # Add those styles to the textarea
    @textarea.style[key]  = val for key, val of @_textAreaStyle
    @textarea.style.color = @options.color if @options.color?

    #Update the height whenever anything changes.
    @textarea.onkeydown = => @_update()
    @textarea.onkeyup = => @_update()
    @textarea.change = => @_update()
    @textarea.onfocus = =>
      document.body.scrollTop = 0
      @emit(Events.Focus, @textarea.value, @)

    @textarea.onblur  = =>
      document.body.scrollTop = 0
      unless @textarea.placeholder is @options.placeHolder or !@options.placeHolder?
        @textarea.placeholder = @options.placeHolder
      @emit(Events.Blur, @textarea.value, @)

    @textarea.oninput = =>
      @isEmpty = !( @textarea.value?.length > 0)
      @emit(Events.Input, @textarea.value, @)
    
  _resizeParent = (layer, parentMinHeight, bottomPadding) ->
    # Variable for parent
    layerParent = layer.parent
    
    # Array to store all children's maxYs
    allChildrenMaxYs = []
    
    # Push each maxY to an array
    for max in layerParent.children
      allChildrenMaxYs.push(max.maxY)
      
    # Find the bottom-most maxY value
    tallestChildMaxY = Math.max.apply(null, allChildrenMaxYs)
    
    # Store the distance between the bottom of that and the parent layer
    layerParent.height = Math.max(tallestChildMaxY + bottomPadding, parentMinHeight)
    
    # TODO - Maintain the bottom padding of the parent.
    
  # Reflow all the siblings under the text layer
  _reflowSiblings = (layer, layerMaxY) ->
    layerList = layer.parent.children
    for a in [layerList.indexOf(layer)+1...layerList.length]
      yDiff = layerList[a].y - layerMaxY
      layerList[a].y = layer.maxY + yDiff
    # TODO - redo this without the assumption that all siblings after the layer are below it.
      
  # Update height function
  _update: =>
    setTimeout =>
      layerMaxY = @.maxY
      # Add back any line breaks that the value method gets ride of
      _trueValue = @textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n/g, "<br/>&nbsp;");
      
      # If it's empty, make sure there's a letter in there to calculate *something*
      if _trueValue.trim() == "" then _trueValue = "a"
      
      # Calculate the height!!!
      calcHeight = Utils.round(Utils.textSize(_trueValue, @_textAreaStyle, {width: @.width}).height, 0)
      
      # Set the height to either the calculated height, or the minHeight, whichever is greater.
      @.height = Math.max(calcHeight, @options.minHeight)
      if @options.reflowSiblings == true then _reflowSiblings(@, layerMaxY)
      if @options.resizeParent == true then _resizeParent(@, @parentOgHeight, @options.parentBottomPadding)

#Other ideas 
# TODO: If the height is set taller than the minheight option, when you type it glitches to the minHeight option.
