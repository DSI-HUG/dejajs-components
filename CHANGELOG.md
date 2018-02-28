<a name="2.25.0"></a>
# [2.25.0](https://github.com/DSI-HUG/dejajs-components/compare/2.18.1...2.25.0) (2018-02-28)


### Bug Fixes

* **BoldQuery:** Removed encapsulation ([96ca2b5](https://github.com/DSI-HUG/dejajs-components/commit/96ca2b5))
* **CloningService:** Cloning an array with an array instance of target ([e297fe1](https://github.com/DSI-HUG/dejajs-components/commit/e297fe1))
* **CloningService:** fixing an issue when cloning array into a target array ([e926e95](https://github.com/DSI-HUG/dejajs-components/commit/e926e95))
* **CloningService:** Improve test with new functions ([525e125](https://github.com/DSI-HUG/dejajs-components/commit/525e125))
* **CloningService:** Instance check fail if target is type ([68b5d6b](https://github.com/DSI-HUG/dejajs-components/commit/68b5d6b))
* **CloningService:** return a new instance of date if object is a date ([5544552](https://github.com/DSI-HUG/dejajs-components/commit/5544552))
* **ColorEvent:** The ColorEvent class become a IColorEvent interface to fix the CustomEvent implementation ([7f5179a](https://github.com/DSI-HUG/dejajs-components/commit/7f5179a))
* **ColorPicker:** Disabled style ([3217117](https://github.com/DSI-HUG/dejajs-components/commit/3217117))
* **ComboList:** Removed ComboList until unit test and standardization are done ([f6897e7](https://github.com/DSI-HUG/dejajs-components/commit/f6897e7))
* **DataGrid:** Fixed regression from AOT improvements ([e36f930](https://github.com/DSI-HUG/dejajs-components/commit/e36f930))
* **DatePicker:** conflicts with 2.18.6 ([361de34](https://github.com/DSI-HUG/dejajs-components/commit/361de34))
* **DatePicker:** consecutives blank lines ([a7f4190](https://github.com/DSI-HUG/dejajs-components/commit/a7f4190))
* **DatePicker:** fixed circular dependencies ([1901ec1](https://github.com/DSI-HUG/dejajs-components/commit/1901ec1))
* **DejaCancelableEvent:** The DejaCancelableEvent class become a IDejaCancelableEvent interface to fix the CustomEvent implementation ([0ac4f47](https://github.com/DSI-HUG/dejajs-components/commit/0ac4f47))
* **DejaChips:** The DejaChipsCloseEvent class become a IDejaChipsCloseEvent interface to fix the CustomEvent implementation ([c06ddb7](https://github.com/DSI-HUG/dejajs-components/commit/c06ddb7))
* **DejaColorPicker:** Fix change detection bug and add unit test ([2b60a13](https://github.com/DSI-HUG/dejajs-components/commit/2b60a13)), closes [#186](https://github.com/DSI-HUG/dejajs-components/issues/186)
* **DejaColorPicker:** Using angular/cdk/overlay to open the dropdown in the body ([0ee8b8a](https://github.com/DSI-HUG/dejajs-components/commit/0ee8b8a))
* **DejaDatePicker:** add weight to close button styling ([b3d9356](https://github.com/DSI-HUG/dejajs-components/commit/b3d9356))
* **DejaDatePicker:** Using angular/cdk/overlay to open the dropdown in the body ([e9fd7f7](https://github.com/DSI-HUG/dejajs-components/commit/e9fd7f7))
* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf))
* **DejaDatePickerComponent:** [#94](https://github.com/DSI-HUG/dejajs-components/issues/94) check mask on blur and make control invalid if mask isn't ok ([7c25cf7](https://github.com/DSI-HUG/dejajs-components/commit/7c25cf7))
* **DejaDatePickerComponent:** markForCheck() on close to avoid bug when close function isn't called by user action ([b5f1799](https://github.com/DSI-HUG/dejajs-components/commit/b5f1799))
* **DejaDatePickerComponent:** Use different way to call date and time change events. ([12295d0](https://github.com/DSI-HUG/dejajs-components/commit/12295d0))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d))
* **DejaGrid:** Fix Object-Object displayed in the cell content when the value field is undefined ([72f0b9a](https://github.com/DSI-HUG/dejajs-components/commit/72f0b9a))
* **DejaGrid:** Header bottom line style ([23fbe33](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33))
* **DejaGrid:** Wrong binding on function ([dbffc96](https://github.com/DSI-HUG/dejajs-components/commit/dbffc96))
* **DejaGridComponent:** calcColumnLayout on refresh method ([8b6f18c](https://github.com/DSI-HUG/dejajs-components/commit/8b6f18c))
* **DejaGridComponent:** Fix missing returned type for some function ([4cabf65](https://github.com/DSI-HUG/dejajs-components/commit/4cabf65)), closes [#286](https://github.com/DSI-HUG/dejajs-components/issues/286)
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11))
* **DejaIntervalSelectorBoundaryComponent:** protected access in template... ([7de6ede](https://github.com/DSI-HUG/dejajs-components/commit/7de6ede))
* **DejaIntervalSelectorComponent:** Access private member inside template ([8583d67](https://github.com/DSI-HUG/dejajs-components/commit/8583d67))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f0](https://github.com/DSI-HUG/dejajs-components/commit/fc173f0))
* **DejaItemComponent:** Because DejaItem is part of DejaSelect and DejaTreeList, the import must be by a module. DejaItemModule is created. ([0b4eb76](https://github.com/DSI-HUG/dejajs-components/commit/0b4eb76))
* **DejaMarkdown:** Fix color margin in code sample ([0279527](https://github.com/DSI-HUG/dejajs-components/commit/0279527))
* **DejaMenu:** Using angular/cdk/overlay to open the dropdown in the body ([9298fb6](https://github.com/DSI-HUG/dejajs-components/commit/9298fb6))
* **DejaMenuDemo:** Fix card alignments ([42619d0](https://github.com/DSI-HUG/dejajs-components/commit/42619d0))
* **DejaNumericStepperComponent:** add possibility to remove value and fix onChangeCallback out of range. ([20376c3](https://github.com/DSI-HUG/dejajs-components/commit/20376c3))
* **DejaNumericStepperComponent:** Fix button type + hide hint when max isn't set ([f45ec77](https://github.com/DSI-HUG/dejajs-components/commit/f45ec77))
* **DejaNumericStepperComponent:** Updated CSS to fit with material rc0 ([3f62108](https://github.com/DSI-HUG/dejajs-components/commit/3f62108))
* **DejaNumericStepperModule:** Export numericStepper component ([3af6735](https://github.com/DSI-HUG/dejajs-components/commit/3af6735))
* **DejaOverlay:** Avoid right click when overlay is open ([26bfc1f](https://github.com/DSI-HUG/dejajs-components/commit/26bfc1f))
* **DejaOverlay:** For display block for deja-menu-content ([55e8d7c](https://github.com/DSI-HUG/dejajs-components/commit/55e8d7c))
* **DejaOverlay:** Menu styling was broken ([bcb2483](https://github.com/DSI-HUG/dejajs-components/commit/bcb2483))
* **DejaOverlay:** Replacing class cdk-overlay-container with deja-overlay-container ([a86f130](https://github.com/DSI-HUG/dejajs-components/commit/a86f130))
* **DejaOverlayComponent:** only throw visibilityChanged if old value is different from new value ([607aa9f](https://github.com/DSI-HUG/dejajs-components/commit/607aa9f))
* **DejaOverlayComponent:** tooltip style conflict with overlay style ([b3f6e3f](https://github.com/DSI-HUG/dejajs-components/commit/b3f6e3f))
* **DejaPopup:** fix tabindex bug in demo app ([7a0b766](https://github.com/DSI-HUG/dejajs-components/commit/7a0b766))
* **DejaPopup:** lint fix ([6c7d488](https://github.com/DSI-HUG/dejajs-components/commit/6c7d488))
* **DejaPopupConfig:** config.data ([3870b52](https://github.com/DSI-HUG/dejajs-components/commit/3870b52))
* **DejaPopupConfig:** Remove config.data=this ([7ab0f6c](https://github.com/DSI-HUG/dejajs-components/commit/7ab0f6c))
* **DejaSelect:** Autocomplete clear model when text is changed DEJS-246 ([14efbbd](https://github.com/DSI-HUG/dejajs-components/commit/14efbbd))
* **DejaSelect:** Current item was not displayed in multiselect mode ([dee9974](https://github.com/DSI-HUG/dejajs-components/commit/dee9974))
* **DejaSelect:** Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666](https://github.com/DSI-HUG/dejajs-components/commit/e11e666))
* **DejaSelect:** Ensure selection when models setted after selected item (mode autocomplete and sele ([d18f939](https://github.com/DSI-HUG/dejajs-components/commit/d18f939))
* **DejaSelect:** Fix an issue where the render of the ViewPort can be sometimes incomplete. ([8dfc2ea](https://github.com/DSI-HUG/dejajs-components/commit/8dfc2ea))
* **DejaSelect:** Hide when an element is clicked ([6236f10](https://github.com/DSI-HUG/dejajs-components/commit/6236f10))
* **DejaSelect:** modelIsValue property can be defined for multiselect ([3d9c067](https://github.com/DSI-HUG/dejajs-components/commit/3d9c067))
* **DejaSelect:** modelIsValue property initialized to undefined and is determined by the first passed model ([bd7dc3c](https://github.com/DSI-HUG/dejajs-components/commit/bd7dc3c))
* **DejaSelect:** Removed useless dropdownContainerId input. ([f027f51](https://github.com/DSI-HUG/dejajs-components/commit/f027f51))
* **DejaSelect:** rxjs imports ([c0ca4ba](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba))
* **DejaSelect:** Using angular/cdk/overlay to open the dropdown in the body ([009723d](https://github.com/DSI-HUG/dejajs-components/commit/009723d))
* **DejaSelect:** Width regression from material rc0 migration ([6188733](https://github.com/DSI-HUG/dejajs-components/commit/6188733))
* **DejaSelectComponent:** Issues fixing find by unit test ([279f594](https://github.com/DSI-HUG/dejajs-components/commit/279f594))
* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02de](https://github.com/DSI-HUG/dejajs-components/commit/baa02de))
* **DejaSidenav:** Removed Angular FlexLayout ([5a5e0dc](https://github.com/DSI-HUG/dejajs-components/commit/5a5e0dc))
* **DejaSplitter:** Gutter size can be 0 ([3a989f5](https://github.com/DSI-HUG/dejajs-components/commit/3a989f5))
* **DejaTag:** Full width ([946dd4f](https://github.com/DSI-HUG/dejajs-components/commit/946dd4f))
* **DejaTag:** Full width ([9e94aec](https://github.com/DSI-HUG/dejajs-components/commit/9e94aec))
* **DejaTextMetricsService:** adjust text width with linux lower font ratio. ([3aa8f48](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f48))
* **DejaTextMetricsService:** improve text height calculation by taking in account white space separator ([41d360a](https://github.com/DSI-HUG/dejajs-components/commit/41d360a))
* **DejaTile:** Removed useless this in html ([ef9657c](https://github.com/DSI-HUG/dejajs-components/commit/ef9657c))
* **DejaTile:** Spinner position (Regression due to mateial spinner changes) ([5b77394](https://github.com/DSI-HUG/dejajs-components/commit/5b77394))
* **DejaTiles:** Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd))
* **DejaTiles:** Remove selection when tiles are empties ([55da608](https://github.com/DSI-HUG/dejajs-components/commit/55da608))
* **DejaTiles:** Tiles min with and min height cant't be 0 ([b4dc3cc](https://github.com/DSI-HUG/dejajs-components/commit/b4dc3cc))
* **DejaTilesComponent:** Fix a synchronization issue between tiles model and associated dictionary ([9712b18](https://github.com/DSI-HUG/dejajs-components/commit/9712b18))
* **DejaTilesComponent:** Fix crash if model is not defined ([41e2696](https://github.com/DSI-HUG/dejajs-components/commit/41e2696))
* **DejaTooltip:** Disabled on mobile ([215a3e6](https://github.com/DSI-HUG/dejajs-components/commit/215a3e6))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([2283414](https://github.com/DSI-HUG/dejajs-components/commit/2283414))
* **DejaTooltip:** Rxjs imports ([b44bef3](https://github.com/DSI-HUG/dejajs-components/commit/b44bef3))
* **DejaTooltip:** Using angular/cdk/overlay to open the dropdown in the body ([13c897d](https://github.com/DSI-HUG/dejajs-components/commit/13c897d))
* **DejaToolTip:** Hide timer on leave from 20ms to 100ms ([5025e58](https://github.com/DSI-HUG/dejajs-components/commit/5025e58))
* **DejaTreeList:** Ensure key code ([ed2c13e](https://github.com/DSI-HUG/dejajs-components/commit/ed2c13e))
* **DejaTreeList:** Fix limited depth ([7f19da3](https://github.com/DSI-HUG/dejajs-components/commit/7f19da3))
* **DejaTreeList:** Missing coercion on pageSize ([2423b86](https://github.com/DSI-HUG/dejajs-components/commit/2423b86))
* **DejaTreeList:** model was not updated on multiselect mode ([611aaea](https://github.com/DSI-HUG/dejajs-components/commit/611aaea))
* **DejaTreeList:** modelIsValue property can be defined for multiselect ([a2b9ade](https://github.com/DSI-HUG/dejajs-components/commit/a2b9ade))
* **DejaTreeList:** modelIsValue property initialized to undefined and is determined by the first passed model ([1facb7a](https://github.com/DSI-HUG/dejajs-components/commit/1facb7a))
* **DejaTreeList:** Selection can fail sometimes in multiselect mode. ([e630a4d](https://github.com/DSI-HUG/dejajs-components/commit/e630a4d))
* **DejaTreeLIst:** Allow 0 as model or item value ([d52e0a5](https://github.com/DSI-HUG/dejajs-components/commit/d52e0a5))
* **DejaTreeLIst:** Selection from autocomplete is now pushed on the query model of the treelist ([5778495](https://github.com/DSI-HUG/dejajs-components/commit/5778495))
* **DejaTreeListComponent:** Added missing coercion for minSearchlength and pageSize ([c978dda](https://github.com/DSI-HUG/dejajs-components/commit/c978dda))
* **DejaTreeListComponent:** DejaItemComponent was missing on the import ([f6f80d7](https://github.com/DSI-HUG/dejajs-components/commit/f6f80d7))
* **DejaTreeListComponent:** remove null value inside array of selected values ([da374f1](https://github.com/DSI-HUG/dejajs-components/commit/da374f1))
* **DejaTreeListComponent:** Selection on enter key can fail in single select mode. ([eb2c5d3](https://github.com/DSI-HUG/dejajs-components/commit/eb2c5d3))
* **DejaTreeListComponent:** Updated listElement get method to avoid error when getElementById doesn't work ([07aaee3](https://github.com/DSI-HUG/dejajs-components/commit/07aaee3))
* **DejaTreelistDemo:** Wrong borders ([a35a689](https://github.com/DSI-HUG/dejajs-components/commit/a35a689))
* **DejaViewPort:** Removed debug infos ([c7c7f29](https://github.com/DSI-HUG/dejajs-components/commit/c7c7f29))
* **DejaViewportComponent:** Improve buttons binding during lifecycle in button scrolling mode ([8949a4c](https://github.com/DSI-HUG/dejajs-components/commit/8949a4c))
* **DejaViewPortComponent:** Index error on test ([92274e9](https://github.com/DSI-HUG/dejajs-components/commit/92274e9))
* **DejaViewportService:** Prevent a possible infinite call of calcViewPort in fixed size mode ([bc3290b](https://github.com/DSI-HUG/dejajs-components/commit/bc3290b))
* **Demo:** Material10 Compatibility ([ba4131d](https://github.com/DSI-HUG/dejajs-components/commit/ba4131d))
* **DemoApp:** Demo style ([5f1cc9d](https://github.com/DSI-HUG/dejajs-components/commit/5f1cc9d))
* **DemoTiles:** Drag cursor is missing ([cfccdeb](https://github.com/DSI-HUG/dejajs-components/commit/cfccdeb))
* **Depencencies:** Fix dependencies management ([1b30f6d](https://github.com/DSI-HUG/dejajs-components/commit/1b30f6d))
* **Dependencies:** Fix dependencies management ([61cc9a5](https://github.com/DSI-HUG/dejajs-components/commit/61cc9a5))
* **Diacritics:** Remove crash when null or undefined was passed. ([60afeca](https://github.com/DSI-HUG/dejajs-components/commit/60afeca))
* **GlobaEventService:** Added unregister function ([9d890a3](https://github.com/DSI-HUG/dejajs-components/commit/9d890a3))
* **Global:** Correct noImplicitAny compile errors ([9351b03](https://github.com/DSI-HUG/dejajs-components/commit/9351b03))
* **Global:** Disable chromium autocomplete for all controls using an input, except the treelist where the binding is modified to use autocomplete ([718408f](https://github.com/DSI-HUG/dejajs-components/commit/718408f))
* **Global:** fix missing implementation for setDisabledState. ([335f3d6](https://github.com/DSI-HUG/dejajs-components/commit/335f3d6))
* **Global:** Ignore and remove .d.ts files ([6482521](https://github.com/DSI-HUG/dejajs-components/commit/6482521))
* **Global:** Ignore and remove .d.ts files ([b23644f](https://github.com/DSI-HUG/dejajs-components/commit/b23644f))
* **Global:** Material 11 Compatibility ([9d3a674](https://github.com/DSI-HUG/dejajs-components/commit/9d3a674))
* **Global:** Member access mandatory ([bded9b4](https://github.com/DSI-HUG/dejajs-components/commit/bded9b4))
* **Global:** Remove private access inside template to fix AOT build ([ccafaec](https://github.com/DSI-HUG/dejajs-components/commit/ccafaec))
* **Global:** rxjs imports ([409c780](https://github.com/DSI-HUG/dejajs-components/commit/409c780))
* **Global:** RxJs Imports ([4047f5d](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d))
* **Global:** RxJs Imports ([dd44574](https://github.com/DSI-HUG/dejajs-components/commit/dd44574))
* **Global:** RxJs Imports ([751fbeb](https://github.com/DSI-HUG/dejajs-components/commit/751fbeb))
* **Global:** Rxjs imports and indexation ([ca911d6](https://github.com/DSI-HUG/dejajs-components/commit/ca911d6))
* **Global:** Update theme selector ([2c4a52a](https://github.com/DSI-HUG/dejajs-components/commit/2c4a52a))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa5](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5))
* **ItemListService:** Ensure pre-selection from items object DEJS-256 ([7017720](https://github.com/DSI-HUG/dejajs-components/commit/7017720))
* **MenuDemo:** ContextMenu position ([91a6e5b](https://github.com/DSI-HUG/dejajs-components/commit/91a6e5b))
* **MonacoEditor:** Added typings for css-element-queries ([f98362e](https://github.com/DSI-HUG/dejajs-components/commit/f98362e))
* **MonacoEditor:** Removed css-media-queries dependency and use our ResizeListener instead ([e9b1b9a](https://github.com/DSI-HUG/dejajs-components/commit/e9b1b9a))
* **MonacoEditor:** Use Observables to avoid life cycle issues ([0e5752d](https://github.com/DSI-HUG/dejajs-components/commit/0e5752d))
* **MonacoEditorComponent:** Removed css-element-queries to fix the .d.ts compile error in prod ([0073d8e](https://github.com/DSI-HUG/dejajs-components/commit/0073d8e))
* **Select:** Material style ([b30ada7](https://github.com/DSI-HUG/dejajs-components/commit/b30ada7))
* **Sidenav:** Mobile compliance ([356490a](https://github.com/DSI-HUG/dejajs-components/commit/356490a))
* **Sidenav:** unused variable ([a96fdf9](https://github.com/DSI-HUG/dejajs-components/commit/a96fdf9))
* **Snackbar:** Snackbar internal layout ([32ab75d](https://github.com/DSI-HUG/dejajs-components/commit/32ab75d))
* **Snackbar:** Snackbar position ([82169b1](https://github.com/DSI-HUG/dejajs-components/commit/82169b1))
* **SortingServce:** Change compare method to static ([f7eefb1](https://github.com/DSI-HUG/dejajs-components/commit/f7eefb1))
* **SortingService:** Comparison of numbers was inverted. Improve null or undefined comparison. ([1e47e05](https://github.com/DSI-HUG/dejajs-components/commit/1e47e05))
* **SortingService:** Re-add test to check as a date when type date is specified inside SortInfo. ([8a945be](https://github.com/DSI-HUG/dejajs-components/commit/8a945be))
* **Tiles:** AOT Compilation ([4adecd9](https://github.com/DSI-HUG/dejajs-components/commit/4adecd9))
* **TilesComponent:** Work in push mode ([e800fd2](https://github.com/DSI-HUG/dejajs-components/commit/e800fd2))
* **ViewPortComponent:** Property items become models and another property items is added and representing an array of IViewPortItems. That allow to control the size of each items. ([bb11027](https://github.com/DSI-HUG/dejajs-components/commit/bb11027))
* **ViewportService:** Fix crash when treelist parent is collapsed and viewport mode is disabled ([c357192](https://github.com/DSI-HUG/dejajs-components/commit/c357192))
* **ViewPortService:** Clear items size when refresh with clearMeasuredSize is invoked ([4a3c9b5](https://github.com/DSI-HUG/dejajs-components/commit/4a3c9b5))
* **ViewPortService:** Fix the ViewPort calculation in autosize mode. The issue can make sometimes that the rendered viewport is too small comparing the size of the container. ([03a3050](https://github.com/DSI-HUG/dejajs-components/commit/03a3050))
* **ViewPortService:** Fix view port crash if not element. ([40d4e8c](https://github.com/DSI-HUG/dejajs-components/commit/40d4e8c))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba552](https://github.com/DSI-HUG/dejajs-components/commit/b5ba552))


### build

* **Dependencies:** Upgrade dependencies ([8608d42](https://github.com/DSI-HUG/dejajs-components/commit/8608d42)), closes [/github.com/angular/material2/blob/master/CHANGELOG.md#200-beta10](https://github.com//github.com/angular/material2/blob/master/CHANGELOG.md/issues/200-beta10)


### ci

* **Dependencies:** Change dependencies to PeerDependencies ([76e7ee8](https://github.com/DSI-HUG/dejajs-components/commit/76e7ee8))
* **Dependencies:** upgrade dependencies ([4aad8a1](https://github.com/DSI-HUG/dejajs-components/commit/4aad8a1))


### Code Refactoring

* **CloningService:** Remove deprecated functions ([5eee9b3](https://github.com/DSI-HUG/dejajs-components/commit/5eee9b3))
* **DejaCodeViewerComponent:** Removed DejaCodeViewerComponent to avoid prism.js dependency ([7b2dea8](https://github.com/DSI-HUG/dejajs-components/commit/7b2dea8))
* **DejaMarkdownComponent:** Removed DejaMarkdownComponent to avoid prism.js dependency ([a708a02](https://github.com/DSI-HUG/dejajs-components/commit/a708a02))
* **DejaMenuComponent:** DejaMenuComponent as DejaOverlayComponent ([fd1fea3](https://github.com/DSI-HUG/dejajs-components/commit/fd1fea3))
* **SendAction:** Removed SendAction from the lib ([62ec4b8](https://github.com/DSI-HUG/dejajs-components/commit/62ec4b8))


### Features

* **AutosizeTextArea:** deja-autosize is deprecated, use mat-autosize instead ([e795fd6](https://github.com/DSI-HUG/dejajs-components/commit/e795fd6))
* **DatePicker:** layout as a string ([235e0f3](https://github.com/DSI-HUG/dejajs-components/commit/235e0f3))
* **DatePicker:** time picker and time selector ([142b977](https://github.com/DSI-HUG/dejajs-components/commit/142b977))
* **DejaAutosizeTextAreaDirective:** Removed temporarily deprecated flag, until the material directive work correctly with reactive forms. ([#215](https://github.com/DSI-HUG/dejajs-components/issues/215)) ([0b88385](https://github.com/DSI-HUG/dejajs-components/commit/0b88385))
* **DejaBoldQueryComponent:** added new properties firstOccurenceOnly, firstOccurencePerWordOnly, atTheBeginningOfWordOnly, highlightClassName. ([3ccf5ca](https://github.com/DSI-HUG/dejajs-components/commit/3ccf5ca))
* **dejaComboList:** demo app ([6722ad2](https://github.com/DSI-HUG/dejajs-components/commit/6722ad2))
* **DejaComboList:** component ([adf60a5](https://github.com/DSI-HUG/dejajs-components/commit/adf60a5))
* **DejaComboList:** delete test ([85dbf34](https://github.com/DSI-HUG/dejajs-components/commit/85dbf34))
* **DejaComboList:** fix codebeat ([0d1ebc1](https://github.com/DSI-HUG/dejajs-components/commit/0d1ebc1))
* **DejaComboList:** fix license ([50643d9](https://github.com/DSI-HUG/dejajs-components/commit/50643d9))
* **DejaComboList:** setup ([3e820cb](https://github.com/DSI-HUG/dejajs-components/commit/3e820cb))
* **DejaComboList:** small fixes ([dec9f5b](https://github.com/DSI-HUG/dejajs-components/commit/dec9f5b))
* **DejaDatePickerComponent:** Add event onDateChange and onTimeChange ([f3fa96f](https://github.com/DSI-HUG/dejajs-components/commit/f3fa96f))
* **DejaGrid:** Add events when grouping or sorting are raised form the component ([d0d1e70](https://github.com/DSI-HUG/dejajs-components/commit/d0d1e70))
* **DejaGrid:** Deeo model for column name ([c67eae7](https://github.com/DSI-HUG/dejajs-components/commit/c67eae7))
* **DejaIntervalSelectorComponent:** component used to display lower and upper boundary for lower and upper value selection ([80e549e](https://github.com/DSI-HUG/dejajs-components/commit/80e549e))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d040](https://github.com/DSI-HUG/dejajs-components/commit/c23d040))
* **DejaMessageBoxComponent:** add showCloseIcon property in order to display a close icon at the top and on the right of the title bar. ([7867617](https://github.com/DSI-HUG/dejajs-components/commit/7867617))
* **DejaMonacoEditor:** autosize when parent is resizing + dynamicaly change language ([4e32ab0](https://github.com/DSI-HUG/dejajs-components/commit/4e32ab0))
* **DejaNumericStepperComponent:** NumericStepper ([030a26c](https://github.com/DSI-HUG/dejajs-components/commit/030a26c))
* **DejaPopup:** Draggable popup ([18b0d96](https://github.com/DSI-HUG/dejajs-components/commit/18b0d96))
* **DejaPopup:** enable custom TemplateRef ([64e8aa3](https://github.com/DSI-HUG/dejajs-components/commit/64e8aa3))
* **DejaPopup:** enable insert of templateRef in advanced popup ([25970c1](https://github.com/DSI-HUG/dejajs-components/commit/25970c1))
* **DejaSelectComponent:** support external error template ([f62c8cc](https://github.com/DSI-HUG/dejajs-components/commit/f62c8cc))
* **DejaTileComponent:** Ability to refresh the tile ([d1d40b5](https://github.com/DSI-HUG/dejajs-components/commit/d1d40b5))
* **DejaTiles:** Added event when refresh and binding is done ([6a90d78](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78))
* **DejaToolTip:** Accept also ng-content ([acd4ee3](https://github.com/DSI-HUG/dejajs-components/commit/acd4ee3))
* **DejaTreelist:** Deeo model for textField and valueField ([41e5e00](https://github.com/DSI-HUG/dejajs-components/commit/41e5e00))
* **DejaTreeListComponent:** Added e2e test ([17541bb](https://github.com/DSI-HUG/dejajs-components/commit/17541bb))
* **DropDownContainerService:** Added DropDownContainerService ([f016e55](https://github.com/DSI-HUG/dejajs-components/commit/f016e55))
* **GlobaEventService:** Added unit test ([eb4e7b1](https://github.com/DSI-HUG/dejajs-components/commit/eb4e7b1))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe45](https://github.com/DSI-HUG/dejajs-components/commit/9adbe45))
* **Global:** Material 11 compatibility ([1351371](https://github.com/DSI-HUG/dejajs-components/commit/1351371))
* **GroupingService:** Added unit test ([b5c3e1c](https://github.com/DSI-HUG/dejajs-components/commit/b5c3e1c))
* **ISortInfos:** Modified to match lodash sorting ([0727177](https://github.com/DSI-HUG/dejajs-components/commit/0727177))
* **ItemListBase:** Possibility to pass an array of items to RefreshViewPort ([7f71ec3](https://github.com/DSI-HUG/dejajs-components/commit/7f71ec3))
* **ItemListService:** Added default values: defaultChildrenField, defaultTextField and defaultValueField ([1fa39b5](https://github.com/DSI-HUG/dejajs-components/commit/1fa39b5))
* **MonacoEditor:** Added loaded event after first load ([662e569](https://github.com/DSI-HUG/dejajs-components/commit/662e569))
* **MonacoEditor:** Monaco editor service refactored for the new architecture ([c53cac4](https://github.com/DSI-HUG/dejajs-components/commit/c53cac4))
* **Popup:** Component injection ([bfdf0f1](https://github.com/DSI-HUG/dejajs-components/commit/bfdf0f1))
* **Popup:** DejaPopup ([b68e1ee](https://github.com/DSI-HUG/dejajs-components/commit/b68e1ee))
* **RangeComponent:** Add refresh function ([96723d4](https://github.com/DSI-HUG/dejajs-components/commit/96723d4))
* **Sidenav:** Add sidenav component ([424c64e](https://github.com/DSI-HUG/dejajs-components/commit/424c64e))
* **SideNav:** Add the possibility to specify the header's icon ([dd2432c](https://github.com/DSI-HUG/dejajs-components/commit/dd2432c))
* **SlimScroll:** Add slimScroll ([17ab898](https://github.com/DSI-HUG/dejajs-components/commit/17ab898))
* **SlimScroll:** Add slimScroll ([9287894](https://github.com/DSI-HUG/dejajs-components/commit/9287894))
* **SortingService:** Added unit test ([b54bd77](https://github.com/DSI-HUG/dejajs-components/commit/b54bd77))
* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d97](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d97))


### Reverts

* **DemoApp:** Revert updates on theme selector ([6e3434a](https://github.com/DSI-HUG/dejajs-components/commit/6e3434a))


### BREAKING CHANGES

* **MonacoEditor:** Copy Assets in package.json must be replaced by the following line in the .angular-cli.json/apps/assets section { "glob": "**/*", "input": "../node_modules/monaco-editor/min", "output": "./assets/monaco/" }
* **Dependencies:** Dependencies are now PeerDependencies. Please don't forget to import your own
@angular version into your package.json
* **DejaMarkdownComponent:** DejaMarkdownComponent is removed from the lib and is moved to the demo
* **DejaCodeViewerComponent:** DejaCodeViewerComponent is removed from the lib and is moved to the demo
* **DejaChips:** DejaChipsCloseEvent is now IDejaChipsCloseEvent in chips.component.ts. DejaChipsComponent raise event of type IDejaChipsCloseEvent
* **ColorEvent:** ColorEvent in color-event.ts is now IColorEvent in color-selector.component.ts. ColorSelector raise event of type IColorEvent
* **DejaCancelableEvent:** DejaCancelableEvent in cancelable-event.ts is now IDejaCancelableEvent in cancelable-event.interface.ts
* **SortingService:** deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.
* **ISortInfos:** name is mandatory and only a string and type is removed (Automatic detection of sorting type)
* **DejaTreeList:** Padding of the parent element can change. There is no more background gradient for
parent items

DEJS-221
* **SortingServce:** Sorting service compare method is now static
* **CloningService:** Deprecated functions removed
* **SendAction:** SendAction is removed from the lib
* **ViewPortComponent:** previous usage of the items input must be renamed to models
* **Dependencies:** angular material-beta-12 breaking changes, please check https://github.com/angular/material2/blob/2.0.0-beta.12/CHANGELOG.md
* **DejaMenuComponent:** DejaMenuComponent became DejaOverlayComponent
* **DejaSelect:** dropdownContainerId is removed just erase the input in your project. The dropdown container is now the body.
* **DejaDatePicker:** dropdownContainerId is removed and is now the body, dropdownAlignment and ownerAlignment are now defined with the input positions as the @angular/cdk/overlay input. Set showDropDown is removed and is replaced with the open and close methods.
* **DejaSelect:** dropdownContainerElement is removed and is now the body, dropdownAlignment is now defined with the input positions as the @angular/cdk/overlay input. For scss, container with id listcontainer is now a container with a class name deja-listcontainer inside the body.
* **DejaColorPicker:** dropdownContainerId is removed and is now the body, dropdownAlignment is now defined with the input positions as the @angular/cdk/overlay input.
* **DejaTooltip:** containerElement is removed and is now the body, tooltip-owner-alignment and tooltip-alignment are now defined with the input tooltip-positions as the @angular/cdk/overlay input.
* **DejaMenu:** dropdownContainerId is removed and is now the body, buttonAlignment and menuAlignment are now defined with the input positions as the @angular/cdk/overlay input.
* **Dependencies:** Upgraded to Material Beta 10. Breaking changes are listed here :
* **DejaItemComponent:** The one use the component <deja-item></deja-item> must add DejaItemModule of his component import



<a name="2.8.1"></a>
## [2.8.1](https://github.com/DSI-HUG/dejajs-components/compare/2.8.0...v2.8.1) (2017-08-31)


### Bug Fixes

* **CircularPicker:** Update for to for...of to remove tslint error ([ad23fc1](https://github.com/DSI-HUG/dejajs-components/commit/ad23fc1))
* **Cloning:** Clone date in array of date ([4dfd752](https://github.com/DSI-HUG/dejajs-components/commit/4dfd752))
* **DejaGrid:** Assign an empty array to the columns collection, clear columns and remove header component ([05c0b08](https://github.com/DSI-HUG/dejajs-components/commit/05c0b08))
* **DejaGrid:** Row observable was subscribed two times ([36f5118](https://github.com/DSI-HUG/dejajs-components/commit/36f5118))
* **DejaTag:** Remove flex layout into the component ([80dc051](https://github.com/DSI-HUG/dejajs-components/commit/80dc051))
* **Dependencies:** CDK Build error version ([2143623](https://github.com/DSI-HUG/dejajs-components/commit/2143623))
* **Global:** Build AOT part 1 ([73cfbe2](https://github.com/DSI-HUG/dejajs-components/commit/73cfbe2))
* **Global:** rxjs:5.4.3 ([f899fd5](https://github.com/DSI-HUG/dejajs-components/commit/f899fd5))
* **MaterialColor:** Removed circular dependency warnings ([57c9715](https://github.com/DSI-HUG/dejajs-components/commit/57c9715))
* **Select:** Remove autocomplete on select search input ([cc4ec9f](https://github.com/DSI-HUG/dejajs-components/commit/cc4ec9f))
* **Select:** Remove position relative on select ([e900d1b](https://github.com/DSI-HUG/dejajs-components/commit/e900d1b))


### Features

* **DejaGrid:** Map selectedModel, selectedModels and selectedItem to the internal tree list ([6ecac95](https://github.com/DSI-HUG/dejajs-components/commit/6ecac95))
* **DejaGridDemo:** Added pre-selection demo ([74a62d6](https://github.com/DSI-HUG/dejajs-components/commit/74a62d6))
* **DejaTag:** Add DejaTag component. ([b8228ce](https://github.com/DSI-HUG/dejajs-components/commit/b8228ce))


### BREAKING CHANGES

* **MaterialColor:** Static method MaterialColor.fromText is replaced with (new MaterialColors()).getColorFromText



<a name="2.6.0"></a>
# [2.6.0](https://github.com/DSI-HUG/dejajs-components/compare/2.5.0...v2.6.0) (2017-07-31)


* feat(DejaSelectComponent) : better support for reactive forms ([8873f62](https://github.com/DSI-HUG/dejajs-components/commit/8873f62))


### Bug Fixes

* **DejaSelect:** NgModel type same as set ([87627bf](https://github.com/DSI-HUG/dejajs-components/commit/87627bf))
* **DejaTreelist:** Treelist NgModel to the selected items same as the DejaSelect ([5874d2d](https://github.com/DSI-HUG/dejajs-components/commit/5874d2d))
* **SelectDemoComponent:** validator declaration ([16d6249](https://github.com/DSI-HUG/dejajs-components/commit/16d6249))
* **SelectDemoComponent validator:** license header ([b7247f1](https://github.com/DSI-HUG/dejajs-components/commit/b7247f1))


### BREAKING CHANGES

* selectedModel, selectedModels, formControlName:
The type of the value passed as input determines the output type: if input is null, deja-select returns a generic object.
* **DejaTreelist:** NgModel for treelist is now binded to the selection instead the list of items.
* **DejaSelect:** NgModel type same as set.



<a name="2.5.0"></a>
# [2.5.0](https://github.com/DSI-HUG/dejajs-components/compare/2.4.0...v2.5.0) (2017-07-20)


### Bug Fixes

* **DatePicker:** add DejaChildValidatorDirective to datepicker input to make it work with reactive forms ([3afe12b](https://github.com/DSI-HUG/dejajs-components/commit/3afe12b))
* **DatePicker:** button type  ([d3ebb3d](https://github.com/DSI-HUG/dejajs-components/commit/d3ebb3d))
* **DatePicker:** Fix reactive form implementation ([7b2a918](https://github.com/DSI-HUG/dejajs-components/commit/7b2a918))
* **DatePicker:** update icon font-size to 100% ([cfaa4e6](https://github.com/DSI-HUG/dejajs-components/commit/cfaa4e6))
* **flexLayout:** Add flexLayout import where it's needed ([d2c69ac](https://github.com/DSI-HUG/dejajs-components/commit/d2c69ac))
* **Global:** Update rxjs ([bbb5561](https://github.com/DSI-HUG/dejajs-components/commit/bbb5561))


### Features

* **DatePicker:** Add required attribute and mdError templating ([2482cc0](https://github.com/DSI-HUG/dejajs-components/commit/2482cc0))


### Performance Improvements

* **Dependencies:** Update all dependencies (Angular 4.3 & Ngrx 4) ([62d612a](https://github.com/DSI-HUG/dejajs-components/commit/62d612a))
* **Fonts:** Remove fonts from the libraries ([1b4e896](https://github.com/DSI-HUG/dejajs-components/commit/1b4e896))


### BREAKING CHANGES

* **Dependencies:** Now on Angular 4.3 and Ngrx 4
* **Fonts:** Fonts are now in the @deja-js/resources library. To import fonts in your project,
please add this lines in your main scss : @import '~@deja-js/resources/src/index.scss'; @include
deja-fonts();



<a name="2.3.3"></a>
## [2.3.3](https://github.com/DSI-HUG/dejajs-components/compare/2.3.2...v2.3.3) (2017-07-12)


### Bug Fixes

* **Demo:** add scrollbar to menu ([4bb3249](https://github.com/DSI-HUG/dejajs-components/commit/4bb3249))
* **DemoApp:** Fix datepicker demo ([4d9716b](https://github.com/DSI-HUG/dejajs-components/commit/4d9716b))
* **Grid:** Add debounce to calcColumnLayout ([00fa4c9](https://github.com/DSI-HUG/dejajs-components/commit/00fa4c9))


### Features

* **CloningService:** Clone with prototype using ObjectMapper ([53c3905](https://github.com/DSI-HUG/dejajs-components/commit/53c3905))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/DSI-HUG/dejajs-components/compare/2.2.2...v2.3.0) (2017-06-30)


### Bug Fixes

* **Dependencies:** Rollback cli version ([4dfd9cb](https://github.com/DSI-HUG/dejajs-components/commit/4dfd9cb))
* **Diacritics:** Fix locale dependencies ([3cee17f](https://github.com/DSI-HUG/dejajs-components/commit/3cee17f))
* **Diacritics:** Fix locale dependencies ([9fcd160](https://github.com/DSI-HUG/dejajs-components/commit/9fcd160))
* **Select:** Arrow overflowing ([dadfe22](https://github.com/DSI-HUG/dejajs-components/commit/dadfe22))
* **Select:** Arrow was not properly displayed in [multiselection][above] mode ([085a593](https://github.com/DSI-HUG/dejajs-components/commit/085a593))
* **Select:** Waiter z-index fix ([b3089bc](https://github.com/DSI-HUG/dejajs-components/commit/b3089bc))
* **Theme:** Remove customized color for input bar (not working also in invalid mode) ([ab2b56f](https://github.com/DSI-HUG/dejajs-components/commit/ab2b56f))
* **ViewPortService:** auto height calculation fix ([3b06a85](https://github.com/DSI-HUG/dejajs-components/commit/3b06a85))
* **ViewPortService:** Last item scrolling ([21da57d](https://github.com/DSI-HUG/dejajs-components/commit/21da57d))


### Features

* **DatePicker:** Keyboard updates are now according to format ([8d8bff7](https://github.com/DSI-HUG/dejajs-components/commit/8d8bff7))
* **Global:** Add warning if doctype is not set ([a993c54](https://github.com/DSI-HUG/dejajs-components/commit/a993c54))
* **ItemList:** push css class name ([d5cde9b](https://github.com/DSI-HUG/dejajs-components/commit/d5cde9b))
* **ItemService:** show waiter from external parent component ([6587e1f](https://github.com/DSI-HUG/dejajs-components/commit/6587e1f))
* **List:** toggleAll$ can have a collapsed parameter ([07190ba](https://github.com/DSI-HUG/dejajs-components/commit/07190ba))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/DSI-HUG/dejajs-components/compare/2.2.0...v2.2.1) (2017-06-14)


### Bug Fixes

* **Prism:** Bundle issue with Prism import ([014a1ee](https://github.com/DSI-HUG/dejajs-components/commit/014a1ee))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/DSI-HUG/dejajs-components/compare/2.1.1...v2.2.0) (2017-06-14)


### Bug Fixes

* **CircularPicker:** [#128](https://github.com/DSI-HUG/dejajs-components/issues/128) Make disabled property work ([2b1da72](https://github.com/DSI-HUG/dejajs-components/commit/2b1da72))
* **CircularPicker:** Use _value inside updateCursor instead of value ([be4fda2](https://github.com/DSI-HUG/dejajs-components/commit/be4fda2))
* **DatePicker:** [#110](https://github.com/DSI-HUG/dejajs-components/issues/110) I think it's ok, I hope it will not have any side effect ([2ad1a2e](https://github.com/DSI-HUG/dejajs-components/commit/2ad1a2e))
* **DejaDroppable:** Event leak ([8d60c78](https://github.com/DSI-HUG/dejajs-components/commit/8d60c78))
* **DejaGrid:** Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([e96fa7a](https://github.com/DSI-HUG/dejajs-components/commit/e96fa7a))
* **DejaGrid:** Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([528a0aa](https://github.com/DSI-HUG/dejajs-components/commit/528a0aa))
* **DejaGrid:** Laggy columns drag and drop ([3b163ea](https://github.com/DSI-HUG/dejajs-components/commit/3b163ea))
* **DejaGrid:** Scroll return to 0 when refreshViewPort() was called ([74bbdb8](https://github.com/DSI-HUG/dejajs-components/commit/74bbdb8))
* **DejaGrid:** Scroll return to 0 when refreshViewPort() was called ([612da55](https://github.com/DSI-HUG/dejajs-components/commit/612da55))
* **DejaSelect:** Parent items are not selectable with the mouse, even if the flag selectable is set to true ([6435809](https://github.com/DSI-HUG/dejajs-components/commit/6435809))
* **DejaSplitter:** Fix height of the gutter in horizontal mode ([92e1a4d](https://github.com/DSI-HUG/dejajs-components/commit/92e1a4d))
* **DejaTreeList:** Parent row padding when no-children ([a7dc91f](https://github.com/DSI-HUG/dejajs-components/commit/a7dc91f))
* **DejaTreeList:** Treelist border [#124](https://github.com/DSI-HUG/dejajs-components/issues/124) ([39ee8dc](https://github.com/DSI-HUG/dejajs-components/commit/39ee8dc))
* **Demo:** displayed datetime are now in 24h format. ([615b90e](https://github.com/DSI-HUG/dejajs-components/commit/615b90e))
* **Demo:** Fix imports in gris demo ([9eb2cc2](https://github.com/DSI-HUG/dejajs-components/commit/9eb2cc2))
* **Docs:** Add required dependencie for linux doc build ([38ad6eb](https://github.com/DSI-HUG/dejajs-components/commit/38ad6eb))
* **Graphics:** Double import make /graphics/ classes undefined when imported by the index ([d57bf52](https://github.com/DSI-HUG/dejajs-components/commit/d57bf52))
* **GroupingService:** Grouping fail after the third level ([d5696ea](https://github.com/DSI-HUG/dejajs-components/commit/d5696ea))
* **ItemListService:** Broken DejaTreeList and DejaGrid search area. ([e79be1b](https://github.com/DSI-HUG/dejajs-components/commit/e79be1b))
* **ItemListService:** Cache re-filtered on lazy loading ([3b0545b](https://github.com/DSI-HUG/dejajs-components/commit/3b0545b))


### Code Refactoring

* **MonacoEditor:** Clean code & comment ([c8c2188](https://github.com/DSI-HUG/dejajs-components/commit/c8c2188))


### Features

* **DateSelector:** [#96](https://github.com/DSI-HUG/dejajs-components/issues/96) Add disabled property ([e4db8a1](https://github.com/DSI-HUG/dejajs-components/commit/e4db8a1))
* **DejaGrid:** User grouping can be specified on the HTML ([5b56692](https://github.com/DSI-HUG/dejajs-components/commit/5b56692))
* **DejaMenu:** Context menu if buttonAlignment is not specified ([901ee4b](https://github.com/DSI-HUG/dejajs-components/commit/901ee4b))
* **DejaTreeList:** Selection by valueFiled as string is now possible ([f904991](https://github.com/DSI-HUG/dejajs-components/commit/f904991))
* **DEMO:** Add documentation link ([c1f145d](https://github.com/DSI-HUG/dejajs-components/commit/c1f145d))
* **Global:** Move Polyfills and SendAction to src folder to avoid missing files when linked ([02ea544](https://github.com/DSI-HUG/dejajs-components/commit/02ea544))


### BREAKING CHANGES

* **DejaTreeList:** To have the border, an import must be added on your SCSS file
@import '~@deja-js/component/scss/components/tree-list-borders';
* **MonacoEditor:** Remove class IEditorLanguage and IEditorTheme / Remove Input MonacoLibPath



<a name="2.0.3"></a>
## [2.0.3](https://github.com/DSI-HUG/dejajs-components/compare/2.0.2...v2.0.3) (2017-05-29)


### Bug Fixes

* **Packages:** Add reflect-metadata to package.json ([19992ea](https://github.com/DSI-HUG/dejajs-components/commit/19992ea))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/DSI-HUG/dejajs-components/compare/v2.0.1...v2.0.2) (2017-05-26)


### Bug Fixes

* **Build:** Add polyfills into the build ([677766a](https://github.com/DSI-HUG/dejajs-components/commit/677766a))
* **Global:** Update version during the build ([453472c](https://github.com/DSI-HUG/dejajs-components/commit/453472c))
* **Moment:** Update moment imports ([bd86f22](https://github.com/DSI-HUG/dejajs-components/commit/bd86f22))
* **Sorting:** Export SortOrder ([067c315](https://github.com/DSI-HUG/dejajs-components/commit/067c315))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/DSI-HUG/dejajs-components/compare/2.0.0...v2.0.1) (2017-05-24)


### Bug Fixes

* **DemoApp:** Fix redirect on Github Pages ([1bdbd35](https://github.com/DSI-HUG/dejajs-components/commit/1bdbd35))
* **DemoApp:** Logo path ([2c02059](https://github.com/DSI-HUG/dejajs-components/commit/2c02059))
* **DemoApp:** Move demo-app datas to assets/datas ([1bf04c0](https://github.com/DSI-HUG/dejajs-components/commit/1bf04c0))
* **Theming:** Import theming files during the build ([e2631b3](https://github.com/DSI-HUG/dejajs-components/commit/e2631b3))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/DSI-HUG/dejajs-components/compare/v2.0.0...2.0.0) (2017-05-24)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/DSI-HUG/dejajs-components/compare/1.9.1...v2.0.0) (2017-05-24)


### Bug Fixes

* **CircularPicker:** Better import ([116cc22](https://github.com/DSI-HUG/dejajs-components/commit/116cc22))
* **CLI:** Downgrad to typescript 2.2.2 to fix an incompatibility of cli compiler ([d72b26e](https://github.com/DSI-HUG/dejajs-components/commit/d72b26e))
* **ContentEditable:** Update module import ([b3ef56d](https://github.com/DSI-HUG/dejajs-components/commit/b3ef56d))
* **DejaChips:** Chips height aligned to material ([a4b6597](https://github.com/DSI-HUG/dejajs-components/commit/a4b6597))
* **DejaCircularPicker:** Add RXJS takeUntil operator ([bcf1325](https://github.com/DSI-HUG/dejajs-components/commit/bcf1325))
* **DejaClipboardService:** DejaClipboardService is now optional. DejaClipboardService must be provided on your app.module to get the full drag drop and copy/paste features of the components. ([fcd2c7b](https://github.com/DSI-HUG/dejajs-components/commit/fcd2c7b))
* **DejaCodeViewer:** replace require ([2018d8a](https://github.com/DSI-HUG/dejajs-components/commit/2018d8a))
* **DejaCodeViewer:** replace require ([807335d](https://github.com/DSI-HUG/dejajs-components/commit/807335d))
* **DejaColorPicker:** Added a filter on focus when enter is pressed ([70120b2](https://github.com/DSI-HUG/dejajs-components/commit/70120b2))
* **DejaMouseDragDropCursor:** Add RXJS delay operator ([3bce159](https://github.com/DSI-HUG/dejajs-components/commit/3bce159))
* **DejaSelect:** Synchronization between model and textField property when control is in a reactive form ([2ceb7cf](https://github.com/DSI-HUG/dejajs-components/commit/2ceb7cf))
* **DejaSelect:** Synchronization between model and textField property when control is in a reactive form ([333f9b4](https://github.com/DSI-HUG/dejajs-components/commit/333f9b4))
* **DejaTreeList:** Expand button removed ([5003698](https://github.com/DSI-HUG/dejajs-components/commit/5003698))
* **DejaTreeList:** Material Beta5 Compatibility Issue ([9daada1](https://github.com/DSI-HUG/dejajs-components/commit/9daada1))
* **DejaTreeList:** Material Beta5 Compatibility Issue ([f2a858a](https://github.com/DSI-HUG/dejajs-components/commit/f2a858a))
* **DejaTreeList:** Selection on parent ([32a28ee](https://github.com/DSI-HUG/dejajs-components/commit/32a28ee))
* **DemoApp:** Imports... ([9e23d46](https://github.com/DSI-HUG/dejajs-components/commit/9e23d46))
* **DropdownComponent:** Add RXJS delay operator ([528061d](https://github.com/DSI-HUG/dejajs-components/commit/528061d))
* **E2E:** E2E TS Compliant with typescript 2.2.2 ([8aa7f7a](https://github.com/DSI-HUG/dejajs-components/commit/8aa7f7a))
* **Global:** Add RXJS Operators ([d123fc4](https://github.com/DSI-HUG/dejajs-components/commit/d123fc4))
* **Global:** Better import ([784901c](https://github.com/DSI-HUG/dejajs-components/commit/784901c))
* **Global:** Better imports ([d323880](https://github.com/DSI-HUG/dejajs-components/commit/d323880))
* **Global:** Better imports ([ecd0689](https://github.com/DSI-HUG/dejajs-components/commit/ecd0689))
* **Global:** Better imports for compiler-cli compliance ([9db2894](https://github.com/DSI-HUG/dejajs-components/commit/9db2894))
* **Global:** Better imports for compiler-cli compliance ([0172c7a](https://github.com/DSI-HUG/dejajs-components/commit/0172c7a))
* **Global:** Better imports for compiler-cli compliance ([0a5ab13](https://github.com/DSI-HUG/dejajs-components/commit/0a5ab13))
* **Global:** Better imports for compiler-cli compliance ([f49030d](https://github.com/DSI-HUG/dejajs-components/commit/f49030d))
* **Global:** Better imports for compiler-cli compliance ([5cfdeb1](https://github.com/DSI-HUG/dejajs-components/commit/5cfdeb1))
* **Global:** Better imports for compiler-cli compliance ([a741545](https://github.com/DSI-HUG/dejajs-components/commit/a741545))
* **Global:** Better imports for compiler-cli compliance ([8b10385](https://github.com/DSI-HUG/dejajs-components/commit/8b10385))
* **Global:** Better imports for compiler-cli compliance ([70050e5](https://github.com/DSI-HUG/dejajs-components/commit/70050e5))
* **Global:** Better imports for compiler-cli compliance ([0edcd9a](https://github.com/DSI-HUG/dejajs-components/commit/0edcd9a))
* **Global:** Better imports for compiler-cli compliance ([a0ac331](https://github.com/DSI-HUG/dejajs-components/commit/a0ac331))
* **Global:** Compiler CLI compliance ([43346ee](https://github.com/DSI-HUG/dejajs-components/commit/43346ee))
* **Global:** Improve ClipboardService providing error and message ([c89e736](https://github.com/DSI-HUG/dejajs-components/commit/c89e736))
* **ItemListService:** Add if opperator ([45e8c52](https://github.com/DSI-HUG/dejajs-components/commit/45e8c52))
* **Lint:** Fix tslint warning ([cd79cf0](https://github.com/DSI-HUG/dejajs-components/commit/cd79cf0))
* **Lint:** Remove public rule ([bcc16ae](https://github.com/DSI-HUG/dejajs-components/commit/bcc16ae))
* **PendingOnFocusDirective:** Observable leak ([26dde51](https://github.com/DSI-HUG/dejajs-components/commit/26dde51))


### Code Refactoring

* **Global:** Better imports ([ad05bbf](https://github.com/DSI-HUG/dejajs-components/commit/ad05bbf))
* **Global:** Import modules inside index ([fa9500c](https://github.com/DSI-HUG/dejajs-components/commit/fa9500c))
* **Global:** Import modules inside index ([7707730](https://github.com/DSI-HUG/dejajs-components/commit/7707730))
* **Global:** Move to a bundle architecture (rollup & angular cli for demo app) ([88ec6e4](https://github.com/DSI-HUG/dejajs-components/commit/88ec6e4)), closes [#111](https://github.com/DSI-HUG/dejajs-components/issues/111)


### Features

* **DejaChip:** Added readonly and disabled properties ([a911757](https://github.com/DSI-HUG/dejajs-components/commit/a911757))
* **DejaChips:** DejaChips added for DejaSelect selected items in multiselect mode. ([fd1fe27](https://github.com/DSI-HUG/dejajs-components/commit/fd1fe27))
* **DejaCircularPicker:** Reactive form compatibility ([6574f5e](https://github.com/DSI-HUG/dejajs-components/commit/6574f5e))
* **DejaColorPicker:** Reactive from compatibility ([3a5b01a](https://github.com/DSI-HUG/dejajs-components/commit/3a5b01a))
* **DejaColorSelector:** Reactive form compatibility ([7625617](https://github.com/DSI-HUG/dejajs-components/commit/7625617))
* **DejaDatePicker:** Reactive form compatibility ([e92d5d7](https://github.com/DSI-HUG/dejajs-components/commit/e92d5d7))
* **DejaDateSelector:** Reactive form compatibility ([9fcf751](https://github.com/DSI-HUG/dejajs-components/commit/9fcf751))
* **DejaEditableDirective:** ReactiveForm compatibility ([67a1041](https://github.com/DSI-HUG/dejajs-components/commit/67a1041))
* **DejaGrid:** NgModel removed Compatibility ([6ba84c4](https://github.com/DSI-HUG/dejajs-components/commit/6ba84c4))
* **DejaSelect:** Added readonly property ([a95b298](https://github.com/DSI-HUG/dejajs-components/commit/a95b298))
* **DejaSelect:** Implement reactive form compatibility and ngModel propagation to child input ([d6d2455](https://github.com/DSI-HUG/dejajs-components/commit/d6d2455))
* **PendingOnFocusDirective:** Directive to mark as pending the input has focus for reactive form ([2aa214c](https://github.com/DSI-HUG/dejajs-components/commit/2aa214c))
* **ValidateOnBlurDirective:** Directive to validate input on blur instead on type for reactive form ([2e907c2](https://github.com/DSI-HUG/dejajs-components/commit/2e907c2))
* **ValidateOnBlurDirective:** Directive to validate input on blur instead on type for reactive form ([4e7b665](https://github.com/DSI-HUG/dejajs-components/commit/4e7b665))


### BREAKING CHANGES

* **Global:** Move all .module.ts files to index.ts
* **Global:** Removed all .modules.ts files
* **Global:** Removed all .module.ts files
* **Global:** Rename sort-infos into sort-infos.model
* **DejaTreeList:** DejaTreeList
* **DejaGrid:** NgModel removed, use [rows]="..." instead



