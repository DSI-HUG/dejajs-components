"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[635],{4635:(k,T,a)=>{a.r(T),a.d(T,{DejaEditorDemoModule:()=>Y});var f=a(6019),c=a(9133),C=a(86),m=a(888),h=a(8167),x=a(138),p=a(2605),E=a(8643),t=a(3668);let y=(()=>{class o{initDejaEditorLib(){return this._loading||this.init(),this._loader}init(){this._loader=new Promise(e=>{this._loading=!0;const i=window;if(!i.ckeditor){const s=(document.getElementsByTagName("base")[0]||{}).href,r=i.CKEDITOR_BASEPATH||`${s}assets/ckeditor/`,l=document.createElement("script");document.head.appendChild(l),l.type="text/javascript",l.src=`${r}ckeditor.js`,l.addEventListener("load",e)}})}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac}),o})();var u=a(348),D=a(7656),A=a(6111),N=a(6047),R=a(7867),v=a(9468),_=a(7384),O=a(8660),g=a(6263),b=a(9417);const M=["host"];let Z=(()=>{class o extends D.yl{constructor(e,i,n){super(),this.zone=e,this.changeDetectorRef=i,this.initializer=n,this.change=new t.vpe,this.ready=new t.vpe,this.blur=new t.vpe,this.focus=new t.vpe,this.disabled=new t.vpe,this._inline=!0,this._value=""}set readonly(e){this._readonly=(0,u.Ig)(e)}get readonly(){return this._readonly}set inline(e){this._inline=(0,u.Ig)(e)}get inline(){return this._inline}get value(){return this._value}set value(e){e!==this._value&&(this._value=e)}ngOnChanges(e){e.readonly&&this.instance&&this.instance.setReadOnly(e.readonly.currentValue)}ngOnDestroy(){if(super.ngOnDestroy(),this.focus.complete(),this.blur.complete(),this.change.complete(),this.disabled.complete(),this.instance)if(this.instance.focusManager.blur(!0),this._ready){try{this.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}this.ready.complete(),this.instance=null}else this.ready.pipe((0,N.P)()).subscribe(()=>{try{this.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}this.instance=null,this.ready.complete()})}ngAfterViewInit(){(0,R.D)(this.initializer.initDejaEditorLib()).pipe((0,v.q)(1),(0,_.b)(()=>this.ckeditorInit((0,A.Z)(this.config)||{})),(0,O.g)(0),(0,g.R)(this.destroyed$)).subscribe(()=>this.changeDetectorRef.markForCheck())}updateValue(){this.zone.run(()=>{let e=this.instance.getData();e||(e=null),this.value!==e&&(this.value=e,this.onChange(e),this.change.emit(e))})}textAreaChange(){this.zone.run(()=>{const e=this.host.nativeElement.value;this.onChange(e),this.change.emit(e)})}ckeditorInit(e){var i;if("undefined"==typeof CKEDITOR)console.warn("CKEditor 4.x is missing (http://ckeditor.com/)");else{if(this.instance)return;this.readonly&&(e.readOnly=this.readonly);const n=null===(i=e.on)||void 0===i?void 0:i.key;e.on||(e.on={}),e.on.key=s=>{1114177===s.data.code&&(s.cancel(),s.stop(),this.instance.document.$.execCommand("SelectAll")),n&&n(s)},this.instance=this.inline?CKEDITOR.inline(this.host.nativeElement,e):CKEDITOR.replace(this.host.nativeElement,e),this.instance.setData(this.value),this.instance.on("instanceReady",s=>{this._ready=!0,this.ready.emit(s)}),this.instance.on("blur",s=>{this.blur.emit(s),this.onTouched()}),this.instance.on("focus",s=>{this.readonly||this.focus.emit(s)}),this.registerChangeListener()}}writeValue(e){this._value=e,this.destroyed$.closed||(0,b.H)(0).pipe((0,g.R)(this.destroyed$)).subscribe(()=>{var i;this.instance?(null===(i=this.onDataChangeListener)||void 0===i||i.removeListener(),this.instance.setData(e,()=>{this.registerChangeListener()})):this.host.nativeElement.value=e})}onChange(e){}onTouched(){}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.readonly=e,this.disabled.next(e),this._ready?this.instance&&this.instance.setReadOnly(e):this.destroyed$.closed||this.ready.pipe((0,v.q)(1),(0,g.R)(this.destroyed$)).subscribe(()=>{this.instance.setReadOnly(this.readonly)})}getWordAtCursor(){const e=this.instance.getSelection().getRanges(!0)[0];if(!e)return null;const i=this.firstTextNode(e);return(null==i?void 0:i.toReplace)||null}hasActiveSelection(){return!!this.getSelectedText()}getSelectedText(){return this.instance?this.instance.getSelection().getSelectedText():""}replace(e){if(!e||!this.instance)return;if(this.getSelectedText()){const r=this.instance.focus;return this.instance.focus=()=>{},this.instance.insertHtml(e),void(this.instance.focus=r)}const n=this.instance.getSelection().getRanges(!0)[0];if(!n)return void this.instance.insertHtml(e);const s=this.firstTextNode(n);s?this.replaceWord(s,e):this.instance.insertHtml(e),this.updateValue(),this.setFocus()}setFocus(){this.instance?this.instance.focus():this.host.nativeElement.focus()}registerChangeListener(){this.onDataChangeListener=this.instance.on("change",()=>{var e;if(this.debounce){const i=parseInt(this.debounce,10);null===(e=this.debounceTimeout$sub)||void 0===e||e.unsubscribe(),this.debounceTimeout$sub=(0,b.H)(i).pipe((0,g.R)(this.destroyed$)).subscribe(()=>{this.updateValue(),this.debounceTimeout$sub=null})}else this.updateValue()})}hasTextNodeAsChild(e,i=!1){const n=e.getChildren().toArray();if(i)for(let s=n.length-1;s>=0;s--){const r=n[s];if(r.type===CKEDITOR.NODE_TEXT)return r;{const l=this.hasTextNodeAsChild(r);if(l)return l}}else for(const s of n){if(s.type===CKEDITOR.NODE_TEXT)return s;{const r=this.hasTextNodeAsChild(s);if(r)return r}}return null}mergeTextNodeAroundWithDirection(e,i=!1){const n=[];let s=e.getText(),r=e;for(;(r=i?r.getPrevious():r.getNext)&&r.type===CKEDITOR.NODE_TEXT&&!r.getText().charAt(i?r.getText().length-1:0).match(/[\s,;.:!?]/);)i?s=r.getText()+s:s+=r.getText(),n.push(r);n.length>0&&(e.setText(s),n.forEach(l=>l.remove()))}mergeTextNodeAround(e){return this.mergeTextNodeAroundWithDirection(e,!0),this.mergeTextNodeAroundWithDirection(e),e}firstNonEmptyTextNode(e,i=!1){let n=e;for(;n=i?n.getPrevious():n.getNext();){if(n.type!==CKEDITOR.NODE_TEXT)return n;if(""!==n.getText())return n}}trim(e){return e&&(e=e.replace(/[\u200b\u00A0]/g,"").trim()),e}extractFirstWord(e,i=!1){if(!e)return e;if(e.includes(" ")){const n=e.split(" ");return this.trim(n[i?n.length-1:0])}return this.trim(e)}firstTextNodeResult(e,i=!1,n=!1){const s=e.getText();if(this.trim(s)&&this.trim(s.substring(s.length-1))){const r=this.mergeTextNodeAround(e);return{textNode:r,firstNodeIsText:n,toReplace:this.extractFirstWord(r.getText(),i)}}return null}firstTextNodeWithDirection(e,i=!1){const n=e.startContainer;if(i&&n.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(n,i,!0);const s=n.type===CKEDITOR.NODE_TEXT?i&&this.firstNonEmptyTextNode(n,!0)||this.firstNonEmptyTextNode(n):n.getChildren().getItem(e.startOffset-1);if(s){if(s.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(s,i);let r=this.hasTextNodeAsChild(s,i);if(r)return this.firstTextNodeResult(r,i);for(r=s;r=i?r.getPrevious():r.getNext();){if(r.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(r,i);const l=this.hasTextNodeAsChild(r,i);if(l)return this.firstTextNodeResult(l,i)}}return null}firstTextNode(e){let i=this.firstTextNodeWithDirection(e,!0);return i||(i=this.firstTextNodeWithDirection(e)),i}replaceWord(e,i){const n=e.textNode.getText().lastIndexOf(e.toReplace);if(-1!==n){const s=e.textNode.getText().substring(0,n),r=e.textNode.getText().substring(n+e.toReplace.length);e.textNode.setText(s);const l=CKEDITOR.dom.element.createFromHtml(`<span>${CKEDITOR.tools.htmlDecode(CKEDITOR.tools.transformPlainTextToHtml(i,CKEDITOR.ENTER_BR))}</span>`);l.insertAfter(e.textNode),e.textNode.getText().substring(n+e.toReplace.length)&&new CKEDITOR.dom.text(r).insertAfter(l),this.instance.getSelection().selectElement(e.textNode);const j=this.instance.getSelection().getRanges()[0];j.setStartAfter(e.textNode),j.select()}}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.R0b),t.Y36(t.sBO),t.Y36(y))},o.\u0275cmp=t.Xpm({type:o,selectors:[["deja-editor"]],viewQuery:function(e,i){if(1&e&&t.Gf(M,7),2&e){let n;t.iGM(n=t.CRH())&&(i.host=n.first)}},inputs:{config:"config",debounce:"debounce",readonly:"readonly",inline:"inline",value:"value"},outputs:{change:"change",ready:"ready",blur:"blur",focus:"focus",disabled:"disabled"},features:[t._Bn([{provide:c.JU,useExisting:(0,t.Gpc)(()=>o),multi:!0}]),t.qOj,t.TTD],decls:2,vars:0,consts:[[2,"visibility","hidden",3,"onchange"],["host",""]],template:function(e,i){1&e&&(t.TgZ(0,"textarea",0,1),t.NdJ("onchange",function(){return i.textAreaChange()}),t.qZA())},styles:["deja-editor{line-height:normal}deja-editor .cke_textarea_inline>p{margin:0}deja-editor .cke_textarea_inline:focus{outline:none}\n"],encapsulation:2,changeDetection:0}),o})(),I=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[y],imports:[[f.ez]]}),o})();var S=a(273),P=a(6731);let w=0,J=(()=>{class o extends D.VG{constructor(e,i,n,s,r,l){super(r,n,s,i),this.editor=e,this.ngControl=i,this.hostElement=l,this.describedBy="",this.stateChanges=new S.x,this.controlType="app-editor",this._disabled=!1,this._uid="mat-input-"+w++,this._required=!1}get id(){return this._id}set id(e){this._id=e||this._uid}get required(){return this._required}set required(e){this._required=(0,u.Ig)(e)}get disabled(){var e;return null!==(null===(e=this.ngControl)||void 0===e?void 0:e.disabled)?this.ngControl.disabled:this._disabled}set disabled(e){this._disabled=(0,u.Ig)(e),this.focused&&(this.focused=!1,this.stateChanges.next())}onContainerClick(){this.editor.setFocus()}setDescribedByIds(e){this.describedBy=e.join(" ")}ngOnInit(){this.editor.focus.subscribe(()=>{this.focused=!0,this.stateChanges.next()}),this.editor.blur.subscribe(()=>{this.focused=!1,this.stateChanges.next()}),this.editor.change.subscribe(()=>{this.stateChanges.next()}),this.generatePlaceholder()}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){this.stateChanges.complete()}get empty(){return!this.editor.value}get shouldLabelFloat(){return this.focused||!this.empty?(this.empty?this.attachPlaceholder():this.detachPlaceholder(),!0):(this.detachPlaceholder(),!1)}attachPlaceholder(){this._placeholder&&!this._placeholder.parentElement&&this.hostElement.nativeElement.appendChild(this._placeholder)}detachPlaceholder(){var e;(null===(e=this._placeholder)||void 0===e?void 0:e.parentElement)&&this._placeholder.remove()}generatePlaceholder(){if(this.placeholder){this._placeholder=document.createElement("div"),this._placeholder.style.position="absolute",this._placeholder.style.position="absolute",this._placeholder.style.left="0",this._placeholder.style.boxSizing="content-box",this._placeholder.style.width="100%",this._placeholder.style.height="100%",this._placeholder.style.overflow="hidden",this._placeholder.style.pointerEvents="none",this._placeholder.style.top="-0.84375em",this._placeholder.style.paddingTop="0.84375em";const e=document.createElement("div");e.style.color="rgba(0,0,0,0.54)",e.style.top="1.28125em",e.style.position="absolute";const i=document.createTextNode(this.placeholder);e.appendChild(i),this._placeholder.appendChild(e)}}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(Z,2),t.Y36(c.a5,10),t.Y36(c.F,8),t.Y36(c.sg,8),t.Y36(P.rD),t.Y36(t.SBq,1))},o.\u0275dir=t.lG2({type:o,selectors:[["deja-editor"]],hostVars:1,hostBindings:function(e,i){2&e&&t.uIk("aria-describedby",i.describedBy)},inputs:{placeholder:"placeholder",id:"id",required:"required",disabled:"disabled"},features:[t._Bn([{provide:h.Eo,useExisting:o}]),t.qOj]}),o})(),q=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[I,h.lN]]}),o})();var F=a(6412),K=a(3507),H=a(7991);const U=["replaceEditor"];function B(o,d){1&o&&(t.TgZ(0,"mat-card",5),t._UZ(1,"deja-markdown",6),t.qZA()),2&o&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/editor/readme.md"))}function L(o,d){if(1&o){const e=t.EpF();t.TgZ(0,"div"),t.TgZ(1,"mat-card",7),t.TgZ(2,"mat-toolbar",8),t._uU(3,"Inline CKEditor with material skin"),t.qZA(),t.TgZ(4,"mat-card-content"),t.TgZ(5,"div",9),t.TgZ(6,"div",10),t.TgZ(7,"h3"),t._uU(8,"Editor :"),t.qZA(),t.TgZ(9,"mat-form-field"),t.TgZ(10,"deja-editor",11),t.NdJ("ngModelChange",function(n){return t.CHM(e),t.oxw().matText=n}),t.qZA(),t.qZA(),t.qZA(),t.TgZ(11,"div",10),t.TgZ(12,"h3"),t._uU(13,"Result :"),t.qZA(),t._UZ(14,"div",12),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(15,"mat-card",7),t.TgZ(16,"mat-toolbar",8),t._uU(17,"Default CKEditor"),t.qZA(),t.TgZ(18,"mat-card-content"),t.TgZ(19,"div",9),t.TgZ(20,"div",10),t.TgZ(21,"h3"),t._uU(22,"Editor :"),t.qZA(),t.TgZ(23,"deja-editor",13),t.NdJ("ngModelChange",function(n){return t.CHM(e),t.oxw().matText=n}),t.qZA(),t.qZA(),t.TgZ(24,"div",10),t.TgZ(25,"h3"),t._uU(26,"Result :"),t.qZA(),t._UZ(27,"div",12),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(28,"mat-card",7),t.TgZ(29,"mat-toolbar",8),t._uU(30,"Replace"),t.qZA(),t.TgZ(31,"mat-card-content"),t.TgZ(32,"div",9),t.TgZ(33,"div",10),t.TgZ(34,"h3"),t._uU(35,"Editor :"),t.qZA(),t._UZ(36,"deja-editor",14,15),t.qZA(),t.TgZ(38,"div",10),t.TgZ(39,"h3"),t._uU(40,"Actions :"),t.qZA(),t.TgZ(41,"div"),t.TgZ(42,"mat-form-field"),t.TgZ(43,"input",16),t.NdJ("ngModelChange",function(n){return t.CHM(e),t.oxw().replaceWith=n}),t.qZA(),t.qZA(),t.TgZ(44,"button",17),t.NdJ("click",function(){return t.CHM(e),t.oxw().replace()}),t._uU(45,"Replace"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()}if(2&o){const e=t.oxw();t.xp6(10),t.Q6J("ngModel",e.matText)("config",e.editorConfig),t.xp6(4),t.Q6J("innerHTML",e.matText,t.oJD),t.xp6(9),t.Q6J("ngModel",e.matText)("config",e.editorConfig)("inline",!1),t.xp6(4),t.Q6J("innerHTML",e.matText,t.oJD),t.xp6(9),t.Q6J("config",e.editorConfig)("inline",!1),t.xp6(7),t.Q6J("ngModel",e.replaceWith)}}const $=K.Bz.forChild([{path:"",component:(()=>{class o{constructor(){this.tabIndex=1,this.editorConfig={}}ngOnInit(){this.matText="<b>Inline Editor</b> <ul><li>First item</li><li>Second item</li><ul>",this.editorConfig.extraPlugins="colorbutton,autogrow",this.editorConfig.on={instanceReady:function(){this.dataProcessor.writer.indentationChars="",this.dataProcessor.writer.lineBreakChars=""}},this.editorConfig.title="",this.editorConfig.disableNativeSpellChecker=!0,this.editorConfig.scayt_autoStartup=!0,this.editorConfig.scayt_sLang="fr_FR",this.editorConfig.wsc_lang="fr_FR",this.editorConfig.scayt_disableOptionsStorage="all",this.editorConfig.language="fr",this.editorConfig.enterMode=3,this.editorConfig.contentsCss=["assets/ckeditor/contents.css"],this.editorConfig.autoGrow_onStartup=!0,this.editorConfig.coreStyles_bold={element:"b",overrides:{strong:!0}},this.editorConfig.coreStyles_italic={element:"i",overrides:{em:!0}}}replace(){this.replaceEditor.replace(this.replaceWith)}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["deja-editor-demo"]],viewQuery:function(e,i){if(1&e&&t.Gf(U,5),2&e){let n;t.iGM(n=t.CRH())&&(i.replaceEditor=n.first)}},decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],[1,"demo-card"],["color","primary"],[1,"flexLayout"],[1,"flexAuto"],[3,"ngModel","config","ngModelChange"],[3,"innerHTML"],[1,"inline",3,"ngModel","config","inline","ngModelChange"],[1,"inline",3,"config","inline"],["replaceEditor",""],["matInput","",3,"ngModel","ngModelChange"],["mat-raised-button","",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(s){return i.tabIndex=s.index}),t._UZ(1,"mat-tab",1),t._UZ(2,"mat-tab",2),t.qZA(),t.YNc(3,B,2,1,"mat-card",3),t.YNc(4,L,46,10,"div",4)),2&e&&(t.Q6J("selectedIndex",i.tabIndex),t.xp6(3),t.Q6J("ngIf",0===i.tabIndex),t.xp6(1),t.Q6J("ngIf",1===i.tabIndex))},directives:[p.SP,p.uX,f.O5,m.a8,H.F,E.Ye,m.dn,h.KE,Z,J,c.JJ,c.On,x.Nt,c.Fj,C.lW],styles:["[_nghost-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:90%}[_nghost-%COMP%]   deja-editor.inline[_ngcontent-%COMP%]{width:90%;display:block}[_nghost-%COMP%]   .flexLayout[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .flexLayout[_ngcontent-%COMP%]   .flexAuto[_ngcontent-%COMP%]{flex:1 1 0}"]}),o})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let Y=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({providers:[],imports:[[f.ez,F.O,q,c.u5,C.ot,m.QW,h.lN,x.c,p.Nh,E.g0,$]]}),o})()}}]);