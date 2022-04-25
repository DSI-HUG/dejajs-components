"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[487],{6487:(G,C,l)=>{l.r(C),l.d(C,{DejaEditorDemoModule:()=>z});var f=l(9808),c=l(3075),T=l(7423),p=l(9224),g=l(7322),x=l(7531),m=l(3251),E=l(4594),t=l(5e3),u=l(3191),D=l(1636),A=l(6698),v=l(4707),y=l(7579),O=l(3900),R=l(6451),h=l(8505),w=l(8372),b=l(2722),I=l(590),S=l(2076),_=l(5698),Z=l(4326),P=l(508);const J=["host"];let j=(()=>{class r{initDejaEditorLib(){return this._loading||this.init(),this._loader}init(){this._loader=new Promise(e=>{this._loading=!0;const i=window;if(!i.ckeditor){const n=(document.getElementsByTagName("base")[0]||{}).href,o=i.CKEDITOR_BASEPATH||`${n}assets/ckeditor/`,d=document.createElement("script");document.head.appendChild(d),d.type="text/javascript",d.src=`${o}ckeditor.js`,d.addEventListener("load",e)}})}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275prov=t.Yz7({token:r,factory:r.\u0275fac}),r})(),N=(()=>{class r extends D.yl{constructor(e,i,s){super(),this.zone=e,this.changeDetectorRef=i,this.initializer=s,this.change=new t.vpe,this.ready=new t.vpe,this.blur=new t.vpe,this.focus=new t.vpe,this.disabled=new t.vpe,this._debounce=0,this._inline=!0,this.focus$=new v.t(1),this.disabled$=new v.t(1),this.onCkeditorChange$=new y.x,this.writeValue$=new v.t(1),this._value=""}set readonly(e){this._readonly=(0,u.Ig)(e)}get readonly(){return this._readonly}set inline(e){this._inline=(0,u.Ig)(e)}get inline(){return this._inline}set debounce(e){this._debounce=(0,u.su)(e)}get value(){return this._value}set value(e){e!==this._value&&(this._value=e)}ngOnChanges(e){e.readonly&&this.instance&&this.instance.setReadOnly(e.readonly.currentValue)}ngOnInit(){this.ready.pipe((0,O.w)(()=>(0,R.T)(this.focus$.pipe((0,h.b)(()=>this.instance.focus())),this.disabled$.pipe((0,h.b)(e=>this.disabled.emit(e)),(0,h.b)(e=>this.instance.setReadOnly(e))),this.onCkeditorChange$.pipe((0,w.b)(this._debounce),(0,h.b)(()=>this.updateValue())),this.writeValue$.pipe((0,h.b)(e=>this.updateCkeditorInstanceValue(e))))),(0,b.R)(this.destroyed$)).subscribe()}ngOnDestroy(){if(super.ngOnDestroy(),this.focus.complete(),this.blur.complete(),this.change.complete(),this.disabled.complete(),this.instance)if(this.instance.focusManager.blur(!0),this._ready){try{this.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}this.ready.complete(),this.instance=null}else this.ready.pipe((0,I.P)()).subscribe(()=>{try{this.instance.destroy()}catch(e){console.warn(e,"Error occurred when destroying ckEditor instance")}this.instance=null,this.ready.complete()})}ngAfterViewInit(){(0,S.D)(this.initializer.initDejaEditorLib()).pipe((0,_.q)(1),(0,h.b)(()=>this.ckeditorInit((0,A.Z)(this.config)||{})),(0,Z.g)(0),(0,b.R)(this.destroyed$)).subscribe(()=>this.changeDetectorRef.markForCheck())}updateValue(){this.zone.run(()=>{let e=this.instance.getData();e||(e=null),this.value!==e&&(this.value=e,this.onChange(e),this.change.emit(e))})}textAreaChange(){this.zone.run(()=>{const e=this.host.nativeElement.value;this.onChange(e),this.change.emit(e)})}ckeditorInit(e){var i;if("undefined"==typeof CKEDITOR)console.warn("CKEditor 4.x is missing (http://ckeditor.com/)");else{if(this.instance)return;this.readonly&&(e.readOnly=this.readonly);const s=null===(i=e.on)||void 0===i?void 0:i.key;e.on||(e.on={}),e.on.key=n=>{1114177===n.data.code&&(n.cancel(),n.stop(),this.instance.document.$.execCommand("SelectAll")),s&&s(n)},this.instance=this.inline?CKEDITOR.inline(this.host.nativeElement,e):CKEDITOR.replace(this.host.nativeElement,e),this.instance.setData(this.value),this.instance.on("instanceReady",n=>{this._ready=!0,this.ready.emit(n)}),this.instance.on("blur",n=>{this.blur.emit(n),this.onTouched()}),this.instance.on("focus",n=>{this.readonly||this.focus.emit(n)}),this.registerChangeListener()}}writeValue(e){this._value=e,this.writeValue$.next(e)}onChange(e){}onTouched(){}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled$.next(e)}getWordAtCursor(){const e=this.instance.getSelection().getRanges(!0)[0];if(!e)return null;const i=this.firstTextNode(e);return(null==i?void 0:i.toReplace)||null}hasActiveSelection(){return!!this.getSelectedText()}getSelectedText(){return this.instance?this.instance.getSelection().getSelectedText():""}replace(e){if(!e||!this.instance)return;if(this.getSelectedText()){const o=this.instance.focus;return this.instance.focus=()=>{},this.instance.insertHtml(e),void(this.instance.focus=o)}const s=this.instance.getSelection().getRanges(!0)[0];if(!s)return void this.instance.insertHtml(e);const n=this.firstTextNode(s);n?this.replaceWord(n,e):this.instance.insertHtml(e),this.updateValue(),this.setFocus()}setFocus(){this.focus$.next()}registerChangeListener(){this.onDataChangeListener=this.instance.on("change",()=>{this.onCkeditorChange$.next()})}hasTextNodeAsChild(e,i=!1){const s=e.getChildren().toArray();if(i)for(let n=s.length-1;n>=0;n--){const o=s[n];if(o.type===CKEDITOR.NODE_TEXT)return o;{const d=this.hasTextNodeAsChild(o);if(d)return d}}else for(const n of s){if(n.type===CKEDITOR.NODE_TEXT)return n;{const o=this.hasTextNodeAsChild(n);if(o)return o}}return null}mergeTextNodeAroundWithDirection(e,i=!1){const s=[];let n=e.getText(),o=e;for(;(o=i?o.getPrevious():o.getNext)&&o.type===CKEDITOR.NODE_TEXT&&!o.getText().charAt(i?o.getText().length-1:0).match(/[\s,;.:!?]/);)i?n=o.getText()+n:n+=o.getText(),s.push(o);s.length>0&&(e.setText(n),s.forEach(d=>d.remove()))}mergeTextNodeAround(e){return this.mergeTextNodeAroundWithDirection(e,!0),this.mergeTextNodeAroundWithDirection(e),e}firstNonEmptyTextNode(e,i=!1){let s=e;for(;s=i?s.getPrevious():s.getNext();){if(s.type!==CKEDITOR.NODE_TEXT)return s;if(""!==s.getText())return s}}trim(e){return e&&(e=e.replace(/[\u200b\u00A0]/g,"").trim()),e}extractFirstWord(e,i=!1){if(!e)return e;if(e.includes(" ")){const s=e.split(" ");return this.trim(s[i?s.length-1:0])}return this.trim(e)}firstTextNodeResult(e,i=!1,s=!1){const n=e.getText();if(this.trim(n)&&this.trim(n.substring(n.length-1))){const o=this.mergeTextNodeAround(e);return{textNode:o,firstNodeIsText:s,toReplace:this.extractFirstWord(o.getText(),i)}}return null}firstTextNodeWithDirection(e,i=!1){const s=e.startContainer;if(i&&s.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(s,i,!0);const n=s.type===CKEDITOR.NODE_TEXT?i&&this.firstNonEmptyTextNode(s,!0)||this.firstNonEmptyTextNode(s):s.getChildren().getItem(e.startOffset-1);if(n){if(n.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(n,i);let o=this.hasTextNodeAsChild(n,i);if(o)return this.firstTextNodeResult(o,i);for(o=n;o=i?o.getPrevious():o.getNext();){if(o.type===CKEDITOR.NODE_TEXT)return this.firstTextNodeResult(o,i);const d=this.hasTextNodeAsChild(o,i);if(d)return this.firstTextNodeResult(d,i)}}return null}firstTextNode(e){let i=this.firstTextNodeWithDirection(e,!0);return i||(i=this.firstTextNodeWithDirection(e)),i}replaceWord(e,i){const s=e.textNode.getText().lastIndexOf(e.toReplace);if(-1!==s){const n=e.textNode.getText().substring(0,s),o=e.textNode.getText().substring(s+e.toReplace.length);e.textNode.setText(n);const d=CKEDITOR.dom.element.createFromHtml(`<span>${CKEDITOR.tools.htmlDecode(CKEDITOR.tools.transformPlainTextToHtml(i,CKEDITOR.ENTER_BR))}</span>`);d.insertAfter(e.textNode),e.textNode.getText().substring(s+e.toReplace.length)&&new CKEDITOR.dom.text(o).insertAfter(d),this.instance.getSelection().selectElement(e.textNode);const M=this.instance.getSelection().getRanges()[0];M.setStartAfter(e.textNode),M.select()}}updateCkeditorInstanceValue(e){var i;this.instance?(null===(i=this.onDataChangeListener)||void 0===i||i.removeListener(),this.instance.setData(e,()=>{this.registerChangeListener()})):this.host.nativeElement.value=e}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(t.R0b),t.Y36(t.sBO),t.Y36(j))},r.\u0275cmp=t.Xpm({type:r,selectors:[["deja-editor"]],viewQuery:function(e,i){if(1&e&&t.Gf(J,7),2&e){let s;t.iGM(s=t.CRH())&&(i.host=s.first)}},inputs:{config:"config",readonly:"readonly",inline:"inline",debounce:"debounce",value:"value"},outputs:{change:"change",ready:"ready",blur:"blur",focus:"focus",disabled:"disabled"},features:[t._Bn([{provide:c.JU,useExisting:(0,t.Gpc)(()=>r),multi:!0}]),t.qOj,t.TTD],decls:2,vars:0,consts:[[2,"visibility","hidden",3,"onchange"],["host",""]],template:function(e,i){1&e&&(t.TgZ(0,"textarea",0,1),t.NdJ("onchange",function(){return i.textAreaChange()}),t.qZA())},styles:["deja-editor{line-height:normal}deja-editor .cke_textarea_inline>p{margin:0}deja-editor .cke_textarea_inline:focus{outline:none}\n"],encapsulation:2,changeDetection:0}),r})(),F=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[j],imports:[[f.ez]]}),r})(),K=0,L=(()=>{class r extends D.VG{constructor(e,i,s,n,o,d){super(o,s,n,i),this.editor=e,this.ngControl=i,this.hostElement=d,this.describedBy="",this.stateChanges=new y.x,this.controlType="app-editor",this._disabled=!1,this._uid="mat-input-"+K++,this._required=!1}get id(){return this._id}set id(e){this._id=e||this._uid}get required(){return this._required}set required(e){this._required=(0,u.Ig)(e)}get disabled(){var e;return null!==(null===(e=this.ngControl)||void 0===e?void 0:e.disabled)?this.ngControl.disabled:this._disabled}set disabled(e){this._disabled=(0,u.Ig)(e),this.focused&&(this.focused=!1,this.stateChanges.next())}onContainerClick(){this.editor.setFocus()}setDescribedByIds(e){this.describedBy=e.join(" ")}ngOnInit(){this.editor.focus.subscribe(()=>{this.focused=!0,this.stateChanges.next()}),this.editor.blur.subscribe(()=>{this.focused=!1,this.stateChanges.next()}),this.editor.change.subscribe(()=>{this.stateChanges.next()}),this.generatePlaceholder()}ngDoCheck(){this.ngControl&&this.updateErrorState()}ngOnDestroy(){this.stateChanges.complete()}get empty(){return!this.editor.value}get shouldLabelFloat(){return this.focused||!this.empty?(this.empty?this.attachPlaceholder():this.detachPlaceholder(),!0):(this.detachPlaceholder(),!1)}attachPlaceholder(){this._placeholder&&!this._placeholder.parentElement&&this.hostElement.nativeElement.appendChild(this._placeholder)}detachPlaceholder(){var e;(null===(e=this._placeholder)||void 0===e?void 0:e.parentElement)&&this._placeholder.remove()}generatePlaceholder(){if(this.placeholder){this._placeholder=document.createElement("div"),this._placeholder.style.position="absolute",this._placeholder.style.position="absolute",this._placeholder.style.left="0",this._placeholder.style.boxSizing="content-box",this._placeholder.style.width="100%",this._placeholder.style.height="100%",this._placeholder.style.overflow="hidden",this._placeholder.style.pointerEvents="none",this._placeholder.style.top="-0.84375em",this._placeholder.style.paddingTop="0.84375em";const e=document.createElement("div");e.style.color="rgba(0,0,0,0.54)",e.style.top="1.28125em",e.style.position="absolute";const i=document.createTextNode(this.placeholder);e.appendChild(i),this._placeholder.appendChild(e)}}}return r.\u0275fac=function(e){return new(e||r)(t.Y36(N,2),t.Y36(c.a5,10),t.Y36(c.F,8),t.Y36(c.sg,8),t.Y36(P.rD),t.Y36(t.SBq,1))},r.\u0275dir=t.lG2({type:r,selectors:[["deja-editor"]],hostVars:1,hostBindings:function(e,i){2&e&&t.uIk("aria-describedby",i.describedBy)},inputs:{placeholder:"placeholder",id:"id",required:"required",disabled:"disabled"},features:[t._Bn([{provide:g.Eo,useExisting:r}]),t.qOj]}),r})(),U=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({imports:[[F,g.lN]]}),r})();var $=l(3485),B=l(1402),H=l(1339);const W=["replaceEditor"];function Q(r,a){1&r&&(t.TgZ(0,"mat-card",5),t._UZ(1,"deja-markdown",6),t.qZA()),2&r&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/editor/readme.md"))}function k(r,a){if(1&r){const e=t.EpF();t.TgZ(0,"div")(1,"mat-card",7)(2,"mat-toolbar",8),t._uU(3,"Inline CKEditor with material skin"),t.qZA(),t.TgZ(4,"mat-card-content")(5,"div",9)(6,"div",10)(7,"h3"),t._uU(8,"Editor :"),t.qZA(),t.TgZ(9,"mat-form-field")(10,"deja-editor",11),t.NdJ("ngModelChange",function(s){return t.CHM(e),t.oxw().matText=s}),t.qZA()()(),t.TgZ(11,"div",10)(12,"h3"),t._uU(13,"Result :"),t.qZA(),t._UZ(14,"div",12),t.qZA()()()(),t.TgZ(15,"mat-card",7)(16,"mat-toolbar",8),t._uU(17,"Default CKEditor"),t.qZA(),t.TgZ(18,"mat-card-content")(19,"div",9)(20,"div",10)(21,"h3"),t._uU(22,"Editor :"),t.qZA(),t.TgZ(23,"deja-editor",13),t.NdJ("ngModelChange",function(s){return t.CHM(e),t.oxw().matText=s}),t.qZA()(),t.TgZ(24,"div",10)(25,"h3"),t._uU(26,"Result :"),t.qZA(),t._UZ(27,"div",12),t.qZA()()()(),t.TgZ(28,"mat-card",7)(29,"mat-toolbar",8),t._uU(30,"Replace"),t.qZA(),t.TgZ(31,"mat-card-content")(32,"div",9)(33,"div",10)(34,"h3"),t._uU(35,"Editor :"),t.qZA(),t._UZ(36,"deja-editor",14,15),t.qZA(),t.TgZ(38,"div",10)(39,"h3"),t._uU(40,"Actions :"),t.qZA(),t.TgZ(41,"div")(42,"mat-form-field")(43,"input",16),t.NdJ("ngModelChange",function(s){return t.CHM(e),t.oxw().replaceWith=s}),t.qZA()(),t.TgZ(44,"button",17),t.NdJ("click",function(){return t.CHM(e),t.oxw().replace()}),t._uU(45,"Replace"),t.qZA()()()()()()()}if(2&r){const e=t.oxw();t.xp6(10),t.Q6J("ngModel",e.matText)("config",e.editorConfig),t.xp6(4),t.Q6J("innerHTML",e.matText,t.oJD),t.xp6(9),t.Q6J("ngModel",e.matText)("config",e.editorConfig)("inline",!1),t.xp6(4),t.Q6J("innerHTML",e.matText,t.oJD),t.xp6(9),t.Q6J("config",e.editorConfig)("inline",!1),t.xp6(7),t.Q6J("ngModel",e.replaceWith)}}const X=B.Bz.forChild([{path:"",component:(()=>{class r{constructor(){this.tabIndex=1,this.editorConfig={}}ngOnInit(){this.matText="<b>Inline Editor</b> <ul><li>First item</li><li>Second item</li><ul>",this.editorConfig.extraPlugins="colorbutton,autogrow",this.editorConfig.on={instanceReady:function(){this.dataProcessor.writer.indentationChars="",this.dataProcessor.writer.lineBreakChars=""}},this.editorConfig.title="",this.editorConfig.disableNativeSpellChecker=!0,this.editorConfig.scayt_autoStartup=!0,this.editorConfig.scayt_sLang="fr_FR",this.editorConfig.wsc_lang="fr_FR",this.editorConfig.scayt_disableOptionsStorage="all",this.editorConfig.language="fr",this.editorConfig.enterMode=3,this.editorConfig.contentsCss=["assets/ckeditor/contents.css"],this.editorConfig.autoGrow_onStartup=!0,this.editorConfig.coreStyles_bold={element:"b",overrides:{strong:!0}},this.editorConfig.coreStyles_italic={element:"i",overrides:{em:!0}}}replace(){this.replaceEditor.replace(this.replaceWith)}}return r.\u0275fac=function(e){return new(e||r)},r.\u0275cmp=t.Xpm({type:r,selectors:[["deja-editor-demo"]],viewQuery:function(e,i){if(1&e&&t.Gf(W,5),2&e){let s;t.iGM(s=t.CRH())&&(i.replaceEditor=s.first)}},decls:5,vars:3,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["class","demo-card demo-basic",4,"ngIf"],[4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],[1,"demo-card"],["color","primary"],[1,"flexLayout"],[1,"flexAuto"],[3,"ngModel","config","ngModelChange"],[3,"innerHTML"],[1,"inline",3,"ngModel","config","inline","ngModelChange"],[1,"inline",3,"config","inline"],["replaceEditor",""],["matInput","",3,"ngModel","ngModelChange"],["mat-raised-button","",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(n){return i.tabIndex=n.index}),t._UZ(1,"mat-tab",1)(2,"mat-tab",2),t.qZA(),t.YNc(3,Q,2,1,"mat-card",3),t.YNc(4,k,46,10,"div",4)),2&e&&(t.Q6J("selectedIndex",i.tabIndex),t.xp6(3),t.Q6J("ngIf",0===i.tabIndex),t.xp6(1),t.Q6J("ngIf",1===i.tabIndex))},directives:[m.SP,m.uX,f.O5,p.a8,H.F,E.Ye,p.dn,g.KE,N,L,c.JJ,c.On,x.Nt,c.Fj,T.lW],styles:["[_nghost-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:90%}[_nghost-%COMP%]   deja-editor.inline[_ngcontent-%COMP%]{width:90%;display:block}[_nghost-%COMP%]   .flexLayout[_ngcontent-%COMP%]{display:flex}[_nghost-%COMP%]   .flexLayout[_ngcontent-%COMP%]   .flexAuto[_ngcontent-%COMP%]{flex:1 1 0}"]}),r})()},{path:"**",redirectTo:"",pathMatch:"full"}]);let z=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=t.oAB({type:r}),r.\u0275inj=t.cJS({providers:[],imports:[[f.ez,$.O,U,c.u5,T.ot,p.QW,g.lN,x.c,m.Nh,E.g0,X]]}),r})()}}]);