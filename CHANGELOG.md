#### 2.0.3 (2017-5-29)

##### Bug Fixes

* **Packages:** Add reflect-metadata to package.json ([19992ea6](https://github.com/DSI-HUG/dejajs-components/commit/19992ea67e49b43ddf62c123930d2bbc24c0c8f4))

##### Other Changes

* **DejaGrid:** Sort spinner position ([4bf7cac0](https://github.com/DSI-HUG/dejajs-components/commit/4bf7cac0f439ead0f907a6c28874397d73fe6e4c))

##### Refactors

* **Global:** Observable cleanup ([611d7a93](https://github.com/DSI-HUG/dejajs-components/commit/611d7a93df1e1f482ba819ac6f7bc191edb3e2bd))

#### 2.0.2 (2017-5-26)

##### Bug Fixes

* **Moment:** Update moment imports ([bd86f22c](https://github.com/DSI-HUG/dejajs-components/commit/bd86f22c585650f567b0a601b68dae340dd54349))
* **Sorting:** Export SortOrder ([067c315f](https://github.com/DSI-HUG/dejajs-components/commit/067c315f7eb62e3bb66f664c81250ba999b2fe60))
* **Build:** Add polyfills into the build ([677766a2](https://github.com/DSI-HUG/dejajs-components/commit/677766a294b0a69a70dafab200ab5442dc93d153))
* **Global:** Update version during the build ([453472c0](https://github.com/DSI-HUG/dejajs-components/commit/453472c004ebdd2a4012bd1b69914e8e9b3865a5))

##### Other Changes

* **Bundle:** Improve bundle size ([8cec8932](https://github.com/DSI-HUG/dejajs-components/commit/8cec8932347e4c8ff5411d7f76040b52cac10e91))
* **Doc:** Specify root folder for documentation ([23b38c09](https://github.com/DSI-HUG/dejajs-components/commit/23b38c09c508fadc129733649482d81884610d27))
* **Travis:** Fix script path ([779e6f70](https://github.com/DSI-HUG/dejajs-components/commit/779e6f7048f22df05f3751cc7b9f3e0a3a59a9f2))

#### 2.0.1 (2017-5-24)

##### Bug Fixes

* **Theming:** Import theming files during the build ([e2631b3c](https://github.com/DSI-HUG/dejajs-components/commit/e2631b3c5570067846f478260a92a509d05f000c))
* **DemoApp:**
  * Fix redirect on Github Pages ([1bdbd357](https://github.com/DSI-HUG/dejajs-components/commit/1bdbd3572ea770fefcaae6081356308c215e5068))
  * Logo path ([2c020594](https://github.com/DSI-HUG/dejajs-components/commit/2c020594cb72f0c559d3249ec8f27745d9558871))
  * Move demo-app datas to assets/datas ([1bf04c05](https://github.com/DSI-HUG/dejajs-components/commit/1bf04c058914da5cbd3e85a8aec403ec8ab10007))

##### Other Changes

* **Travis:**
  * Automatic deployment for documentation ([68ec2113](https://github.com/DSI-HUG/dejajs-components/commit/68ec21139f7a193475218605f1511fdc7024bd08))
  * Fix script location ([a800346b](https://github.com/DSI-HUG/dejajs-components/commit/a800346b0dd3f54527549b410aabe13ec67c46dd))

## 2.0.0 (2017-5-24)

##### Documentation Changes

* **Contribution:** Create a creatibution readme ([485f0ccb](https://github.com/DSI-HUG/dejajs-components/commit/485f0ccbaa15ddb051943bb5d098c8c1251e8a6e))
* **Readme:**
  * Add commitizen badge in readme ([54598c50](https://github.com/DSI-HUG/dejajs-components/commit/54598c501529330499eccd9d887ce2ea9317762b))
  * Add licence badge ([19bf614d](https://github.com/DSI-HUG/dejajs-components/commit/19bf614d6bcc4f90784b0ae79edc6b5a662ddc07))

##### New Features

* **PendingOnFocusDirective:** Directive to mark as pending the input has focus for reactive form ([2aa214cc](https://github.com/DSI-HUG/dejajs-components/commit/2aa214cc8774d72a9d3271e5b683a72deabbdb56))
* **DejaSelect:**
  * Added readonly property ([a95b2983](https://github.com/DSI-HUG/dejajs-components/commit/a95b2983c388bed033cf6668c95b65636c58aced))
  * Implement reactive form compatibility and ngModel propagation to child input ([d6d2455c](https://github.com/DSI-HUG/dejajs-components/commit/d6d2455c1ac7aa9cd2c8968945c3d8d81099ff44))
* **DejaChip:** Added readonly and disabled properties ([a9117570](https://github.com/DSI-HUG/dejajs-components/commit/a9117570ce6c491c85d230f6394db56391398247))
* **ValidateOnBlurDirective:**
  * Directive to validate input on blur instead on type for reactive form ([4e7b6657](https://github.com/DSI-HUG/dejajs-components/commit/4e7b6657526777c98250069705df4ff376540344))
  * Directive to validate input on blur instead on type for reactive form fix(DejaSelect): Place holder position when late binding ([2e907c25](https://github.com/DSI-HUG/dejajs-components/commit/2e907c2597ff86ed1fb01c4256b23a6022543581))
* **DejaChips:** DejaChips added for DejaSelect selected items in multiselect mode. ([fd1fe27d](https://github.com/DSI-HUG/dejajs-components/commit/fd1fe27db5ff7683feec47a15081127236df9947))
* **DejaDatePicker:** Reactive form compatibility ([e92d5d7f](https://github.com/DSI-HUG/dejajs-components/commit/e92d5d7f152328efead93f2fd19b8d1520acf335))
* **DejaDateSelector:** Reactive form compatibility ([9fcf751b](https://github.com/DSI-HUG/dejajs-components/commit/9fcf751bff5bda5ee77942ce9191b57fc8b0431d))
* **DejaCircularPicker:** Reactive form compatibility ([6574f5e5](https://github.com/DSI-HUG/dejajs-components/commit/6574f5e5126f4040b6b84ddb99a7e61f80a1e600))
* **DejaColorPicker:** Reactive from compatibility ([3a5b01a9](https://github.com/DSI-HUG/dejajs-components/commit/3a5b01a9e88fb92870c481720f8df8b2587ac47e))
* **DejaColorSelector:** Reactive form compatibility ([76256172](https://github.com/DSI-HUG/dejajs-components/commit/76256172b416e5ac3e1545c4edd83353eb2d3db3))
* **DejaEditableDirective:** ReactiveForm compatibility ([67a10411](https://github.com/DSI-HUG/dejajs-components/commit/67a10411e97dc857b520407a34217083d6b3b066))
* **DejaGrid:** NgModel removed Compatibility ([6ba84c47](https://github.com/DSI-HUG/dejajs-components/commit/6ba84c4719d4e42d80b0bc3f24fb96741d5a0bbd))

##### Bug Fixes

* **E2E:** E2E TS Compliant with typescript 2.2.2 ([8aa7f7ad](https://github.com/DSI-HUG/dejajs-components/commit/8aa7f7ad6a41aaa9980c436d9fa94f9e8e8b999d))
* **CLI:** Downgrad to typescript 2.2.2 to fix an incompatibility of cli compiler ([d72b26e1](https://github.com/DSI-HUG/dejajs-components/commit/d72b26e12168190e97224e35e4ca459518cc7326))
* **Lint:**
  * Fix tslint warning ([cd79cf07](https://github.com/DSI-HUG/dejajs-components/commit/cd79cf07e957aa5d821596532a4af325e1f42c40))
  * Remove public rule ([bcc16aea](https://github.com/DSI-HUG/dejajs-components/commit/bcc16aea7246afb4e6a68ef318f05710947d60d7))
* **Global:**
  * Better imports ([d3238801](https://github.com/DSI-HUG/dejajs-components/commit/d3238801d8fce144de664557142cbff0110ebc8d))
  * Compiler CLI compliance ([43346ee9](https://github.com/DSI-HUG/dejajs-components/commit/43346ee9337c4876a5aced605b91a53aefbcc5e9))
  * Better imports ([ecd0689c](https://github.com/DSI-HUG/dejajs-components/commit/ecd0689ce15a20d57f7e35c291f10cee11eb3c2b))
  * Better import ([784901c3](https://github.com/DSI-HUG/dejajs-components/commit/784901c3197a2dce02a1f0000390fb5de79cf96a))
  * Better imports for compiler-cli compliance ([9db28940](https://github.com/DSI-HUG/dejajs-components/commit/9db289403f639e93e8d6c2973f25eb64d72d44ba))
  * Better imports for compiler-cli compliance ([a7415451](https://github.com/DSI-HUG/dejajs-components/commit/a7415451fa4363e7d0fe29deb66bd0c857864df5))
  * Better imports for compiler-cli compliance ([5cfdeb13](https://github.com/DSI-HUG/dejajs-components/commit/5cfdeb1330db306312b6fa50c2547c5e4f873c60))
  * Better imports for compiler-cli compliance ([f49030d2](https://github.com/DSI-HUG/dejajs-components/commit/f49030d23f56e5b0dfc76e5fae0b22ec05d09772))
  * Better imports for compiler-cli compliance ([0172c7a3](https://github.com/DSI-HUG/dejajs-components/commit/0172c7a3f24745801852140cf773e2a56f1160c7))
  * Better imports for compiler-cli compliance ([70050e54](https://github.com/DSI-HUG/dejajs-components/commit/70050e54d4a534013995facf568b64b34b4b1826))
  * Better imports for compiler-cli compliance ([0a5ab130](https://github.com/DSI-HUG/dejajs-components/commit/0a5ab1304f5b524b3ddba6e693ec35ed62bb68d9))
  * Better imports for compiler-cli compliance ([8b10385e](https://github.com/DSI-HUG/dejajs-components/commit/8b10385e3c1819643979b463aae2b6eabd49ece9))
  * Better imports for compiler-cli compliance ([0edcd9a2](https://github.com/DSI-HUG/dejajs-components/commit/0edcd9a299c5e7a2be989cd53994e5390ffc2f2d))
  * Better imports for compiler-cli compliance ([a0ac3316](https://github.com/DSI-HUG/dejajs-components/commit/a0ac3316fbc7943357379d47d3665839baf0182f))
  * Add RXJS Operators ([d123fc43](https://github.com/DSI-HUG/dejajs-components/commit/d123fc436aa7cd7de70e065502ad37471aff1fc0))
  * Improve ClipboardService providing error and message ([c89e736d](https://github.com/DSI-HUG/dejajs-components/commit/c89e736d208c1bd553dfe7b677534b20a36ee411))
* **CircularPicker:** Better import ([116cc22d](https://github.com/DSI-HUG/dejajs-components/commit/116cc22d5987ce4e172ec808972defaef85ad264))
* **ContentEditable:** Update module import ([b3ef56d9](https://github.com/DSI-HUG/dejajs-components/commit/b3ef56d9b80eb6079bea41939a398729a6814b44))
* **DejaMouseDragDropCursor:** Add RXJS delay operator ([3bce1595](https://github.com/DSI-HUG/dejajs-components/commit/3bce1595cbbce6b0eecfa95e3f6fc972fc10dc3c))
* **DejaCircularPicker:** Add RXJS takeUntil operator ([bcf13250](https://github.com/DSI-HUG/dejajs-components/commit/bcf1325041147428200d4b102702f3122beaf293))
* **DropdownComponent:** Add RXJS delay operator ([528061d9](https://github.com/DSI-HUG/dejajs-components/commit/528061d9d819305b99fe75cc7311cbfa6cd5116f))
* **DemoApp:** Imports... ([9e23d465](https://github.com/DSI-HUG/dejajs-components/commit/9e23d4651f8a1c8cfcc8165bb0f2dd2d1c87e9d5))
* **ItemListService:** Add if opperator ([45e8c529](https://github.com/DSI-HUG/dejajs-components/commit/45e8c52993b9623442fae6212b33cfe6b1ab3d75))
* **DejaCodeViewer:**
  * replace require ([2018d8a1](https://github.com/DSI-HUG/dejajs-components/commit/2018d8a121644b4aefac0aed392b2a635a64ad6e))
  * replace require ([807335d8](https://github.com/DSI-HUG/dejajs-components/commit/807335d86d5b94f910ebf4636bf342970c7f6dfa))
* **DejaSelect:**
  * Synchronization between model and textField property when control is in a reactive form ([333f9b40](https://github.com/DSI-HUG/dejajs-components/commit/333f9b40b5910aff78274d6d9c94cdeb3b49b88c))
  * Synchronization between model and textField property when control is in a reactive form ([2ceb7cf7](https://github.com/DSI-HUG/dejajs-components/commit/2ceb7cf740bfe3678f3f3b5b980b0a279409bcb1))
* **PendingOnFocusDirective:** Observable leak ([26dde51d](https://github.com/DSI-HUG/dejajs-components/commit/26dde51dd697d8ec6c26b3de49df6d76c0b58f70))
* **DejaClipboardService:** DejaClipboardService is now optional. DejaClipboardService must be provided on your app.module to get the full drag drop and copy/paste features of the components. ([fcd2c7bf](https://github.com/DSI-HUG/dejajs-components/commit/fcd2c7bf3c6b30ad3e12581b3e78bf45fd530c2f))
* **DejaTreeList:**
  * Selection on parent ([32a28ee7](https://github.com/DSI-HUG/dejajs-components/commit/32a28ee7028b6c48a32dca1440ac69708d4c4947))
  * Material Beta5 Compatibility Issue ([f2a858a7](https://github.com/DSI-HUG/dejajs-components/commit/f2a858a791c842121ce49473df17cba11196392d))
  * Material Beta5 Compatibility Issue ([9daada13](https://github.com/DSI-HUG/dejajs-components/commit/9daada132c6552f5f7bca0dd745ac5e87f4c27c5))
  * Expand button removed ([50036980](https://github.com/DSI-HUG/dejajs-components/commit/50036980533a0cef470863499770d5b6742bd31b))
* **DejaChips:** Chips height aligned to material ([a4b6597b](https://github.com/DSI-HUG/dejajs-components/commit/a4b6597bc088a593cf564d092365e6826ced9cf9))
* **DejaColorPicker:** Added a filter on focus when enter is pressed ([70120b24](https://github.com/DSI-HUG/dejajs-components/commit/70120b247b943ad4a06eff2d8ff484a5c9878ae8))

##### Other Changes

* **tsLint:** tsLint as warnings ([931bb956](https://github.com/DSI-HUG/dejajs-components/commit/931bb95681f5b9119fd99b2f60bd88601a663cf5))
* **Deploy:** Automatic version incrementation ([e72aa683](https://github.com/DSI-HUG/dejajs-components/commit/e72aa683d01e4008b7c644cf42a4b9a511d76e46))
* **Dependencies:** Update all dependencies in latest version ([1afae63a](https://github.com/DSI-HUG/dejajs-components/commit/1afae63a10a5247c1702553cc90decb66dd69732))
* **Webpack:**
  * Webpack optimization ([8669e8c4](https://github.com/DSI-HUG/dejajs-components/commit/8669e8c4ac46ea992ee478822431e5018e3cddfb))
  * Webpack optimization ([b1921080](https://github.com/DSI-HUG/dejajs-components/commit/b192108057f2329da5963d896ab7ce7c2afeb1c4))
* **Changelog:** Change the changelog generator ([c8e60610](https://github.com/DSI-HUG/dejajs-components/commit/c8e6061003b7debb23a9c2b6a2a1bff5560f92b1))
* **Travis:**
  * Add configuration to generate changelog ([8b4e0703](https://github.com/DSI-HUG/dejajs-components/commit/8b4e07035f2d6ab2697b6f1a0ade1ebc355f059d))
  * Add Commitizen config ([1084ba5a](https://github.com/DSI-HUG/dejajs-components/commit/1084ba5a8c2d530e4e45d81c1ca42d42ca9e45d5))

##### Refactors

* **Global:**
  * Move to a bundle architecture (rollup & angular cli for demo app) ([88ec6e4f](https://github.com/DSI-HUG/dejajs-components/commit/88ec6e4fb16a0aaff3015a8d7bd8c4a6fe69cdb6))
  * Better imports ([96158281](https://github.com/DSI-HUG/dejajs-components/commit/96158281985687ecf75aee7505a1d6dc98665e66))
  * Better imports ([5a2e4fbe](https://github.com/DSI-HUG/dejajs-components/commit/5a2e4fbef750c3cc729e7b6b21cba3f97f87a3b8))
  * Better imports ([059629b5](https://github.com/DSI-HUG/dejajs-components/commit/059629b56a8fbb6889c5b15f9f7b960a6970d86b))
  * Better imports ([2bd4dfb4](https://github.com/DSI-HUG/dejajs-components/commit/2bd4dfb488c867722d6b58c28a2d8470a5cf76d1))
  * Better imports ([67fa043c](https://github.com/DSI-HUG/dejajs-components/commit/67fa043cba46e7e61ec5e33c89f03228103c88a2))
  * Better imports ([dfdde95e](https://github.com/DSI-HUG/dejajs-components/commit/dfdde95ee99dccff52834f3a2de004a719ba4c34))
  * better import ([fd93f940](https://github.com/DSI-HUG/dejajs-components/commit/fd93f9404532a3eb259b419620b867bb978d2bfd))
  * Fix index ([cef0dc6b](https://github.com/DSI-HUG/dejajs-components/commit/cef0dc6b1cff84a42b71e5edd142348f7667f1ad))
  * Import modules inside index ([fa9500c4](https://github.com/DSI-HUG/dejajs-components/commit/fa9500c476ae9692c0680c2c63a377779e5c44d6))
  * Import modules inside index ([77077303](https://github.com/DSI-HUG/dejajs-components/commit/7707730375979fbdaa815f2be8a46369fcd153c9))
  * Better imports ([ad05bbfa](https://github.com/DSI-HUG/dejajs-components/commit/ad05bbfae825e85675e2fa56b16038779ab2341b))
  * Better import for Rxjs ([6fc67033](https://github.com/DSI-HUG/dejajs-components/commit/6fc6703397cf98115833b8f224a684bda26f88ed))
* **DejaAccordion:** Moving ngModule into separate file ([f0ea1029](https://github.com/DSI-HUG/dejajs-components/commit/f0ea1029a4110883be508e4efea9d0339451f552))
* **DemoApp:**
  * Move index.ejs ([a1f7a468](https://github.com/DSI-HUG/dejajs-components/commit/a1f7a46886a05d1bb67c481af76d902950ceb9be))
  * Remove demo-app from src folder ([ad856d5a](https://github.com/DSI-HUG/dejajs-components/commit/ad856d5a5bad3bd913cb92fa17edfb97e700963e))

#### 1.9.1 (2017-5-16)

Update all dependencies in latest version

#### 1.9.0 (2017-5-16)

##### Documentation Changes

* **Contribution:** Create a creatibution readme ([485f0ccb](https://github.com/DSI-HUG/dejajs-components/commit/485f0ccbaa15ddb051943bb5d098c8c1251e8a6e))
* **Readme:**
  * Add commitizen badge in readme ([54598c50](https://github.com/DSI-HUG/dejajs-components/commit/54598c501529330499eccd9d887ce2ea9317762b))
  * Add licence badge ([19bf614d](https://github.com/DSI-HUG/dejajs-components/commit/19bf614d6bcc4f90784b0ae79edc6b5a662ddc07))

##### New Features

* **PendingOnFocusDirective:** Directive to mark as pending the input has focus for reactive form ([2aa214cc](https://github.com/DSI-HUG/dejajs-components/commit/2aa214cc8774d72a9d3271e5b683a72deabbdb56))
* **DejaSelect:**
  * Added readonly property ([a95b2983](https://github.com/DSI-HUG/dejajs-components/commit/a95b2983c388bed033cf6668c95b65636c58aced))
  * Implement reactive form compatibility and ngModel propagation to child input ([d6d2455c](https://github.com/DSI-HUG/dejajs-components/commit/d6d2455c1ac7aa9cd2c8968945c3d8d81099ff44))
* **DejaChip:** Added readonly and disabled properties ([a9117570](https://github.com/DSI-HUG/dejajs-components/commit/a9117570ce6c491c85d230f6394db56391398247))
* **ValidateOnBlurDirective:**
  * Directive to validate input on blur instead on type for reactive form ([4e7b6657](https://github.com/DSI-HUG/dejajs-components/commit/4e7b6657526777c98250069705df4ff376540344))
  * Directive to validate input on blur instead on type for reactive form fix(DejaSelect): Place holder position when late binding ([2e907c25](https://github.com/DSI-HUG/dejajs-components/commit/2e907c2597ff86ed1fb01c4256b23a6022543581))
* **DejaChips:** DejaChips added for DejaSelect selected items in multiselect mode. ([fd1fe27d](https://github.com/DSI-HUG/dejajs-components/commit/fd1fe27db5ff7683feec47a15081127236df9947))
* **DejaDatePicker:** Reactive form compatibility ([e92d5d7f](https://github.com/DSI-HUG/dejajs-components/commit/e92d5d7f152328efead93f2fd19b8d1520acf335))
* **DejaDateSelector:** Reactive form compatibility ([9fcf751b](https://github.com/DSI-HUG/dejajs-components/commit/9fcf751bff5bda5ee77942ce9191b57fc8b0431d))
* **DejaCircularPicker:** Reactive form compatibility ([6574f5e5](https://github.com/DSI-HUG/dejajs-components/commit/6574f5e5126f4040b6b84ddb99a7e61f80a1e600))
* **DejaColorPicker:** Reactive from compatibility ([3a5b01a9](https://github.com/DSI-HUG/dejajs-components/commit/3a5b01a9e88fb92870c481720f8df8b2587ac47e))
* **DejaColorSelector:** Reactive form compatibility ([76256172](https://github.com/DSI-HUG/dejajs-components/commit/76256172b416e5ac3e1545c4edd83353eb2d3db3))
* **DejaEditableDirective:** ReactiveForm compatibility ([67a10411](https://github.com/DSI-HUG/dejajs-components/commit/67a10411e97dc857b520407a34217083d6b3b066))
* **DejaGrid:** NgModel removed Compatibility ([6ba84c47](https://github.com/DSI-HUG/dejajs-components/commit/6ba84c4719d4e42d80b0bc3f24fb96741d5a0bbd))

##### Bug Fixes

* **DejaChips:** Chips height aligned to material ([a4b6597b](https://github.com/DSI-HUG/dejajs-components/commit/a4b6597bc088a593cf564d092365e6826ced9cf9))
* **DejaColorPicker:** Added a filter on focus when enter is pressed ([70120b24](https://github.com/DSI-HUG/dejajs-components/commit/70120b247b943ad4a06eff2d8ff484a5c9878ae8))
* **DejaTreeList:**
  * Material Beta5 Compatibility Issue ([f2a858a7](https://github.com/DSI-HUG/dejajs-components/commit/f2a858a791c842121ce49473df17cba11196392d))
  * Material Beta5 Compatibility Issue ([9daada13](https://github.com/DSI-HUG/dejajs-components/commit/9daada132c6552f5f7bca0dd745ac5e87f4c27c5))
  * Expand button removed ([50036980](https://github.com/DSI-HUG/dejajs-components/commit/50036980533a0cef470863499770d5b6742bd31b))

##### Other Changes

* **Webpack:**
  * Webpack optimization ([8669e8c4](https://github.com/DSI-HUG/dejajs-components/commit/8669e8c4ac46ea992ee478822431e5018e3cddfb))
  * Webpack optimization ([b1921080](https://github.com/DSI-HUG/dejajs-components/commit/b192108057f2329da5963d896ab7ce7c2afeb1c4))
* **Changelog:** Change the changelog generator ([c8e60610](https://github.com/DSI-HUG/dejajs-components/commit/c8e6061003b7debb23a9c2b6a2a1bff5560f92b1))
* **Travis:**
  * Add configuration to generate changelog ([8b4e0703](https://github.com/DSI-HUG/dejajs-components/commit/8b4e07035f2d6ab2697b6f1a0ade1ebc355f059d))
  * Add Commitizen config ([1084ba5a](https://github.com/DSI-HUG/dejajs-components/commit/1084ba5a8c2d530e4e45d81c1ca42d42ca9e45d5))

#### 1.8.2 (2017-5-11)

##### Documentation Changes

* **Contribution:** Create a creatibution readme ([485f0ccb](https://github.com/DSI-HUG/dejajs-components/commit/485f0ccbaa15ddb051943bb5d098c8c1251e8a6e))
* **Readme:**
  * Add commitizen badge in readme ([54598c50](https://github.com/DSI-HUG/dejajs-components/commit/54598c501529330499eccd9d887ce2ea9317762b))
  * Add licence badge ([19bf614d](https://github.com/DSI-HUG/dejajs-components/commit/19bf614d6bcc4f90784b0ae79edc6b5a662ddc07))

##### New Features

* **DejaDatePicker:** Reactive form compatibility ([e92d5d7f](https://github.com/DSI-HUG/dejajs-components/commit/e92d5d7f152328efead93f2fd19b8d1520acf335))
* **DejaDateSelector:** Reactive form compatibility ([9fcf751b](https://github.com/DSI-HUG/dejajs-components/commit/9fcf751bff5bda5ee77942ce9191b57fc8b0431d))
* **DejaCircularPicker:** Reactive form compatibility ([6574f5e5](https://github.com/DSI-HUG/dejajs-components/commit/6574f5e5126f4040b6b84ddb99a7e61f80a1e600))
* **DejaColorPicker:** Reactive form compatibility ([3a5b01a9](https://github.com/DSI-HUG/dejajs-components/commit/3a5b01a9e88fb92870c481720f8df8b2587ac47e))
* **DejaColorSelector:** Reactive form compatibility ([76256172](https://github.com/DSI-HUG/dejajs-components/commit/76256172b416e5ac3e1545c4edd83353eb2d3db3))
* **DejaEditableDirective:** ReactiveForm compatibility ([67a10411](https://github.com/DSI-HUG/dejajs-components/commit/67a10411e97dc857b520407a34217083d6b3b066))
* **DejaGrid:** NgModel removed Compatibility ([6ba84c47](https://github.com/DSI-HUG/dejajs-components/commit/6ba84c4719d4e42d80b0bc3f24fb96741d5a0bbd))
* **DejaSelect:** Implement reactive form compatibility and ngModel propagation to child input ([d6d2455c](https://github.com/DSI-HUG/dejajs-components/commit/d6d2455c1ac7aa9cd2c8968945c3d8d81099ff44))

##### Bug Fixes

* **DejaTreeList:** Expand button removed ([50036980](https://github.com/DSI-HUG/dejajs-components/commit/50036980533a0cef470863499770d5b6742bd31b))

##### Other Changes

* **Changelog:** Change the changelog generator ([c8e60610](https://github.com/DSI-HUG/dejajs-components/commit/c8e6061003b7debb23a9c2b6a2a1bff5560f92b1))
* **Webpack:** Webpack optimization ([b1921080](https://github.com/DSI-HUG/dejajs-components/commit/b192108057f2329da5963d896ab7ce7c2afeb1c4))
* **Travis:**
  * Add configuration to generate changelog ([8b4e0703](https://github.com/DSI-HUG/dejajs-components/commit/8b4e07035f2d6ab2697b6f1a0ade1ebc355f059d))
  * Add Commitizen config ([1084ba5a](https://github.com/DSI-HUG/dejajs-components/commit/1084ba5a8c2d530e4e45d81c1ca42d42ca9e45d5))

#### 1.8.1 (2017-5-08)

### Bug fixes
Minor bugs fix

<a name="1.8.0"></a>
# [1.8.0] (2017-05-03)

### Breaking changes from 1.7.2
Update dependencies version

### Bug fixes
Some bug fixes

<a name="1.7.2"></a>
# [1.7.2] (2017-04-27)

### Bug fixes
Minor bugs fix

<a name="1.7.1"></a>
# [1.7.1] (2017-04-26)

### Bug fixes
* **SelectComponent:** Height measurment fix.

<a name="1.7.0"></a>
# [1.7.0] (2017-04-25)

### Breaking changes from 1.6.4
Update all dependencies to the latestet version

### Features
New demo app design
Material theming for all components

### Bug fixes
Datepicker width without timeout directive

<a name="1.6.4"></a>
# [1.6.4] (2017-04-19)

### Features
* **SelectComponent:** Add disabled property

### Bug fixes
Some bug fixes

<a name="1.6.3"></a>
# [1.6.3] (2017-04-12)

### Bug fixes
Fix dependencies versions

<a name="1.6.2"></a>
# [1.6.2] (2017-04-11)

<a name="1.6.1"></a>
# [1.6.1] (2017-04-10)

### Bug fixes
* **ViewportService:** Ensure Visible not working in fixed, variable and auto modes.

<a name="1.6.0"></a>
# [1.6.0] (2017-04-10)

### Breaking changes from 1.5.1
* **IItemBase:** height is renamed size to be compatible with viewport horizontal layout
* **ViewportMode:** NoViewport renamed to disabled
* **ViewportMode:** ConstantRowHeight renamed to fixed
* **ViewportMode:** VariableRowHeight renamed to variable
* **ViewportMode:** AutoRowHeight renamed to auto

### Known issues
* **ViewportService:** Ensure Visible not working in fixed, variable and auto modes

### Features
* **ViewportService:** A view port service manage the viewport calculations and ensureVisible for treelist, select, grid and viewport component.

### Bug fixes

<a name="1.5.1"></a>
# [1.5.1] (2017-04-05)

### Bug fixes
Travis deployment

<a name="1.5.0"></a>
# [1.5.0] (2017-04-05)

### Breaking changes from 1.4.2-beta.25
* **DejaSelect:** HTML Element with id=select-dropdown changed to id=listcontainer
* **DejaSelect:** HTML UL Removed
* **DejaSelect:** HTML LI Changed to div
* **DejaSelect:** HTML expandbtn Changed span to i
* **DejaSelect:** HTML span with class item-content removed, use div.listitem instead
* **DejaTreeList:** HTML Element with id=list changed to id=listcontainer
* **DejaTreeList:** HTML Element with id=list-header changed to id=listheader
* **DejaTreeList:** HTML UL Removed
* **DejaTreeList:** HTML LI Changed to div
* **DejaTreeList:** HTML expandbtn Changed span to i
* **DejaTreeList:** HTML span with class item-content removed, use div.listitem instead
* **DejaGrid:** HTML element with id parent-title-wrapper changed to id parent-title

### Known issues #

### Features
* **DejaSelect:** Less DOM, performances improved
* **DejaTreeList:** Less DOM, performances improved
* **DejaTreeList:** Automatic row height calculation and scrollbar on scroll adjustment
* **DejaGrid:** OnPush mode

### Bug fixes #
* **DejaTreeList:** Keyboard navigation don't select correctly the current row
* **DejaTreeList:** Keyborad navigation after an asynchronous scrolling crash because no cache is defined
* **DejaGrid:** Keyboard navigation don't disable the horizontal scolling 
* **DejaGrid:** Keyboard navigation don't select correctly the current row

<a name="1.4.2-beta.25"></a>
# [1.4.2-beta.25] (2017-03-30)

### Breaking changes from 1.4.2-beta.24
* **ItemListService:** Functions return observable instead promise, and suffixed by $. For example getItemList is remaned getItemLIst$ and return an observable.

### Known issues #
* **DataGrid:** Keyboard navigation don't select correctly the current row
* **DataGrid:** Keyboard navigation don't disable the horizontal scolling 

### Features

### Bug fixes #

<a name="1.4.2-beta.24"></a>
# [1.4.2-beta.24] (2017-03-27)

### Breaking changes from 1.4.2-beta.23
* **DejaCircularPickerComponent:**  circular-picker-container replaced by the host -> deja-circular-picker

### Features
* **DatePicker:** Date picker is now compatible with Firefx, Edge and Internet Explorer.
* **DatePicker:** Date picker working OnPush mode.
* **CircularPicker:** Circular picker working OnPush mode.

### Bug fixes #
* **DragDropDirective:** DragDropDirective multiple drop fix.

<a name="1.4.2-beta.23"></a>
# [1.4.2-beta.23] (2017-03-24)

### Bug fixes #
Monaco Ctrl+Z

<a name="1.4.2-beta.22"></a>
# [1.4.2-beta.22] (2017-03-23)

<a name="1.4.2-beta.21"></a>
# [1.4.2-beta.21] (2017-03-22)

### Bug fixes #
Fix JS lib import

<a name="1.4.2-beta.20"></a>
# [1.4.2-beta.20] (2017-03-22)

### Bug fixes #
Some bugs fixs

<a name="1.4.2-beta.19"></a>
# [1.4.2-beta.19] (2017-03-20)

### Features
Add viewport component

<a name="1.4.2-beta.18"></a>
# [1.4.2-beta.18] (2017-03-17)

Automatic publish in NPM from Travis.

<a name="1.4.2-beta.17"></a>
# [1.4.2-beta.17] (2017-03-17)

### Breaking changes from 1.4.2-beta.16
* **DejaTilesEvent:** DejaTilesEvent renamed to IDejaTilesEvent.
* **DejaTilesCancelableEvent:** DejaTilesCancelableEvent renamed to IDejaTilesCancelableEvent.
* **DejaTilesRemoveEvent:** DejaTilesRemoveEvent renamed to IDejaTilesRemoveEvent.
* **DejaTilesAddEvent:** DejaTilesAddEvent renamed to IDejaTilesAddEvent.

### Features
* **DejaAccordionComponent:** New design

### Bug fixes #
* **DejaAccordionComponent:** Fix collapse on click in AccordionBody
* **DejaDialogComponent:** Fix blur

<a name="1.4.2-beta.16"></a>
# [1.4.2-beta.16] (2017-03-13)

Update Typescript and webpack config

### Bug fixes #

<a name="1.4.2-beta.15"></a>
# [1.4.2-beta.15] (2017-03-10)

Minor bugs fix

<a name="1.4.2-beta.14"></a>
# [1.4.2-beta.14] (2017-03-09)

Fix bugs


<a name="1.4.2-beta.13"></a>
# [1.4.2-beta.13] (2017-03-06)

### Breaking changes from 1.4.2-beta.10
* **ColorEvent:** ColorEvent inherits from CustomEvent. ColorName and Color can be set only on the constructor.

### Bug fixes #
* **SnackBar:** Animation is now compatible with IE and FF
* **SnackBarDemo:** SnackBar position inside ViewPort
* **MenuDemo:** Menu position inside ViewPort
* **MessageBoxDemo:** MessageBox position inside ViewPort

<a name="1.4.2-beta.10"></a>
# [1.4.2] (2017-03-03)

### Breaking changes from 1.3.0
* **Rect:** Right and Bottom are now get set properties instead functions.
* **DateValidatorDirective:** DateValidator is renamed DateValidatorDirective
* **DragDropService:** Replaced by ClipboardService. ClipboardService must be provided in your app module, one times only.

### Bug fixes #
* **Typescript compiler options:**

<a name="1.3.0"></a>
# [1.3.0] (2017-02-10)

### Breaking changes from 1.2.2
* **UserSelectorComponent:** type is now an enum : UserSelectorMode
* **CloningService:** Sync methode renamed from Async to Sync

### Bug fixes #
* **Color selector:** Selection + Over fix

<a name="1.2.2"></a>
# [1.2.2] (2017-01-31)

### Breaking changes from 1.2.0
* **dialog:** Remove isVisible property (replaced by *ngIf inside demo-app)

### Features
* **range:** Edited component inner structure. To use the range component inside a flex container set to row direction you have to set justify-content to flex-end. This is a temporary workaround, it should be fixed in the next weeks.

<a name="1.2.0"></a>
# [1.2.0] (2017-01-11)

### Breaking changes from 1.1.1
* **DejaGrid/DejaTreeList:** To creade a list without viewport you can't set viewportRowHeight property to 0 anymore. See concerned Readme.md for more informations.

### Features
* **ItemListBase:** Add support for variable row size inside data-grid
* **text-metrics:** Create helper to calculate text height inside container
* **Templating for CircularPicker:** Now, you can use #labelTemplate and #cursorTemplate to customize labels and cursors with your own values.

<a name="1.1.1"></a>
# [1.1.1] (2017-01-??)

### Breaking changes from 1.0.0
* **DejaAutosizeTextAreaDirective:** The directive deja-autositze is now placed on the textarea element inside an md-input-container. ngModel must be also declared on the textarea element.
* **BooleanFieldValue:**  The annotation BooleanFieldValue is removed due to an incompatibility with webpack. Now the angular material core coerceBooleanProperty is used instead.

### Bug Fixes
* Select searchFiled issue when searchField was a function.

### Features
* **ItemListService:** Updated to @angular/material 2.0.0-beta.1, look at the breaking changes of angular material in https://github.com/angular/material2/blob/master/CHANGELOG.md


<a name="1.1.0"></a>
# [1.1.0] (2016-12-20)

## Breaking Changes
* `DejaGridCellTemplateDirective` à été remplacée par ngTemplateOutlet. A l'utilisation, la déclaration de la ligne devient implicite.
  ```html
  <ng-template #cellTemplate let-row let-column="column">
  </ng-template>
  ```
* `ItemTemplateDirective` à été remplacée par ngTemplateOutlet. A l'utilisation, la déclaration de l'élément devient implicite.
  ```html
  <ng-template #itemTemplate let-item>
  </ng-template>
  ```

* `TileTemplateDirective` à été remplacée par ngTemplateOutlet. A l'utilisation, la déclaration de tile devient implicite.
  ```html
  <ng-template #tileTemplate let-tile>
  </ng-template>
  ```

* `TemplateDirective` à été supprimée, utiliser dorenavant ngTemplateOutlet. 

* `ItemListService` Le paramètre multiselect à été supprimé de la fonction toggleSelect. Surcharger les méthodes selectItem et unSelectItem à la place de toggleSelect.

* `DejaColorPickerComponent` selectedColor et colorchange ont été supprimé. Le composant implémente mainteant ngModel.

* `DejaColorSelectorComponent` selectedColor et colorchange ont été supprimé. Le composant implémente mainteant ngModel.

* `DejaColorSelect` delaySerachTrigger renomé en delaySearchTrigger


### Features

* Documentation des composants ajoutée.
* **ItemListService:** Une fonction selectItems à été ajoutée pour surcharger ou hooker la selection multiple.
* **ItemListService:** Une fonction selectItem à été ajoutée pour surcharger ou hooker la selection d'un élément.
* **ItemListService:** Une fonction unSelectItems à été ajoutée pour surcharger ou hooker la déselection multiple.
* **ItemListService:** Une fonction unSelectItem à été ajoutée pour surcharger ou hooker la déselection d'un élément.
* **ItemListService:** Une fonction expandItems à été ajoutée pour surcharger ou hooker l'extension multiple.
* **ItemListService:** Une fonction expandItem à été ajoutée pour surcharger ou hooker l'extension d'un élément.
* **ItemListService:** Une fonction collapseItems à été ajoutée pour surcharger ou hooker la fermeture multiple.
* **ItemListService:** Une fonction collapseItem à été ajoutée pour surcharger ou hooker la fermeture d'un élément.
* **ItemListService:** La liste des éléments selectionés est synchronisée avec la liste complète, même si les instances sont différentes. Pour cela, une methode equals a été ajoutée à IItemBase et doit être implémentée pour que la synchronisation ne se base pas sur les instances.
* **DejaColorPickerComponent:** Le composant implémente mainteant ngModel.
* **DejaColorSelectorComponent:** Le composant implémente mainteant ngModel.

### Bug Fixes
* **ItemListService:** La supression des groupes d'affichage ne modifie pas le contenu groupé de la liste.



### Performance Improvements

* **ItemListService:** Amélioration de la gestion des caches.
