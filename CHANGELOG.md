#### 3.0.1 (2018-02-23)

##### BREAKING CHANGES

* **SendAction:** Removed SendAction from the lib ([62ec4b8f](https://github.com/DSI-HUG/dejajs-components/commit/62ec4b8f81e4963921c65ae79fbce7f7d992f8a6))
    => SendAction is removed from the lib

* **DejaMarkdownComponent:** Removed DejaMarkdownComponent to avoid prism.js dependency ([a708a02a](https://github.com/DSI-HUG/dejajs-components/commit/a708a02ad930ea3af87640b42ec93f0e9a7a43b6))
    => DejaMarkdownComponent is removed from the lib and is moved to the demo

* **DejaCodeViewerComponent:** Removed DejaCodeViewerComponent to avoid prism.js dependency ([7b2dea8b](https://github.com/DSI-HUG/dejajs-components/commit/7b2dea8bef6a6e97d6e31d272edd5067ff78b632))
    => DejaCodeViewerComponent is removed from the lib and is moved to the demo

* **DejaChips:** The DejaChipsCloseEvent class become a IDejaChipsCloseEvent interface to fix the CustomEvent implementation ([c06ddb76](https://github.com/DSI-HUG/dejajs-components/commit/c06ddb76ec5fea8e49e447d64b57a309af9209b9))
    => DejaChipsCloseEvent is now IDejaChipsCloseEvent in chips.component.ts. DejaChipsComponent raise event of type IDejaChipsCloseEvent

* **ColorEvent:** The ColorEvent class become a IColorEvent interface to fix the CustomEvent implementation ([7f5179ae](https://github.com/DSI-HUG/dejajs-components/commit/7f5179ae3698023fb9d67477134aeee5872e6545))
    => ColorEvent in color-event.ts is now IColorEvent in color-selector.component.ts. ColorSelector raise event of type IColorEvent

* **DejaCancelableEvent:** The DejaCancelableEvent class become a IDejaCancelableEvent interface to fix the CustomEvent implementation ([0ac4f473](https://github.com/DSI-HUG/dejajs-components/commit/0ac4f473dd8e9a4683ab2f68f58aaca311f5b22c))
    => DejaCancelableEvent in cancelable-event.ts is now IDejaCancelableEvent in cancelable-event.interface.ts

* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d971](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d971612d93bff0c3a97b2f2723e4ce787f4c))
    => deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.

* **ISortInfos:** Modified to match lodash sorting ([07271772](https://github.com/DSI-HUG/dejajs-components/commit/07271772ddf2554f582988fed162e78d06568c69))
    => name is mandatory and only a string and type is removed (Automatic detection of sorting type)

* **DejaTreeList:** Fix limited depth ([7f19da35](https://github.com/DSI-HUG/dejajs-components/commit/7f19da35906d035b617c49492c8afebd7b437a94))
    => Fix limited padding depth to 4 and remove background gradient for parent items

Padding of the parent element can change. There is no more background gradient for
parent items

DEJS-221


##### Build System / Dependencies

* **Sonar:** Add sonar configuration ([66fc8010](https://github.com/DSI-HUG/dejajs-components/commit/66fc8010bcb6a034e235e6fec6d342c30cb37711))

##### Chores

* **Dependencies:** Get RXJS from Angular CLI ([fbd0596b](https://github.com/DSI-HUG/dejajs-components/commit/fbd0596b2fe0567c22c51bfc19675217aca0150f))

##### Continuous Integration

* **Dependencies:**
  * upgrade dependencies ([98ff0d20](https://github.com/DSI-HUG/dejajs-components/commit/98ff0d20350f4d21379d9bb4b3a92da8579ad0a9))
  * upgrade dependencies ([d89174cb](https://github.com/DSI-HUG/dejajs-components/commit/d89174cbde226068eb06bd266bc974159cd65180))
* **Travis:**
  * Add DSI Slack notifications ([00b64915](https://github.com/DSI-HUG/dejajs-components/commit/00b649157cff7cc8279ab534b680946d35e8ef40))
  * Add DSI Slack notifications ([e73a8b68](https://github.com/DSI-HUG/dejajs-components/commit/e73a8b689304dab83499104b03af2cbbc9bff144))

##### Documentation Changes

* **Popup:** demo app ([88f8c6a6](https://github.com/DSI-HUG/dejajs-components/commit/88f8c6a6e7de4a9e8fbc395161a5173cefd1b942))

##### New Features

* **DejaPopup:**
  * Draggable popup ([18b0d968](https://github.com/DSI-HUG/dejajs-components/commit/18b0d968a027c26a56f856765452275586c7c48e))
  * enable insert of templateRef in advanced popup ([25970c1f](https://github.com/DSI-HUG/dejajs-components/commit/25970c1fde38eca3f049842dbaaa11ccbca47812))
  * enable custom TemplateRef ([64e8aa38](https://github.com/DSI-HUG/dejajs-components/commit/64e8aa38e10b9425e251a6828e4515220dfb3816))
* **DejaComboList:**
  * fix codebeat ([0d1ebc19](https://github.com/DSI-HUG/dejajs-components/commit/0d1ebc198978dd25ff86132a81bd65119b73cf94))
  * delete test ([85dbf34e](https://github.com/DSI-HUG/dejajs-components/commit/85dbf34e6690df8b9ec048ec51f7c342e8ecb2e2))
  * fix license ([50643d91](https://github.com/DSI-HUG/dejajs-components/commit/50643d91e608e3cd2993ce567f476b7a9a7f35f9))
  * small fixes ([dec9f5b0](https://github.com/DSI-HUG/dejajs-components/commit/dec9f5b01640fa74e25f37d40504f05c7a38579a))
  * component ([adf60a50](https://github.com/DSI-HUG/dejajs-components/commit/adf60a505749d8075b467e5e5895346d33a12df0))
  * setup ([3e820cbd](https://github.com/DSI-HUG/dejajs-components/commit/3e820cbdb05f68ff85c062ae63c2be16f23cdb79))
* **dejaComboList:** demo app ([6722ad2f](https://github.com/DSI-HUG/dejajs-components/commit/6722ad2f098b74da5164278a765cc493d81a606a))
* **DejaIntervalSelectorComponent:** component used to display lower and upper boundary for lower and upper value selection ([80e549ec](https://github.com/DSI-HUG/dejajs-components/commit/80e549ec99290d9b3c9c8cb444736f75e9ab4666))
* **DejaMonacoEditor:** autosize when parent is resizing + dynamicaly change language ([4e32ab03](https://github.com/DSI-HUG/dejajs-components/commit/4e32ab03600404c4a4bb427d898cfcefb2007221))
* **Popup:**
  * Component injection ([bfdf0f13](https://github.com/DSI-HUG/dejajs-components/commit/bfdf0f1353ab54467b8000585858b90865334dbc))
  * DejaPopup ([b68e1ee5](https://github.com/DSI-HUG/dejajs-components/commit/b68e1ee54bf4375c23fd0c57cb9361b1944a522c))
* **DejaGrid:** Add events when grouping or sorting are raised form the component ([d0d1e706](https://github.com/DSI-HUG/dejajs-components/commit/d0d1e706dc8212b906e10dac9cc10e8e5a55e647))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe458](https://github.com/DSI-HUG/dejajs-components/commit/9adbe4589c493e1078a564b835485baf48afa2d5))
* **DejaTiles:** Added event when refresh and binding is done ([6a90d78e](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78ed9bb9107e59bcec42ecb062701ba1844))
* **DejaMessageBoxComponent:** add showCloseIcon property in order to display a close icon at the top and on the right of the title bar. ([7867617a](https://github.com/DSI-HUG/dejajs-components/commit/7867617a4a9fe9323c477cea9c0f33d8a62cdd42))
* **DejaDatePickerComponent:** Add event onDateChange and onTimeChange ([f3fa96f3](https://github.com/DSI-HUG/dejajs-components/commit/f3fa96f31c86b1dc4cf12e46891783c53c1305cb))
* **DejaBoldQueryComponent:** added new properties firstOccurenceOnly, firstOccurencePerWordOnly, atTheBeginningOfWordOnly, highlightClassName. ([3ccf5caa](https://github.com/DSI-HUG/dejajs-components/commit/3ccf5caa1a8382d1a295c4d9323128b568509b85))
* **DatePicker:**
  * layout as a string ([235e0f37](https://github.com/DSI-HUG/dejajs-components/commit/235e0f376236030b430ddff710ea4be77083828a))
  * time picker and time selector ([142b977b](https://github.com/DSI-HUG/dejajs-components/commit/142b977b5e9a9d3aa041bdc53027eea0a43909df))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d0405](https://github.com/DSI-HUG/dejajs-components/commit/c23d0405125f3d0af17a50fcae8901fb73de3f3b))

##### Bug Fixes

* **DejaTooltip:**
  * Rxjs imports ([b44bef39](https://github.com/DSI-HUG/dejajs-components/commit/b44bef394c58208b5e6882193ab29f493232ce8e))
  * Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
* **MonacoEditor:**
  * Removed css-media-queries dependency and use our ResizeListener instead ([e9b1b9aa](https://github.com/DSI-HUG/dejajs-components/commit/e9b1b9aab971bc5f1b9d92998b94f3397ab14fdd))
  * Added typings for css-element-queries ([f98362e4](https://github.com/DSI-HUG/dejajs-components/commit/f98362e40576cd314771a213610817fc29569284))
* **Global:**
  * Rxjs imports and indexation ([ca911d6c](https://github.com/DSI-HUG/dejajs-components/commit/ca911d6c8e8819e8133db33eeff5f8f6b2a3bd08))
  * fix missing implementation for setDisabledState. ([335f3d6d](https://github.com/DSI-HUG/dejajs-components/commit/335f3d6d4e15eb26cfc731ed84f4bf17c064ebe6))
  * Correct noImplicitAny compile errors ([9351b036](https://github.com/DSI-HUG/dejajs-components/commit/9351b03653231693311f85c642cb14aae47b551b))
  * rxjs imports ([409c7808](https://github.com/DSI-HUG/dejajs-components/commit/409c78089e43fe06e9b64ac6cf908591d28e6eb4))
  * RxJs Imports ([751fbebe](https://github.com/DSI-HUG/dejajs-components/commit/751fbebe16ae2488129c8fcbb1c00e374841cbdc))
  * RxJs Imports ([dd445747](https://github.com/DSI-HUG/dejajs-components/commit/dd445747d8e333428d62e24328f3a10bb0318633))
  * RxJs Imports ([4047f5d2](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d2074b3f608644b1255e47af969cb417a1))
* **MonacoEditorComponent:** Removed css-element-queries to fix the .d.ts compile error in prod ([0073d8e9](https://github.com/DSI-HUG/dejajs-components/commit/0073d8e9821d220f5822de8aacd0cea3dee15054))
* **DejaGrid:**
  * Fix Object-Object displayed in the cell content when the value field is undefined ([72f0b9a3](https://github.com/DSI-HUG/dejajs-components/commit/72f0b9a364196caddbd71ea988acd27c9cfcc919))
  * Header bottom line style ([23fbe33c](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33c6604e1db68bc468a49cce612e1164662))
* **DejaNumericStepperModule:** Export numericStepper component ([3af6735a](https://github.com/DSI-HUG/dejajs-components/commit/3af6735ab37a7bcaf84d1a80ac8e968aeb805641))
* **DejaPopup:**
  * fix tabindex bug in demo app ([7a0b7665](https://github.com/DSI-HUG/dejajs-components/commit/7a0b7665e96dfbc8cfda1b077b9ab55a38c4b0c8))
  * lint fix ([6c7d4887](https://github.com/DSI-HUG/dejajs-components/commit/6c7d4887e69a4799fbf95fbe93d77e7c72cc60b5))
* **DejaPopupConfig:**
  * config.data ([3870b52f](https://github.com/DSI-HUG/dejajs-components/commit/3870b52fe54a8c41dd00b78451f683476facbb7d))
  * Remove config.data=this ([7ab0f6ca](https://github.com/DSI-HUG/dejajs-components/commit/7ab0f6caa8e4a5e1ca9b8c7af41afa011c727277))
* **DejaIntervalSelectorBoundaryComponent:** protected access in template... ([7de6edec](https://github.com/DSI-HUG/dejajs-components/commit/7de6edec0d8400b55e2c82d6442b6cc193e5c58f))
* **DejaIntervalSelectorComponent:** Access private member inside template ([8583d67b](https://github.com/DSI-HUG/dejajs-components/commit/8583d67b09e3e80415c6fb7870cdc22c79fea530))
* **Dependencies:** Fix dependencies management ([61cc9a59](https://github.com/DSI-HUG/dejajs-components/commit/61cc9a5991e8a6dea27b257389e86a458f072c8b))
* **Depencencies:** Fix dependencies management ([1b30f6d9](https://github.com/DSI-HUG/dejajs-components/commit/1b30f6d93289d15d28c8c7ce943ed8f19b63ea46))
* **DejaSidenav:** Removed Angular FlexLayout ([5a5e0dc4](https://github.com/DSI-HUG/dejajs-components/commit/5a5e0dc488049018b87e3c17ae6e06884809f9fd))
* **DejaDatePickerComponent:**
  * Use different way to call date and time change events. ([12295d03](https://github.com/DSI-HUG/dejajs-components/commit/12295d03c0bbe3fd13983b1f4520094743ea9409))
  * #94 check mask on blur and make control invalid if mask isn't ok ([7c25cf70](https://github.com/DSI-HUG/dejajs-components/commit/7c25cf70cf9264aa8345270f94e1edb704f2d5c9))
* **DejaGridComponent:** Fix missing returned type for some function ([4cabf658](https://github.com/DSI-HUG/dejajs-components/commit/4cabf658c9cc0fb748c2361a1d0017b1b898a78a))
* **DejaSelectComponent:**
  * Selection for empty or null key object in reactiveForm ([baa02deb](https://github.com/DSI-HUG/dejajs-components/commit/baa02debc5e07fe7a7960c9667e130b47e75d373))
  * Issues fixing find by unit test ([279f5942](https://github.com/DSI-HUG/dejajs-components/commit/279f59420783ca4b7c4513aa6860fc4c97157850))
* **DejaTextMetricsService:**
  * improve text height calculation by taking in account white space separator ([41d360a5](https://github.com/DSI-HUG/dejajs-components/commit/41d360a559d19c409df980f1433251111e5fb2e2))
  * adjust text width with linux lower font ratio. ([3aa8f485](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f485295d574ec8076f85d1d1e542d57402bf))
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11b](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11b16ceecd3dcb2fccf9c0263cb335e5818))
* **DejaTilesComponent:**
  * Fix crash if model is not defined ([41e26968](https://github.com/DSI-HUG/dejajs-components/commit/41e269680996450f4dc6c44c2d66532b588df411))
  * Fix a synchronization issue between tiles model and associated dictionary ([9712b189](https://github.com/DSI-HUG/dejajs-components/commit/9712b189872eae6ca5fce4a01e38513b9507e018))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa53](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5334435b2d75362299835aa00761ebd1b1))
* **DejaTiles:**
  * Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd7](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd7d33fb4c6c1a58cb29cb775de4d2ca1cb))
  * Remove selection when tiles are empties ([55da6084](https://github.com/DSI-HUG/dejajs-components/commit/55da6084a9b331e51a4887abe901c8fc1f101c43))
* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf9](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf960e129d9d6fd5ecdbc4e6eb3d5fc0e6d))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d9](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d95bde9463c3e662897716d48a7b7c7ac4))
* **DejaTile:**
  * Removed useless this in html ([ef9657ca](https://github.com/DSI-HUG/dejajs-components/commit/ef9657ca45856177b81cdfb41319fbcbeda6a25f))
  * Spinner position (Regression due to mateial spinner changes) ([5b773940](https://github.com/DSI-HUG/dejajs-components/commit/5b773940dc7f0def46ff8997fc51ababb02c879e))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba5520](https://github.com/DSI-HUG/dejajs-components/commit/b5ba5520025c62febb3910142cdc39add74f8c53))
* **DejaSelect:**
  * Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666b](https://github.com/DSI-HUG/dejajs-components/commit/e11e666bdfa0b0e8a7bdb369bb1f56f305091b0f))
  * rxjs imports ([c0ca4ba9](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba911bed823fc152d939da889618cb1ce0e))
  * Hide when an element is clicked ([6236f108](https://github.com/DSI-HUG/dejajs-components/commit/6236f108d4fe175dc3ced30e08fbcf53863a64b8))
  * Autocomplete clear model when text is changed DEJS-246 ([14efbbde](https://github.com/DSI-HUG/dejajs-components/commit/14efbbde2140745ea1e62f5163645d908f63255d))
  * Width regression from material rc0 migration ([6188733f](https://github.com/DSI-HUG/dejajs-components/commit/6188733fe54d2913a13b9c5990534ca40dbfcf1a))
* **DejaNumericStepperComponent:** add possibility to remove value and fix onChangeCallback out of range. ([20376c3d](https://github.com/DSI-HUG/dejajs-components/commit/20376c3dd90597839c1a0bb38c11e99776cf14f7))
* **DatePicker:**
  * conflicts with 2.18.6 ([361de340](https://github.com/DSI-HUG/dejajs-components/commit/361de340e0c7eec131f102ceb58187af71209d95))
  * consecutives blank lines ([a7f41908](https://github.com/DSI-HUG/dejajs-components/commit/a7f4190841f84c467af188dfbc41f7fc59693d7a))
  * fixed circular dependencies ([1901ec17](https://github.com/DSI-HUG/dejajs-components/commit/1901ec170db4ac834b24da251fc0cbf1aa95f0c4))
* **DemoTiles:** Drag cursor is missing ([cfccdeba](https://github.com/DSI-HUG/dejajs-components/commit/cfccdeba2c523676bb1c820f5b4244a4c00cb86e))
* **ColorPicker:** Disabled style ([3217117d](https://github.com/DSI-HUG/dejajs-components/commit/3217117d656dec93eef8c38e82b9e1ee827df23c))
* **SortingService:** Re-add test to check as a date when type date is specified inside SortInfo. ([8a945be7](https://github.com/DSI-HUG/dejajs-components/commit/8a945be78c5aa00857fffdc1feb69a668f494821))
* **ItemListService:** Ensure pre-selection from items object DEJS-256 ([70177209](https://github.com/DSI-HUG/dejajs-components/commit/70177209bac03daa97d4a2340b26661dc6b98b7a))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f00](https://github.com/DSI-HUG/dejajs-components/commit/fc173f00b5e80abbff31ef87c8cad2f20d89c9f5))

##### Refactors

* **tsconfig:** Updated tsconfig for the new structure ([b8e6ffa6](https://github.com/DSI-HUG/dejajs-components/commit/b8e6ffa6462d532315c4c3afb6f5162830be6569))
* **Demo:** Moved demo into demo folder ([dc950869](https://github.com/DSI-HUG/dejajs-components/commit/dc9508698c0f2b907bb1c3a460e8047de3d21dec))
* **Global:** Splitting demo and lib ([694baef5](https://github.com/DSI-HUG/dejajs-components/commit/694baef59d052c98ceb0e2d98d914d000277fcb9))
* **DejaPopup:**
  * readme and temaplate variables in component ([eb06d19e](https://github.com/DSI-HUG/dejajs-components/commit/eb06d19e8fd7aa6f3b93a8b9991bb888bf0f79bf))
  * delete property isModal ([ef634308](https://github.com/DSI-HUG/dejajs-components/commit/ef634308839b9da62dad92ccd3de66586823d56e))
  * merge config properties content and aContent ([0fe020be](https://github.com/DSI-HUG/dejajs-components/commit/0fe020beac1fc276b9eb51f8d8fb35be7cf42324))
  * removing unused code ([55aecdbe](https://github.com/DSI-HUG/dejajs-components/commit/55aecdbe4d1933c9a608cd55173a152b9a930328))
* **Popup:**
  * added license ([6b26d421](https://github.com/DSI-HUG/dejajs-components/commit/6b26d421e66fddac58d3c4b3ffd60b0c185d0544))
  * added license ([6303235d](https://github.com/DSI-HUG/dejajs-components/commit/6303235d9164c4c72f73cf04e95355289be51743))
  * added license ([248bba4a](https://github.com/DSI-HUG/dejajs-components/commit/248bba4a8d1052ba3c2a074c8445a12fe8d10c04))
  * scss global style in his own file ([735795a3](https://github.com/DSI-HUG/dejajs-components/commit/735795a3b5d66cc307fed5d510151ed939839d56))
* **DejaGrid:** Fix Lint errors and change signature observeViewPort$ ([1fad0139](https://github.com/DSI-HUG/dejajs-components/commit/1fad0139a05d9f6aa76b335170818c09bf7ea167))
* **DatePicker:**
  * check removed for layout classname in template ([04ac3db0](https://github.com/DSI-HUG/dejajs-components/commit/04ac3db07a6eea318fe3e91d30406dfdaad65e9d))
  * cleanup after time picker ([1c5d7c2d](https://github.com/DSI-HUG/dejajs-components/commit/1c5d7c2d931de27282ca88f531201a14464e2d46))

##### Code Style Changes

* **NumericStepperComponent:** Use change instead of blur + add tabIndex=-1 on buttons to remove tabs focus + use class.off-limits instead of ng-class ([f7769870](https://github.com/DSI-HUG/dejajs-components/commit/f776987060b093fde2c2ed8dcb1daeb11ad72ec3))

##### Tests

* **DejaOverlay:** Improve unit test ([e02a3b1c](https://github.com/DSI-HUG/dejajs-components/commit/e02a3b1cb262f07a69b51aa573de3678f3f10d9d))
* **accordion e2e:** Fix noImplicitAny compilation ([049c236a](https://github.com/DSI-HUG/dejajs-components/commit/049c236a1ff50e64eac20cce8ee79bcc88b76902))
* **CodeViewer:** Added unit test ([684056b4](https://github.com/DSI-HUG/dejajs-components/commit/684056b4a26960dd0fd80d34da56cdedd5717d01))
* **DejaTextMetricsService:** test. ([574076de](https://github.com/DSI-HUG/dejajs-components/commit/574076de47fbdf9e4454c943eae0a5221a7905f5))
* **CloningService:** Added unit lodash test to compare with the previous cloning service test ([19c88289](https://github.com/DSI-HUG/dejajs-components/commit/19c88289a25a285852d9239b727f09ec99b9891a))
* **DejaMouseDragDrop:**
  * Improve unit test ([d72348cb](https://github.com/DSI-HUG/dejajs-components/commit/d72348cbeed05eeb56eb690ffbef85c89ecce398))
  * Improve unit test ([44e01b3c](https://github.com/DSI-HUG/dejajs-components/commit/44e01b3c24332695c04d613db083f905dcda0db5))
  * Added unit test ([1255c8e4](https://github.com/DSI-HUG/dejajs-components/commit/1255c8e4163c75746be06cc87347b2a1e058e1c3))
* **DejaAutoSizeTextArea:**
  * Improve unit test when font can differ between linux and windows ([7bbbe6c4](https://github.com/DSI-HUG/dejajs-components/commit/7bbbe6c450d9962afe9ee206d33238f3767b8781))
  * Added unit test ([30501ca8](https://github.com/DSI-HUG/dejajs-components/commit/30501ca875045596ef43b87eb8563506b5cd7a49))
* **DejaTiles:**
  * Improve unit test ([af14dee2](https://github.com/DSI-HUG/dejajs-components/commit/af14dee2586be476b33b75daeda2f96c84c6f945))
  * Improve unit test ([d16f313d](https://github.com/DSI-HUG/dejajs-components/commit/d16f313da87a3436e18ce2701e3d1d1ae47fa1ff))
  * Improve unit test ([a990c2e7](https://github.com/DSI-HUG/dejajs-components/commit/a990c2e7fabf756572e152d713e6ab97595ca5f3))
  * Improve unit test ([38d2fa36](https://github.com/DSI-HUG/dejajs-components/commit/38d2fa3681a5c425089b7c4c37b7902a348c2457))
  * Improve unit test ([3a998fe2](https://github.com/DSI-HUG/dejajs-components/commit/3a998fe2e0bd99360023d1e6200daeb67d4e902e))
  * Improve unit test ([587bda10](https://github.com/DSI-HUG/dejajs-components/commit/587bda103d843ae254ef33315e751cce4bf470c6))
  * Added unit test ([e2beec3c](https://github.com/DSI-HUG/dejajs-components/commit/e2beec3cc0ddd44d55edaa2cffe35e3c7a103e9b))
* **DejaGrid:**
  * Improve unit test, replacing timer by spyOn ([cfc6fb1b](https://github.com/DSI-HUG/dejajs-components/commit/cfc6fb1b1768b1e89fafd1dc74a3a5ec23a3bd28))
  * Fix travis test timing issue ([c8d7fc7b](https://github.com/DSI-HUG/dejajs-components/commit/c8d7fc7b5c7f1de2d75cd8b9fd8155ad937204fd))
  * Improve unit test ([5721cc8e](https://github.com/DSI-HUG/dejajs-components/commit/5721cc8e6ea1f79343976a3ad48920d9cfd21822))
  * Improve unit test ([06febec8](https://github.com/DSI-HUG/dejajs-components/commit/06febec870c666d250f3be8df7d63878ebfabbdb))
  * Improve unit test ([ffcc0a06](https://github.com/DSI-HUG/dejajs-components/commit/ffcc0a066fa9e7dbf2049b27eee289c296bc0e98))
  * Improve unit test ([1e1ae0ce](https://github.com/DSI-HUG/dejajs-components/commit/1e1ae0ceaf43f57436573bf5af8b002b59cc5b94))
  * Improve unit test ([72c6ac49](https://github.com/DSI-HUG/dejajs-components/commit/72c6ac49861bd2b5695689439b39c1395f2f12e2))
  * Added unit test ([9650633a](https://github.com/DSI-HUG/dejajs-components/commit/9650633a7fd50beb924ba7d896683f78ce253289))
* **DejaSelect:**
  * Improve unit test, replacing timer by spyOn ([21c742d0](https://github.com/DSI-HUG/dejajs-components/commit/21c742d0c4290db0f188943315ed39ca23de8ed9))
  * Improve Unit Test ([18263df4](https://github.com/DSI-HUG/dejajs-components/commit/18263df459b104a9a05c79dee58cc5289ed603c4))
  * Improve Unit Test ([6eedd9f4](https://github.com/DSI-HUG/dejajs-components/commit/6eedd9f4506e1dea6d9758182c8f65df2d3f4ca2))
* **DejaTreeList:** Improve unit test, replacing timer by spyOn ([83ede9cf](https://github.com/DSI-HUG/dejajs-components/commit/83ede9cffba5d4fd2f5a67a944a8575d69361178))
* **DejaBoldQueryComponent:** add junit test. ([d3f33ae5](https://github.com/DSI-HUG/dejajs-components/commit/d3f33ae5b3d2d81b4430ff40921605237aaaf719))
* **DejaViewPort:** Added one test ([1ddddfa4](https://github.com/DSI-HUG/dejajs-components/commit/1ddddfa4e98e17044294906bcc202f147cea1f40))
* **TimeAgoPipe:** Add unit test for TimeAgo pipe ([f7036292](https://github.com/DSI-HUG/dejajs-components/commit/f7036292219dfa2c895f4ec7c1c99a493a16e595))
* **ViewPortTest:**
  * fix ([835bc644](https://github.com/DSI-HUG/dejajs-components/commit/835bc644e80ae5fd8c5f9dadf5d603aa56949968))
  * fix ([753c95db](https://github.com/DSI-HUG/dejajs-components/commit/753c95db13c78ba3e68b2f252f6bb9442a5b3906))
* **Global:** Replaced deprecated function to initiate MouseEvent ([e9edb056](https://github.com/DSI-HUG/dejajs-components/commit/e9edb056ec4b535edd7971ceeeaa4965f94acbba))
* **DejaEditable:** Add unit test ([4d9434c3](https://github.com/DSI-HUG/dejajs-components/commit/4d9434c378341d3f3abde8cde0de008d795dfd1f))
* **Graphics:**
  * Improve unit test ([99158c83](https://github.com/DSI-HUG/dejajs-components/commit/99158c83ce9a9bdaca66683c26fbb1f89f83db68))
  * Add unit test ([c943744b](https://github.com/DSI-HUG/dejajs-components/commit/c943744b60dd420ab165dded9d81022111832d44))
* **DejaClipboardService:** Add unit test ([11488b1d](https://github.com/DSI-HUG/dejajs-components/commit/11488b1de61254b2c19bf6dc1cea3555dad1f5a8))
* **DejaSelectComponent:**
  * Improve unit test ([c645bdb4](https://github.com/DSI-HUG/dejajs-components/commit/c645bdb4b3fd6cb20e4a4b4aa5978ff39a8ded83))
  * Added unit test ([1a6c2e5a](https://github.com/DSI-HUG/dejajs-components/commit/1a6c2e5a37254ce215df1ded01a6ec5238e66767))

