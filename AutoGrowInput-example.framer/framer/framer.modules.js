require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AutoGrowInput":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AutoGrowInput = (function(superClass) {
  var _reflowSiblings, _resizeParent;

  extend(AutoGrowInput, superClass);

  Events.Input = "AutoGrowInput.OnInput";

  Events.Focus = "AutoGrowInput.OnFocus";

  Events.Blur = "AutoGrowInput.OnBlur";

  function AutoGrowInput(options) {
    var base, base1, base10, base11, base12, base13, base14, base15, base2, base3, base4, base5, base6, base7, base8, base9, key, ref, val;
    this.options = options != null ? options : {};
    this._update = bind(this._update, this);
    this.parentOgHeight = null;
    if (this.options.lineHeight != null) {
      this.options.lineHeight = this.options.lineHeight + "px";
    }
    if ((base = this.options).lineHeight == null) {
      base.lineHeight = "48px";
    }
    if ((base1 = this.options).name == null) {
      base1.name = "AutoGrowInput";
    }
    if ((base2 = this.options).color == null) {
      base2.color = "#212121";
    }
    if ((base3 = this.options).backgroundColor == null) {
      base3.backgroundColor = "white";
    }
    if ((base4 = this.options).height == null) {
      base4.height = 200;
    }
    if ((base5 = this.options).borderRadius == null) {
      base5.borderRadius = 0;
    }
    if ((base6 = this.options).width == null) {
      base6.width = 400;
    }
    if ((base7 = this.options).fontSize == null) {
      base7.fontSize = 32;
    }
    if ((base8 = this.options).fontWeight == null) {
      base8.fontWeight = 300;
    }
    if ((base9 = this.options).padding == null) {
      base9.padding = "0";
    }
    if ((base10 = this.options).fontFamily == null) {
      base10.fontFamily = "-apple-system, Helvetica Neue";
    }
    if ((base11 = this.options).minHeight == null) {
      base11.minHeight = this.options.height;
    }
    if ((base12 = this.options).placeHolder == null) {
      base12.placeHolder = "Type something";
    }
    if ((base13 = this.options).resizeParent == null) {
      base13.resizeParent = false;
    }
    if ((base14 = this.options).parentBottomPadding == null) {
      base14.parentBottomPadding = 0;
    }
    if ((base15 = this.options).reflowSiblings == null) {
      base15.reflowSiblings = false;
    }
    AutoGrowInput.__super__.constructor.call(this, this.options);
    if (this.options.resizeParent === true) {
      this.parentOgHeight = this.options.parent.height;
    }
    this.textarea = document.createElement("textarea");
    if (this.options.value != null) {
      this.textarea.value = this.options.value;
    }
    if (this.options.placeHolder != null) {
      this.textarea.placeholder = this.options.placeHolder;
    }
    this._element.appendChild(this.textarea);
    this._textAreaStyle = {
      font: this.options.fontWeight + " " + this.options.fontSize + "px/" + this.options.lineHeight + " " + this.options.fontFamily,
      outline: "none",
      backgroundColor: "transparent",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      resize: "none",
      padding: this.options.padding,
      margin: "0",
      "-webkit-appearance": "none",
      "box-sizing": "border-box"
    };
    ref = this._textAreaStyle;
    for (key in ref) {
      val = ref[key];
      this.textarea.style[key] = val;
    }
    if (this.options.color != null) {
      this.textarea.style.color = this.options.color;
    }
    this.textarea.onkeydown = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
    this.textarea.onkeyup = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
    this.textarea.change = (function(_this) {
      return function() {
        return _this._update();
      };
    })(this);
    this.textarea.onfocus = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        return _this.emit(Events.Focus, _this.textarea.value, _this);
      };
    })(this);
    this.textarea.onblur = (function(_this) {
      return function() {
        document.body.scrollTop = 0;
        if (!(_this.textarea.placeholder === _this.options.placeHolder || (_this.options.placeHolder == null))) {
          _this.textarea.placeholder = _this.options.placeHolder;
        }
        return _this.emit(Events.Blur, _this.textarea.value, _this);
      };
    })(this);
    this.textarea.oninput = (function(_this) {
      return function() {
        var ref1;
        _this.isEmpty = !(((ref1 = _this.textarea.value) != null ? ref1.length : void 0) > 0);
        return _this.emit(Events.Input, _this.textarea.value, _this);
      };
    })(this);
  }

  _resizeParent = function(layer, parentMinHeight, bottomPadding) {
    var allChildrenMaxYs, i, layerParent, len, max, ref, tallestChildMaxY;
    layerParent = layer.parent;
    allChildrenMaxYs = [];
    ref = layerParent.children;
    for (i = 0, len = ref.length; i < len; i++) {
      max = ref[i];
      allChildrenMaxYs.push(max.maxY);
    }
    tallestChildMaxY = Math.max.apply(null, allChildrenMaxYs);
    return layerParent.height = Math.max(tallestChildMaxY + bottomPadding, parentMinHeight);
  };

  _reflowSiblings = function(layer, layerMaxY) {
    var a, i, layerList, ref, ref1, results, yDiff;
    layerList = layer.parent.children;
    results = [];
    for (a = i = ref = layerList.indexOf(layer) + 1, ref1 = layerList.length; ref <= ref1 ? i < ref1 : i > ref1; a = ref <= ref1 ? ++i : --i) {
      yDiff = layerList[a].y - layerMaxY;
      results.push(layerList[a].y = layer.maxY + yDiff);
    }
    return results;
  };

  AutoGrowInput.prototype._update = function() {
    return setTimeout((function(_this) {
      return function() {
        var _trueValue, calcHeight, layerMaxY;
        layerMaxY = _this.maxY;
        _trueValue = _this.textarea.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n/g, "<br/>&nbsp;");
        if (_trueValue.trim() === "") {
          _trueValue = "a";
        }
        calcHeight = Utils.round(Utils.textSize(_trueValue, _this._textAreaStyle, {
          width: _this.width
        }).height, 0);
        _this.height = Math.max(calcHeight, _this.options.minHeight);
        if (_this.options.reflowSiblings === true) {
          _reflowSiblings(_this, layerMaxY);
        }
        if (_this.options.resizeParent === true) {
          return _resizeParent(_this, _this.parentOgHeight, _this.options.parentBottomPadding);
        }
      };
    })(this));
  };

  return AutoGrowInput;

})(Layer);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2JsYWluZS9HaXQvZnJhbWVyLUF1dG9Hcm93SW5wdXQvQXV0b0dyb3dJbnB1dC1leGFtcGxlLmZyYW1lci9tb2R1bGVzL0F1dG9Hcm93SW5wdXQuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQXV0b0dyb3cgVGV4dGFyZWFcbiMgQnkgQmxhaW5lIEJpbGxpbmdzbGV5IE1heSAyOSwgMjAxNlxuI1xuIyBGcmFua2Vuc3RlaW5lZCBoZWF2aWx5IGZyb20gSm9yZGFuIERvYnNvbidzIElucHV0RmllbGQgc3R1ZmYgXG4jIGFuZCB0aGUgalF1ZXJ5IEF1dG9ncm93IHBsdWdpbi5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4jIEFmdGVyIGFkZGluZyB0aGUgbW9kdWxlLCBhZGQgdGhpcyB0byB5b3VyIEZyYW1lciBwcm90b3R5cGU6XG4jIHtBdXRvR3Jvd0lucHV0fSA9IHJlcXVpcmUgXCJBdXRvR3Jvd0lucHV0XCJcblxuIyBUaGVuIHlvdSBjYW4gd3JpdGUgY29vbCBzdHVmZiBsaWtlOlxuIyB0ZXh0ID0gbmV3IEF1dG9Hcm93SW5wdXRcbiMgICByZWZsb3dTaWJsaW5nczogdHJ1ZSBvciBmYWxzZSwgd2lsbCBtb3ZlIHN0dWZmIHVuZGVyIGl0IGFzIGl0IGNoYW5nZXMgaGVpZ2h0LlxuIyAgIHJlc2l6ZVBhcmVudDogdHJ1ZSBvciBmYWxzZSwgd2lsbCByZXNpemUgdGhlIHBhcmVudCBpZiB0aGluZ3MgZ2V0IHRvbyBsb25nLlxuIyAgIHBhZGRpbmc6IGV4OiBcIjE2cHggMTZweCAzNnB4IDE2cHhcIiAtIGp1c3QgYSBDU1MgZGVjbGFyYXRpb24gZm9yIGFueSBwYWRkaW5nIHlvdSdkIGxpa2UuXG4jICAgcGxhY2VIb2xkZXI6IGV4OiBcIlR5cGUgeW91ciBjb21tZW50c1wiIC0gd2hhdGV2ZXIgeW91IHdhbnQgdGhlIHBsYWNlaG9sZGVyIHRleHQgdG8gYmUuXG4jICAgdmFsdWU6IGV4OiBcIlNpbHQgaXMuLi5cIiAtIHN0YXJ0ZXIgdmFsdWUgaWYgeW91IHdhbnQgdGV4dCBhbHJlYWR5IGluIHRoZXJlLlxuXG5cblxuY2xhc3MgZXhwb3J0cy5BdXRvR3Jvd0lucHV0IGV4dGVuZHMgTGF5ZXJcblxuICAjIEV2ZW50c1xuICBFdmVudHMuSW5wdXQgICA9IFwiQXV0b0dyb3dJbnB1dC5PbklucHV0XCJcbiAgRXZlbnRzLkZvY3VzICAgPSBcIkF1dG9Hcm93SW5wdXQuT25Gb2N1c1wiXG4gIEV2ZW50cy5CbHVyICAgID0gXCJBdXRvR3Jvd0lucHV0Lk9uQmx1clwiXG4gIFxuICBjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuICAgIEBwYXJlbnRPZ0hlaWdodCA9IG51bGxcbiAgICBAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXG4gICAgIyBGcmFtZXIgTGF5ZXIgUHJvcHNcbiAgICBAb3B0aW9ucy5saW5lSGVpZ2h0ICAgICAgID89IFwiNDhweFwiXG4gICAgQG9wdGlvbnMubmFtZSAgICAgICAgICAgICA/PSBcIkF1dG9Hcm93SW5wdXRcIlxuICAgIEBvcHRpb25zLmNvbG9yICAgICAgICAgICAgPz0gXCIjMjEyMTIxXCJcbiAgICBAb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgID89IFwid2hpdGVcIlxuICAgIEBvcHRpb25zLmhlaWdodCAgICAgICAgICAgPz0gMjAwXG4gICAgQG9wdGlvbnMuYm9yZGVyUmFkaXVzICAgICA/PSAwXG4gICAgQG9wdGlvbnMud2lkdGggICAgICAgICAgICA/PSA0MDBcblxuICAgICMgQ3VzdG9tIExheWVyIFByb3BzICAgIFxuICAgIEBvcHRpb25zLmZvbnRTaXplICAgICAgICAgICAgID89IDMyXG4gICAgQG9wdGlvbnMuZm9udFdlaWdodCAgICAgICAgICAgPz0gMzAwXG4gICAgQG9wdGlvbnMucGFkZGluZyAgICAgICAgICAgICAgPz0gXCIwXCJcbiAgICBAb3B0aW9ucy5mb250RmFtaWx5ICAgICAgICAgICA/PSBcIi1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSBOZXVlXCJcbiAgICBAb3B0aW9ucy5taW5IZWlnaHQgICAgICAgICAgICA/PSBALm9wdGlvbnMuaGVpZ2h0XG4gICAgQG9wdGlvbnMucGxhY2VIb2xkZXIgICAgICAgICAgPz0gXCJUeXBlIHNvbWV0aGluZ1wiXG4gICAgQG9wdGlvbnMucmVzaXplUGFyZW50ICAgICAgICAgPz0gZmFsc2VcbiAgICBAb3B0aW9ucy5wYXJlbnRCb3R0b21QYWRkaW5nICA/PSAwXG4gICAgQG9wdGlvbnMucmVmbG93U2libGluZ3MgICAgICAgPz0gZmFsc2VcblxuICAgIHN1cGVyIEBvcHRpb25zXG4gICAgaWYgQG9wdGlvbnMucmVzaXplUGFyZW50ID09IHRydWUgdGhlbiBAcGFyZW50T2dIZWlnaHQgPSBAb3B0aW9ucy5wYXJlbnQuaGVpZ2h0XG4gICAgXG4gICAgI0NyZWF0ZSB0aGUgdGV4dGFyZWFcbiAgICBAdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwidGV4dGFyZWFcIlxuICAgIFxuICAgICMgR2l2ZSBpdCB0aGUgY29udGVudCBpZiBzb21lIGlzIGRlZmluZWRcbiAgICBAdGV4dGFyZWEudmFsdWUgPSBAb3B0aW9ucy52YWx1ZSBpZiBAb3B0aW9ucy52YWx1ZT9cbiAgICBAdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlciBpZiBAb3B0aW9ucy5wbGFjZUhvbGRlcj9cbiAgICBcbiAgICAjIEFkZCBpdCB0byB0aGUgRnJhbWVyIExheWVyXG4gICAgQF9lbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0YXJlYVxuXG4gICAgI0RlZmluZSBzdHlsZXMgZm9yIHRoZSB0ZXh0YXJlYVxuICAgIEBfdGV4dEFyZWFTdHlsZSA9XG4gICAgICBmb250OiBcIiN7QG9wdGlvbnMuZm9udFdlaWdodH0gI3tAb3B0aW9ucy5mb250U2l6ZX1weC8je0BvcHRpb25zLmxpbmVIZWlnaHR9ICN7QG9wdGlvbnMuZm9udEZhbWlseX1cIlxuICAgICAgb3V0bGluZTogXCJub25lXCJcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICBoZWlnaHQ6IFwiMTAwJVwiXG4gICAgICB3aWR0aDogIFwiMTAwJVwiXG4gICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIlxuICAgICAgcmVzaXplOiBcIm5vbmVcIlxuICAgICAgcGFkZGluZyA6IEBvcHRpb25zLnBhZGRpbmdcbiAgICAgIG1hcmdpbjogXCIwXCJcbiAgICAgIFwiLXdlYmtpdC1hcHBlYXJhbmNlXCI6IFwibm9uZVwiXG4gICAgICBcImJveC1zaXppbmdcIiA6IFwiYm9yZGVyLWJveFwiXG5cbiAgICAjIEFkZCB0aG9zZSBzdHlsZXMgdG8gdGhlIHRleHRhcmVhXG4gICAgQHRleHRhcmVhLnN0eWxlW2tleV0gID0gdmFsIGZvciBrZXksIHZhbCBvZiBAX3RleHRBcmVhU3R5bGVcbiAgICBAdGV4dGFyZWEuc3R5bGUuY29sb3IgPSBAb3B0aW9ucy5jb2xvciBpZiBAb3B0aW9ucy5jb2xvcj9cblxuICAgICNVcGRhdGUgdGhlIGhlaWdodCB3aGVuZXZlciBhbnl0aGluZyBjaGFuZ2VzLlxuICAgIEB0ZXh0YXJlYS5vbmtleWRvd24gPSA9PiBAX3VwZGF0ZSgpXG4gICAgQHRleHRhcmVhLm9ua2V5dXAgPSA9PiBAX3VwZGF0ZSgpXG4gICAgQHRleHRhcmVhLmNoYW5nZSA9ID0+IEBfdXBkYXRlKClcbiAgICBAdGV4dGFyZWEub25mb2N1cyA9ID0+XG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcbiAgICAgIEBlbWl0KEV2ZW50cy5Gb2N1cywgQHRleHRhcmVhLnZhbHVlLCBAKVxuXG4gICAgQHRleHRhcmVhLm9uYmx1ciAgPSA9PlxuICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSAwXG4gICAgICB1bmxlc3MgQHRleHRhcmVhLnBsYWNlaG9sZGVyIGlzIEBvcHRpb25zLnBsYWNlSG9sZGVyIG9yICFAb3B0aW9ucy5wbGFjZUhvbGRlcj9cbiAgICAgICAgQHRleHRhcmVhLnBsYWNlaG9sZGVyID0gQG9wdGlvbnMucGxhY2VIb2xkZXJcbiAgICAgIEBlbWl0KEV2ZW50cy5CbHVyLCBAdGV4dGFyZWEudmFsdWUsIEApXG5cbiAgICBAdGV4dGFyZWEub25pbnB1dCA9ID0+XG4gICAgICBAaXNFbXB0eSA9ICEoIEB0ZXh0YXJlYS52YWx1ZT8ubGVuZ3RoID4gMClcbiAgICAgIEBlbWl0KEV2ZW50cy5JbnB1dCwgQHRleHRhcmVhLnZhbHVlLCBAKVxuICAgIFxuICBfcmVzaXplUGFyZW50ID0gKGxheWVyLCBwYXJlbnRNaW5IZWlnaHQsIGJvdHRvbVBhZGRpbmcpIC0+XG4gICAgIyBWYXJpYWJsZSBmb3IgcGFyZW50XG4gICAgbGF5ZXJQYXJlbnQgPSBsYXllci5wYXJlbnRcbiAgICBcbiAgICAjIEFycmF5IHRvIHN0b3JlIGFsbCBjaGlsZHJlbidzIG1heFlzXG4gICAgYWxsQ2hpbGRyZW5NYXhZcyA9IFtdXG4gICAgXG4gICAgIyBQdXNoIGVhY2ggbWF4WSB0byBhbiBhcnJheVxuICAgIGZvciBtYXggaW4gbGF5ZXJQYXJlbnQuY2hpbGRyZW5cbiAgICAgIGFsbENoaWxkcmVuTWF4WXMucHVzaChtYXgubWF4WSlcbiAgICAgIFxuICAgICMgRmluZCB0aGUgYm90dG9tLW1vc3QgbWF4WSB2YWx1ZVxuICAgIHRhbGxlc3RDaGlsZE1heFkgPSBNYXRoLm1heC5hcHBseShudWxsLCBhbGxDaGlsZHJlbk1heFlzKVxuICAgIFxuICAgICMgU3RvcmUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGF0IGFuZCB0aGUgcGFyZW50IGxheWVyXG4gICAgbGF5ZXJQYXJlbnQuaGVpZ2h0ID0gTWF0aC5tYXgodGFsbGVzdENoaWxkTWF4WSArIGJvdHRvbVBhZGRpbmcsIHBhcmVudE1pbkhlaWdodClcbiAgICBcbiAgICAjIFRPRE8gLSBNYWludGFpbiB0aGUgYm90dG9tIHBhZGRpbmcgb2YgdGhlIHBhcmVudC5cbiAgICBcbiAgIyBSZWZsb3cgYWxsIHRoZSBzaWJsaW5ncyB1bmRlciB0aGUgdGV4dCBsYXllclxuICBfcmVmbG93U2libGluZ3MgPSAobGF5ZXIsIGxheWVyTWF4WSkgLT5cbiAgICBsYXllckxpc3QgPSBsYXllci5wYXJlbnQuY2hpbGRyZW5cbiAgICBmb3IgYSBpbiBbbGF5ZXJMaXN0LmluZGV4T2YobGF5ZXIpKzEuLi5sYXllckxpc3QubGVuZ3RoXVxuICAgICAgeURpZmYgPSBsYXllckxpc3RbYV0ueSAtIGxheWVyTWF4WVxuICAgICAgbGF5ZXJMaXN0W2FdLnkgPSBsYXllci5tYXhZICsgeURpZmZcbiAgICAjIFRPRE8gLSByZWRvIHRoaXMgd2l0aG91dCB0aGUgYXNzdW1wdGlvbiB0aGF0IGFsbCBzaWJsaW5ncyBhZnRlciB0aGUgbGF5ZXIgYXJlIGJlbG93IGl0LlxuICAgICAgXG4gICMgVXBkYXRlIGhlaWdodCBmdW5jdGlvblxuICBfdXBkYXRlOiA9PlxuICAgIHNldFRpbWVvdXQgPT5cbiAgICAgIGxheWVyTWF4WSA9IEAubWF4WVxuICAgICAgIyBBZGQgYmFjayBhbnkgbGluZSBicmVha3MgdGhhdCB0aGUgdmFsdWUgbWV0aG9kIGdldHMgcmlkZSBvZlxuICAgICAgX3RydWVWYWx1ZSA9IEB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvXFxuL2csIFwiPGJyLz4mbmJzcDtcIik7XG4gICAgICBcbiAgICAgICMgSWYgaXQncyBlbXB0eSwgbWFrZSBzdXJlIHRoZXJlJ3MgYSBsZXR0ZXIgaW4gdGhlcmUgdG8gY2FsY3VsYXRlICpzb21ldGhpbmcqXG4gICAgICBpZiBfdHJ1ZVZhbHVlLnRyaW0oKSA9PSBcIlwiIHRoZW4gX3RydWVWYWx1ZSA9IFwiYVwiXG4gICAgICBcbiAgICAgICMgQ2FsY3VsYXRlIHRoZSBoZWlnaHQhISFcbiAgICAgIGNhbGNIZWlnaHQgPSBVdGlscy5yb3VuZChVdGlscy50ZXh0U2l6ZShfdHJ1ZVZhbHVlLCBAX3RleHRBcmVhU3R5bGUsIHt3aWR0aDogQC53aWR0aH0pLmhlaWdodCwgMClcbiAgICAgIFxuICAgICAgIyBTZXQgdGhlIGhlaWdodCB0byBlaXRoZXIgdGhlIGNhbGN1bGF0ZWQgaGVpZ2h0LCBvciB0aGUgbWluSGVpZ2h0LCB3aGljaGV2ZXIgaXMgZ3JlYXRlci5cbiAgICAgIEAuaGVpZ2h0ID0gTWF0aC5tYXgoY2FsY0hlaWdodCwgQG9wdGlvbnMubWluSGVpZ2h0KVxuICAgICAgaWYgQG9wdGlvbnMucmVmbG93U2libGluZ3MgPT0gdHJ1ZSB0aGVuIF9yZWZsb3dTaWJsaW5ncyhALCBsYXllck1heFkpXG4gICAgICBpZiBAb3B0aW9ucy5yZXNpemVQYXJlbnQgPT0gdHJ1ZSB0aGVuIF9yZXNpemVQYXJlbnQoQCwgQHBhcmVudE9nSGVpZ2h0LCBAb3B0aW9ucy5wYXJlbnRCb3R0b21QYWRkaW5nKVxuXG4jT3RoZXIgaWRlYXMgXG4jIFRPRE86IElmIHRoZSBoZWlnaHQgaXMgc2V0IHRhbGxlciB0aGFuIHRoZSBtaW5oZWlnaHQgb3B0aW9uLCB3aGVuIHlvdSB0eXBlIGl0IGdsaXRjaGVzIHRvIHRoZSBtaW5IZWlnaHQgb3B0aW9uLlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURxQkEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQztBQUdaLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxJQUFQLEdBQWlCOztFQUVKLHVCQUFDLE9BQUQ7QUFDWCxRQUFBO0lBRFksSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBQ3JCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQW9ELCtCQUFwRDtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsS0FBN0M7OztVQUdRLENBQUMsYUFBb0I7OztXQUNyQixDQUFDLE9BQW9COzs7V0FDckIsQ0FBQyxRQUFvQjs7O1dBQ3JCLENBQUMsa0JBQW9COzs7V0FDckIsQ0FBQyxTQUFvQjs7O1dBQ3JCLENBQUMsZUFBb0I7OztXQUNyQixDQUFDLFFBQW9COzs7V0FHckIsQ0FBQyxXQUF3Qjs7O1dBQ3pCLENBQUMsYUFBd0I7OztXQUN6QixDQUFDLFVBQXdCOzs7WUFDekIsQ0FBQyxhQUF3Qjs7O1lBQ3pCLENBQUMsWUFBd0IsSUFBQyxDQUFDLE9BQU8sQ0FBQzs7O1lBQ25DLENBQUMsY0FBd0I7OztZQUN6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
