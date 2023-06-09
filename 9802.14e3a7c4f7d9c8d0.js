"use strict";(self.webpackChunkdejajs_component=self.webpackChunkdejajs_component||[]).push([[9802],{9802:(Y,v,a)=>{a.r(v),a.d(v,{MonacoEditorDemoModule:()=>q});var u=a(9808),l=a(3075),h=a(9224),O=a(7446),y=a(4107),m=a(3251),b=a(4594),E=a(1865),t=a(5e3),i=a(3191),x=a(9751),T=a(5698),w=a(4782),_=a(7579),I=a(8505),L=a(8372),g=a(2722),f=a(7916);function D(o,d){if(1&o){const e=t.EpF();t.ynx(0),t.TgZ(1,"monaco-editor-control",1),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.onValueChange(r))}),t.qZA(),t.BQk()}if(2&o){const e=d.ngIf,n=t.oxw();t.xp6(1),t.Q6J("options",n.options)("monacoEditorApi",e)("isDiffEditor",n.isDiffEditor)("editableValue",n.value)("readOnlyValue",n.valueToCompare)}}let A=(()=>{class o{constructor(e){this.monacoApi$=new x.y(n=>{const s=window,K=(document.getElementsByTagName("base")[0]||{}).href,M=s.MONACOEDITOR_BASEPATH||`${K}assets/monaco/vs`,S=()=>{s.require.config({paths:{vs:M}}),s.require(["vs/editor/editor.main"],()=>{e.run(()=>{n.next(s.monaco)})})};if(s.require||s.monaco)S();else{const c=document.createElement("script");c.type="text/javascript",c.src=`${M}/loader.js`,c.addEventListener("load",S),document.body.appendChild(c)}}).pipe((0,T.q)(1),(0,w.d)({bufferSize:1,refCount:!1}))}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(t.R0b))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),W=(()=>{class o extends f.yl{constructor(e){super(),this.elementRef=e,this.valueChange=new t.vpe,this.createEditor$=new _.x,console.log("MonacoEditorControlComponent constructor"),this.createEditor$.pipe((0,I.b)(()=>{this.editor=null}),(0,L.b)(100),(0,g.R)(this.destroyed$)).subscribe(()=>{const n=this.elementRef.nativeElement;this.clearElement(),this.editor=this.isDiffEditor?this.monacoEditorApi.editor.createDiffEditor(n,this.options):this.monacoEditorApi.editor.create(n,this.options),n.setAttribute("style",`height: ${n.parentElement.offsetHeight}px; width:100%;`);const s=this.monacoEditorApi.editor.createModel(this.editableValue,this.options.language);if(this.isDiffEditor){const p=this.monacoEditorApi.editor.createModel(this.readOnlyValue,this.options.language);this.editor.setModel({modified:s,original:p})}else this.editor.setModel(s);this.editableModelSub&&(this.editableModelSub.dispose(),delete this.editableModelSub),this.editableModelSub=s.onDidChangeContent(()=>{const p=this.editableModel.getValue();this._editableValue=p,this.valueChange.emit(p)})}),this.destroyed$.pipe().subscribe(()=>{this.editor&&this.editor.dispose(),this.clearElement(),this.editableModelSub&&this.editableModelSub.dispose()})}set options(e){JSON.stringify(this._options)!==JSON.stringify(e)&&(this._options=e,this.editor&&this.editor.updateOptions(this.options))}get options(){return this._options}set isDiffEditor(e){this._isDiffEditor!==e&&(this._isDiffEditor=(0,i.Ig)(e),this.createEditor$.next())}get isDiffEditor(){return this._isDiffEditor}set editableValue(e){if(this._editableValue!==e){this._editableValue=e;const n=this.editableModel;n&&n.setValue(this.editableValue)}}get editableValue(){return this._editableValue||""}set readOnlyValue(e){if(this._readOnlyValue!==e){this._readOnlyValue=e;const n=this.readOnlyModel;n&&n.setValue(this.readOnlyValue)}}get readOnlyValue(){return this._readOnlyValue||""}set monacoEditorApi(e){this._monacoEditorApi!==e&&(this._monacoEditorApi=e,this.createEditor$.next())}get monacoEditorApi(){return this._monacoEditorApi}get editableModel(){var e;const n=null===(e=this.editor)||void 0===e?void 0:e.getModel();return null!=n&&n.id?n:null==n?void 0:n.modified}get readOnlyModel(){var e;const n=null===(e=this.editor)||void 0===e?void 0:e.getModel();return null!=n&&n.id||null==n?void 0:n.original}onResize(){this.elementRef.nativeElement.firstChild.setAttribute("style","height: 100%; width: 100%;"),this.editor&&this.editor.layout()}ngOnInit(){this.createEditor$.next()}clearElement(){const e=this.elementRef.nativeElement;for(;e.hasChildNodes();)e.removeChild(e.firstChild)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(t.SBq))},o.\u0275cmp=t.Xpm({type:o,selectors:[["monaco-editor-control"]],hostBindings:function(e,n){1&e&&t.NdJ("resize",function(){return n.onResize()},!1,t.Jf7)},inputs:{options:"options",isDiffEditor:"isDiffEditor",editableValue:"editableValue",readOnlyValue:"readOnlyValue",monacoEditorApi:"monacoEditorApi"},outputs:{valueChange:"valueChange"},features:[t.qOj],decls:0,vars:0,template:function(e,n){},styles:["[_nghost-%COMP%]{width:100%;height:100%}"],changeDetection:0}),o})(),B=(()=>{class o{constructor(e,n){this.monacoEditorService=e,this.control=n,this.valueChange=new t.vpe,this.onTouchedCallback=()=>{},this.onChangeCallback=r=>{},this.options={automaticLayout:!0},this.control&&(this.control.valueAccessor=this)}set isDiffEditor(e){this._isDiffEditor=(0,i.Ig)(e)}get isDiffEditor(){return this._isDiffEditor}set experimentalScreenReader(e){this.updateOptions({experimentalScreenReader:(0,i.Ig)(e)})}get experimentalScreenReader(){return this.options.experimentalScreenReader}set ariaLabel(e){this.updateOptions({ariaLabel:e})}get ariaLabel(){return this.options.ariaLabel}set rulers(e){this.updateOptions({rulers:e})}get rulers(){return this.options.rulers}set wordSeparators(e){this.updateOptions({wordSeparators:e})}get wordSeparators(){return this.options.wordSeparators}set selectionClipboard(e){this.updateOptions({selectionClipboard:(0,i.Ig)(e)})}get selectionClipboard(){return this.options.selectionClipboard}set lineNumbers(e){this.updateOptions({lineNumbers:e})}get lineNumbers(){return this.options.lineNumbers}set selectOnLineNumbers(e){this.updateOptions({selectOnLineNumbers:(0,i.Ig)(e)})}get selectOnLineNumbers(){return this.options.selectOnLineNumbers}set lineNumbersMinChars(e){this.updateOptions({lineNumbersMinChars:(0,i.su)(e)})}get lineNumbersMinChars(){return this.options.lineNumbersMinChars}set glyphMargin(e){this.updateOptions({glyphMargin:(0,i.Ig)(e)})}get glyphMargin(){return this.options.glyphMargin}set lineDecorationsWidth(e){this.updateOptions({lineDecorationsWidth:(0,i.su)(e)})}get lineDecorationsWidth(){return this.options.lineDecorationsWidth}set revealHorizontalRightPadding(e){this.updateOptions({revealHorizontalRightPadding:(0,i.su)(e)})}get revealHorizontalRightPadding(){return this.options.revealHorizontalRightPadding}set roundedSelection(e){this.updateOptions({roundedSelection:(0,i.Ig)(e)})}get roundedSelection(){return this.options.roundedSelection}set theme(e){this.updateOptions({theme:e})}get theme(){return this.options.theme}set readOnly(e){this.updateOptions({readOnly:(0,i.Ig)(e)})}get readOnly(){return this.options.readOnly}set scrollbar(e){this.updateOptions({scrollbar:e})}get scrollbar(){return this.options.scrollbar}set fixedOverflowWidgets(e){this.updateOptions({fixedOverflowWidgets:(0,i.Ig)(e)})}get fixedOverflowWidgets(){return this.options.fixedOverflowWidgets}set overviewRulerLanes(e){this.updateOptions({overviewRulerLanes:(0,i.su)(e)})}get overviewRulerLanes(){return this.options.overviewRulerLanes}set cursorBlinking(e){this.updateOptions({cursorBlinking:e})}get cursorBlinking(){return this.options.cursorBlinking}set mouseWheelZoom(e){this.updateOptions({mouseWheelZoom:(0,i.Ig)(e)})}get mouseWheelZoom(){return this.options.mouseWheelZoom}set cursorStyle(e){this.updateOptions({cursorStyle:e})}get cursorStyle(){return this.options.cursorStyle}set fontLigatures(e){this.updateOptions({fontLigatures:(0,i.Ig)(e)})}get fontLigatures(){return this.options.fontLigatures}set disableTranslate3d(e){this.updateOptions({disableTranslate3d:(0,i.Ig)(e)})}get disableTranslate3d(){return this.options.disableTranslate3d}set disableMonospaceOptimizations(e){this.updateOptions({disableMonospaceOptimizations:(0,i.Ig)(e)})}get disableMonospaceOptimizations(){return this.options.disableMonospaceOptimizations}set hideCursorInOverviewRuler(e){this.updateOptions({hideCursorInOverviewRuler:(0,i.Ig)(e)})}get hideCursorInOverviewRuler(){return this.options.hideCursorInOverviewRuler}set scrollBeyondLastLine(e){this.updateOptions({scrollBeyondLastLine:(0,i.Ig)(e)})}get scrollBeyondLastLine(){return this.options.scrollBeyondLastLine}set automaticLayout(e){this.updateOptions({automaticLayout:(0,i.Ig)(e)})}get automaticLayout(){return this.options.automaticLayout}set wrappingColumn(e){this.updateOptions({wrappingColumn:(0,i.su)(e)})}get wrappingColumn(){return this.options.wrappingColumn}set wordWrap(e){this.updateOptions({wordWrap:(0,i.Ig)(e)})}get wordWrap(){return this.options.wordWrap}set wrappingIndent(e){this.updateOptions({wrappingIndent:e})}get wrappingIndent(){return this.options.wrappingIndent}set wordWrapBreakBeforeCharacters(e){this.updateOptions({wordWrapBreakBeforeCharacters:e})}get wordWrapBreakBeforeCharacters(){return this.options.wordWrapBreakBeforeCharacters}set wordWrapBreakAfterCharacters(e){this.updateOptions({wordWrapBreakAfterCharacters:e})}get wordWrapBreakAfterCharacters(){return this.options.wordWrapBreakAfterCharacters}set wordWrapBreakObtrusiveCharacters(e){this.updateOptions({wordWrapBreakObtrusiveCharacters:e})}get wordWrapBreakObtrusiveCharacters(){return this.options.wordWrapBreakObtrusiveCharacters}set stopRenderingLineAfter(e){this.updateOptions({stopRenderingLineAfter:(0,i.su)(e)})}get stopRenderingLineAfter(){return this.options.stopRenderingLineAfter}set hover(e){this.updateOptions({hover:(0,i.Ig)(e)})}get hover(){return this.options.hover}set contextmenu(e){this.updateOptions({contextmenu:(0,i.Ig)(e)})}get contextmenu(){return this.options.contextmenu}set mouseWheelScrollSensitivity(e){this.updateOptions({mouseWheelScrollSensitivity:(0,i.su)(e)})}get mouseWheelScrollSensitivity(){return this.options.mouseWheelScrollSensitivity}set quickSuggestions(e){this.updateOptions({quickSuggestions:(0,i.Ig)(e)})}get quickSuggestions(){return this.options.quickSuggestions}set quickSuggestionsDelay(e){this.updateOptions({quickSuggestionsDelay:(0,i.su)(e)})}get quickSuggestionsDelay(){return this.options.quickSuggestionsDelay}set parameterHints(e){this.updateOptions({parameterHints:(0,i.Ig)(e)})}get parameterHints(){return this.options.parameterHints}set iconsInSuggestions(e){this.updateOptions({iconsInSuggestions:(0,i.Ig)(e)})}get iconsInSuggestions(){return this.options.iconsInSuggestions}set autoClosingBrackets(e){this.updateOptions({autoClosingBrackets:(0,i.Ig)(e)})}get autoClosingBrackets(){return this.options.autoClosingBrackets}set formatOnType(e){this.updateOptions({formatOnType:(0,i.Ig)(e)})}get formatOnType(){return this.options.formatOnType}set formatOnPaste(e){this.updateOptions({formatOnPaste:(0,i.Ig)(e)})}get formatOnPaste(){return this.options.formatOnPaste}set suggestOnTriggerCharacters(e){this.updateOptions({suggestOnTriggerCharacters:(0,i.Ig)(e)})}get suggestOnTriggerCharacters(){return this.options.suggestOnTriggerCharacters}set acceptSuggestionOnEnter(e){this.updateOptions({acceptSuggestionOnEnter:(0,i.Ig)(e)})}get acceptSuggestionOnEnter(){return this.options.acceptSuggestionOnEnter}set acceptSuggestionOnCommitCharacter(e){this.updateOptions({acceptSuggestionOnCommitCharacter:(0,i.Ig)(e)})}get acceptSuggestionOnCommitCharacter(){return this.options.acceptSuggestionOnCommitCharacter}set snippetSuggestions(e){this.updateOptions({snippetSuggestions:e})}get snippetSuggestions(){return this.options.snippetSuggestions}set emptySelectionClipboard(e){this.updateOptions({emptySelectionClipboard:(0,i.Ig)(e)})}get emptySelectionClipboard(){return this.options.emptySelectionClipboard}set tabCompletion(e){this.updateOptions({tabCompletion:(0,i.Ig)(e)})}get tabCompletion(){return this.options.tabCompletion}set wordBasedSuggestions(e){this.updateOptions({wordBasedSuggestions:(0,i.Ig)(e)})}get wordBasedSuggestions(){return this.options.wordBasedSuggestions}set suggestFontSize(e){this.updateOptions({suggestFontSize:(0,i.su)(e)})}get suggestFontSize(){return this.options.suggestFontSize}set suggestLineHeight(e){this.updateOptions({suggestLineHeight:(0,i.su)(e)})}get suggestLineHeight(){return this.options.suggestLineHeight}set selectionHighlight(e){this.updateOptions({selectionHighlight:(0,i.Ig)(e)})}get selectionHighlight(){return this.options.selectionHighlight}set codeLens(e){this.updateOptions({codeLens:(0,i.Ig)(e)})}get codeLens(){return this.options.codeLens}set folding(e){this.updateOptions({folding:(0,i.Ig)(e)})}get folding(){return this.options.folding}set renderWhitespace(e){this.updateOptions({renderWhitespace:e})}get renderWhitespace(){return this.options.renderWhitespace}set renderControlCharacters(e){this.updateOptions({renderControlCharacters:(0,i.Ig)(e)})}get renderControlCharacters(){return this.options.renderControlCharacters}set renderIndentGuides(e){this.updateOptions({renderIndentGuides:(0,i.Ig)(e)})}get renderIndentGuides(){return this.options.renderIndentGuides}set renderLineHighlight(e){this.updateOptions({renderLineHighlight:e})}get renderLineHighlight(){return this.options.renderLineHighlight}set useTabStops(e){this.updateOptions({useTabStops:(0,i.Ig)(e)})}get useTabStops(){return this.options.useTabStops}set fontFamily(e){this.updateOptions({fontFamily:e})}get fontFamily(){return this.options.fontFamily}set fontWeight(e){this.updateOptions({fontWeight:e})}get fontWeight(){return this.options.fontWeight}set fontSize(e){this.updateOptions({fontSize:(0,i.su)(e)})}get fontSize(){return this.options.fontSize}set lineHeight(e){this.updateOptions({lineHeight:(0,i.su)(e)})}get lineHeight(){return this.options.lineHeight}set language(e){this.updateOptions({language:e})}get language(){return this.options.language}set value(e){this._value=e}get value(){return this._value}set valueToCompare(e){this._valueToCompare=e}get valueToCompare(){return this._valueToCompare}updateOptions(e){this.options=Object.assign(Object.assign({},this.options),e)}onValueChange(e){this.value=e,this.valueChange.next(e)}writeValue(e){this.value=e}registerOnChange(e){this.onChangeCallback=e}registerOnTouched(e){this.onTouchedCallback=e}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(A),t.Y36(l.a5,10))},o.\u0275cmp=t.Xpm({type:o,selectors:[["monaco-editor"]],inputs:{isDiffEditor:"isDiffEditor",experimentalScreenReader:"experimentalScreenReader",ariaLabel:"ariaLabel",rulers:"rulers",wordSeparators:"wordSeparators",selectionClipboard:"selectionClipboard",lineNumbers:"lineNumbers",selectOnLineNumbers:"selectOnLineNumbers",lineNumbersMinChars:"lineNumbersMinChars",glyphMargin:"glyphMargin",lineDecorationsWidth:"lineDecorationsWidth",revealHorizontalRightPadding:"revealHorizontalRightPadding",roundedSelection:"roundedSelection",theme:"theme",readOnly:"readOnly",scrollbar:"scrollbar",fixedOverflowWidgets:"fixedOverflowWidgets",overviewRulerLanes:"overviewRulerLanes",cursorBlinking:"cursorBlinking",mouseWheelZoom:"mouseWheelZoom",cursorStyle:"cursorStyle",fontLigatures:"fontLigatures",disableTranslate3d:"disableTranslate3d",disableMonospaceOptimizations:"disableMonospaceOptimizations",hideCursorInOverviewRuler:"hideCursorInOverviewRuler",scrollBeyondLastLine:"scrollBeyondLastLine",automaticLayout:"automaticLayout",wrappingColumn:"wrappingColumn",wordWrap:"wordWrap",wrappingIndent:"wrappingIndent",wordWrapBreakBeforeCharacters:"wordWrapBreakBeforeCharacters",wordWrapBreakAfterCharacters:"wordWrapBreakAfterCharacters",wordWrapBreakObtrusiveCharacters:"wordWrapBreakObtrusiveCharacters",stopRenderingLineAfter:"stopRenderingLineAfter",hover:"hover",contextmenu:"contextmenu",mouseWheelScrollSensitivity:"mouseWheelScrollSensitivity",quickSuggestions:"quickSuggestions",quickSuggestionsDelay:"quickSuggestionsDelay",parameterHints:"parameterHints",iconsInSuggestions:"iconsInSuggestions",autoClosingBrackets:"autoClosingBrackets",formatOnType:"formatOnType",formatOnPaste:"formatOnPaste",suggestOnTriggerCharacters:"suggestOnTriggerCharacters",acceptSuggestionOnEnter:"acceptSuggestionOnEnter",acceptSuggestionOnCommitCharacter:"acceptSuggestionOnCommitCharacter",snippetSuggestions:"snippetSuggestions",emptySelectionClipboard:"emptySelectionClipboard",tabCompletion:"tabCompletion",wordBasedSuggestions:"wordBasedSuggestions",suggestFontSize:"suggestFontSize",suggestLineHeight:"suggestLineHeight",selectionHighlight:"selectionHighlight",codeLens:"codeLens",folding:"folding",renderWhitespace:"renderWhitespace",renderControlCharacters:"renderControlCharacters",renderIndentGuides:"renderIndentGuides",renderLineHighlight:"renderLineHighlight",useTabStops:"useTabStops",fontFamily:"fontFamily",fontWeight:"fontWeight",fontSize:"fontSize",lineHeight:"lineHeight",language:"language",value:"value",valueToCompare:"valueToCompare"},outputs:{valueChange:"valueChange"},decls:2,vars:3,consts:[[4,"ngIf"],[3,"options","monacoEditorApi","isDiffEditor","editableValue","readOnlyValue","valueChange"]],template:function(e,n){1&e&&(t.YNc(0,D,2,5,"ng-container",0),t.ALo(1,"async")),2&e&&t.Q6J("ngIf",t.lcZ(1,1,n.monacoEditorService.monacoApi$))},dependencies:[u.O5,W,u.Ov],styles:["monaco-editor{width:100%;display:flex;flex:1 1 auto}monaco-editor monaco-editor-control{flex:1 1 auto}\n"],encapsulation:2,changeDetection:0}),o})(),Z=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.ez,l.u5,f.vf]}),o})(),H=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.ez,l.u5,Z]}),o})();var C=a(2193),R=a(3485),N=a(4004),j=a(520);let J=(()=>{class o{constructor(e){this.httpClient=e}getFile$(e){return this.httpClient.get(`assets/datas/monaco/${e}`,{observe:"body",responseType:"text"}).pipe((0,N.U)(n=>n))}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(j.eN))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var z=a(1339),F=a(7322),k=a(508);function V(o,d){1&o&&(t.TgZ(0,"mat-card",7),t._UZ(1,"deja-markdown",8),t.qZA()),2&o&&(t.xp6(1),t.Q6J("url","https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/projects/deja-js/component/monaco-editor/readme.md"))}function G(o,d){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"mat-card",7)(2,"mat-toolbar",9),t._uU(3," Modification d'un fichier XML "),t._UZ(4,"span",10),t.TgZ(5,"mat-checkbox",11),t.NdJ("ngModelChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.readOnly=r)}),t._uU(6,"Read only"),t.qZA()(),t.TgZ(7,"mat-card-content")(8,"div",12)(9,"monaco-editor",13),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.xmlContent=r)})("valueChange",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.onValueChange())}),t.qZA()()()(),t.TgZ(10,"mat-card",7)(11,"mat-toolbar",9),t._uU(12,"Comparaison d'un fichier XML"),t.qZA(),t.TgZ(13,"mat-card-content")(14,"div",12)(15,"monaco-editor",14),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.xmlContent=r)})("valueChange",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.onValueToCompareChange())}),t.qZA()()()(),t.TgZ(16,"mat-card",7)(17,"mat-toolbar",9),t._uU(18,"Modification d'un fichier JSON"),t.qZA(),t.TgZ(19,"mat-card-content")(20,"div",12)(21,"monaco-editor",15),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.jsonContent=r)}),t.qZA()()()(),t.TgZ(22,"mat-card",7)(23,"mat-toolbar",9),t._uU(24,"Comparaison d'un fichier JSON"),t.qZA(),t.TgZ(25,"mat-card-content")(26,"div",12)(27,"monaco-editor",16),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.jsonContent=r)}),t.qZA()()()()()}if(2&o){const e=t.oxw();t.xp6(5),t.Q6J("ngModel",e.readOnly),t.xp6(4),t.Q6J("value",e.xmlContent)("readOnly",e.readOnly)("folding",!0),t.xp6(6),t.Q6J("value",e.xmlContent)("valueToCompare",e.xmlContentToCompare)("isDiffEditor",!0)("folding",!0),t.xp6(6),t.Q6J("value",e.jsonContent)("folding",!0),t.xp6(6),t.Q6J("value",e.jsonContent)("valueToCompare",e.jsonContentToCompare)("isDiffEditor",!0)("folding",!0)}}function P(o,d){if(1&o&&(t.TgZ(0,"form",17)(1,"mat-card",7)(2,"mat-toolbar",9),t._uU(3,"Modification d'un fichier JSON via Reactive Form"),t.qZA(),t.TgZ(4,"mat-card-content")(5,"div",12),t._UZ(6,"monaco-editor",18),t.qZA()()()()),2&o){const e=t.oxw();t.Q6J("formGroup",e.jsonContentForm),t.xp6(6),t.Q6J("folding",!0)}}function Q(o,d){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"mat-card",7)(2,"mat-toolbar",9),t._uU(3," Resize auto "),t.qZA(),t.TgZ(4,"mat-card-content",19)(5,"deja-splitter",20)(6,"split-area",21)(7,"deja-splitter",22)(8,"split-area",21)(9,"monaco-editor",23),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.xmlContent=r)})("valueChange",function(){t.CHM(e);const r=t.oxw();return t.KtG(r.onValueChange())}),t.qZA()(),t.TgZ(10,"split-area")(11,"p"),t._uU(12,"Sed ut perspiciatis unde omnis iste natus erro..."),t.qZA()()()(),t.TgZ(13,"split-area")(14,"p"),t._uU(15,"Sed ut perspiciatis unde omnis iste natus erro..."),t.qZA()()()()(),t.TgZ(16,"mat-card",7)(17,"mat-toolbar",9),t._uU(18," Modification du text et du language "),t.qZA(),t.TgZ(19,"mat-card-content")(20,"mat-form-field")(21,"mat-select",24),t.NdJ("ngModelChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.updateLanguage(r))}),t.TgZ(22,"mat-option",25),t._uU(23,"XML"),t.qZA(),t.TgZ(24,"mat-option",26),t._uU(25,"JSON"),t.qZA()()(),t.TgZ(26,"div",12)(27,"monaco-editor",27),t.NdJ("valueChange",function(r){t.CHM(e);const s=t.oxw();return t.KtG(s.dynamicContent=r)}),t.qZA()()()()()}if(2&o){const e=t.oxw();t.xp6(6),t.Q6J("size",75),t.xp6(2),t.Q6J("size",75),t.xp6(1),t.Q6J("value",e.xmlContent)("readOnly",e.readOnly)("folding",!0),t.xp6(12),t.Q6J("ngModel",e.dynamicLanguage),t.xp6(6),t.Q6J("value",e.dynamicContent)("folding",!0)("language",e.dynamicLanguage)}}const $=[{path:"",component:(()=>{class o extends f.yl{constructor(e){super(),this.fileService=e,this.tabIndex=1,this.readOnly=!1}ngOnInit(){this.fileService.getFile$("xmlFile.xml").pipe((0,g.R)(this.destroyed$)).subscribe(e=>this.xmlContent=e),this.fileService.getFile$("xmlFileToCompare.xml").pipe((0,g.R)(this.destroyed$)).subscribe(e=>this.xmlContentToCompare=e),this.fileService.getFile$("jsonFile.json").pipe((0,g.R)(this.destroyed$)).subscribe(e=>{this.jsonContent=e,this.jsonContentForm=new l.cw({query:new l.NI(e)})}),this.fileService.getFile$("jsonFileToCompare.json").pipe((0,g.R)(this.destroyed$)).subscribe(e=>this.jsonContentToCompare=e),this.updateLanguage("xml")}onValueChange(){}onValueToCompareChange(){}updateLanguage(e){"json"===e?(this.dynamicLanguage=e,this.dynamicContent=this.jsonContent):(this.dynamicLanguage="xml",this.dynamicContent=this.xmlContent)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(J))},o.\u0275cmp=t.Xpm({type:o,selectors:[["monaco-editor-demo"]],features:[t.qOj],decls:9,vars:5,consts:[[3,"selectedIndex","selectedTabChange"],["label","API REFERENCE"],["label","EXAMPLES"],["label","AUTO RESIZE"],["class","demo-card demo-basic",4,"ngIf"],[4,"ngIf"],[3,"formGroup",4,"ngIf"],[1,"demo-card","demo-basic"],[3,"url"],["color","primary"],["flex",""],[3,"ngModel","ngModelChange"],[1,"viewer"],["language","xml","theme","vs",3,"value","readOnly","folding","valueChange"],["language","xml",3,"value","valueToCompare","isDiffEditor","folding","valueChange"],["language","json",3,"value","folding","valueChange"],["language","json",3,"value","valueToCompare","isDiffEditor","folding","valueChange"],[3,"formGroup"],["formControlName","query","language","json",3,"folding"],[2,"height","500px"],["direction","vertical"],[3,"size"],["direction","horizontal"],["language","xml","theme","vs",2,"height","100%",3,"value","readOnly","folding","valueChange"],["placeholder","Language",3,"ngModel","ngModelChange"],["value","xml"],["value","json"],[3,"value","folding","language","valueChange"]],template:function(e,n){1&e&&(t.TgZ(0,"mat-tab-group",0),t.NdJ("selectedTabChange",function(s){return n.tabIndex=s.index}),t._uU(1,"> "),t._UZ(2,"mat-tab",1)(3,"mat-tab",2)(4,"mat-tab",3),t.qZA(),t.YNc(5,V,2,1,"mat-card",4),t.YNc(6,G,28,14,"div",5),t.YNc(7,P,7,2,"form",6),t.YNc(8,Q,28,9,"div",5)),2&e&&(t.Q6J("selectedIndex",n.tabIndex),t.xp6(5),t.Q6J("ngIf",0===n.tabIndex),t.xp6(1),t.Q6J("ngIf",1===n.tabIndex),t.xp6(1),t.Q6J("ngIf",n.jsonContentForm),t.xp6(1),t.Q6J("ngIf",2===n.tabIndex))},dependencies:[u.O5,z.F,C.tX,C.zE,l._Y,l.JJ,l.JL,l.On,h.a8,h.dn,O.oG,F.KE,y.gD,k.ey,m.SP,m.uX,b.Ye,B,l.sg,l.u],styles:["[_nghost-%COMP%]   .viewer[_ngcontent-%COMP%]{height:500px;display:flex;flex:1 1 100%}[_nghost-%COMP%]   .viewer[_ngcontent-%COMP%]   monaco-editor[_ngcontent-%COMP%]{display:flex;flex:1 1 100%}[_nghost-%COMP%]   span[flex][_ngcontent-%COMP%]{flex:1 1 auto}"]}),o})()}];let q=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[u.ez,R.O,C.dp,l.u5,h.QW,O.p9,y.LD,m.Nh,b.g0,H,l.UX,E.Bz.forChild($)]}),o})()}}]);