(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"7lvT":function(t,e,n){"use strict";n("bp59"),n("arSW")},A5hg:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var i=n("mrSG"),o=n("n6gG"),r=n("ZXVw"),s=n("K9Ia"),c=(n("bcAL"),0),a=function(t){function e(e,n,i,o,r,a){var u=t.call(this,r,i,o,n)||this;return u._editor=e,u.ngControl=n,u._hostElement=a,u._uid="mat-input-"+c++,u.stateChanges=new s.a,u._required=!1,u._disabled=!1,u.describedBy="",u.controlType="app-editor",u}return i.c(e,t),Object.defineProperty(e.prototype,"id",{get:function(){return this._id},set:function(t){this._id=t||this._uid},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"required",{get:function(){return this._required},set:function(t){this._required=Object(o.b)(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"disabled",{get:function(){return this.ngControl&&null!==this.ngControl.disabled?this.ngControl.disabled:this._disabled},set:function(t){this._disabled=Object(o.b)(t),this.focused&&(this.focused=!1,this.stateChanges.next())},enumerable:!0,configurable:!0}),e.prototype.onContainerClick=function(){this._editor.setFocus()},e.prototype.setDescribedByIds=function(t){this.describedBy=t.join(" ")},e.prototype.ngOnInit=function(){var t=this;this._editor.focus.subscribe(function(){t.focused=!0,t.stateChanges.next()}),this._editor.blur.subscribe(function(){t.focused=!1,t.stateChanges.next()}),this._editor.change.subscribe(function(){t.stateChanges.next()}),this._generatePlaceholder()},e.prototype.ngDoCheck=function(){this.ngControl&&this.updateErrorState()},e.prototype.ngOnDestroy=function(){this.stateChanges.complete()},Object.defineProperty(e.prototype,"empty",{get:function(){return!this._editor.value},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"shouldLabelFloat",{get:function(){return this.focused||!this.empty?(this.empty?this._attachPlaceholder():this._detachPlaceholder(),!0):(this._detachPlaceholder(),!1)},enumerable:!0,configurable:!0}),e.prototype._attachPlaceholder=function(){this._placeholder&&!this._placeholder.parentElement&&this._hostElement.nativeElement.appendChild(this._placeholder)},e.prototype._detachPlaceholder=function(){this._placeholder&&this._placeholder.parentElement&&this._placeholder.remove()},e.prototype._generatePlaceholder=function(){if(this.placeholder){this._placeholder=document.createElement("div"),this._placeholder.style.position="absolute",this._placeholder.style.position="absolute",this._placeholder.style.left="0",this._placeholder.style.boxSizing="content-box",this._placeholder.style.width="100%",this._placeholder.style.height="100%",this._placeholder.style.overflow="hidden",this._placeholder.style.pointerEvents="none",this._placeholder.style.top="-0.84375em",this._placeholder.style.paddingTop="0.84375em";var t=document.createElement("div");t.style.color="rgba(0,0,0,0.54)",t.style.top="1.28125em",t.style.position="absolute";var e=document.createTextNode(this.placeholder);t.appendChild(e),this._placeholder.appendChild(t)}},e}(r.b)},ZXVw:function(t,e,n){"use strict";var i=function(){function t(){}return t.escapeRegExp=function(t){return t?t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"):t},t}(),o=(n("Ip0R"),n("Wf4p")),r=function(){return function(t,e,n,i){this._defaultErrorStateMatcher=t,this._parentForm=e,this._parentFormGroup=n,this.ngControl=i}}(),s=Object(o.E)(r);n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},arSW:function(t,e,n){"use strict";n.d(e,"a",function(){return i}),n("A5hg");var i=function(){return function(){}}()},bcAL:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var i=n("mrSG"),o=n("n6gG"),r=n("CcnG"),s=n("LvDl"),c=n("P6uZ"),a=n("t9fZ"),u=(n("pk1M"),function(){function t(t,e,n){this.zone=t,this._changeDetectorRef=e,this._initializer=n,this.change=new r.EventEmitter,this.ready=new r.EventEmitter,this.blur=new r.EventEmitter,this.focus=new r.EventEmitter,this.disabled=new r.EventEmitter,this._inline=!0,this._value=""}return Object.defineProperty(t.prototype,"readonly",{get:function(){return this._readonly},set:function(t){this._readonly=Object(o.b)(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inline",{get:function(){return this._inline},set:function(t){this._inline=Object(o.b)(t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"value",{get:function(){return this._value},set:function(t){t!==this._value&&(this._value=t,this.onChange(t))},enumerable:!0,configurable:!0}),t.prototype.ngOnChanges=function(t){t.readonly&&this.instance&&this.instance.setReadOnly(t.readonly.currentValue)},t.prototype.ngOnDestroy=function(){var t=this;if(this.focus.complete(),this.blur.complete(),this.change.complete(),this.disabled.complete(),this.instance)if(this.instance.focusManager.blur(!0),this._ready){try{this.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}this.ready.complete(),this.instance=null}else this.ready.pipe(Object(c.a)()).subscribe(function(){try{t.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}t.instance=null,t.ready.complete()})},t.prototype.ngAfterViewInit=function(){var t=this;this._initializer.initDejaEditorLib().then(function(){t.ckeditorInit(s.cloneDeep(t.config)||{}),setTimeout(function(){return t._changeDetectorRef.markForCheck()})})},t.prototype.updateValue=function(){var t=this;this.zone.run(function(){var e=t.instance.getData();e||(e=null),t.value!==e&&(t.value=e,t.onChange(e),t.change.emit(e))})},t.prototype.textAreaChange=function(){var t=this;this.zone.run(function(){var e=t.host.nativeElement.value;t.onChange(e),t.change.emit(e)})},t.prototype.ckeditorInit=function(t){var e=this;if("undefined"==typeof CKEDITOR)console.warn("CKEditor 4.x is missing (http://ckeditor.com/)");else{if(this.instance)return;this.readonly&&(t.readOnly=this.readonly);var n=t.on&&t.on.key;t.on||(t.on={}),t.on.key=function(t){1114177===t.data.keyCode&&(t.cancel(),t.stop(),e.instance.document.$.execCommand("SelectAll")),n&&n(t)},this.instance=this.inline?CKEDITOR.inline(this.host.nativeElement,t):CKEDITOR.replace(this.host.nativeElement,t),this.instance.setData(this.value),this.instance.on("instanceReady",function(t){e._ready=!0,e.ready.emit(t)}),this.instance.on("change",function(){e.debounce?(e.debounceTimeout&&clearTimeout(e.debounceTimeout),e.debounceTimeout=setTimeout(function(){e.updateValue(),e.debounceTimeout=null},parseInt(e.debounce,10))):e.updateValue()}),this.instance.on("blur",function(t){e.blur.emit(t),e.onTouched()}),this.instance.on("focus",function(t){e.readonly||e.focus.emit(t)})}},t.prototype.writeValue=function(t){this._value=t,this.instance?this.instance.setData(t):this.host.nativeElement.value=t},t.prototype.onChange=function(t){},t.prototype.onTouched=function(){},t.prototype.registerOnChange=function(t){this.onChange=t},t.prototype.registerOnTouched=function(t){this.onTouched=t},t.prototype.setDisabledState=function(t){var e=this;this.readonly=t,this.disabled.next(t),this._ready?this.instance&&this.instance.setReadOnly(t):this.ready.pipe(Object(a.a)(1)).subscribe(function(){e.instance.setReadOnly(e.readonly)})},t.prototype.getWordAtCursor=function(){var t=this.instance.getSelection().getRanges(!0)[0];if(!t)return null;var e=this._firstTextNode(t);return e&&e.toReplace||null},t.prototype.hasActiveSelection=function(){return!!this.getSelectedText()},t.prototype.getSelectedText=function(){return this.instance.getSelection().getSelectedText()},t.prototype.replace=function(t){if(t){if(this.getSelectedText()){var e=this.instance.focus;return this.instance.focus=function(){},this.instance.insertText(t),void(this.instance.focus=e)}var n=this.instance.getSelection().getRanges(!0)[0];if(n){var i=this._firstTextNode(n);i?this._replaceWord(i,t):this.instance.insertText(t),this.updateValue(),this.setFocus()}else this.instance.insertText(t)}},t.prototype.setFocus=function(){this.instance?this.instance.focus():this.host.nativeElement.focus()},t.prototype._hasTextNodeAsChild=function(t,e){var n,o;void 0===e&&(e=!1);var r=t.getChildren().toArray();if(e)for(var s=r.length-1;s>=0;s--){if((u=r[s]).type===CKEDITOR.NODE_TEXT)return u;if(h=this._hasTextNodeAsChild(u))return h}else try{for(var c=i.h(r),a=c.next();!a.done;a=c.next()){var u,h;if((u=a.value).type===CKEDITOR.NODE_TEXT)return u;if(h=this._hasTextNodeAsChild(u))return h}}catch(l){n={error:l}}finally{try{a&&!a.done&&(o=c.return)&&o.call(c)}finally{if(n)throw n.error}}return null},t.prototype._mergeTextNodeAroundWithDirection=function(t,e){void 0===e&&(e=!1);for(var n=[],i=t.getText(),o=t;(o=e?o.getPrevious():o.getNext)&&o.type===CKEDITOR.NODE_TEXT&&!o.getText().charAt(e?o.getText().length-1:0).match(/[\s,;.:!?]/);)e?i=o.getText()+i:i+=o.getText(),n.push(o);n.length>0&&(t.setText(i),n.forEach(function(t){return t.remove()}))},t.prototype._mergeTextNodeAround=function(t){return this._mergeTextNodeAroundWithDirection(t,!0),this._mergeTextNodeAroundWithDirection(t),t},t.prototype._firstNonEmptyTextNode=function(t,e){void 0===e&&(e=!1);for(var n=t;n=e?n.getPrevious():n.getNext();){if(n.type!==CKEDITOR.NODE_TEXT)return n;if(""!==n.getText())return n}},t.prototype._trim=function(t){return t&&(t=t.replace(/[\u200b\u00A0]/g,"").trim()),t},t.prototype._extractFirstWord=function(t,e){if(void 0===e&&(e=!1),!t)return t;if(-1!==t.indexOf(" ")){var n=t.split(" ");return this._trim(n[e?n.length-1:0])}return this._trim(t)},t.prototype._firstTextNodeResult=function(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var i=t.getText();if(this._trim(i)&&this._trim(i.substring(i.length-1))){var o=this._mergeTextNodeAround(t);return{textNode:o,firstNodeIsText:n,toReplace:this._extractFirstWord(o.getText(),e)}}return null},t.prototype._firstTextNodeWithDirection=function(t,e){void 0===e&&(e=!1);var n=t.startContainer;if(e&&n.type===CKEDITOR.NODE_TEXT)return this._firstTextNodeResult(n,e,!0);var i=n.type===CKEDITOR.NODE_TEXT?e?this._firstNonEmptyTextNode(n,!0):this._firstNonEmptyTextNode(n):n.getChildren().getItem(t.startOffset-1);if(i){if(i.type===CKEDITOR.NODE_TEXT)return this._firstTextNodeResult(i,e);var o=this._hasTextNodeAsChild(i,e);if(o)return this._firstTextNodeResult(o,e);for(o=i;o=e?o.getPrevious():o.getNext();){if(o.type===CKEDITOR.NODE_TEXT)return this._firstTextNodeResult(o,e);var r=this._hasTextNodeAsChild(o,e);if(r)return this._firstTextNodeResult(r,e)}}return null},t.prototype._firstTextNode=function(t){var e=this._firstTextNodeWithDirection(t,!0);return e||(e=this._firstTextNodeWithDirection(t)),e},t.prototype._replaceWord=function(t,e){var n=t.textNode.getText().lastIndexOf(t.toReplace);if(-1!==n){var i=t.textNode.getText().substring(0,n),o=t.textNode.getText().substring(n+t.toReplace.length);t.textNode.setText(i);var r=CKEDITOR.dom.element.createFromHtml("<span>"+CKEDITOR.tools.transformPlainTextToHtml(e,CKEDITOR.ENTER_BR)+"</span>");r.insertAfter(t.textNode),t.textNode.getText().substring(n+t.toReplace.length)&&new CKEDITOR.dom.text(o).insertAfter(r),this.instance.getSelection().selectElement(t.textNode);var s=this.instance.getSelection().getRanges()[0];s.setStartAfter(t.textNode),s.select()}},t}())},bp59:function(t,e,n){"use strict";n("bcAL"),n.d(e,"a",function(){return i});var i=function(){return function(){}}()},pk1M:function(t,e,n){"use strict";n.d(e,"a",function(){return i});var i=function(){function t(){}return t.prototype.initDejaEditorLib=function(){return this._loading||this.init(),this._loader},t.prototype.init=function(){var t=this;this._loader=new Promise(function(e){if(t._loading=!0,!window.ckeditor){var n=document.getElementsByTagName("base")[0]||{},i=window.CKEDITOR_BASEPATH||n.href+"assets/ckeditor/",o=document.createElement("script");document.head.appendChild(o),o.type="text/javascript",o.src=i+"ckeditor.js",o.addEventListener("load",e)}})},t}()}}]);