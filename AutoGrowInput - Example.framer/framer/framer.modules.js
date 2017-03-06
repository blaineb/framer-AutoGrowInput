require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"AutoGrowInput":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.AutoGrowInput = (function(superClass) {
  var _reflowSiblings, _resizeParent;

  extend(AutoGrowInput, superClass);

  Events.Input = "InputField.OnInput";

  Events.Focus = "InputField.OnFocus";

  Events.Blur = "InputField.OnBlur";

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


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2JsYWluZS9Eb2N1bWVudHMvRGVzaWduL0ZyYW1lciBFeGFtcGxlcy9BdXRvR3Jvd0lucHV0IC0gRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9ibGFpbmUvRG9jdW1lbnRzL0Rlc2lnbi9GcmFtZXIgRXhhbXBsZXMvQXV0b0dyb3dJbnB1dCAtIEV4YW1wbGUuZnJhbWVyL21vZHVsZXMvQXV0b0dyb3dJbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgQWRkIHRoZSBmb2xsb3dpbmcgbGluZSB0byB5b3VyIHByb2plY3QgaW4gRnJhbWVyIFN0dWRpby4gXG4jIG15TW9kdWxlID0gcmVxdWlyZSBcIm15TW9kdWxlXCJcbiMgUmVmZXJlbmNlIHRoZSBjb250ZW50cyBieSBuYW1lLCBsaWtlIG15TW9kdWxlLm15RnVuY3Rpb24oKSBvciBteU1vZHVsZS5teVZhclxuXG5leHBvcnRzLm15VmFyID0gXCJteVZhcmlhYmxlXCJcblxuZXhwb3J0cy5teUZ1bmN0aW9uID0gLT5cblx0cHJpbnQgXCJteUZ1bmN0aW9uIGlzIHJ1bm5pbmdcIlxuXG5leHBvcnRzLm15QXJyYXkgPSBbMSwgMiwgM10iLCIjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbiMgQXV0b0dyb3cgVGV4dGFyZWFcbiMgQnkgQmxhaW5lIEJpbGxpbmdzbGV5IE1heSAyOSwgMjAxNlxuI1xuIyBGcmFua2Vuc3RlaW5lZCBoZWF2aWx5IGZyb20gSm9yZGFuIERvYnNvbidzIElucHV0RmllbGQgc3R1ZmYgXG4jIGFuZCB0aGUgalF1ZXJ5IEF1dG9ncm93IHBsdWdpbi5cbiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG4jIEFmdGVyIGFkZGluZyB0aGUgbW9kdWxlLCBhZGQgdGhpcyB0byB5b3VyIEZyYW1lciBwcm90b3R5cGU6XG4jIHtBdXRvR3Jvd0lucHV0fSA9IHJlcXVpcmUgXCJBdXRvR3Jvd0lucHV0XCJcblxuIyBUaGVuIHlvdSBjYW4gd3JpdGUgY29vbCBzdHVmZiBsaWtlOlxuIyB0ZXh0ID0gbmV3IEF1dG9Hcm93SW5wdXRcbiMgXHRyZWZsb3dTaWJsaW5nczogdHJ1ZSBvciBmYWxzZSwgd2lsbCBtb3ZlIHN0dWZmIHVuZGVyIGl0IGFzIGl0IGNoYW5nZXMgaGVpZ2h0LlxuIyBcdHJlc2l6ZVBhcmVudDogdHJ1ZSBvciBmYWxzZSwgd2lsbCByZXNpemUgdGhlIHBhcmVudCBpZiB0aGluZ3MgZ2V0IHRvbyBsb25nLlxuIyBcdHBhZGRpbmc6IGV4OiBcIjE2cHggMTZweCAzNnB4IDE2cHhcIiAtIGp1c3QgYSBDU1MgZGVjbGFyYXRpb24gZm9yIGFueSBwYWRkaW5nIHlvdSdkIGxpa2UuXG4jIFx0cGxhY2VIb2xkZXI6IGV4OiBcIlR5cGUgeW91ciBjb21tZW50c1wiIC0gd2hhdGV2ZXIgeW91IHdhbnQgdGhlIHBsYWNlaG9sZGVyIHRleHQgdG8gYmUuXG4jICAgdmFsdWU6IGV4OiBcIlNpbHQgaXMuLi5cIiAtIHN0YXJ0ZXIgdmFsdWUgaWYgeW91IHdhbnQgdGV4dCBhbHJlYWR5IGluIHRoZXJlLlxuXG5cblxuY2xhc3MgZXhwb3J0cy5BdXRvR3Jvd0lucHV0IGV4dGVuZHMgTGF5ZXJcblxuXHQjIEV2ZW50c1xuXHRFdmVudHMuSW5wdXQgICA9IFwiSW5wdXRGaWVsZC5PbklucHV0XCJcblx0RXZlbnRzLkZvY3VzICAgPSBcIklucHV0RmllbGQuT25Gb2N1c1wiXG5cdEV2ZW50cy5CbHVyICAgID0gXCJJbnB1dEZpZWxkLk9uQmx1clwiXG5cdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdEBwYXJlbnRPZ0hlaWdodCA9IG51bGxcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0ID0gXCIje0BvcHRpb25zLmxpbmVIZWlnaHR9cHhcIiBpZiBAb3B0aW9ucy5saW5lSGVpZ2h0P1xuXG5cdFx0IyBGcmFtZXIgTGF5ZXIgUHJvcHNcblx0XHRAb3B0aW9ucy5saW5lSGVpZ2h0XHRcdFx0XHQ/PSBcIjQ4cHhcIlxuXHRcdEBvcHRpb25zLm5hbWVcdFx0XHRcdFx0XHRcdD89IFwiQXV0b0dyb3dJbnB1dFwiXG5cdFx0QG9wdGlvbnMuY29sb3JcdFx0XHRcdFx0XHQ/PSBcIiMyMTIxMjFcIlxuXHRcdEBvcHRpb25zLmJhY2tncm91bmRDb2xvclx0Pz0gXCJ3aGl0ZVwiXG5cdFx0QG9wdGlvbnMuaGVpZ2h0XHRcdFx0XHRcdFx0Pz0gMjAwXG5cdFx0QG9wdGlvbnMuYm9yZGVyUmFkaXVzXHRcdFx0Pz0gMFxuXHRcdEBvcHRpb25zLndpZHRoXHRcdFx0XHRcdFx0Pz0gNDAwXG5cblx0XHQjIEN1c3RvbSBMYXllciBQcm9wc1x0XHRcblx0XHRAb3B0aW9ucy5mb250U2l6ZVx0XHRcdFx0XHRcdFx0Pz0gMzJcblx0XHRAb3B0aW9ucy5mb250V2VpZ2h0XHRcdFx0XHRcdFx0Pz0gMzAwXG5cdFx0QG9wdGlvbnMucGFkZGluZ1x0XHRcdFx0XHRcdFx0Pz0gXCIwXCJcblx0XHRAb3B0aW9ucy5mb250RmFtaWx5XHRcdFx0XHRcdFx0Pz0gXCItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EgTmV1ZVwiXG5cdFx0QG9wdGlvbnMubWluSGVpZ2h0XHRcdFx0XHRcdFx0Pz0gQC5vcHRpb25zLmhlaWdodFxuXHRcdEBvcHRpb25zLnBsYWNlSG9sZGVyXHRcdFx0XHRcdD89IFwiVHlwZSBzb21ldGhpbmdcIlxuXHRcdEBvcHRpb25zLnJlc2l6ZVBhcmVudFx0XHRcdFx0XHQ/PSBmYWxzZVxuXHRcdEBvcHRpb25zLnBhcmVudEJvdHRvbVBhZGRpbmdcdD89IDBcblx0XHRAb3B0aW9ucy5yZWZsb3dTaWJsaW5nc1x0XHRcdFx0Pz0gZmFsc2VcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0aWYgQG9wdGlvbnMucmVzaXplUGFyZW50ID09IHRydWUgdGhlbiBAcGFyZW50T2dIZWlnaHQgPSBAb3B0aW9ucy5wYXJlbnQuaGVpZ2h0XG5cdFx0XG5cdFx0I0NyZWF0ZSB0aGUgdGV4dGFyZWFcblx0XHRAdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwidGV4dGFyZWFcIlxuXHRcdFxuXHRcdCMgR2l2ZSBpdCB0aGUgY29udGVudCBpZiBzb21lIGlzIGRlZmluZWRcblx0XHRAdGV4dGFyZWEudmFsdWUgPSBAb3B0aW9ucy52YWx1ZSBpZiBAb3B0aW9ucy52YWx1ZT9cblx0XHRAdGV4dGFyZWEucGxhY2Vob2xkZXIgPSBAb3B0aW9ucy5wbGFjZUhvbGRlciBpZiBAb3B0aW9ucy5wbGFjZUhvbGRlcj9cblx0XHRcblx0XHQjIEFkZCBpdCB0byB0aGUgRnJhbWVyIExheWVyXG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEB0ZXh0YXJlYVxuXG5cdFx0I0RlZmluZSBzdHlsZXMgZm9yIHRoZSB0ZXh0YXJlYVxuXHRcdEBfdGV4dEFyZWFTdHlsZSA9XG5cdFx0XHRmb250OiBcIiN7QG9wdGlvbnMuZm9udFdlaWdodH0gI3tAb3B0aW9ucy5mb250U2l6ZX1weC8je0BvcHRpb25zLmxpbmVIZWlnaHR9ICN7QG9wdGlvbnMuZm9udEZhbWlseX1cIlxuXHRcdFx0b3V0bGluZTogXCJub25lXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0XHRoZWlnaHQ6IFwiMTAwJVwiXG5cdFx0XHR3aWR0aDogIFwiMTAwJVwiXG5cdFx0XHRvdmVyZmxvdzogXCJoaWRkZW5cIlxuXHRcdFx0cmVzaXplOiBcIm5vbmVcIlxuXHRcdFx0cGFkZGluZyA6IEBvcHRpb25zLnBhZGRpbmdcblx0XHRcdG1hcmdpbjogXCIwXCJcblx0XHRcdFwiLXdlYmtpdC1hcHBlYXJhbmNlXCI6IFwibm9uZVwiXG5cdFx0XHRcImJveC1zaXppbmdcIiA6IFwiYm9yZGVyLWJveFwiXG5cblx0XHQjIEFkZCB0aG9zZSBzdHlsZXMgdG8gdGhlIHRleHRhcmVhXG5cdFx0QHRleHRhcmVhLnN0eWxlW2tleV0gID0gdmFsIGZvciBrZXksIHZhbCBvZiBAX3RleHRBcmVhU3R5bGVcblx0XHRAdGV4dGFyZWEuc3R5bGUuY29sb3IgPSBAb3B0aW9ucy5jb2xvciBpZiBAb3B0aW9ucy5jb2xvcj9cblxuXHRcdCNVcGRhdGUgdGhlIGhlaWdodCB3aGVuZXZlciBhbnl0aGluZyBjaGFuZ2VzLlxuXHRcdEB0ZXh0YXJlYS5vbmtleWRvd24gPSA9PiBAX3VwZGF0ZSgpXG5cdFx0QHRleHRhcmVhLm9ua2V5dXAgPSA9PiBAX3VwZGF0ZSgpXG5cdFx0QHRleHRhcmVhLmNoYW5nZSA9ID0+IEBfdXBkYXRlKClcblxuXHRcdFxuXHRfcmVzaXplUGFyZW50ID0gKGxheWVyLCBwYXJlbnRNaW5IZWlnaHQsIGJvdHRvbVBhZGRpbmcpIC0+XG5cdFx0IyBWYXJpYWJsZSBmb3IgcGFyZW50XG5cdFx0bGF5ZXJQYXJlbnQgPSBsYXllci5wYXJlbnRcblx0XHRcblx0XHQjIEFycmF5IHRvIHN0b3JlIGFsbCBjaGlsZHJlbidzIG1heFlzXG5cdFx0YWxsQ2hpbGRyZW5NYXhZcyA9IFtdXG5cdFx0XG5cdFx0IyBQdXNoIGVhY2ggbWF4WSB0byBhbiBhcnJheVxuXHRcdGZvciBtYXggaW4gbGF5ZXJQYXJlbnQuY2hpbGRyZW5cblx0XHRcdGFsbENoaWxkcmVuTWF4WXMucHVzaChtYXgubWF4WSlcblx0XHRcdFxuXHRcdCMgRmluZCB0aGUgYm90dG9tLW1vc3QgbWF4WSB2YWx1ZVxuXHRcdHRhbGxlc3RDaGlsZE1heFkgPSBNYXRoLm1heC5hcHBseShudWxsLCBhbGxDaGlsZHJlbk1heFlzKVxuXHRcdFxuXHRcdCMgU3RvcmUgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGF0IGFuZCB0aGUgcGFyZW50IGxheWVyXG5cdFx0bGF5ZXJQYXJlbnQuaGVpZ2h0ID0gTWF0aC5tYXgodGFsbGVzdENoaWxkTWF4WSArIGJvdHRvbVBhZGRpbmcsIHBhcmVudE1pbkhlaWdodClcblx0XHRcblx0XHQjIFRPRE8gLSBNYWludGFpbiB0aGUgYm90dG9tIHBhZGRpbmcgb2YgdGhlIHBhcmVudC5cblx0XHRcblx0IyBSZWZsb3cgYWxsIHRoZSBzaWJsaW5ncyB1bmRlciB0aGUgdGV4dCBsYXllclxuXHRfcmVmbG93U2libGluZ3MgPSAobGF5ZXIsIGxheWVyTWF4WSkgLT5cblx0XHRsYXllckxpc3QgPSBsYXllci5wYXJlbnQuY2hpbGRyZW5cblx0XHRmb3IgYSBpbiBbbGF5ZXJMaXN0LmluZGV4T2YobGF5ZXIpKzEuLi5sYXllckxpc3QubGVuZ3RoXVxuXHRcdFx0eURpZmYgPSBsYXllckxpc3RbYV0ueSAtIGxheWVyTWF4WVxuXHRcdFx0bGF5ZXJMaXN0W2FdLnkgPSBsYXllci5tYXhZICsgeURpZmZcblx0XHQjIFRPRE8gLSByZWRvIHRoaXMgd2l0aG91dCB0aGUgYXNzdW1wdGlvbiB0aGF0IGFsbCBzaWJsaW5ncyBhZnRlciB0aGUgbGF5ZXIgYXJlIGJlbG93IGl0LlxuXHRcdFx0XG5cdCMgVXBkYXRlIGhlaWdodCBmdW5jdGlvblxuXHRfdXBkYXRlOiA9PlxuXHRcdHNldFRpbWVvdXQgPT5cblx0XHRcdGxheWVyTWF4WSA9IEAubWF4WVxuXHRcdFx0IyBBZGQgYmFjayBhbnkgbGluZSBicmVha3MgdGhhdCB0aGUgdmFsdWUgbWV0aG9kIGdldHMgcmlkZSBvZlxuXHRcdFx0X3RydWVWYWx1ZSA9IEB0ZXh0YXJlYS52YWx1ZS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvXFxuL2csIFwiPGJyLz4mbmJzcDtcIik7XG5cdFx0XHRcblx0XHRcdCMgSWYgaXQncyBlbXB0eSwgbWFrZSBzdXJlIHRoZXJlJ3MgYSBsZXR0ZXIgaW4gdGhlcmUgdG8gY2FsY3VsYXRlICpzb21ldGhpbmcqXG5cdFx0XHRpZiBfdHJ1ZVZhbHVlLnRyaW0oKSA9PSBcIlwiIHRoZW4gX3RydWVWYWx1ZSA9IFwiYVwiXG5cdFx0XHRcblx0XHRcdCMgQ2FsY3VsYXRlIHRoZSBoZWlnaHQhISFcblx0XHRcdGNhbGNIZWlnaHQgPSBVdGlscy5yb3VuZChVdGlscy50ZXh0U2l6ZShfdHJ1ZVZhbHVlLCBAX3RleHRBcmVhU3R5bGUsIHt3aWR0aDogQC53aWR0aH0pLmhlaWdodCwgMClcblx0XHRcdFxuXHRcdFx0IyBTZXQgdGhlIGhlaWdodCB0byBlaXRoZXIgdGhlIGNhbGN1bGF0ZWQgaGVpZ2h0LCBvciB0aGUgbWluSGVpZ2h0LCB3aGljaGV2ZXIgaXMgZ3JlYXRlci5cblx0XHRcdEAuaGVpZ2h0ID0gTWF0aC5tYXgoY2FsY0hlaWdodCwgQG9wdGlvbnMubWluSGVpZ2h0KVxuXHRcdFx0aWYgQG9wdGlvbnMucmVmbG93U2libGluZ3MgPT0gdHJ1ZSB0aGVuIF9yZWZsb3dTaWJsaW5ncyhALCBsYXllck1heFkpXG5cdFx0XHRpZiBAb3B0aW9ucy5yZXNpemVQYXJlbnQgPT0gdHJ1ZSB0aGVuIF9yZXNpemVQYXJlbnQoQCwgQHBhcmVudE9nSGVpZ2h0LCBAb3B0aW9ucy5wYXJlbnRCb3R0b21QYWRkaW5nKVxuXG4jT3RoZXIgaWRlYXMgXG4jIFRPRE86IElmIHRoZSBoZWlnaHQgaXMgc2V0IHRhbGxlciB0aGFuIHRoZSBtaW5oZWlnaHQgb3B0aW9uLCB3aGVuIHlvdSB0eXBlIGl0IGdsaXRjaGVzIHRvIHRoZSBtaW5IZWlnaHQgb3B0aW9uLlxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURxQkEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQztBQUdiLE1BQUE7Ozs7RUFBQSxNQUFNLENBQUMsS0FBUCxHQUFpQjs7RUFDakIsTUFBTSxDQUFDLEtBQVAsR0FBaUI7O0VBQ2pCLE1BQU0sQ0FBQyxJQUFQLEdBQWlCOztFQUVKLHVCQUFDLE9BQUQ7QUFDWixRQUFBO0lBRGEsSUFBQyxDQUFBLDRCQUFELFVBQVM7O0lBQ3RCLElBQUMsQ0FBQSxjQUFELEdBQWtCO0lBQ2xCLElBQW9ELCtCQUFwRDtNQUFBLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUF5QixJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVYsR0FBcUIsS0FBN0M7OztVQUdRLENBQUMsYUFBaUI7OztXQUNsQixDQUFDLE9BQWM7OztXQUNmLENBQUMsUUFBYzs7O1dBQ2YsQ0FBQyxrQkFBbUI7OztXQUNwQixDQUFDLFNBQWU7OztXQUNoQixDQUFDLGVBQWtCOzs7V0FDbkIsQ0FBQyxRQUFjOzs7V0FHZixDQUFDLFdBQWtCOzs7V0FDbkIsQ0FBQyxhQUFtQjs7O1dBQ3BCLENBQUMsVUFBaUI7OztZQUNsQixDQUFDLGFBQW1COzs7WUFDcEIsQ0FBQyxZQUFrQixJQUFDLENBQUMsT0FBTyxDQUFDOzs7WUFDN0IsQ0FBQyxjQUFtQjs7O1lBQ3BCLENBQUMsZUFBb0I7OztZQUNyQixDQUFDLHNCQUF1Qjs7O1lBQ3hCLENBQUMsaUJBQXFCOztJQUU5Qiwr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
