#### 0.0.1 (2020-06-25)

##### Chores

* **deps:**
  *  bump websocket-extensions from 0.1.3 to 0.1.4 ([f9450074](https://github.com/DSI-HUG/dejajs-components/commit/f94500742312347b1ef89b1b2140dd5cf066db9e))
  *  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **Moment:**  Remove moment.js instead @angular/material-moment-adapter ([13828e89](https://github.com/DSI-HUG/dejajs-components/commit/13828e891bef26468d621c2e870a03b02e2a3503))
* **PopupAdvanced:**  add cdkDragFreeDragPosition on cdkDrag element (DEJS-830) ([a0b8a616](https://github.com/DSI-HUG/dejajs-components/commit/a0b8a6169e7f1eb5f441b34bad5e33d51a5b0dc8))
* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **DatePicker:**
  *  update test ([3cc94641](https://github.com/DSI-HUG/dejajs-components/commit/3cc94641cd56cf95c80501863d30494b58ea0b52))
  *  Provide an input to manage the input ngModel updateOn option. Default to blur to keep the previous behavior (DEJS-846) ([55b25798](https://github.com/DSI-HUG/dejajs-components/commit/55b2579866da278f7a3bb442d5e48c8b74abee4a))
  *  Use (ngModelChange) instead of (change) (DEJS-846) ([650f638a](https://github.com/DSI-HUG/dejajs-components/commit/650f638adf20369b620f1c9b00fe2cf02c878cea))
* **Editor:**  writeValue must not change formControl state to dirty (DEJS-859) ([fa49745b](https://github.com/DSI-HUG/dejajs-components/commit/fa49745bce52c6209d72aebde6068e6feb43aa3d))
* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

#### 0.0.1 (2020-06-25)

##### Chores

* **deps:**
  *  bump websocket-extensions from 0.1.3 to 0.1.4 ([f9450074](https://github.com/DSI-HUG/dejajs-components/commit/f94500742312347b1ef89b1b2140dd5cf066db9e))
  *  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **Moment:**  Remove moment.js instead @angular/material-moment-adapter ([13828e89](https://github.com/DSI-HUG/dejajs-components/commit/13828e891bef26468d621c2e870a03b02e2a3503))
* **PopupAdvanced:**  add cdkDragFreeDragPosition on cdkDrag element (DEJS-830) ([a0b8a616](https://github.com/DSI-HUG/dejajs-components/commit/a0b8a6169e7f1eb5f441b34bad5e33d51a5b0dc8))
* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **DatePicker:**
  *  update test ([3cc94641](https://github.com/DSI-HUG/dejajs-components/commit/3cc94641cd56cf95c80501863d30494b58ea0b52))
  *  Provide an input to manage the input ngModel updateOn option. Default to blur to keep the previous behavior (DEJS-846) ([55b25798](https://github.com/DSI-HUG/dejajs-components/commit/55b2579866da278f7a3bb442d5e48c8b74abee4a))
  *  Use (ngModelChange) instead of (change) (DEJS-846) ([650f638a](https://github.com/DSI-HUG/dejajs-components/commit/650f638adf20369b620f1c9b00fe2cf02c878cea))
* **Editor:**  writeValue must not change formControl state to dirty (DEJS-859) ([fa49745b](https://github.com/DSI-HUG/dejajs-components/commit/fa49745bce52c6209d72aebde6068e6feb43aa3d))
* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

### 0.1.0 (2020-05-07)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **Moment:**  Remove moment.js instead @angular/material-moment-adapter ([13828e89](https://github.com/DSI-HUG/dejajs-components/commit/13828e891bef26468d621c2e870a03b02e2a3503))
* **PopupAdvanced:**  add cdkDragFreeDragPosition on cdkDrag element (DEJS-830) ([a0b8a616](https://github.com/DSI-HUG/dejajs-components/commit/a0b8a6169e7f1eb5f441b34bad5e33d51a5b0dc8))
* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

### 0.1.0 (2020-05-07)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **Moment:**  Remove moment.js instead @angular/material-moment-adapter ([13828e89](https://github.com/DSI-HUG/dejajs-components/commit/13828e891bef26468d621c2e870a03b02e2a3503))
* **PopupAdvanced:**  add cdkDragFreeDragPosition on cdkDrag element (DEJS-830) ([a0b8a616](https://github.com/DSI-HUG/dejajs-components/commit/a0b8a6169e7f1eb5f441b34bad5e33d51a5b0dc8))
* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

#### 0.0.1 (2020-04-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

#### 0.0.1 (2020-04-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Select:**  do not open the options panel on close clicked (DEJS-821) ([e6135747](https://github.com/DSI-HUG/dejajs-components/commit/e6135747450e25803ccac0a730ccc06fa0b144ec))
* **Popup:**  use the NG CDK drag to move popup (DEJS-819) ([80a2e518](https://github.com/DSI-HUG/dejajs-components/commit/80a2e518f4491d138ebb448fc6f9628b9944928c))
* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Popup:**  Reformat popup files ([67b872e5](https://github.com/DSI-HUG/dejajs-components/commit/67b872e553cd65e6fca53a04bfbd9d83724ff082))
* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

##### Tests

* **ColorPicker:**  fix the color picker background-color tests ([726d5020](https://github.com/DSI-HUG/dejajs-components/commit/726d5020fe745c937dd9f5c4d46f23a63c7f5473))
* **Chips:**  fix the chips on close tests (DEJS-821) ([168654aa](https://github.com/DSI-HUG/dejajs-components/commit/168654aa332332086804bc7ae275fc7a87c61fa9))

### 0.1.0 (2020-04-14)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

### 0.1.0 (2020-04-14)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### New Features

* **VersionService:**  Add a version service for each lib ([97362877](https://github.com/DSI-HUG/dejajs-components/commit/97362877640d8bc36e331e2337c0685553276280))

##### Bug Fixes

* **Global:**
  *  Fix build warnings ([328a1591](https://github.com/DSI-HUG/dejajs-components/commit/328a1591e21a5e8122118aea77c79ec50be714e6))
  *  Fix build warnings ([132ae5eb](https://github.com/DSI-HUG/dejajs-components/commit/132ae5eb7c2f5d9485ba18347584d32da7fa1613))
* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **Version:**  Add missing licenses ([8faa22b5](https://github.com/DSI-HUG/dejajs-components/commit/8faa22b5b5aa6b827d32c66cf44b2e174e1e8f91))
* //github.com/DSI-HUG/dejajs-components into dev ([76c15295](https://github.com/DSI-HUG/dejajs-components/commit/76c1529597f6f66be025e65178a3202a5c7f3111))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))
* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))

#### 0.0.1 (2020-04-08)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-04-08)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **MouseDragDrop:**  Fix drag and drop freeze in case of mouseleave during drag and drop. ([1f00fca1](https://github.com/DSI-HUG/dejajs-components/commit/1f00fca1b369942c41c7ebcd629d449645d4a952))
* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-04-01)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-04-01)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaTreeList:**  Remove useless formfield implementation ([63841337](https://github.com/DSI-HUG/dejajs-components/commit/638413370d9317ed8b99b694f05e99815fde8b7d))
* **SidenavComponent:**  sidenav should be opened if media query is xl ([74186c1c](https://github.com/DSI-HUG/dejajs-components/commit/74186c1c64e8dc422211ad2a2f7cb9d1342090fd))
* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TsConfig:**  Restore good config ([c2b7a3e3](https://github.com/DSI-HUG/dejajs-components/commit/c2b7a3e362f5f883d3a7f254f5ad685a600c08aa))
* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-03-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-03-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **TreeList:**  Fix selection issue due to the reactive form correction ([76c3d860](https://github.com/DSI-HUG/dejajs-components/commit/76c3d86068fb0a817dfb16569216a38806fa0d5a))
* **DejaEditor:**
  *  Wrap replace text with span to prevent truncation (DEJS-806) ([059e1b41](https://github.com/DSI-HUG/dejajs-components/commit/059e1b417fc4bad45d1903a8401c8d4f0052561c))
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-03-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **DejaEditor:**
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-03-27)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaTreelist:**  Fix reactive form compatibility ([5da4e1a1](https://github.com/DSI-HUG/dejajs-components/commit/5da4e1a1b071bd0d7e8860771c5a3ed972e38705))
* **DejaEditor:**
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **MediaService:**  Fix double event on media changed and filter only on matches events. ([6ee8ab61](https://github.com/DSI-HUG/dejajs-components/commit/6ee8ab618c6a3d38c217318eadf367904b654217))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

##### Other Changes

* **TreeListDemo:**
  *  Improvements followed by reviewer comments. ([a51d4d3b](https://github.com/DSI-HUG/dejajs-components/commit/a51d4d3bb1a1cde1e17c57c8fec889233d6fc903))
  *  Fix lint et test ([73172ed3](https://github.com/DSI-HUG/dejajs-components/commit/73172ed34a3ff23351b3ee0a6b6105e31274241f))
  *  Fix lint ([62f9b14d](https://github.com/DSI-HUG/dejajs-components/commit/62f9b14d8e8a9af70338a23e59fbdd5d1f0cc243))
* //github.com/DSI-HUG/dejajs-components into DEJS-801 ([6d0179f4](https://github.com/DSI-HUG/dejajs-components/commit/6d0179f4234e307d24c09b6d5c6b263637265a2c))

#### 0.0.1 (2020-03-25)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaEditor:**
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

#### 0.0.1 (2020-03-25)

##### Chores

* **deps:**  bump acorn from 6.4.0 to 6.4.1 ([cc1a6331](https://github.com/DSI-HUG/dejajs-components/commit/cc1a63314fa5c89698f45a0622073a91420dfe6c))

##### Bug Fixes

* **DejaEditor:**
  *  Do not listen to ready if destroyed ([a9808182](https://github.com/DSI-HUG/dejajs-components/commit/a98081820692bc22478a7dba980e4cffd60536af))
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))
* **Travis:**  Restore travis.yml for dev ([83108153](https://github.com/DSI-HUG/dejajs-components/commit/831081538efc04adbcfc92637e84e78bd5f50253))

## 1.0.0 (2020-02-24)

##### Bug Fixes

* **DejaEditor:**
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))

## 1.0.0 (2020-02-24)

##### Bug Fixes

* **DejaEditor:**
  *  Preserve html formatting on text insertion (DEJS-786) ([d457ba8e](https://github.com/DSI-HUG/dejajs-components/commit/d457ba8e43a2747d8067a15c8b4d0b5f75aaba30))
  *  Preserve html formatting on text insertion (DEJS-786) ([23cfcdb9](https://github.com/DSI-HUG/dejajs-components/commit/23cfcdb9dcfed410ed7165fa92978651f908f6a1))

#### 0.0.1 (2020-02-07)

##### New Features

* **MediaService:**  Add the possibility to provide some other definitions ([422bb126](https://github.com/DSI-HUG/dejajs-components/commit/422bb126b9a956be0b1c400377c23226543c532f))

##### Other Changes

* **TsLint:**  Fix TsLint ([b5606f89](https://github.com/DSI-HUG/dejajs-components/commit/b5606f895f43061d978a94cefcad7f17fcf5fa21))

##### Refactors

* **Demo:**  Remove @angular/flex-layout from the demo ([d540b97e](https://github.com/DSI-HUG/dejajs-components/commit/d540b97ecdc97982f565b3fccb7bdb870664d326))

#### 0.0.1 (2020-02-07)

##### New Features

* **MediaService:**  Add the possibility to provide some other definitions ([422bb126](https://github.com/DSI-HUG/dejajs-components/commit/422bb126b9a956be0b1c400377c23226543c532f))

##### Other Changes

* **TsLint:**  Fix TsLint ([b5606f89](https://github.com/DSI-HUG/dejajs-components/commit/b5606f895f43061d978a94cefcad7f17fcf5fa21))

##### Refactors

* **Demo:**  Remove @angular/flex-layout from the demo ([d540b97e](https://github.com/DSI-HUG/dejajs-components/commit/d540b97ecdc97982f565b3fccb7bdb870664d326))

#### 0.0.1 (2020-01-28)

##### Build System / Dependencies

* **deps:**  bump handlebars from 4.1.2 to 4.5.3 ([c979b59a](https://github.com/DSI-HUG/dejajs-components/commit/c979b59a548adc051ed6b73a925bb376a07b10d7))

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **numericStepper:**  add method focus to inputElement ([188738d0](https://github.com/DSI-HUG/dejajs-components/commit/188738d0214f0047512a8912d6484f3e819a3882))
* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **Sidenav:**  autosize sidenav ([0c358858](https://github.com/DSI-HUG/dejajs-components/commit/0c3588582f2e5f602a31bdb2453056a335c0dfbc))
* **NumericStepper:**
  *  Add the rangeValidator to existing validators instead of overwrite them (DEJS-761) ([485088ac](https://github.com/DSI-HUG/dejajs-components/commit/485088ac72b70c9538f33da24ca5cd03aaa26519))
  *  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **DejaSelect:**
  *  Fix undeclared event for FF ([83f1bae5](https://github.com/DSI-HUG/dejajs-components/commit/83f1bae584d9e7ec9c7c2089818ee5c05af9affb))
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **numericStepper:**
  *  when min and/or max null + add TU front ([4747a228](https://github.com/DSI-HUG/dejajs-components/commit/4747a22820666bdb515d0426e548fc6e808b9d11))
  *  Add coerceNumberProperty for min max and step ([6b82fd98](https://github.com/DSI-HUG/dejajs-components/commit/6b82fd98acee2a9fd4bd5331822ecad994c8cff8))
  *  The Validator min or max with value 0 didnt work ([cf07dc9f](https://github.com/DSI-HUG/dejajs-components/commit/cf07dc9fb4be7933d9d93f6a63bc09dd54cf614b))
* **MessageBox:**
  *  Apply message box theme on the first level cards only ([5c1c3e02](https://github.com/DSI-HUG/dejajs-components/commit/5c1c3e02e71790262c60d1d0cf799781a00596ff))
  *  Apply message box styling on the first level cards only ([82403d22](https://github.com/DSI-HUG/dejajs-components/commit/82403d225d8ca694957c12c5df3d7d7e7fdb17d2))
* **DejaViewPort:**  Fix coerce and buttonStep access ([adb63bbb](https://github.com/DSI-HUG/dejajs-components/commit/adb63bbbde65a39904e3f1ac090b8aaefc1ddcb2))
*  package.json to reduce vulnerabilities ([93efb904](https://github.com/DSI-HUG/dejajs-components/commit/93efb904f05149ee9002ff0a73cb8bbbede85e01))
* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* //github.com/DSI-HUG/dejajs-components into dev ([c216bfe9](https://github.com/DSI-HUG/dejajs-components/commit/c216bfe9ea9730f7d842b3096db0fbc51b30a1e8))
* //github.com/DSI-HUG/dejajs-components into dev ([6ad998b7](https://github.com/DSI-HUG/dejajs-components/commit/6ad998b760e5fe37cfb0dee26d29fbd236557bc6))
* **ci:**  yarn.lock ([99a5899f](https://github.com/DSI-HUG/dejajs-components/commit/99a5899f66b96b4dd1a62c9bd035b5781bd94f22))
* **DejaNumericStepper:**  Add UnitTest fo Numeric Stepper ([c2697e47](https://github.com/DSI-HUG/dejajs-components/commit/c2697e470cc301676367d5bf07a242246ff64db9))
* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 8.3.0 (2019-12-13)

##### New Features

* **NumericStepper:**  add method focus to inputElement ([188738d0](https://github.com/DSI-HUG/dejajs-components/commit/188738d0214f0047512a8912d6484f3e819a3882))

##### Bug Fixes

* **NumericStepper:**  The Validator min or max with value 0 didnt work ([cf07dc9f](https://github.com/DSI-HUG/dejajs-components/commit/cf07dc9fb4be7933d9d93f6a63bc09dd54cf614b))

#### 0.0.1 (2019-11-13)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **numericStepper:**
  *  when min and/or max null + add TU front ([4747a228](https://github.com/DSI-HUG/dejajs-components/commit/4747a22820666bdb515d0426e548fc6e808b9d11))
  *  Add coerceNumberProperty for min max and step ([6b82fd98](https://github.com/DSI-HUG/dejajs-components/commit/6b82fd98acee2a9fd4bd5331822ecad994c8cff8))
  *  The Validator min or max with value 0 didnt work ([cf07dc9f](https://github.com/DSI-HUG/dejajs-components/commit/cf07dc9fb4be7933d9d93f6a63bc09dd54cf614b))
* **MessageBox:**
  *  Apply message box theme on the first level cards only ([5c1c3e02](https://github.com/DSI-HUG/dejajs-components/commit/5c1c3e02e71790262c60d1d0cf799781a00596ff))
  *  Apply message box styling on the first level cards only ([82403d22](https://github.com/DSI-HUG/dejajs-components/commit/82403d225d8ca694957c12c5df3d7d7e7fdb17d2))
* **DejaViewPort:**  Fix coerce and buttonStep access ([adb63bbb](https://github.com/DSI-HUG/dejajs-components/commit/adb63bbbde65a39904e3f1ac090b8aaefc1ddcb2))
*  package.json to reduce vulnerabilities ([93efb904](https://github.com/DSI-HUG/dejajs-components/commit/93efb904f05149ee9002ff0a73cb8bbbede85e01))
* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **DejaNumericStepper:**  Add UnitTest fo Numeric Stepper ([c2697e47](https://github.com/DSI-HUG/dejajs-components/commit/c2697e470cc301676367d5bf07a242246ff64db9))
* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-11-12)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **numericStepper:**
  *  Add coerceNumberProperty for min max and step ([6b82fd98](https://github.com/DSI-HUG/dejajs-components/commit/6b82fd98acee2a9fd4bd5331822ecad994c8cff8))
  *  The Validator min or max with value 0 didnt work ([cf07dc9f](https://github.com/DSI-HUG/dejajs-components/commit/cf07dc9fb4be7933d9d93f6a63bc09dd54cf614b))
* **MessageBox:**  Apply message box styling on the first level cards only ([82403d22](https://github.com/DSI-HUG/dejajs-components/commit/82403d225d8ca694957c12c5df3d7d7e7fdb17d2))
* **DejaViewPort:**  Fix coerce and buttonStep access ([adb63bbb](https://github.com/DSI-HUG/dejajs-components/commit/adb63bbbde65a39904e3f1ac090b8aaefc1ddcb2))
*  package.json to reduce vulnerabilities ([93efb904](https://github.com/DSI-HUG/dejajs-components/commit/93efb904f05149ee9002ff0a73cb8bbbede85e01))
* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-11-05)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaViewPort:**  Fix coerce and buttonStep access ([adb63bbb](https://github.com/DSI-HUG/dejajs-components/commit/adb63bbbde65a39904e3f1ac090b8aaefc1ddcb2))
*  package.json to reduce vulnerabilities ([93efb904](https://github.com/DSI-HUG/dejajs-components/commit/93efb904f05149ee9002ff0a73cb8bbbede85e01))
* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-11-05)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaViewPort:**  Fix coerce and buttonStep access ([adb63bbb](https://github.com/DSI-HUG/dejajs-components/commit/adb63bbbde65a39904e3f1ac090b8aaefc1ddcb2))
*  package.json to reduce vulnerabilities ([93efb904](https://github.com/DSI-HUG/dejajs-components/commit/93efb904f05149ee9002ff0a73cb8bbbede85e01))
* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

### 0.1.0 (2019-10-31)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**
  *  Change colors of pop-up toolbar : *warn = orange / +danger = red (DEJS-735) ([5d868752](https://github.com/DSI-HUG/dejajs-components/commit/5d86875292ba239528b6a1b3d8542e322dab38a0))
  *  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **popup:**
  *  Do not generate dialog ID if already specified in configuration of popup ([88787d14](https://github.com/DSI-HUG/dejajs-components/commit/88787d14234ba62fd66c40b99304d807da4b03c5))
  *  Do not generate dialog ID if already specified in configuration of popup ([e107af99](https://github.com/DSI-HUG/dejajs-components/commit/e107af99fcc42ded34bd981c7ed76a2ea3f8446f))
* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **PopupConfigModel:**
  *  Remove redundant test (DEJS-730) ([c1bbc36f](https://github.com/DSI-HUG/dejajs-components/commit/c1bbc36fecfcbc617292c9edd4c0c5d79a0cea4e))
  *  Remove redundant test (DEJS-730) ([971c2be7](https://github.com/DSI-HUG/dejajs-components/commit/971c2be798405d2c642b88ed7f099170918811b8))
* **OverlayComponent:**  Fix TU ([ea666ad0](https://github.com/DSI-HUG/dejajs-components/commit/ea666ad0e320b16e22b906b7b87044451aaa6d81))
* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-10-23)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **OverlayComponent:**  Fix classname always added and never removed from OverlayComponent ([9253f0a4](https://github.com/DSI-HUG/dejajs-components/commit/9253f0a4cc85351be33e98a8ec887e65d0950aad))
* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **NumericStepper:**  TsLint ([7543f3c0](https://github.com/DSI-HUG/dejajs-components/commit/7543f3c0bc7f93d303d4c871f1747b070e097048))
* **TsConfig:**
  *  Revert TsConfig ([a3a07eef](https://github.com/DSI-HUG/dejajs-components/commit/a3a07eefb90774854ea36cc231df48308a54d99c))
  *  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-10-22)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaSelect:**
  *  Add default classes to avoid undefined as class name ([13731b64](https://github.com/DSI-HUG/dejajs-components/commit/13731b647ca15c9aa3c8ea5d5b620739d04e4afb))
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-10-22)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaSelect:**
  *  Bind backdrop and container class for DejaSelect ([51092801](https://github.com/DSI-HUG/dejajs-components/commit/51092801707f2c9688f6678ce886bd910f5182ba))
  *  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-10-17)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaEditor:**
  *  Call this.instance.setData asynchronously (DEJS-728) ([3137953d](https://github.com/DSI-HUG/dejajs-components/commit/3137953d6875d9c9a39c564fd9211577601f1bfc))
  *  Call this.instance.destroy asynchronously not this.instance.setData (DEJS-728) ([9967a1ff](https://github.com/DSI-HUG/dejajs-components/commit/9967a1ff94ed3dd60692b3713fdbabb04e34d14e))
  *  Call this.instance.setData asynchronously (DEJS-728) ([4a4779f1](https://github.com/DSI-HUG/dejajs-components/commit/4a4779f16298c00b196474b2900008f877cd77ad))
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))
* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-09-30)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **NumericStepper:**  Fix substract on float ([06e2d431](https://github.com/DSI-HUG/dejajs-components/commit/06e2d431c9cb2d8fc31b2537ccb134ad92c8fbd8))
* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-09-23)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([578258e2](https://github.com/DSI-HUG/dejajs-components/commit/578258e2e6305be149c769deb63bf9bbf568e89a))
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-09-23)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **TilesComponent:**
  *  Fix drag and drop and sizing when mouse leave component and go back again ([f904ecf6](https://github.com/DSI-HUG/dejajs-components/commit/f904ecf67a483d06347b914c783e9fd2a9f3e21a))
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **TsConfig:**  Add unused variables flags ([77a040f9](https://github.com/DSI-HUG/dejajs-components/commit/77a040f9a6f3c5f65df50c6598af27d1e2ae9d1d))
* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-09-13)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **TilesComponent:**
  *  Fix cursor at mouse up leave if not design mode ([278e8b91](https://github.com/DSI-HUG/dejajs-components/commit/278e8b91cb479990915651720d9b09557563485a))
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-09-13)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **TilesComponent:**
  *  fix drop transparency ([e2adda9e](https://github.com/DSI-HUG/dejajs-components/commit/e2adda9e916e3a18f8c8e0e37c12f5b0bdd72b27))
  *  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

### 0.1.0 (2019-09-13)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **PopupToolbar:**  Fix [#513](https://github.com/DSI-HUG/dejajs-components/pull/513) - Always apply the configured color in pop-up toolbar (DEJS-711) ([2f5d42cd](https://github.com/DSI-HUG/dejajs-components/commit/2f5d42cd97d0849cd4ea4e7a799cc57812243e59))
* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **TilesComponent:**  Inprove drag and drop usability ([8acf2175](https://github.com/DSI-HUG/dejajs-components/commit/8acf21751a15ec035bca6e1b197ec666a44620c4))
* **Global:**
  *  Ensure CoerceBooleanProperty for boolean Input() values ([9acf2bf8](https://github.com/DSI-HUG/dejajs-components/commit/9acf2bf83c18046ad607a9833ad4bb7786c98dc3))
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **DejaTiles:**
  *  Avoid null pointer on move ([0b9dee72](https://github.com/DSI-HUG/dejajs-components/commit/0b9dee7238a7348a9bb93431c6bb0044a8eac12e))
  *  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-08-14)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaTiles:**  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **Global:**
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-08-14)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **ContentEditable:**  Removed useless first on observables ([1ea66213](https://github.com/DSI-HUG/dejajs-components/commit/1ea6621381ad52d00e6f3e64ee471343c0bab376))
* **DejaSelect:**  Fix possible null pointer on the select dropdown ([6bb44193](https://github.com/DSI-HUG/dejajs-components/commit/6bb44193dc45b7a65e7dc3198adbbb33ae46af19))
* **DejaTiles:**  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **Global:**
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-24)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DejaTiles:**  Fix text aligment in TileGroup ([34340aa9](https://github.com/DSI-HUG/dejajs-components/commit/34340aa91223e5988f41830f6c274ecebf58a6e4))
* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **Global:**
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-23)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **DatePicker:**  add markForCheck in date-picker disabled ([35431123](https://github.com/DSI-HUG/dejajs-components/commit/35431123aaae33eb797174e567862a91c8c7f6fb))
* **Global:**
  *  No Implicit as any + lint ([1118243b](https://github.com/DSI-HUG/dejajs-components/commit/1118243b23244103b242b7e12578e35a79a4c30b))
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **Global:**  No unused for libs ([b562fc98](https://github.com/DSI-HUG/dejajs-components/commit/b562fc988e77a461177c2d758741b816d8bc1763))
* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-18)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **Global:**
  *  Fix import path for @deja-js/component ([626ec0f9](https://github.com/DSI-HUG/dejajs-components/commit/626ec0f906f2b580b1f4fc75fba63d0df7644dc4))
  *  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **tsconfig:**  Fix path resolution for demo ([70aba42f](https://github.com/DSI-HUG/dejajs-components/commit/70aba42f6e11b5d88e091c4c9b26641d852bb026))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-17)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **Global:**  Fix dependencies ([a13d8bb6](https://github.com/DSI-HUG/dejajs-components/commit/a13d8bb697b9453f9ed483bd1f47d9e18b7064a5))
* **SideNav:**  Fix icon binding ([8e673b34](https://github.com/DSI-HUG/dejajs-components/commit/8e673b34a3f08aca1ed2e68a3deadcf51fbd03fa))
* **package.json:**
  *  Fix dependencies ([1ba589a2](https://github.com/DSI-HUG/dejajs-components/commit/1ba589a2db86e7af34694cd8e3595ba127481a94))
  *  Removed useless flex layout peer dependency ([90e1e094](https://github.com/DSI-HUG/dejajs-components/commit/90e1e094db76b283fbe428851e2e45dba92f7bdb))
* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-12)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-12)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **SlimScrollOptions:**  Fix wheelDelta in modern browsers (replaced by deltaY) ([86a1cffb](https://github.com/DSI-HUG/dejajs-components/commit/86a1cffb28d11699a3c4da1e6071260c7aed67d7))
* **DatePickerComponent:**  Add inline property to icons to make them smaller ([71a65df2](https://github.com/DSI-HUG/dejajs-components/commit/71a65df2d7f934b6dc044c59099b4149d5a69fcf))
* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-10)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

#### 0.0.1 (2019-07-10)

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))

##### Bug Fixes

* **AppRoute:**  Fix routing for iframe that causing an error at the build ([d7c99421](https://github.com/DSI-HUG/dejajs-components/commit/d7c994211cbb728996eb5c68eea2c21c5de21717))
* **Test:**  Fix imports ([04601b54](https://github.com/DSI-HUG/dejajs-components/commit/04601b545343a75772e4ec39d9def6421340d140))
* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **PopupComponent:**
  *  Remove iframe from navigation menu ([c3834add](https://github.com/DSI-HUG/dejajs-components/commit/c3834add4c84f7f800fa90044ab7392caeaf87e9))
  *  Fix the pop-up moving event especially when included in iframe ([0dfc648e](https://github.com/DSI-HUG/dejajs-components/commit/0dfc648e222dc4da2a547af230eda6e9172da54d))
* **DejaEditor:**
  *  Fix the bug that occurs when we try to destroy a ckEditor that is not already fully initialized by waiting the ready state when destroying ([d9cf33c6](https://github.com/DSI-HUG/dejajs-components/commit/d9cf33c6abe5c0811930994ee016dc280a3fd9fb))
  *  Clone config to avoid error due to its reuse ([d07c95a3](https://github.com/DSI-HUG/dejajs-components/commit/d07c95a3173ed05975c6ef6380cbd734261fe17a))

##### Other Changes

* **DejaEditorComponent:**  Add the underscore to fix the ts-lint error with function param not used ([87cedb5f](https://github.com/DSI-HUG/dejajs-components/commit/87cedb5fafdbe6b10fbe4cc71a3e724aa64bc9d2))

## 8.0.0 (2019-06-24)

##### Chores

* **release:**  bump version number to 4.2.2 ([9e43e6d1](https://github.com/DSI-HUG/dejajs-components/commit/9e43e6d1ee542daa80dd75f18f64c571327c60e9))

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))
* **Libraries:**  Update CLI + split demo and projects tsConfig for build ([61197104](https://github.com/DSI-HUG/dejajs-components/commit/611971043080857ca480ae7a3c7afeee8a2e9226))
* **Global:**
  *  add package-lock ([b4231057](https://github.com/DSI-HUG/dejajs-components/commit/b4231057279ce855248c6cf309cfd0b202f6c999))
  *  fix config ([330112b4](https://github.com/DSI-HUG/dejajs-components/commit/330112b401d762d3dee70c9147e0f8f06b2dbc34))
* **Demo:**  Build --prod ([cfe1626f](https://github.com/DSI-HUG/dejajs-components/commit/cfe1626f6e429887c1afa35d3b4426d27ec4ce9f))
* **Travis:**
  *  Demo deployment ([059180ae](https://github.com/DSI-HUG/dejajs-components/commit/059180aebb0cd67233eb5810c94f7e5386f4bfb3))
  *  Next test ([f54c255a](https://github.com/DSI-HUG/dejajs-components/commit/f54c255afe10f9ff0afc956e31a939a1392f0e83))
  *  Fix config ([7757a8a3](https://github.com/DSI-HUG/dejajs-components/commit/7757a8a33388e9da604b2e22509d0ae2879c1185))
  *  Move builds ([bcd726ab](https://github.com/DSI-HUG/dejajs-components/commit/bcd726abe8a168550a732cf05704df0499b35242))
  *  Add jobs on travis.yml ([7d5c0939](https://github.com/DSI-HUG/dejajs-components/commit/7d5c0939d3b2021ad665f505b40ee49d5781fd92))
  *  next try... ([f9103070](https://github.com/DSI-HUG/dejajs-components/commit/f9103070307a58f8e63c817cbb4b78a201bc603c))
  *  Add config ([c7aa0b60](https://github.com/DSI-HUG/dejajs-components/commit/c7aa0b60dd9981edb1633ee16bc1172f855f2989))
  *  add ls for debug ([1fdd4006](https://github.com/DSI-HUG/dejajs-components/commit/1fdd4006fd05e70942d538c546df9e72376538d2))
  *  revert windows configuration ([84235018](https://github.com/DSI-HUG/dejajs-components/commit/84235018e7a4ba3d3cd92b92c14baa4594fe1179))
  *  increase memory limit ([15abf4e6](https://github.com/DSI-HUG/dejajs-components/commit/15abf4e634e3007aa1712af91545973981b0099f))
  *  Try to use windows ([e0010e07](https://github.com/DSI-HUG/dejajs-components/commit/e0010e07164bacb68649fe8dbb92910a6f3ada21))
  *  node_js 10 ([7734b233](https://github.com/DSI-HUG/dejajs-components/commit/7734b2331091b22568fa912d39e414555a13af14))
  *  Remove nodeJs 8 forcing ([0489d430](https://github.com/DSI-HUG/dejajs-components/commit/0489d4301271e528099e7b0ee3f1ad333354d280))
* **Scripts:**
  *  fix npm-check-updates properties (v3) ([78a83c57](https://github.com/DSI-HUG/dejajs-components/commit/78a83c578e2f3d05a0226341208321d0694e1d20))
  *  Update tag.sh ([eff6a0dc](https://github.com/DSI-HUG/dejajs-components/commit/eff6a0dcb6de670c38442182c11358cc38c09301))
* **npmignore:**  ignore .scannerwork files ([b550bf73](https://github.com/DSI-HUG/dejajs-components/commit/b550bf73a7e6d6e2c3408a1fd41369826b022863))
* **Build:**  increase max-old-space-size un build:lib ([5b56de3f](https://github.com/DSI-HUG/dejajs-components/commit/5b56de3f801ca2fa9bc5af7b48de54744471d6a6))
* **Test:**  single run ([f9f0d248](https://github.com/DSI-HUG/dejajs-components/commit/f9f0d24840618e3597e1abc29e34c8ce3e53096d))
* **Core:**  fix test config ([ef9ffd8d](https://github.com/DSI-HUG/dejajs-components/commit/ef9ffd8d591157344c77f87c3095ef6cf165a5b1))

##### Documentation Changes

* **Global:**  documentation improvement ([ecb1b93f](https://github.com/DSI-HUG/dejajs-components/commit/ecb1b93ff4435084942c6cd1489b5b331d04c28d))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))
* **Style:**  add mixins for custom material theme ([8c6d1675](https://github.com/DSI-HUG/dejajs-components/commit/8c6d1675d6e3535467dfc5a8cf22cb7eebdd60ff))
* **Tiles:**  Merge 4.x.x modifications for tiles component ([93f94dd1](https://github.com/DSI-HUG/dejajs-components/commit/93f94dd1c4e3011b01b35be597efe2155a9779cf))
* **TilesComponent:**  Change interfaces to classes ([0e711c04](https://github.com/DSI-HUG/dejajs-components/commit/0e711c040ddc3f69fec611c2ce2f7ff17b9d9d19))

##### Bug Fixes

* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **TilesComponent:**
  *  Fix tests ([1dc4c06b](https://github.com/DSI-HUG/dejajs-components/commit/1dc4c06b61b5ff6391ecefe40ceeb31e66650af9))
  *  Fix container auto height ([b8ecf4b7](https://github.com/DSI-HUG/dejajs-components/commit/b8ecf4b7af39505460b74510790b7450b7311ccf))
  *  Fix container auto height ([3908c5a6](https://github.com/DSI-HUG/dejajs-components/commit/3908c5a67e4224f5ea6287b5769aa002375870a3))
* **TilesGroupComponent:**  Fix _designMode must be public with @HostBinding ([09862aab](https://github.com/DSI-HUG/dejajs-components/commit/09862aab511f7063a927e1561f283e5a43f53670))
* **TsLint:**  Lint errors ([ae750b21](https://github.com/DSI-HUG/dejajs-components/commit/ae750b21aed4d722a8e0492c93b25c6642c06ed6))
* **Cron:**  Fix version for npm-check-updates at 2.15.0 ([99e644fe](https://github.com/DSI-HUG/dejajs-components/commit/99e644fe1fac40534b8de7c8e8f385d401c47f5a))
* **cron:**  Fix build fail for cron ([31f1e5a8](https://github.com/DSI-HUG/dejajs-components/commit/31f1e5a8552c2078ef06c15cb99ade9c6b388f1a))
* **Package.json:**  Version for cron script ([91e61208](https://github.com/DSI-HUG/dejajs-components/commit/91e61208ddc2c7d8bcfab3e98ef54849f6ea63d8))
* **MarkDown:**  Fix 404 for prism.css ([1929f492](https://github.com/DSI-HUG/dejajs-components/commit/1929f4928ea7d975480a154064cc7e7b6f68ef00))
* **DejaDatePicker:**  Place the cursor at the beginning of the input if empty. ([098174c4](https://github.com/DSI-HUG/dejajs-components/commit/098174c4bed882d0a2c728dfd201b8bea31c8e57))
* **ItemListBase:**  Fix possible null pointer on listElement ([8a982706](https://github.com/DSI-HUG/dejajs-components/commit/8a98270603d55072e301674dd2793adcde36a33e))
* **SnackBar:**  Possible null pointer exception on alignments ([80773cdd](https://github.com/DSI-HUG/dejajs-components/commit/80773cdd8b59b459b06f73536ecb77f0b7f2ad4f))
* **DejaEditor:**  Replace function must refresh the formControl and must replace the last matching character. ([035c6c62](https://github.com/DSI-HUG/dejajs-components/commit/035c6c626c79d93ed5ce53cc681e70f626ad66bf))
* **Demo:**
  *  Update polyfills + beta.6 ([a58f6b0e](https://github.com/DSI-HUG/dejajs-components/commit/a58f6b0e1b42bf7efca52fa7564da67339defeec))
  *  fix tiles demo.... ([810d78f1](https://github.com/DSI-HUG/dejajs-components/commit/810d78f1ef082253a41ea8f58bb87dc157684ca4))
* **Testing:**  Fix tiles test + test config ([b5504fba](https://github.com/DSI-HUG/dejajs-components/commit/b5504fba4f55acec4838026b129a604dc06b7395))
* **DejaTilesModule:**  Remove changes on imports and private access on template ([5d715ee8](https://github.com/DSI-HUG/dejajs-components/commit/5d715ee8a3a7ecff1803d09afe45b9b06d73e098))
* **TilesLayoutProvider:**  Fix possible null pointer after timer elapsed ([12ce61ce](https://github.com/DSI-HUG/dejajs-components/commit/12ce61cebb5002d464a4edf439bacf3036617786))
* **TileGroup:**
  *  Prevent multiple instance of editor ([4f4f0251](https://github.com/DSI-HUG/dejajs-components/commit/4f4f0251388ad542623570984f081c784553604a))
  *  Fix inverted buttons ([269c4a2b](https://github.com/DSI-HUG/dejajs-components/commit/269c4a2bb536cc64e5bc56f89dc5d78d7fbfd930))
  *  Avoid action position in the text area ([9b7eb9eb](https://github.com/DSI-HUG/dejajs-components/commit/9b7eb9eb9df3f7b2738b0c6d028d1a76f1c7d51c))
* **TileLayoutProvider:**  Keep bounds on paste ([db8bada8](https://github.com/DSI-HUG/dejajs-components/commit/db8bada8295a4a2d16cdb2e92ea6cb2687cfe502))
* **OverlayComponent:**  Manage the input on the isMobile to disable mediaService updating (DEJS-632) ([d4b0e9d1](https://github.com/DSI-HUG/dejajs-components/commit/d4b0e9d1aad2b70d2e51705b584f39cb060388da))
* **NumericStepperComponent:**  Fix numeric stepper button add/minus display. ([6c56eecb](https://github.com/DSI-HUG/dejajs-components/commit/6c56eecbf018405bd170dc6a692b96b9ee10faff))
* **CiruclarPickerComponent:**  Use classList.add instead of className concatenation on body element to avoid concatenation error (missing white space) ([ae6a21a2](https://github.com/DSI-HUG/dejajs-components/commit/ae6a21a2c789a1fa58241c67e2836f3e55a19aaf))
* **config:**  link demo app with sources instead of dist ([90e522e6](https://github.com/DSI-HUG/dejajs-components/commit/90e522e69b706094ae32c165b1470262722f0dbb))
* **DejaTag:**  fix deja-tag not notifying parent on chip close ([cf2c0155](https://github.com/DSI-HUG/dejajs-components/commit/cf2c0155290bd57544ec1c55d8b1f1f9400c6b47))
* **DejaGridComponentTest:**  fix typing ([c75bb7fb](https://github.com/DSI-HUG/dejajs-components/commit/c75bb7fb4ab82c2ade268abcf4a2107fb86bb1bc))
* **core/util:**  rename public_api ([0d5de141](https://github.com/DSI-HUG/dejajs-components/commit/0d5de141f2578632ce71f5b003972583c708bf77))
*  package.json to reduce vulnerabilities ([2c9846b1](https://github.com/DSI-HUG/dejajs-components/commit/2c9846b11bfccb197fbea93badf6c9030cf13160))
*  package.json to reduce vulnerabilities ([50a6e9f6](https://github.com/DSI-HUG/dejajs-components/commit/50a6e9f66bb6b4d0381c1c3c6942dcea0233cd8d))

##### Other Changes

* **Global:**
  *  Update Dependencies ([fc91d8b7](https://github.com/DSI-HUG/dejajs-components/commit/fc91d8b79c2b1077ebe40f8499ced09298a503c5))
  *  yarn.lock ([e76da697](https://github.com/DSI-HUG/dejajs-components/commit/e76da6974f97fcbab07a60007d714ad3f6d9f5f1))
* **package-lock.json:**
  *  Removed from github ([9cd02fa7](https://github.com/DSI-HUG/dejajs-components/commit/9cd02fa7da605c14bc17ae8a276327719188079b))
  *  Removed from github ([b9390e07](https://github.com/DSI-HUG/dejajs-components/commit/b9390e071964f304060da008777011c03a637786))
* **OverlayComponent:**  Remove useless use of coerceBooleanProperty (DEJS-632) ([9bb66321](https://github.com/DSI-HUG/dejajs-components/commit/9bb66321e824e9e88f3362cc2aa9f7aca1aa1b7e))

##### Refactors

* **Global:**  Using @angular/cli@7.x.x to generate library ([100312c6](https://github.com/DSI-HUG/dejajs-components/commit/100312c6e344c143988ff59f038038a976306cc9))

##### Tests

* **DejaTileComponent:**  Fix test ([c55ae13c](https://github.com/DSI-HUG/dejajs-components/commit/c55ae13cfbbebe899d029604b0446a618d34aef7))

## 1.0.0 (2019-06-24)

##### Chores

* **release:**  bump version number to 4.2.2 ([9e43e6d1](https://github.com/DSI-HUG/dejajs-components/commit/9e43e6d1ee542daa80dd75f18f64c571327c60e9))

##### Continuous Integration

* **Dependencies:**  Update peerDependencies ([a580a89f](https://github.com/DSI-HUG/dejajs-components/commit/a580a89f180b725926a6fe6515df4af0b7e4fb9a))
* **Libraries:**  Update CLI + split demo and projects tsConfig for build ([61197104](https://github.com/DSI-HUG/dejajs-components/commit/611971043080857ca480ae7a3c7afeee8a2e9226))
* **Global:**
  *  add package-lock ([b4231057](https://github.com/DSI-HUG/dejajs-components/commit/b4231057279ce855248c6cf309cfd0b202f6c999))
  *  fix config ([330112b4](https://github.com/DSI-HUG/dejajs-components/commit/330112b401d762d3dee70c9147e0f8f06b2dbc34))
* **Demo:**  Build --prod ([cfe1626f](https://github.com/DSI-HUG/dejajs-components/commit/cfe1626f6e429887c1afa35d3b4426d27ec4ce9f))
* **Travis:**
  *  Demo deployment ([059180ae](https://github.com/DSI-HUG/dejajs-components/commit/059180aebb0cd67233eb5810c94f7e5386f4bfb3))
  *  Next test ([f54c255a](https://github.com/DSI-HUG/dejajs-components/commit/f54c255afe10f9ff0afc956e31a939a1392f0e83))
  *  Fix config ([7757a8a3](https://github.com/DSI-HUG/dejajs-components/commit/7757a8a33388e9da604b2e22509d0ae2879c1185))
  *  Move builds ([bcd726ab](https://github.com/DSI-HUG/dejajs-components/commit/bcd726abe8a168550a732cf05704df0499b35242))
  *  Add jobs on travis.yml ([7d5c0939](https://github.com/DSI-HUG/dejajs-components/commit/7d5c0939d3b2021ad665f505b40ee49d5781fd92))
  *  next try... ([f9103070](https://github.com/DSI-HUG/dejajs-components/commit/f9103070307a58f8e63c817cbb4b78a201bc603c))
  *  Add config ([c7aa0b60](https://github.com/DSI-HUG/dejajs-components/commit/c7aa0b60dd9981edb1633ee16bc1172f855f2989))
  *  add ls for debug ([1fdd4006](https://github.com/DSI-HUG/dejajs-components/commit/1fdd4006fd05e70942d538c546df9e72376538d2))
  *  revert windows configuration ([84235018](https://github.com/DSI-HUG/dejajs-components/commit/84235018e7a4ba3d3cd92b92c14baa4594fe1179))
  *  increase memory limit ([15abf4e6](https://github.com/DSI-HUG/dejajs-components/commit/15abf4e634e3007aa1712af91545973981b0099f))
  *  Try to use windows ([e0010e07](https://github.com/DSI-HUG/dejajs-components/commit/e0010e07164bacb68649fe8dbb92910a6f3ada21))
  *  node_js 10 ([7734b233](https://github.com/DSI-HUG/dejajs-components/commit/7734b2331091b22568fa912d39e414555a13af14))
  *  Remove nodeJs 8 forcing ([0489d430](https://github.com/DSI-HUG/dejajs-components/commit/0489d4301271e528099e7b0ee3f1ad333354d280))
* **Scripts:**
  *  fix npm-check-updates properties (v3) ([78a83c57](https://github.com/DSI-HUG/dejajs-components/commit/78a83c578e2f3d05a0226341208321d0694e1d20))
  *  Update tag.sh ([eff6a0dc](https://github.com/DSI-HUG/dejajs-components/commit/eff6a0dcb6de670c38442182c11358cc38c09301))
* **npmignore:**  ignore .scannerwork files ([b550bf73](https://github.com/DSI-HUG/dejajs-components/commit/b550bf73a7e6d6e2c3408a1fd41369826b022863))
* **Build:**  increase max-old-space-size un build:lib ([5b56de3f](https://github.com/DSI-HUG/dejajs-components/commit/5b56de3f801ca2fa9bc5af7b48de54744471d6a6))
* **Test:**  single run ([f9f0d248](https://github.com/DSI-HUG/dejajs-components/commit/f9f0d24840618e3597e1abc29e34c8ce3e53096d))
* **Core:**  fix test config ([ef9ffd8d](https://github.com/DSI-HUG/dejajs-components/commit/ef9ffd8d591157344c77f87c3095ef6cf165a5b1))

##### Documentation Changes

* **Global:**  documentation improvement ([ecb1b93f](https://github.com/DSI-HUG/dejajs-components/commit/ecb1b93ff4435084942c6cd1489b5b331d04c28d))

##### New Features

* **Material8:**  Update to Material 8 ([27ef07e0](https://github.com/DSI-HUG/dejajs-components/commit/27ef07e064c73c52965b0213c99d2f72f8d76e8a))
* **Angular8:**  Update to Angular 8 ([5c778ee0](https://github.com/DSI-HUG/dejajs-components/commit/5c778ee0ce33c2db9aa2f5187e3d833cc4ff9576))
* **Style:**  add mixins for custom material theme ([8c6d1675](https://github.com/DSI-HUG/dejajs-components/commit/8c6d1675d6e3535467dfc5a8cf22cb7eebdd60ff))
* **Tiles:**  Merge 4.x.x modifications for tiles component ([93f94dd1](https://github.com/DSI-HUG/dejajs-components/commit/93f94dd1c4e3011b01b35be597efe2155a9779cf))
* **TilesComponent:**  Change interfaces to classes ([0e711c04](https://github.com/DSI-HUG/dejajs-components/commit/0e711c040ddc3f69fec611c2ce2f7ff17b9d9d19))

##### Bug Fixes

* **input-mixin:**  Add license ([9bd72981](https://github.com/DSI-HUG/dejajs-components/commit/9bd72981f31c3bb4e370cb8ea7300e4c8226e0aa))
* **TilesComponent:**
  *  Fix tests ([1dc4c06b](https://github.com/DSI-HUG/dejajs-components/commit/1dc4c06b61b5ff6391ecefe40ceeb31e66650af9))
  *  Fix container auto height ([b8ecf4b7](https://github.com/DSI-HUG/dejajs-components/commit/b8ecf4b7af39505460b74510790b7450b7311ccf))
  *  Fix container auto height ([3908c5a6](https://github.com/DSI-HUG/dejajs-components/commit/3908c5a67e4224f5ea6287b5769aa002375870a3))
* **TilesGroupComponent:**  Fix _designMode must be public with @HostBinding ([09862aab](https://github.com/DSI-HUG/dejajs-components/commit/09862aab511f7063a927e1561f283e5a43f53670))
* **TsLint:**  Lint errors ([ae750b21](https://github.com/DSI-HUG/dejajs-components/commit/ae750b21aed4d722a8e0492c93b25c6642c06ed6))
* **Cron:**  Fix version for npm-check-updates at 2.15.0 ([99e644fe](https://github.com/DSI-HUG/dejajs-components/commit/99e644fe1fac40534b8de7c8e8f385d401c47f5a))
* **cron:**  Fix build fail for cron ([31f1e5a8](https://github.com/DSI-HUG/dejajs-components/commit/31f1e5a8552c2078ef06c15cb99ade9c6b388f1a))
* **Package.json:**  Version for cron script ([91e61208](https://github.com/DSI-HUG/dejajs-components/commit/91e61208ddc2c7d8bcfab3e98ef54849f6ea63d8))
* **MarkDown:**  Fix 404 for prism.css ([1929f492](https://github.com/DSI-HUG/dejajs-components/commit/1929f4928ea7d975480a154064cc7e7b6f68ef00))
* **DejaDatePicker:**  Place the cursor at the beginning of the input if empty. ([098174c4](https://github.com/DSI-HUG/dejajs-components/commit/098174c4bed882d0a2c728dfd201b8bea31c8e57))
* **ItemListBase:**  Fix possible null pointer on listElement ([8a982706](https://github.com/DSI-HUG/dejajs-components/commit/8a98270603d55072e301674dd2793adcde36a33e))
* **SnackBar:**  Possible null pointer exception on alignments ([80773cdd](https://github.com/DSI-HUG/dejajs-components/commit/80773cdd8b59b459b06f73536ecb77f0b7f2ad4f))
* **DejaEditor:**  Replace function must refresh the formControl and must replace the last matching character. ([035c6c62](https://github.com/DSI-HUG/dejajs-components/commit/035c6c626c79d93ed5ce53cc681e70f626ad66bf))
* **Demo:**
  *  Update polyfills + beta.6 ([a58f6b0e](https://github.com/DSI-HUG/dejajs-components/commit/a58f6b0e1b42bf7efca52fa7564da67339defeec))
  *  fix tiles demo.... ([810d78f1](https://github.com/DSI-HUG/dejajs-components/commit/810d78f1ef082253a41ea8f58bb87dc157684ca4))
* **Testing:**  Fix tiles test + test config ([b5504fba](https://github.com/DSI-HUG/dejajs-components/commit/b5504fba4f55acec4838026b129a604dc06b7395))
* **DejaTilesModule:**  Remove changes on imports and private access on template ([5d715ee8](https://github.com/DSI-HUG/dejajs-components/commit/5d715ee8a3a7ecff1803d09afe45b9b06d73e098))
* **TilesLayoutProvider:**  Fix possible null pointer after timer elapsed ([12ce61ce](https://github.com/DSI-HUG/dejajs-components/commit/12ce61cebb5002d464a4edf439bacf3036617786))
* **TileGroup:**
  *  Prevent multiple instance of editor ([4f4f0251](https://github.com/DSI-HUG/dejajs-components/commit/4f4f0251388ad542623570984f081c784553604a))
  *  Fix inverted buttons ([269c4a2b](https://github.com/DSI-HUG/dejajs-components/commit/269c4a2bb536cc64e5bc56f89dc5d78d7fbfd930))
  *  Avoid action position in the text area ([9b7eb9eb](https://github.com/DSI-HUG/dejajs-components/commit/9b7eb9eb9df3f7b2738b0c6d028d1a76f1c7d51c))
* **TileLayoutProvider:**  Keep bounds on paste ([db8bada8](https://github.com/DSI-HUG/dejajs-components/commit/db8bada8295a4a2d16cdb2e92ea6cb2687cfe502))
* **OverlayComponent:**  Manage the input on the isMobile to disable mediaService updating (DEJS-632) ([d4b0e9d1](https://github.com/DSI-HUG/dejajs-components/commit/d4b0e9d1aad2b70d2e51705b584f39cb060388da))
* **NumericStepperComponent:**  Fix numeric stepper button add/minus display. ([6c56eecb](https://github.com/DSI-HUG/dejajs-components/commit/6c56eecbf018405bd170dc6a692b96b9ee10faff))
* **CiruclarPickerComponent:**  Use classList.add instead of className concatenation on body element to avoid concatenation error (missing white space) ([ae6a21a2](https://github.com/DSI-HUG/dejajs-components/commit/ae6a21a2c789a1fa58241c67e2836f3e55a19aaf))
* **config:**  link demo app with sources instead of dist ([90e522e6](https://github.com/DSI-HUG/dejajs-components/commit/90e522e69b706094ae32c165b1470262722f0dbb))
* **DejaTag:**  fix deja-tag not notifying parent on chip close ([cf2c0155](https://github.com/DSI-HUG/dejajs-components/commit/cf2c0155290bd57544ec1c55d8b1f1f9400c6b47))
* **DejaGridComponentTest:**  fix typing ([c75bb7fb](https://github.com/DSI-HUG/dejajs-components/commit/c75bb7fb4ab82c2ade268abcf4a2107fb86bb1bc))
* **core/util:**  rename public_api ([0d5de141](https://github.com/DSI-HUG/dejajs-components/commit/0d5de141f2578632ce71f5b003972583c708bf77))
*  package.json to reduce vulnerabilities ([2c9846b1](https://github.com/DSI-HUG/dejajs-components/commit/2c9846b11bfccb197fbea93badf6c9030cf13160))
*  package.json to reduce vulnerabilities ([50a6e9f6](https://github.com/DSI-HUG/dejajs-components/commit/50a6e9f66bb6b4d0381c1c3c6942dcea0233cd8d))

##### Other Changes

* **Global:**
  *  Update Dependencies ([fc91d8b7](https://github.com/DSI-HUG/dejajs-components/commit/fc91d8b79c2b1077ebe40f8499ced09298a503c5))
  *  yarn.lock ([e76da697](https://github.com/DSI-HUG/dejajs-components/commit/e76da6974f97fcbab07a60007d714ad3f6d9f5f1))
* **package-lock.json:**
  *  Removed from github ([9cd02fa7](https://github.com/DSI-HUG/dejajs-components/commit/9cd02fa7da605c14bc17ae8a276327719188079b))
  *  Removed from github ([b9390e07](https://github.com/DSI-HUG/dejajs-components/commit/b9390e071964f304060da008777011c03a637786))
* **OverlayComponent:**  Remove useless use of coerceBooleanProperty (DEJS-632) ([9bb66321](https://github.com/DSI-HUG/dejajs-components/commit/9bb66321e824e9e88f3362cc2aa9f7aca1aa1b7e))

##### Refactors

* **Global:**  Using @angular/cli@7.x.x to generate library ([100312c6](https://github.com/DSI-HUG/dejajs-components/commit/100312c6e344c143988ff59f038038a976306cc9))

##### Tests

* **DejaTileComponent:**  Fix test ([c55ae13c](https://github.com/DSI-HUG/dejajs-components/commit/c55ae13cfbbebe899d029604b0446a618d34aef7))

<a name="4.2.3"></a>
## [4.2.3](https://github.com/DSI-HUG/dejajs-components/compare/v4.2.2...v4.2.3) (2019-02-21)


### Bug Fixes

* **DejaDatePickerComponent:** default date is now set to null ([f9c42fa](https://github.com/DSI-HUG/dejajs-components/commit/f9c42fa))


<a name="4.2.2"></a>
## [4.2.2](https://github.com/DSI-HUG/dejajs-components/compare/v4.2.1...v4.2.2) (2019-02-13)


### Bug Fixes

* **DejaNumericStepperComponent:** value "null" is now settable ([e166c4f](https://github.com/DSI-HUG/dejajs-components/commit/e166c4f))



<a name="4.2.1"></a>
## [4.2.1](https://github.com/DSI-HUG/dejajs-components/compare/v4.2.0...v4.2.1) (2019-02-05)


### Bug Fixes

* **DejaTiles:** Missing exports ([0e4239b](https://github.com/DSI-HUG/dejajs-components/commit/0e4239b))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/DSI-HUG/dejajs-components/compare/v4.1.2...v4.2.0) (2019-02-05)


### Bug Fixes

* **DejaTiles:** Adjust tiles padding ([62b5693](https://github.com/DSI-HUG/dejajs-components/commit/62b5693))
* **TileGroup:** Fix import ([82e77df](https://github.com/DSI-HUG/dejajs-components/commit/82e77df))
* **TileGroup:** Fix imports ([bf21b23](https://github.com/DSI-HUG/dejajs-components/commit/bf21b23))
* **TileGroupStyleEditorComponent:** Refactor to use editor popup externally ([47e91b8](https://github.com/DSI-HUG/dejajs-components/commit/47e91b8))
* **Tiles:** Pending feature ([afc0f62](https://github.com/DSI-HUG/dejajs-components/commit/afc0f62))


### Features

* **TileGroup:** add tests ([0def85b](https://github.com/DSI-HUG/dejajs-components/commit/0def85b))
* **TilesComponent:** Refactor model from interface to class ([b2ce19a](https://github.com/DSI-HUG/dejajs-components/commit/b2ce19a))
* **TilesComponent:** Refactor model from interface to class ([109da67](https://github.com/DSI-HUG/dejajs-components/commit/109da67))



<a name="4.1.2"></a>
## [4.1.2](https://github.com/DSI-HUG/dejajs-components/compare/v4.1.1...v4.1.2) (2019-01-24)



<a name="4.1.1"></a>
## [4.1.1](https://github.com/DSI-HUG/dejajs-components/compare/v4.1.0...v4.1.1) (2019-01-24)


### Bug Fixes

* **DejaTileGroup:** fix wrong imports ([97b2b2d](https://github.com/DSI-HUG/dejajs-components/commit/97b2b2d))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.5...v4.1.0) (2019-01-23)


### Bug Fixes

* package.json to reduce vulnerabilities ([4b7a492](https://github.com/DSI-HUG/dejajs-components/commit/4b7a492))
* package.json to reduce vulnerabilities ([611671b](https://github.com/DSI-HUG/dejajs-components/commit/611671b))
* **DatePickerComponent:** Component change detection is OnPush, so we must force the view to refresh when the disable state changes ([a0fb9d1](https://github.com/DSI-HUG/dejajs-components/commit/a0fb9d1))
* **NumericStepperComponent:** Label should float is value is 0. Convert value to number if it's a number, set to null otherwise ([bb2f264](https://github.com/DSI-HUG/dejajs-components/commit/bb2f264))
* **TileGroup:** fix imports ([ee405d6](https://github.com/DSI-HUG/dejajs-components/commit/ee405d6))
* **TileGroup:** Selected border and flex issues ([c349c61](https://github.com/DSI-HUG/dejajs-components/commit/c349c61))
* **yarn:** EventStream version issue ([776064b](https://github.com/DSI-HUG/dejajs-components/commit/776064b))
* **Yarn:** Regenerate yarn lock ([2d24776](https://github.com/DSI-HUG/dejajs-components/commit/2d24776))
* **Yarn:** Update yarn lock ([88d9e9b](https://github.com/DSI-HUG/dejajs-components/commit/88d9e9b))


### Features

* **TileGroup:** add border customization ([8d37930](https://github.com/DSI-HUG/dejajs-components/commit/8d37930))
* **TileGroup:** add border positions selection ([11543b6](https://github.com/DSI-HUG/dejajs-components/commit/11543b6))
* **TileGroup:** border customization + fix ckeditor bug ([0e74b40](https://github.com/DSI-HUG/dejajs-components/commit/0e74b40))
* **TileGroup:** html edition ([5761268](https://github.com/DSI-HUG/dejajs-components/commit/5761268))
* **TileGroup:** small refactoring tileGroupComponent ([17ea9b7](https://github.com/DSI-HUG/dejajs-components/commit/17ea9b7))
* **TileGroup:** use inline deja-editor for html edition ([eb1b421](https://github.com/DSI-HUG/dejajs-components/commit/eb1b421))



<a name="4.0.5"></a>
## [4.0.5](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.4...v4.0.5) (2018-11-20)


### Bug Fixes

* **ColorSelector:** Synchronize model when selected color is set ([cfe5988](https://github.com/DSI-HUG/dejajs-components/commit/cfe5988))
* **ContentEditable:** Fix carriage return missng at initialisation ([5fda8b2](https://github.com/DSI-HUG/dejajs-components/commit/5fda8b2))



<a name="4.0.4"></a>
## [4.0.4](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.3...v4.0.4) (2018-10-31)


### Bug Fixes

* **DejaContentEditable:** Allow HTML in content editable ([0650257](https://github.com/DSI-HUG/dejajs-components/commit/0650257))
* **DejaNumericStepperComponent:** validation with mat-form-field ([733afed](https://github.com/DSI-HUG/dejajs-components/commit/733afed))



<a name="4.0.3"></a>
## [4.0.3](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.2...v4.0.3) (2018-10-26)


### Bug Fixes

* **DejaGrid:** Call ItemMatch for parent rows also ([be1209e](https://github.com/DSI-HUG/dejajs-components/commit/be1209e))
* **ItemListService:** getVisibleList only display parent items when visible != false ([ff12cc6](https://github.com/DSI-HUG/dejajs-components/commit/ff12cc6))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.1...v4.0.2) (2018-10-25)


### Bug Fixes

* **DejaDatePickerComponent:** showCurrentDateButton not visible anymore when control is disabled ([4667044](https://github.com/DSI-HUG/dejajs-components/commit/4667044))
* **DejaMouseDragDrop:** Fix icon elemnt null pointer ([c86e405](https://github.com/DSI-HUG/dejajs-components/commit/c86e405))
* **DejanumericStepperComponent:** Display unit when label should float + add boolean to force value ([9db5ab2](https://github.com/DSI-HUG/dejajs-components/commit/9db5ab2))
* **DejaNumericStepperComponent:** Fix input size ([05e207d](https://github.com/DSI-HUG/dejajs-components/commit/05e207d))
* **Global:** Ensure type for buttons ([595f81e](https://github.com/DSI-HUG/dejajs-components/commit/595f81e))
* **Popup:** Fix missing icons ([bae9b34](https://github.com/DSI-HUG/dejajs-components/commit/bae9b34))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.0...v4.0.1) (2018-10-17)


### Bug Fixes

* **ColorPicker:** Possible null exception ([0353989](https://github.com/DSI-HUG/dejajs-components/commit/0353989))
* **DatePickerComponent:** Date picker validation with mat-form-field ([4be1382](https://github.com/DSI-HUG/dejajs-components/commit/4be1382))
* **DatePickerComponent:** DatePicker actions vertical alignment with the input field ([bd5d2f2](https://github.com/DSI-HUG/dejajs-components/commit/bd5d2f2))
* **DatePickerComponent:** Unused import cause build failure ([c79176a](https://github.com/DSI-HUG/dejajs-components/commit/c79176a))
* **DejaSelect:** Fix regression due to a CustomEvent polyfills modification. ([5eec052](https://github.com/DSI-HUG/dejajs-components/commit/5eec052))
* **DejaSelect:** Fix regression due to the embeded SVG implementation ([9f94ea5](https://github.com/DSI-HUG/dejajs-components/commit/9f94ea5))
* **DejaSidenav:** Fix missing button to close menu on mobile ([2f34596](https://github.com/DSI-HUG/dejajs-components/commit/2f34596))
* **DejaTag:** Fix broken inline layout ([de6b0ab](https://github.com/DSI-HUG/dejajs-components/commit/de6b0ab))
* **DejaTile:** Fix icon centering for group ([dd8c5ed](https://github.com/DSI-HUG/dejajs-components/commit/dd8c5ed))
* **DejaTilesComponent:** Fix regression due to a CustomEvent polyfills modifictaion. ([2b810cc](https://github.com/DSI-HUG/dejajs-components/commit/2b810cc))
* **DejaTooltip:** Allow tooltip on mobile, because raise only with mouse ([472297c](https://github.com/DSI-HUG/dejajs-components/commit/472297c))
* **DemoApp:** Fix script loading for inline demo app ([53f7e8d](https://github.com/DSI-HUG/dejajs-components/commit/53f7e8d))
* **Dependencies:** Fix CustomEvent polyfill dependencies ([8280d18](https://github.com/DSI-HUG/dejajs-components/commit/8280d18))
* **DroppableDirective:** Fix regression due to a CustomEvent polyfills modification. ([b32fff2](https://github.com/DSI-HUG/dejajs-components/commit/b32fff2))
* **MouseDragDrop:** Fix test fail sometimes on Travis ([e3b1601](https://github.com/DSI-HUG/dejajs-components/commit/e3b1601))
* **Theming:** Not working import with sass ([d070488](https://github.com/DSI-HUG/dejajs-components/commit/d070488))


### Code Refactoring

* **DejaSideNav:** Removed useless headerSvgIcon input ([39a411f](https://github.com/DSI-HUG/dejajs-components/commit/39a411f))


### Features

* **DejaToolTip:** Allow DejaToolTip to close ever the mouse is over if the attribute closeOnMoveOver is set ([00d5281](https://github.com/DSI-HUG/dejajs-components/commit/00d5281))


### BREAKING CHANGES

* **DejaSideNav:** headerSvgIcon is removed from DejaSideNav. Use css override instead. Look at the demo app.component.scss for example.



<a name="4.0.0"></a>
# [4.0.0](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.6...v4.0.0) (2018-10-12)


### Bug Fixes

* **MouseDragDrop:** Fix test fail sometimes on Travis ([e3b1601](https://github.com/DSI-HUG/dejajs-components/commit/e3b1601))



<a name="4.0.0-beta.6"></a>
# [4.0.0-beta.6](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.5...v4.0.0-beta.6) (2018-10-11)


### Bug Fixes

* **DejaSelect:** Fix regression due to a CustomEvent polyfills modification. ([5eec052](https://github.com/DSI-HUG/dejajs-components/commit/5eec052))
* **DejaSelect:** Fix regression due to the embeded SVG implementation ([9f94ea5](https://github.com/DSI-HUG/dejajs-components/commit/9f94ea5))
* **DejaTile:** Fix icon centering for group ([dd8c5ed](https://github.com/DSI-HUG/dejajs-components/commit/dd8c5ed))
* **DejaTilesComponent:** Fix regression due to a CustomEvent polyfills modifictaion. ([2b810cc](https://github.com/DSI-HUG/dejajs-components/commit/2b810cc))
* **DroppableDirective:** Fix regression due to a CustomEvent polyfills modification. ([b32fff2](https://github.com/DSI-HUG/dejajs-components/commit/b32fff2))



<a name="4.0.0-beta.5"></a>
# [4.0.0-beta.5](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.4...v4.0.0-beta.5) (2018-10-09)


### Code Refactoring

* **DejaSideNav:** Removed useless headerSvgIcon input ([39a411f](https://github.com/DSI-HUG/dejajs-components/commit/39a411f))


### Features

* **DejaToolTip:** Allow DejaToolTip to close ever the mouse is over if the attribute closeOnMoveOver is set ([00d5281](https://github.com/DSI-HUG/dejajs-components/commit/00d5281))


### BREAKING CHANGES

* **DejaSideNav:** headerSvgIcon is removed from DejaSideNav. Use css override instead. Look at the demo app.component.scss for example.



<a name="4.0.0-beta.4"></a>
# [4.0.0-beta.4](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.3...v4.0.0-beta.4) (2018-10-08)


### Bug Fixes

* **Theming:** Not working import with sass ([d070488](https://github.com/DSI-HUG/dejajs-components/commit/d070488))



<a name="4.0.0-beta.3"></a>
# [4.0.0-beta.3](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2018-10-08)


### Code Refactoring

* **Global:** Create web font from embeded SVG in the lib instead use material-icons


### Bug Fixes

* **ColorPicker:** Possible null exception ([0353989](https://github.com/DSI-HUG/dejajs-components/commit/0353989))
* **DejaTooltip:** Allow tooltip on mobile, because raise only with mouse ([472297c](https://github.com/DSI-HUG/dejajs-components/commit/472297c))



<a name="4.0.0-beta.2"></a>
# [4.0.0-beta.2](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2018-09-27)


### Bug Fixes

* **DemoApp:** Fix script loading for inline demo app ([53f7e8d](https://github.com/DSI-HUG/dejajs-components/commit/53f7e8d))



<a name="4.0.0-beta.1"></a>
# [4.0.0-beta.1](https://github.com/DSI-HUG/dejajs-components/compare/v4.0.0-beta.0...v4.0.0-beta.1) (2018-09-26)


### Bug Fixes

* **DejaTag:** Fix broken inline layout ([de6b0ab](https://github.com/DSI-HUG/dejajs-components/commit/de6b0ab))



<a name="4.0.0-beta.0"></a>
# [4.0.0-beta.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.6.0...v4.0.0-beta.0) (2018-09-24)


### Bug Fixes

* **DejaSelect:** Fix dropdown position when in some condition can override the input ([55a7440](https://github.com/DSI-HUG/dejajs-components/commit/55a7440))
* **DejaSidenav:** Add BrowserAnimationsModule for test ([017fb9e](https://github.com/DSI-HUG/dejajs-components/commit/017fb9e))
* **DejaSidenav:** Add forRoot for test module injection ([fe830a3](https://github.com/DSI-HUG/dejajs-components/commit/fe830a3))
* **Gulp:** Fix push on release script ([9d2121e](https://github.com/DSI-HUG/dejajs-components/commit/9d2121e))
* **SlimScroll:** Fix permanent rebind from DejaSlimScrollDirective ([87f763f](https://github.com/DSI-HUG/dejajs-components/commit/87f763f))


### Code Refactoring

* **DejaDatePickerComponent:** cdk form-field compatibility ([91262a5](https://github.com/DSI-HUG/dejajs-components/commit/91262a5))
* **DejaNumericStepperComponent:** cdk form-field compatibility ([d5e8738](https://github.com/DSI-HUG/dejajs-components/commit/d5e8738))
* **DejaNumericStepperComponent:** cdk form-field compatibility ([d2cb607](https://github.com/DSI-HUG/dejajs-components/commit/d2cb607))
* **DejaNumericStepperComponent:** cdk form-field compatibility ([a15bb2b](https://github.com/DSI-HUG/dejajs-components/commit/a15bb2b))
* **DejaSelect:** cdk form-field compatibility ([2d0014e](https://github.com/DSI-HUG/dejajs-components/commit/2d0014e))


### Features

* **DejaSidenav:** Possibility to control sidenav from outside component ([0ec86c1](https://github.com/DSI-HUG/dejajs-components/commit/0ec86c1))


### BREAKING CHANGES

* **DejaDatePickerComponent:** date-picker must be used inside a mat form field container.
* **DejaSelect:** you need to wrap deja-select inside mat-form-field tag.
* **DejaNumericStepperComponent:** you need to wrap deja-numeric-stepper inside mat-form-field tag



<a name="3.6.0"></a>
# [3.6.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.5.3...v3.6.0) (2018-09-24)


### Bug Fixes

* **DejaBoldQueryComponent:** fix regexp parsing error with label containing regexp special chars. ([ea35f9b](https://github.com/DSI-HUG/dejajs-components/commit/ea35f9b))
* **DejaEditorComponent:** Init ckeditor even if the component is not on DOM ([3658355](https://github.com/DSI-HUG/dejajs-components/commit/3658355))
* **DejaNumericStepperComponent:** Value can be updated when control is disabled ([91d8ced](https://github.com/DSI-HUG/dejajs-components/commit/91d8ced))
* **DejaSelect:** Fix dropdown position when in some condition can override the input ([4f435af](https://github.com/DSI-HUG/dejajs-components/commit/4f435af))


### Features

* **DejaMonacoEditorComponent:** Added reactive form compatibility ([f4ec0bc](https://github.com/DSI-HUG/dejajs-components/commit/f4ec0bc))



<a name="3.5.3"></a>
## [3.5.3](https://github.com/DSI-HUG/dejajs-components/compare/2.14.0...3.5.3) (2018-09-04)


### Bug Fixes

* **DatePicker:** fixed circular dependencies ([1901ec1](https://github.com/DSI-HUG/dejajs-components/commit/1901ec1))


<a name="3.5.2"></a>
## [3.5.2](https://github.com/DSI-HUG/dejajs-components/compare/v3.5.1...v3.5.2) (2018-09-03)


### Features

* **DejaDatePickerComponent:** select time when setToCurrentDate is called ([3b5ceec](https://github.com/DSI-HUG/dejajs-components/commit/3b5ceec))



<a name="3.5.1"></a>
## [3.5.1](https://github.com/DSI-HUG/dejajs-components/compare/v3.5.0...v3.5.1) (2018-08-31)


### Bug Fixes

* **DejaNumericStepperComponent:** fix AOT ([7f2a984](https://github.com/DSI-HUG/dejajs-components/commit/7f2a984))



<a name="3.5.0"></a>
# [3.5.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.4.1...v3.5.0) (2018-08-30) - Castor Eméché


### Bug Fixes

* **DejaNumericStepper:** Add validation BREAKING CHANGE: NS dosn't ([cea35fc](https://github.com/DSI-HUG/dejajs-components/commit/cea35fc))
* **Gulp:** Fix push on release script ([cf559b8](https://github.com/DSI-HUG/dejajs-components/commit/cf559b8))



<a name="3.4.1"></a>
## [3.4.1](https://github.com/DSI-HUG/dejajs-components/compare/v3.4.0...v3.4.1) (2018-08-22)


### Bug Fixes

* **DatePicker:** Do not allow current date shortcut if free text is enabled ([6e4cb94](https://github.com/DSI-HUG/dejajs-components/commit/6e4cb94))
* **DatePicker:** Repair D key for current date shortcut ([9120d37](https://github.com/DSI-HUG/dejajs-components/commit/9120d37))


### Features

* **MonacoEditor:** add OnInit output event ([ea4e747](https://github.com/DSI-HUG/dejajs-components/commit/ea4e747))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.3.0...v3.4.0) (2018-07-25) - Castor Déchaîné


### Bug Fixes

* **DejaTreeListComponent:** attr.keynav was set as a function and not with result of a call ([627e60e](https://github.com/DSI-HUG/dejajs-components/commit/627e60e))


### Features

* **DatePickerComponent:** Add a free entry mode to date picker ([65784ff](https://github.com/DSI-HUG/dejajs-components/commit/65784ff))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.2.0...v3.3.0) (2018-07-20) - Castor Chanceux


### Bug Fixes

* **DejaTiles:** Fix an issue due to the typescript compiler in bundle only ([bca9e2a](https://github.com/DSI-HUG/dejajs-components/commit/bca9e2a))


### Features

* **dejaPopUp:** consumer can hide the exitFullscreenButton ([8ef5b7b](https://github.com/DSI-HUG/dejajs-components/commit/8ef5b7b))



<a name="3.2.0"></a>
# [3.2.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.1.0...v3.2.0) (2018-07-17) - Castor Barbare


### Bug Fixes

* **DejaTiles:** Fix tiles placement when no bounds are provided ([a908507](https://github.com/DSI-HUG/dejajs-components/commit/a908507))
* **Scss:** Update loader size ([f902404](https://github.com/DSI-HUG/dejajs-components/commit/f902404))


### Features

* **DejaEditor:** Support placeholder for editor in mat-form-field ([80dfa83](https://github.com/DSI-HUG/dejajs-components/commit/80dfa83))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.2...v3.1.0) (2018-07-09) - Castor Agile


### Bug Fixes

* **DejaColorSelector:** Move duplicate id's to attributes ([902f3c6](https://github.com/DSI-HUG/dejajs-components/commit/902f3c6))


### Features

* **DejaSelect:** Add no data holder ([37cde67](https://github.com/DSI-HUG/dejajs-components/commit/37cde67))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.1...v3.0.2) (2018-06-29)


### Bug Fixes

* **DejaEditor:** Properly destroy CKEditor ([97709ec](https://github.com/DSI-HUG/dejajs-components/commit/97709ec))
* **DejaTreeList:** Escape special characters on treelist search and filter ([73edb56](https://github.com/DSI-HUG/dejajs-components/commit/73edb56))
* **DejaTreeList:** Fix treelist crash when empty on keyboard navigation. ([bccea15](https://github.com/DSI-HUG/dejajs-components/commit/bccea15))
* **DejaTreeListComponent:** fix ngModel not working properly with select single mode ([ed4f345](https://github.com/DSI-HUG/dejajs-components/commit/ed4f345))


### Features

* **combo-list:** fixed registerOnChange and registerOnTouched ([f67f44a](https://github.com/DSI-HUG/dejajs-components/commit/f67f44a))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/DSI-HUG/dejajs-components/compare/3.0.0...3.0.1) (2018-06-11)


### Bug Fixes

* **ckeditor:** Use coercion ([1a42439](https://github.com/DSI-HUG/dejajs-components/commit/1a42439))
* **Combolist:** Use coercion ([3d8e226](https://github.com/DSI-HUG/dejajs-components/commit/3d8e226))
* **DejaComboList:** aot - no lambda functions in decorators. ([412d92e](https://github.com/DSI-HUG/dejajs-components/commit/412d92e))
* **DejaComboList:** fix license-check errors ([a74a2e4](https://github.com/DSI-HUG/dejajs-components/commit/a74a2e4))
* **DejaComboList:** license ([2d86408](https://github.com/DSI-HUG/dejajs-components/commit/2d86408))
* **DejaComboList:** rollup and include ([19df423](https://github.com/DSI-HUG/dejajs-components/commit/19df423))
* **DejaEditor:** Lateral scrollbar was always displayed ([f7dbc35](https://github.com/DSI-HUG/dejajs-components/commit/f7dbc35))
* **TextReplace:** Fix get and replace text at cursor position functionnality ([846dba8](https://github.com/DSI-HUG/dejajs-components/commit/846dba8))
* Revert view encapsulation modification ([cf14713](https://github.com/DSI-HUG/dejajs-components/commit/cf14713))


### Features

* **combo-list:** enable keyboard navigation ([98ac8a9](https://github.com/DSI-HUG/dejajs-components/commit/98ac8a9))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0) (2018-05-31) - Castor


### Bug Fixes

* **SelectDemo:** Fix some issues on the demo for the deja-select ([bf4a284](https://github.com/DSI-HUG/dejajs-components/commit/bf4a284))


<a name="3.0.0-beta.26"></a>
# [3.0.0-beta.26](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.26) (2018-05-23)


### Bug Fixes

* **ColorFab:** Fix truncated circle in small size ([d990f7c](https://github.com/DSI-HUG/dejajs-components/commit/d990f7c))
* **DejaTreeList:** Fix wrong left margin for items due to a previous fix for the select ([8a14e87](https://github.com/DSI-HUG/dejajs-components/commit/8a14e87))


### Features

* **DejaSelect:** Default position for multiselect chips is now bellow, add selectedItemsPosition="above" in your html to place the chips between the placeholder and the input ([6e0c223](https://github.com/DSI-HUG/dejajs-components/commit/6e0c223))


### BREAKING CHANGES

* **DejaSelect:** Default position for multiselect chips is now bellow



<a name="3.0.0-beta.25"></a>
# [3.0.0-beta.25](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.25) (2018-05-18)


### Bug Fixes

* **Color:** Add parsing for alpha <= 1 ([766271e](https://github.com/DSI-HUG/dejajs-components/commit/766271e))
* **Gulp:** Fix build fail due to gulp-compodoc ([461225a](https://github.com/DSI-HUG/dejajs-components/commit/461225a))


### Features

* **DejaIntervalSelectorComponent:** remove interval selector component ([894cf43](https://github.com/DSI-HUG/dejajs-components/commit/894cf43))
* **DejaDatePickerComponent:** Add current date selector button ([2dba49d](https://github.com/DSI-HUG/dejajs-components/commit/2dba49d))
* **DejaEditorComponent:** Introduce a rich text editor component which wraps CKEditor ([85f22e8](https://github.com/DSI-HUG/dejajs-components/commit/85f22e8))


### BREAKING CHANGES

* **DejaIntervalSelectorComponent:** removed


<a name="3.0.0-beta.24"></a>
# [3.0.0-beta.24](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.24) (2018-05-15)


### Bug Fixes

* **Global:** Fix wrong material class names after V6 update ([5279442](https://github.com/DSI-HUG/dejajs-components/commit/5279442))


<a name="3.0.0-beta.23"></a>
# [3.0.0-beta.23](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.23) (2018-05-14)


### Bug Fixes

* **TsLint:** Remove rxjs from blacklisted imports ([24f6b7a](https://github.com/DSI-HUG/dejajs-components/commit/24f6b7a))
* **DejaTreeList:** Fix null pointer for null ItemListService ([772a6e6](https://github.com/DSI-HUG/dejajs-components/commit/772a6e6))
* **DejaDialogComponent:** Move event.preventDefault ([c7f71a5](https://github.com/DSI-HUG/dejajs-components/commit/c7f71a5))
* **DejaDatePickerComponent:** Remove close when updating model ([3edb4f4](https://github.com/DSI-HUG/dejajs-components/commit/3edb4f4))
* **DejaTooltip:** Fix deprecated positions for material overlay ([6b62695](https://github.com/DSI-HUG/dejajs-components/commit/6b62695))



<a name="3.0.0-beta.22"></a>
# [3.0.0-beta.22](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.22) (2018-05-11)


### Bug Fixes

* **Demo:** Fix angular icon for github demo ([82529f1](https://github.com/DSI-HUG/dejajs-components/commit/82529f1))
* **Dependencies:** Remove [@angular](https://github.com/angular)/platform-server package and downgrade minimum node version ([1c10557](https://github.com/DSI-HUG/dejajs-components/commit/1c10557))


<a name="3.0.0-beta.21"></a>
# [3.0.0-beta.21](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.21) (2018-05-08)


### Bug Fixes

* **Demo:** Correct some relative paths ([aae933d](https://github.com/DSI-HUG/dejajs-components/commit/aae933d))
* **Gulp:** build theming.scss for dev ([67291ed](https://github.com/DSI-HUG/dejajs-components/commit/67291ed))


<a name="3.0.0-beta.20"></a>
# [3.0.0-beta.20](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.20) (2018-05-08)


### Bug Fixes

* **GlobalEvent:** Declare interface angular style to avoid path issue on build (try) ([2dfd6c5](https://github.com/DSI-HUG/dejajs-components/commit/2dfd6c5))


<a name="3.0.0-beta.19"></a>
# [3.0.0-beta.19](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.19) (2018-05-07)


### Bug Fixes

* **Global:** Updated dependencies for ng6, RxJs 6 and Gulp 4 ([4668352](https://github.com/DSI-HUG/dejajs-components/commit/4668352))


### BREAKING CHANGES

* **Global:** angular6, angular-material6 and angular-cli 6 breaking changes



<a name="3.0.0-beta.18"></a>
# [3.0.0-beta.18](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.18) (2018-04-26)


### Bug Fixes

* **DejaSelect:** Add Item.className to the dom ([7820e9e](https://github.com/DSI-HUG/dejajs-components/commit/7820e9e))
* **Dependencies:** Added RxJs compat and uptaed to RxJs 6 ([2e85073](https://github.com/DSI-HUG/dejajs-components/commit/2e85073))


<a name="3.0.0-beta.17"></a>
# [3.0.0-beta.17](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.17) (2018-04-25)


### Bug Fixes

* **DejaDateFormatPipe:** Fix moment import ([c768d59](https://github.com/DSI-HUG/dejajs-components/commit/c768d59))
* **DejaTileGroup:** Add the possibility to have a multiline label in a group ([b326b17](https://github.com/DSI-HUG/dejajs-components/commit/b326b17))
* **MonacoEditor:** Fit to content ([a9b9a85](https://github.com/DSI-HUG/dejajs-components/commit/a9b9a85))
* **DejaSelect** List item alignment was not preserved if the item content was too long ([b3ffd06](https://github.com/DSI-HUG/dejajs-components/commit/b3ffd06))
* **DejaDatePicker** Set tab index to -1 for button to prevent unexpected behavior on form ([7722ce5](https://github.com/DSI-HUG/dejajs-components/commit/7722ce5))


<a name="3.0.0-beta.16"></a>
# [3.0.0-beta.16](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.16) (2018-04-19)


### Bug Fixes

* **DatePicker:** Add tabIndex="-1" on buttons to avoid focus on tab ([debe4a7](https://github.com/DSI-HUG/dejajs-components/commit/debe4a7))
* **DatePicker:** Specify an overlayContainerClass to not override style of other components (DEJS-410) ([bb95080](https://github.com/DSI-HUG/dejajs-components/commit/bb95080))


### Features

* **DejaOverlay:** Add an input to specifiy an 'overlayContainerClass' (DEJS-409) ([78dbbcf](https://github.com/DSI-HUG/dejajs-components/commit/78dbbcf))



<a name="3.0.0-beta.15"></a>
# [3.0.0-beta.15](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.15) (2018-04-04)


### Features

* **DejaTiles:** SelectedTiles input can accept an array of tiles ([ef55e48](https://github.com/DSI-HUG/dejajs-components/commit/ef55e48))



<a name="3.0.0-beta.14"></a>
# [3.0.0-beta.14](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.14) (2018-04-03)


### Bug Fixes

* **DejaDateSelectorComponent:** Hours was set to 0 when same date was selected ([86c22be](https://github.com/DSI-HUG/dejajs-components/commit/86c22be))
* **DejaToolTip:** Remove backdrop for deja-tooltip ([59e2d62](https://github.com/DSI-HUG/dejajs-components/commit/59e2d62))
* 

### Features

* **DejaDatePickerComponent:** Close datePicker on click and datetimepicker on doubleclick ([282e0af](https://github.com/DSI-HUG/dejajs-components/commit/282e0af))



<a name="3.0.0-beta.13"></a>
# [3.0.0-beta.13](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.13) (2018-03-28)


### Bug Fixes

* **DatePickerDemo:** Replaced deprecated fxLayoutWrap ([6b3e45d](https://github.com/DSI-HUG/dejajs-components/commit/6b3e45d))
* **SlimScroll:** Fix event mouse propagation to avoid drag on scroll ([059989c](https://github.com/DSI-HUG/dejajs-components/commit/059989c))
* **Dependencies:** Remove unused dependencies ([fff83d4](https://github.com/DSI-HUG/dejajs-components/commit/fff83d4))
* **DejaTreeList:** fix missing coercion for modelIsValue ([f3e0778](https://github.com/DSI-HUG/dejajs-components/commit/f3e0778))
* **DejaTreeList:** Fix selection with simple string as model ([895769b](https://github.com/DSI-HUG/dejajs-components/commit/895769b))


### Features

* **IconService:** service to register SVG icons to MatIconRegistry so that custom SVG icons can be used with MatIcon component, i.e <mat-icon svgIcon='deja-icon' /> ([17d1938](https://github.com/DSI-HUG/dejajs-components/commit/17d1938))



<a name="3.0.0-beta.12"></a>
# [3.0.0-beta.12](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.12) (2018-03-21)


### Bug Fixes

* **Gulp:** Fix locked sass file in node_modules for clean task & optimization of gulp scripts ([d60485f](https://github.com/DSI-HUG/dejajs-components/commit/d60485f))
* **ChangeLog:** Fix cz-conventional-changelog usage ([f02f978](https://github.com/DSI-HUG/dejajs-components/commit/f02f978))
* **DejaPopup:** Load popup mixin with theme ([2176ebf](https://github.com/DSI-HUG/dejajs-components/commit/2176ebf))



<a name="3.0.0-beta.11"></a>
# [3.0.0-beta.11](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.11) (2018-03-16)


### Bug Fixes

* **Demo:** Copy theming for demo in deployment ([5ec1d44](https://github.com/DSI-HUG/dejajs-components/commit/5ec1d44))



<a name="3.0.0-beta.10"></a>
# [3.0.0-beta.10](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.10) (2018-03-16)


### Bug Fixes

* **theming:** Changed attribute deja-menu-content with a class name to fix a issue with ul and li, that make css not applied ([f618802](https://github.com/DSI-HUG/dejajs-components/commit/f618802))


### BREAKING CHANGES

* **theming:** deja-menu-content is now a class name instead an attribute



<a name="3.0.0-beta.9"></a>
# [3.0.0-beta.9](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.9) (2018-03-16)


### Bug Fixes

* **MenuMixin:** Fix menu mixin was not working with ul>li ([484d57c](https://github.com/DSI-HUG/dejajs-components/commit/484d57c))



<a name="3.0.0-beta.8"></a>
# [3.0.0-beta.8](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.8) (2018-03-15)


### Bug Fixes

* **mixins:** Treelist borders is now a mixin [@include](https://github.com/include) tree-list-borders() and Fix menu mixin ([a485f91](https://github.com/DSI-HUG/dejajs-components/commit/a485f91))
* **NewsCard:** Fix wrong image layout on demo ([4f8f720](https://github.com/DSI-HUG/dejajs-components/commit/4f8f720))


### BREAKING CHANGES

* **Global:** By default dejaTreeList and dejaGrid has border. To avoid borders add a noborders attribute. Removed useless _flex util files, use angular-flex-layout or display: flex instead.



<a name="3.0.0-beta.7"></a>
# [3.0.0-beta.7](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.7) (2018-03-15)


### Bug Fixes

* **theming:** imports and mixins for global theming ([e9ab425](https://github.com/DSI-HUG/dejajs-components/commit/e9ab425))



### BREAKING CHANGES

* **theming:** deja-menu, deja-popup, and deja-backdrop are now mixins to import special css for the related component or feature
* **Global:** HUG theme form-validation and colors are now in dejajs-dpi
* **BoldQuery:** DejaBoldQuery don't ellipsis anymore. Add a text-ellipsis attribute to bold-query to get the ellipsis feature.
* **Global:** By default dejaTreeList and dejaGrid has border. To avoid borders add a noborders attribute. Removed useless _flex util files, use angular-flex-layout or display: flex instead.



<a name="3.0.0-beta.6"></a>
# [3.0.0-beta.6](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.6) (2018-03-15)


### Bug Fixes

* **Demo:** Fix assets in wrong place ([46e1004](https://github.com/DSI-HUG/dejajs-components/commit/46e1004))
* **Global:** Moving HUG theme form-validation and colors to dejajs-dpi ([5070aea](https://github.com/DSI-HUG/dejajs-components/commit/5070aea))
* **TsConfig:** Output folders ([9b6ab0f](https://github.com/DSI-HUG/dejajs-components/commit/9b6ab0f))



### BREAKING CHANGES

* **Global:** HUG theme form-validation and colors are now in dejajs-dpi
* **BoldQuery:** DejaBoldQuery don't ellipsis anymore. Add a text-ellipsis attribute to bold-query to get the ellipsis feature.
* **Global:** By default dejaTreeList and dejaGrid has border. To avoid borders add a noborders attribute. Removed useless _flex util files, use angular-flex-layout or display: flex instead.



<a name="3.0.0-beta.5"></a>
# [3.0.0-beta.5](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.5) (2018-03-14)


### Bug Fixes

* **Global:** Fix dependencies in prod ([7e0497e](https://github.com/DSI-HUG/dejajs-components/commit/7e0497e))


<a name="3.0.0-beta.4"></a>
# [3.0.0-beta.4](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.4) (2018-03-13)


### Bug Fixes

* **gulp:** Fix copy of 404.html and clean task ([1439f35](https://github.com/DSI-HUG/dejajs-components/commit/1439f35))
* **gulp:** Fix install sequence with npm ([60ad4d4](https://github.com/DSI-HUG/dejajs-components/commit/60ad4d4))


<a name="3.0.0-beta.3"></a>
# [3.0.0-beta.3](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.3) (2018-03-13)


### Bug Fixes

* **gulp:** Fix copy of 404.html and clean task ([1439f35](https://github.com/DSI-HUG/dejajs-components/commit/1439f35))


<a name="3.0.0-beta.2"></a>
# [3.0.0-beta.1](https://github.com/DSI-HUG/dejajs-components/compare/v3.0.0-beta.0...v3.0.0-beta.1) (2018-03-13)


### Bug Fixes

* **BoldQuery:** DejaBoldQuery force inline-style and ellipsis. This is not the role of DejaBoldQuery to decide the inline-style of his content. ([4707ac3](https://github.com/DSI-HUG/dejajs-components/commit/4707ac3))
* **Config:** Faster install, removed from warning ([3ef96b5](https://github.com/DSI-HUG/dejajs-components/commit/3ef96b5))
* **DejaSidenav:** Fix wrong import on test ([b002070](https://github.com/DSI-HUG/dejajs-components/commit/b002070))
* **Demo:** Fix synchronisation between demo and lib in dev ([2bea4e9](https://github.com/DSI-HUG/dejajs-components/commit/2bea4e9))
* **Global:** Link to source instead bundle ([d3f8fce](https://github.com/DSI-HUG/dejajs-components/commit/d3f8fce))
* **Global:** SCSS concatenation in one _theming.scss file ([23a5089](https://github.com/DSI-HUG/dejajs-components/commit/23a5089))
* **MediaService:** Removed flex-layout dependencies ([a0594b4](https://github.com/DSI-HUG/dejajs-components/commit/a0594b4))
* **SideNav:** Use MediaService instead javascript native code ([dcda8e5](https://github.com/DSI-HUG/dejajs-components/commit/dcda8e5))
* **Theming:** Build _theming.scss for prod and demo. ([c21b7c3](https://github.com/DSI-HUG/dejajs-components/commit/c21b7c3))


### BREAKING CHANGES

* **BoldQuery:** DejaBoldQuery don't ellipsis anymore. Add a text-ellipsis attribute to bold-query to get the ellipsis feature.
* **Global:** By default dejaTreeList and dejaGrid has border. To avoid borders add a noborders attribute. Removed useless _flex util files, use angular-flex-layout or display: flex instead.


<a name="3.0.0-beta.0"></a>
# [3.0.0-beta.0](https://github.com/DSI-HUG/dejajs-components/compare/2.18.1...3.0.0) (2018-02-28)


### Bug Fixes

* **ColorEvent:** The ColorEvent class become a IColorEvent interface to fix the CustomEvent implementation ([7f5179a](https://github.com/DSI-HUG/dejajs-components/commit/7f5179a))
* **ColorPicker:** Disabled style ([3217117](https://github.com/DSI-HUG/dejajs-components/commit/3217117))
* **ComboList:** Removed ComboList until unit test and standardization are done ([f6897e7](https://github.com/DSI-HUG/dejajs-components/commit/f6897e7))
* **DatePicker:** conflicts with 2.18.6 ([361de34](https://github.com/DSI-HUG/dejajs-components/commit/361de34))
* **DatePicker:** consecutives blank lines ([a7f4190](https://github.com/DSI-HUG/dejajs-components/commit/a7f4190))
* **DatePicker:** fixed circular dependencies ([1901ec1](https://github.com/DSI-HUG/dejajs-components/commit/1901ec1))
* **DejaCancelableEvent:** The DejaCancelableEvent class become a IDejaCancelableEvent interface to fix the CustomEvent implementation ([0ac4f47](https://github.com/DSI-HUG/dejajs-components/commit/0ac4f47))
* **DejaChips:** The DejaChipsCloseEvent class become a IDejaChipsCloseEvent interface to fix the CustomEvent implementation ([c06ddb7](https://github.com/DSI-HUG/dejajs-components/commit/c06ddb7))
* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf))
* **DejaDatePickerComponent:** [#94](https://github.com/DSI-HUG/dejajs-components/issues/94) check mask on blur and make control invalid if mask isn't ok ([7c25cf7](https://github.com/DSI-HUG/dejajs-components/commit/7c25cf7))
* **DejaDatePickerComponent:** Use different way to call date and time change events. ([12295d0](https://github.com/DSI-HUG/dejajs-components/commit/12295d0))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d))
* **DejaGrid:** Fix Object-Object displayed in the cell content when the value field is undefined ([72f0b9a](https://github.com/DSI-HUG/dejajs-components/commit/72f0b9a))
* **DejaGrid:** Header bottom line style ([23fbe33](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33))
* **DejaGridComponent:** Fix missing returned type for some function ([4cabf65](https://github.com/DSI-HUG/dejajs-components/commit/4cabf65)), closes [#286](https://github.com/DSI-HUG/dejajs-components/issues/286)
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11))
* **DejaIntervalSelectorBoundaryComponent:** protected access in template... ([7de6ede](https://github.com/DSI-HUG/dejajs-components/commit/7de6ede))
* **DejaIntervalSelectorComponent:** Access private member inside template ([8583d67](https://github.com/DSI-HUG/dejajs-components/commit/8583d67))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f0](https://github.com/DSI-HUG/dejajs-components/commit/fc173f0))
* **DejaNumericStepperComponent:** add possibility to remove value and fix onChangeCallback out of range. ([20376c3](https://github.com/DSI-HUG/dejajs-components/commit/20376c3))
* **DejaNumericStepperModule:** Export numericStepper component ([3af6735](https://github.com/DSI-HUG/dejajs-components/commit/3af6735))
* **DejaPopup:** fix tabindex bug in demo app ([7a0b766](https://github.com/DSI-HUG/dejajs-components/commit/7a0b766))
* **DejaPopup:** lint fix ([6c7d488](https://github.com/DSI-HUG/dejajs-components/commit/6c7d488))
* **DejaPopupConfig:** config.data ([3870b52](https://github.com/DSI-HUG/dejajs-components/commit/3870b52))
* **DejaPopupConfig:** Remove config.data=this ([7ab0f6c](https://github.com/DSI-HUG/dejajs-components/commit/7ab0f6c))
* **DejaSelect:** Autocomplete clear model when text is changed DEJS-246 ([14efbbd](https://github.com/DSI-HUG/dejajs-components/commit/14efbbd))
* **DejaSelect:** Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666](https://github.com/DSI-HUG/dejajs-components/commit/e11e666))
* **DejaSelect:** Hide when an element is clicked ([6236f10](https://github.com/DSI-HUG/dejajs-components/commit/6236f10))
* **DejaSelect:** rxjs imports ([c0ca4ba](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba))
* **DejaSelect:** Width regression from material rc0 migration ([6188733](https://github.com/DSI-HUG/dejajs-components/commit/6188733))
* **DejaSelectComponent:** Issues fixing find by unit test ([279f594](https://github.com/DSI-HUG/dejajs-components/commit/279f594))
* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02de](https://github.com/DSI-HUG/dejajs-components/commit/baa02de))
* **DejaSidenav:** Removed Angular FlexLayout ([5a5e0dc](https://github.com/DSI-HUG/dejajs-components/commit/5a5e0dc))
* **DejaTextMetricsService:** adjust text width with linux lower font ratio. ([3aa8f48](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f48))
* **DejaTextMetricsService:** improve text height calculation by taking in account white space separator ([41d360a](https://github.com/DSI-HUG/dejajs-components/commit/41d360a))
* **DejaTile:** Removed useless this in html ([ef9657c](https://github.com/DSI-HUG/dejajs-components/commit/ef9657c))
* **DejaTile:** Spinner position (Regression due to mateial spinner changes) ([5b77394](https://github.com/DSI-HUG/dejajs-components/commit/5b77394))
* **DejaTiles:** Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd))
* **DejaTiles:** Remove selection when tiles are empties ([55da608](https://github.com/DSI-HUG/dejajs-components/commit/55da608))
* **DejaTilesComponent:** Fix a synchronization issue between tiles model and associated dictionary ([9712b18](https://github.com/DSI-HUG/dejajs-components/commit/9712b18))
* **DejaTilesComponent:** Fix crash if model is not defined ([41e2696](https://github.com/DSI-HUG/dejajs-components/commit/41e2696))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([2283414](https://github.com/DSI-HUG/dejajs-components/commit/2283414))
* **DejaTooltip:** Rxjs imports ([b44bef3](https://github.com/DSI-HUG/dejajs-components/commit/b44bef3))
* **DejaTreeList:** Fix limited depth ([7f19da3](https://github.com/DSI-HUG/dejajs-components/commit/7f19da3))
* **DemoTiles:** Drag cursor is missing ([cfccdeb](https://github.com/DSI-HUG/dejajs-components/commit/cfccdeb))
* **Depencencies:** Fix dependencies management ([1b30f6d](https://github.com/DSI-HUG/dejajs-components/commit/1b30f6d))
* **Dependencies:** Fix dependencies management ([61cc9a5](https://github.com/DSI-HUG/dejajs-components/commit/61cc9a5))
* **Global:** Correct noImplicitAny compile errors ([9351b03](https://github.com/DSI-HUG/dejajs-components/commit/9351b03))
* **Global:** fix missing implementation for setDisabledState. ([335f3d6](https://github.com/DSI-HUG/dejajs-components/commit/335f3d6))
* **Global:** rxjs imports ([409c780](https://github.com/DSI-HUG/dejajs-components/commit/409c780))
* **Global:** RxJs Imports ([dd44574](https://github.com/DSI-HUG/dejajs-components/commit/dd44574))
* **Global:** RxJs Imports ([751fbeb](https://github.com/DSI-HUG/dejajs-components/commit/751fbeb))
* **Global:** RxJs Imports ([4047f5d](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d))
* **Global:** Rxjs imports and indexation ([ca911d6](https://github.com/DSI-HUG/dejajs-components/commit/ca911d6))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa5](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5))
* **ItemListService:** Ensure pre-selection from items object DEJS-256 ([7017720](https://github.com/DSI-HUG/dejajs-components/commit/7017720))
* **MonacoEditor:** Added typings for css-element-queries ([f98362e](https://github.com/DSI-HUG/dejajs-components/commit/f98362e))
* **MonacoEditor:** Removed css-media-queries dependency and use our ResizeListener instead ([e9b1b9a](https://github.com/DSI-HUG/dejajs-components/commit/e9b1b9a))
* **MonacoEditorComponent:** Removed css-element-queries to fix the .d.ts compile error in prod ([0073d8e](https://github.com/DSI-HUG/dejajs-components/commit/0073d8e))
* **SortingService:** Re-add test to check as a date when type date is specified inside SortInfo. ([8a945be](https://github.com/DSI-HUG/dejajs-components/commit/8a945be))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba552](https://github.com/DSI-HUG/dejajs-components/commit/b5ba552))


### Code Refactoring

* **DejaCodeViewerComponent:** Removed DejaCodeViewerComponent to avoid prism.js dependency ([7b2dea8](https://github.com/DSI-HUG/dejajs-components/commit/7b2dea8))
* **DejaMarkdownComponent:** Removed DejaMarkdownComponent to avoid prism.js dependency ([a708a02](https://github.com/DSI-HUG/dejajs-components/commit/a708a02))
* **SendAction:** Removed SendAction from the lib ([62ec4b8](https://github.com/DSI-HUG/dejajs-components/commit/62ec4b8))


### Features

* **DatePicker:** layout as a string ([235e0f3](https://github.com/DSI-HUG/dejajs-components/commit/235e0f3))
* **DatePicker:** time picker and time selector ([142b977](https://github.com/DSI-HUG/dejajs-components/commit/142b977))
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
* **DejaIntervalSelectorComponent:** component used to display lower and upper boundary for lower and upper value selection ([80e549e](https://github.com/DSI-HUG/dejajs-components/commit/80e549e))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d040](https://github.com/DSI-HUG/dejajs-components/commit/c23d040))
* **DejaMessageBoxComponent:** add showCloseIcon property in order to display a close icon at the top and on the right of the title bar. ([7867617](https://github.com/DSI-HUG/dejajs-components/commit/7867617))
* **DejaMonacoEditor:** autosize when parent is resizing + dynamicaly change language ([4e32ab0](https://github.com/DSI-HUG/dejajs-components/commit/4e32ab0))
* **DejaPopup:** Draggable popup ([18b0d96](https://github.com/DSI-HUG/dejajs-components/commit/18b0d96))
* **DejaPopup:** enable custom TemplateRef ([64e8aa3](https://github.com/DSI-HUG/dejajs-components/commit/64e8aa3))
* **DejaPopup:** enable insert of templateRef in advanced popup ([25970c1](https://github.com/DSI-HUG/dejajs-components/commit/25970c1))
* **DejaTiles:** Added event when refresh and binding is done ([6a90d78](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe45](https://github.com/DSI-HUG/dejajs-components/commit/9adbe45))
* **ISortInfos:** Modified to match lodash sorting ([0727177](https://github.com/DSI-HUG/dejajs-components/commit/0727177))
* **MonacoEditor:** Monaco editor service refactored for the new architecture ([c53cac4](https://github.com/DSI-HUG/dejajs-components/commit/c53cac4))
* **Popup:** Component injection ([bfdf0f1](https://github.com/DSI-HUG/dejajs-components/commit/bfdf0f1))
* **Popup:** DejaPopup ([b68e1ee](https://github.com/DSI-HUG/dejajs-components/commit/b68e1ee))
* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d97](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d97))


### BREAKING CHANGES

* **MonacoEditor:** Copy Assets in package.json must be replaced by the following line in the .angular-cli.json/apps/assets section { "glob": "**/*", "input": "../node_modules/monaco-editor/min", "output": "./assets/monaco/" }
* **SendAction:** SendAction is removed from the lib
* **DejaMarkdownComponent:** DejaMarkdownComponent is removed from the lib and is moved to the demo
* **DejaCodeViewerComponent:** DejaCodeViewerComponent is removed from the lib and is moved to the demo
* **DejaChips:** DejaChipsCloseEvent is now IDejaChipsCloseEvent in chips.component.ts. DejaChipsComponent raise event of type IDejaChipsCloseEvent
* **ColorEvent:** ColorEvent in color-event.ts is now IColorEvent in color-selector.component.ts. ColorSelector raise event of type IColorEvent
* **DejaCancelableEvent:** DejaCancelableEvent in cancelable-event.ts is now IDejaCancelableEvent in cancelable-event.interface.ts
* **SortingService:** deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.
* **ISortInfos:** name is mandatory and only a string and type is removed (Automatic detection of sorting type)
* **DejaTreeList:** Padding of the parent element can change. There is no more background gradient for
parent items


#### 2.24.3 (2018-02-15)

##### BREAKING CHANGES

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

* **MonacoEditorComponent:** Removed css-element-queries to fix the .d.ts compile error in prod ([0073d8e9](https://github.com/DSI-HUG/dejajs-components/commit/0073d8e9821d220f5822de8aacd0cea3dee15054))
* **Global:**
  * fix missing implementation for setDisabledState. ([335f3d6d](https://github.com/DSI-HUG/dejajs-components/commit/335f3d6d4e15eb26cfc731ed84f4bf17c064ebe6))
  * Correct noImplicitAny compile errors ([9351b036](https://github.com/DSI-HUG/dejajs-components/commit/9351b03653231693311f85c642cb14aae47b551b))
  * rxjs imports ([409c7808](https://github.com/DSI-HUG/dejajs-components/commit/409c78089e43fe06e9b64ac6cf908591d28e6eb4))
  * RxJs Imports ([751fbebe](https://github.com/DSI-HUG/dejajs-components/commit/751fbebe16ae2488129c8fcbb1c00e374841cbdc))
  * RxJs Imports ([dd445747](https://github.com/DSI-HUG/dejajs-components/commit/dd445747d8e333428d62e24328f3a10bb0318633))
  * RxJs Imports ([4047f5d2](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d2074b3f608644b1255e47af969cb417a1))
* **DejaGrid:**
  * Fix Object-Object displayed in the cell content when the value field is undefined ([72f0b9a3](https://github.com/DSI-HUG/dejajs-components/commit/72f0b9a364196caddbd71ea988acd27c9cfcc919))
  * Header bottom line style ([23fbe33c](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33c6604e1db68bc468a49cce612e1164662))
* **DejaNumericStepperModule:** Export numericStepper component ([3af6735a](https://github.com/DSI-HUG/dejajs-components/commit/3af6735ab37a7bcaf84d1a80ac8e968aeb805641))
* **MonacoEditor:** Added typings for css-element-queries ([f98362e4](https://github.com/DSI-HUG/dejajs-components/commit/f98362e40576cd314771a213610817fc29569284))
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
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
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

#### 2.24.2 (2018-02-14)

##### Bug Fixes

* **Global:**
  * fix missing implementation for setDisabledState. ([335f3d6d](https://github.com/DSI-HUG/dejajs-components/commit/335f3d6d4e15eb26cfc731ed84f4bf17c064ebe6))
  * Correct noImplicitAny compile errors ([9351b036](https://github.com/DSI-HUG/dejajs-components/commit/9351b03653231693311f85c642cb14aae47b551b))
* **DejaGrid:** Fix Object-Object displayed in the cell content when the value field is undefined ([72f0b9a3](https://github.com/DSI-HUG/dejajs-components/commit/72f0b9a364196caddbd71ea988acd27c9cfcc919))
* **DejaNumericStepperModule:** Export numericStepper component ([3af6735a](https://github.com/DSI-HUG/dejajs-components/commit/3af6735ab37a7bcaf84d1a80ac8e968aeb805641))
* **MonacoEditor:** Added typings for css-element-queries ([f98362e4](https://github.com/DSI-HUG/dejajs-components/commit/f98362e40576cd314771a213610817fc29569284))
* **DejaPopup:** fix tabindex bug in demo app ([7a0b7665](https://github.com/DSI-HUG/dejajs-components/commit/7a0b7665e96dfbc8cfda1b077b9ab55a38c4b0c8))

##### Refactors

* **DejaPopup:** readme and temaplate variables in component ([eb06d19e](https://github.com/DSI-HUG/dejajs-components/commit/eb06d19e8fd7aa6f3b93a8b9991bb888bf0f79bf))

##### Tests

* **accordion e2e:** Fix noImplicitAny compilation ([049c236a](https://github.com/DSI-HUG/dejajs-components/commit/049c236a1ff50e64eac20cce8ee79bcc88b76902))

#### 2.24.1 (2018-02-13)

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
* **Popup:**
  * Component injection ([bfdf0f13](https://github.com/DSI-HUG/dejajs-components/commit/bfdf0f1353ab54467b8000585858b90865334dbc))
  * DejaPopup ([b68e1ee5](https://github.com/DSI-HUG/dejajs-components/commit/b68e1ee54bf4375c23fd0c57cb9361b1944a522c))

##### Bug Fixes

* **DejaNumericStepperModule:** Export numericStepper component ([3af6735a](https://github.com/DSI-HUG/dejajs-components/commit/3af6735ab37a7bcaf84d1a80ac8e968aeb805641))
* **DejaPopup:**
  * fix tabindex bug in demo app ([7a0b7665](https://github.com/DSI-HUG/dejajs-components/commit/7a0b7665e96dfbc8cfda1b077b9ab55a38c4b0c8))
  * lint fix ([6c7d4887](https://github.com/DSI-HUG/dejajs-components/commit/6c7d4887e69a4799fbf95fbe93d77e7c72cc60b5))

##### Refactors

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

### 2.24.0 (2018-02-09)

##### BREAKING CHANGES

* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d971](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d971612d93bff0c3a97b2f2723e4ce787f4c))
    => deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.

* **ISortInfos:** Modified to match lodash sorting ([07271772](https://github.com/DSI-HUG/dejajs-components/commit/07271772ddf2554f582988fed162e78d06568c69))
    => name is mandatory and only a string and type is removed (Automatic detection of sorting type)


##### Build System / Dependencies

* **Sonar:** Add sonar configuration ([66fc8010](https://github.com/DSI-HUG/dejajs-components/commit/66fc8010bcb6a034e235e6fec6d342c30cb37711))

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

##### Bug Fixes

* **DejaPopup:** lint fix ([6c7d4887](https://github.com/DSI-HUG/dejajs-components/commit/6c7d4887e69a4799fbf95fbe93d77e7c72cc60b5))
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
* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02deb](https://github.com/DSI-HUG/dejajs-components/commit/baa02debc5e07fe7a7960c9667e130b47e75d373))
* **DejaTextMetricsService:**
  * improve text height calculation by taking in account white space separator ([41d360a5](https://github.com/DSI-HUG/dejajs-components/commit/41d360a559d19c409df980f1433251111e5fb2e2))
  * adjust text width with linux lower font ratio. ([3aa8f485](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f485295d574ec8076f85d1d1e542d57402bf))
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11b](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11b16ceecd3dcb2fccf9c0263cb335e5818))
* **DejaTilesComponent:**
  * Fix crash if model is not defined ([41e26968](https://github.com/DSI-HUG/dejajs-components/commit/41e269680996450f4dc6c44c2d66532b588df411))
  * Fix a synchronization issue between tiles model and associated dictionary ([9712b189](https://github.com/DSI-HUG/dejajs-components/commit/9712b189872eae6ca5fce4a01e38513b9507e018))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa53](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5334435b2d75362299835aa00761ebd1b1))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
* **DejaTiles:** Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd7](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd7d33fb4c6c1a58cb29cb775de4d2ca1cb))
* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf9](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf960e129d9d6fd5ecdbc4e6eb3d5fc0e6d))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d9](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d95bde9463c3e662897716d48a7b7c7ac4))

##### Refactors

* **DejaPopup:**
  * delete property isModal ([ef634308](https://github.com/DSI-HUG/dejajs-components/commit/ef634308839b9da62dad92ccd3de66586823d56e))
  * merge config properties content and aContent ([0fe020be](https://github.com/DSI-HUG/dejajs-components/commit/0fe020beac1fc276b9eb51f8d8fb35be7cf42324))
  * removing unused code ([55aecdbe](https://github.com/DSI-HUG/dejajs-components/commit/55aecdbe4d1933c9a608cd55173a152b9a930328))
* **Popup:**
  * added license ([6b26d421](https://github.com/DSI-HUG/dejajs-components/commit/6b26d421e66fddac58d3c4b3ffd60b0c185d0544))
  * added license ([6303235d](https://github.com/DSI-HUG/dejajs-components/commit/6303235d9164c4c72f73cf04e95355289be51743))
  * added license ([248bba4a](https://github.com/DSI-HUG/dejajs-components/commit/248bba4a8d1052ba3c2a074c8445a12fe8d10c04))
  * scss global style in his own file ([735795a3](https://github.com/DSI-HUG/dejajs-components/commit/735795a3b5d66cc307fed5d510151ed939839d56))

##### Code Style Changes

* **NumericStepperComponent:** Use change instead of blur + add tabIndex=-1 on buttons to remove tabs focus + use class.off-limits instead of ng-class ([f7769870](https://github.com/DSI-HUG/dejajs-components/commit/f776987060b093fde2c2ed8dcb1daeb11ad72ec3))

##### Tests

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
* **DejaGrid:** Improve unit test, replacing timer by spyOn ([cfc6fb1b](https://github.com/DSI-HUG/dejajs-components/commit/cfc6fb1b1768b1e89fafd1dc74a3a5ec23a3bd28))
* **DejaSelect:** Improve unit test, replacing timer by spyOn ([21c742d0](https://github.com/DSI-HUG/dejajs-components/commit/21c742d0c4290db0f188943315ed39ca23de8ed9))
* **DejaTreeList:** Improve unit test, replacing timer by spyOn ([83ede9cf](https://github.com/DSI-HUG/dejajs-components/commit/83ede9cffba5d4fd2f5a67a944a8575d69361178))
* **DejaBoldQueryComponent:** add junit test. ([d3f33ae5](https://github.com/DSI-HUG/dejajs-components/commit/d3f33ae5b3d2d81b4430ff40921605237aaaf719))
* **DejaViewPort:** Added one test ([1ddddfa4](https://github.com/DSI-HUG/dejajs-components/commit/1ddddfa4e98e17044294906bcc202f147cea1f40))

#### 2.23.4 (2018-02-07)

##### Bug Fixes

* **DejaPopupConfig:** config.data ([3870b52f](https://github.com/DSI-HUG/dejajs-components/commit/3870b52fe54a8c41dd00b78451f683476facbb7d))

#### 2.23.3 (2018-02-06)

##### Bug Fixes

* **DejaIntervalSelectorBoundaryComponent:** protected access in template... ([7de6edec](https://github.com/DSI-HUG/dejajs-components/commit/7de6edec0d8400b55e2c82d6442b6cc193e5c58f))

#### 2.23.2 (2018-02-06)

##### Bug Fixes

* **DejaIntervalSelectorComponent:** Access private member inside template ([8583d67b](https://github.com/DSI-HUG/dejajs-components/commit/8583d67b09e3e80415c6fb7870cdc22c79fea530))
* **DejaPopupConfig:** Remove config.data=this ([7ab0f6ca](https://github.com/DSI-HUG/dejajs-components/commit/7ab0f6caa8e4a5e1ca9b8c7af41afa011c727277))
* **Dependencies:** Fix dependencies management ([61cc9a59](https://github.com/DSI-HUG/dejajs-components/commit/61cc9a5991e8a6dea27b257389e86a458f072c8b))

#### 2.23.1 (2018-02-06)

##### Build System / Dependencies

* **Sonar:** Add sonar configuration ([66fc8010](https://github.com/DSI-HUG/dejajs-components/commit/66fc8010bcb6a034e235e6fec6d342c30cb37711))

##### New Features

* **DejaIntervalSelectorComponent:** component used to display lower and upper boundary for lower and upper value selection ([80e549ec](https://github.com/DSI-HUG/dejajs-components/commit/80e549ec99290d9b3c9c8cb444736f75e9ab4666))

##### Bug Fixes

* **Dependencies:** Fix dependencies management ([61cc9a59](https://github.com/DSI-HUG/dejajs-components/commit/61cc9a5991e8a6dea27b257389e86a458f072c8b))
* **Depencencies:** Fix dependencies management ([1b30f6d9](https://github.com/DSI-HUG/dejajs-components/commit/1b30f6d93289d15d28c8c7ce943ed8f19b63ea46))
* **DejaSidenav:** Removed Angular FlexLayout ([5a5e0dc4](https://github.com/DSI-HUG/dejajs-components/commit/5a5e0dc488049018b87e3c17ae6e06884809f9fd))
* **DejaDatePickerComponent:** Use different way to call date and time change events. ([12295d03](https://github.com/DSI-HUG/dejajs-components/commit/12295d03c0bbe3fd13983b1f4520094743ea9409))

### 2.23.0 (2018-02-06)

##### BREAKING CHANGES

* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d971](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d971612d93bff0c3a97b2f2723e4ce787f4c))
    => deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.

* **ISortInfos:** Modified to match lodash sorting ([07271772](https://github.com/DSI-HUG/dejajs-components/commit/07271772ddf2554f582988fed162e78d06568c69))
    => name is mandatory and only a string and type is removed (Automatic detection of sorting type)


##### Build System / Dependencies

* **Sonar:** Add sonar configuration ([66fc8010](https://github.com/DSI-HUG/dejajs-components/commit/66fc8010bcb6a034e235e6fec6d342c30cb37711))

##### Continuous Integration

* **Dependencies:**
  * upgrade dependencies ([98ff0d20](https://github.com/DSI-HUG/dejajs-components/commit/98ff0d20350f4d21379d9bb4b3a92da8579ad0a9))
  * upgrade dependencies ([d89174cb](https://github.com/DSI-HUG/dejajs-components/commit/d89174cbde226068eb06bd266bc974159cd65180))
* **Travis:**
  * Add DSI Slack notifications ([00b64915](https://github.com/DSI-HUG/dejajs-components/commit/00b649157cff7cc8279ab534b680946d35e8ef40))
  * Add DSI Slack notifications ([e73a8b68](https://github.com/DSI-HUG/dejajs-components/commit/e73a8b689304dab83499104b03af2cbbc9bff144))

##### New Features

* **DejaIntervalSelectorComponent:** component used to display lower and upper boundary for lower and upper value selection ([80e549ec](https://github.com/DSI-HUG/dejajs-components/commit/80e549ec99290d9b3c9c8cb444736f75e9ab4666))
* **DejaMonacoEditor:** autosize when parent is resizing + dynamicaly change language ([4e32ab03](https://github.com/DSI-HUG/dejajs-components/commit/4e32ab03600404c4a4bb427d898cfcefb2007221))
* **DejaGrid:** Add events when grouping or sorting are raised form the component ([d0d1e706](https://github.com/DSI-HUG/dejajs-components/commit/d0d1e706dc8212b906e10dac9cc10e8e5a55e647))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe458](https://github.com/DSI-HUG/dejajs-components/commit/9adbe4589c493e1078a564b835485baf48afa2d5))
* **DejaTiles:** Added event when refresh and binding is done ([6a90d78e](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78ed9bb9107e59bcec42ecb062701ba1844))

##### Bug Fixes

* **Depencencies:** Fix dependencies management ([1b30f6d9](https://github.com/DSI-HUG/dejajs-components/commit/1b30f6d93289d15d28c8c7ce943ed8f19b63ea46))
* **DejaSidenav:** Removed Angular FlexLayout ([5a5e0dc4](https://github.com/DSI-HUG/dejajs-components/commit/5a5e0dc488049018b87e3c17ae6e06884809f9fd))
* **DejaDatePickerComponent:** Use different way to call date and time change events. ([12295d03](https://github.com/DSI-HUG/dejajs-components/commit/12295d03c0bbe3fd13983b1f4520094743ea9409))
* **DejaGridComponent:** Fix missing returned type for some function ([4cabf658](https://github.com/DSI-HUG/dejajs-components/commit/4cabf658c9cc0fb748c2361a1d0017b1b898a78a))
* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02deb](https://github.com/DSI-HUG/dejajs-components/commit/baa02debc5e07fe7a7960c9667e130b47e75d373))
* **DejaTextMetricsService:**
  * improve text height calculation by taking in account white space separator ([41d360a5](https://github.com/DSI-HUG/dejajs-components/commit/41d360a559d19c409df980f1433251111e5fb2e2))
  * adjust text width with linux lower font ratio. ([3aa8f485](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f485295d574ec8076f85d1d1e542d57402bf))
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11b](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11b16ceecd3dcb2fccf9c0263cb335e5818))
* **DejaTilesComponent:**
  * Fix crash if model is not defined ([41e26968](https://github.com/DSI-HUG/dejajs-components/commit/41e269680996450f4dc6c44c2d66532b588df411))
  * Fix a synchronization issue between tiles model and associated dictionary ([9712b189](https://github.com/DSI-HUG/dejajs-components/commit/9712b189872eae6ca5fce4a01e38513b9507e018))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa53](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5334435b2d75362299835aa00761ebd1b1))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
* **DejaTiles:** Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd7](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd7d33fb4c6c1a58cb29cb775de4d2ca1cb))

##### Code Style Changes

* **NumericStepperComponent:** Use change instead of blur + add tabIndex=-1 on buttons to remove tabs focus + use class.off-limits instead of ng-class ([f7769870](https://github.com/DSI-HUG/dejajs-components/commit/f776987060b093fde2c2ed8dcb1daeb11ad72ec3))

##### Tests

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
* **DejaGrid:** Improve unit test, replacing timer by spyOn ([cfc6fb1b](https://github.com/DSI-HUG/dejajs-components/commit/cfc6fb1b1768b1e89fafd1dc74a3a5ec23a3bd28))
* **DejaSelect:** Improve unit test, replacing timer by spyOn ([21c742d0](https://github.com/DSI-HUG/dejajs-components/commit/21c742d0c4290db0f188943315ed39ca23de8ed9))
* **DejaTreeList:** Improve unit test, replacing timer by spyOn ([83ede9cf](https://github.com/DSI-HUG/dejajs-components/commit/83ede9cffba5d4fd2f5a67a944a8575d69361178))
* **DejaViewPort:** Added one test ([1ddddfa4](https://github.com/DSI-HUG/dejajs-components/commit/1ddddfa4e98e17044294906bcc202f147cea1f40))

#### 2.22.2 (2018-01-31)

##### New Features

* **DejaMonacoEditor:** autosize when parent is resizing + dynamicaly change language ([4e32ab03](https://github.com/DSI-HUG/dejajs-components/commit/4e32ab03600404c4a4bb427d898cfcefb2007221))

#### 2.22.1 (2018-01-29)

##### BREAKING CHANGES

* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d971](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d971612d93bff0c3a97b2f2723e4ce787f4c))
    => deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.

* **ISortInfos:** Modified to match lodash sorting ([07271772](https://github.com/DSI-HUG/dejajs-components/commit/07271772ddf2554f582988fed162e78d06568c69))
    => name is mandatory and only a string and type is removed (Automatic detection of sorting type)


##### Continuous Integration

* **Dependencies:** upgrade dependencies ([98ff0d20](https://github.com/DSI-HUG/dejajs-components/commit/98ff0d20350f4d21379d9bb4b3a92da8579ad0a9))

##### New Features

* **DejaGrid:** Add events when grouping or sorting are raised form the component ([d0d1e706](https://github.com/DSI-HUG/dejajs-components/commit/d0d1e706dc8212b906e10dac9cc10e8e5a55e647))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe458](https://github.com/DSI-HUG/dejajs-components/commit/9adbe4589c493e1078a564b835485baf48afa2d5))

##### Bug Fixes

* **DejaGridComponent:** Fix missing returned type for some function ([4cabf658](https://github.com/DSI-HUG/dejajs-components/commit/4cabf658c9cc0fb748c2361a1d0017b1b898a78a))
* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02deb](https://github.com/DSI-HUG/dejajs-components/commit/baa02debc5e07fe7a7960c9667e130b47e75d373))
* **DejaTextMetricsService:**
  * improve text height calculation by taking in account white space separator ([41d360a5](https://github.com/DSI-HUG/dejajs-components/commit/41d360a559d19c409df980f1433251111e5fb2e2))
  * adjust text width with linux lower font ratio. ([3aa8f485](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f485295d574ec8076f85d1d1e542d57402bf))
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11b](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11b16ceecd3dcb2fccf9c0263cb335e5818))

##### Code Style Changes

* **NumericStepperComponent:** Use change instead of blur + add tabIndex=-1 on buttons to remove tabs focus + use class.off-limits instead of ng-class ([f7769870](https://github.com/DSI-HUG/dejajs-components/commit/f776987060b093fde2c2ed8dcb1daeb11ad72ec3))

##### Tests

* **CodeViewer:** Added unit test ([684056b4](https://github.com/DSI-HUG/dejajs-components/commit/684056b4a26960dd0fd80d34da56cdedd5717d01))
* **DejaTextMetricsService:** test. ([574076de](https://github.com/DSI-HUG/dejajs-components/commit/574076de47fbdf9e4454c943eae0a5221a7905f5))
* **CloningService:** Added unit lodash test to compare with the previous cloning service test ([19c88289](https://github.com/DSI-HUG/dejajs-components/commit/19c88289a25a285852d9239b727f09ec99b9891a))

### 2.22.0 (2018-01-29)

##### BREAKING CHANGES

* **SortingService:** Usage of lodash for the sorting algorithm ([0fc1d971](https://github.com/DSI-HUG/dejajs-components/commit/0fc1d971612d93bff0c3a97b2f2723e4ce787f4c))
    => deprecated sort (returned a promise) is now a synchronous function. Compare is removed, use lodash instead.

* **ISortInfos:** Modified to match lodash sorting ([07271772](https://github.com/DSI-HUG/dejajs-components/commit/07271772ddf2554f582988fed162e78d06568c69))
    => name is mandatory and only a string and type is removed (Automatic detection of sorting type)


##### Continuous Integration

* **Dependencies:**
  * upgrade dependencies ([98ff0d20](https://github.com/DSI-HUG/dejajs-components/commit/98ff0d20350f4d21379d9bb4b3a92da8579ad0a9))
  * upgrade dependencies ([d89174cb](https://github.com/DSI-HUG/dejajs-components/commit/d89174cbde226068eb06bd266bc974159cd65180))
* **Travis:**
  * Add DSI Slack notifications ([00b64915](https://github.com/DSI-HUG/dejajs-components/commit/00b649157cff7cc8279ab534b680946d35e8ef40))
  * Add DSI Slack notifications ([e73a8b68](https://github.com/DSI-HUG/dejajs-components/commit/e73a8b689304dab83499104b03af2cbbc9bff144))

##### New Features

* **DejaGrid:** Add events when grouping or sorting are raised form the component ([d0d1e706](https://github.com/DSI-HUG/dejajs-components/commit/d0d1e706dc8212b906e10dac9cc10e8e5a55e647))
* **Global:** Cloning service is deprecated, replaced by lodash._cloneDeep ([9adbe458](https://github.com/DSI-HUG/dejajs-components/commit/9adbe4589c493e1078a564b835485baf48afa2d5))
* **DejaTiles:** Added event when refresh and binding is done ([6a90d78e](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78ed9bb9107e59bcec42ecb062701ba1844))

##### Bug Fixes

* **DejaSelectComponent:** Selection for empty or null key object in reactiveForm ([baa02deb](https://github.com/DSI-HUG/dejajs-components/commit/baa02debc5e07fe7a7960c9667e130b47e75d373))
* **DejaTextMetricsService:**
  * improve text height calculation by taking in account white space separator ([41d360a5](https://github.com/DSI-HUG/dejajs-components/commit/41d360a559d19c409df980f1433251111e5fb2e2))
  * adjust text width with linux lower font ratio. ([3aa8f485](https://github.com/DSI-HUG/dejajs-components/commit/3aa8f485295d574ec8076f85d1d1e542d57402bf))
* **DejaGridGroupAreaComponent:** Fix grouping refresh when to chips are inverted in the group area ([5b08c11b](https://github.com/DSI-HUG/dejajs-components/commit/5b08c11b16ceecd3dcb2fccf9c0263cb335e5818))
* **DejaTilesComponent:**
  * Fix crash if model is not defined ([41e26968](https://github.com/DSI-HUG/dejajs-components/commit/41e269680996450f4dc6c44c2d66532b588df411))
  * Fix a synchronization issue between tiles model and associated dictionary ([9712b189](https://github.com/DSI-HUG/dejajs-components/commit/9712b189872eae6ca5fce4a01e38513b9507e018))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa53](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5334435b2d75362299835aa00761ebd1b1))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
* **DejaTiles:** Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd7](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd7d33fb4c6c1a58cb29cb775de4d2ca1cb))

##### Code Style Changes

* **NumericStepperComponent:** Use change instead of blur + add tabIndex=-1 on buttons to remove tabs focus + use class.off-limits instead of ng-class ([b654df9c](https://github.com/DSI-HUG/dejajs-components/commit/b654df9c1fb0fd2715108567302bf3a438f19cbb))

##### Tests

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
* **DejaGrid:** Improve unit test, replacing timer by spyOn ([cfc6fb1b](https://github.com/DSI-HUG/dejajs-components/commit/cfc6fb1b1768b1e89fafd1dc74a3a5ec23a3bd28))
* **DejaSelect:** Improve unit test, replacing timer by spyOn ([21c742d0](https://github.com/DSI-HUG/dejajs-components/commit/21c742d0c4290db0f188943315ed39ca23de8ed9))
* **DejaTreeList:** Improve unit test, replacing timer by spyOn ([83ede9cf](https://github.com/DSI-HUG/dejajs-components/commit/83ede9cffba5d4fd2f5a67a944a8575d69361178))
* **DejaViewPort:** Added one test ([1ddddfa4](https://github.com/DSI-HUG/dejajs-components/commit/1ddddfa4e98e17044294906bcc202f147cea1f40))

### 2.21.0 (2018-01-10)

##### BREAKING CHANGES

* **DejaTreeList:** Fix limited depth ([7f19da35](https://github.com/DSI-HUG/dejajs-components/commit/7f19da35906d035b617c49492c8afebd7b437a94))
    => Fix limited padding depth to 4 and remove background gradient for parent items

Padding of the parent element can change. There is no more background gradient for
parent items

DEJS-221


##### Chores

* **Dependencies:** Get RXJS from Angular CLI ([fbd0596b](https://github.com/DSI-HUG/dejajs-components/commit/fbd0596b2fe0567c22c51bfc19675217aca0150f))

##### Continuous Integration

* **Dependencies:** upgrade dependencies ([d89174cb](https://github.com/DSI-HUG/dejajs-components/commit/d89174cbde226068eb06bd266bc974159cd65180))
* **Travis:**
  * Add DSI Slack notifications ([00b64915](https://github.com/DSI-HUG/dejajs-components/commit/00b649157cff7cc8279ab534b680946d35e8ef40))
  * Add DSI Slack notifications ([e73a8b68](https://github.com/DSI-HUG/dejajs-components/commit/e73a8b689304dab83499104b03af2cbbc9bff144))

##### New Features

* **DejaTiles:** Added event when refresh and binding is done ([6a90d78e](https://github.com/DSI-HUG/dejajs-components/commit/6a90d78ed9bb9107e59bcec42ecb062701ba1844))
* **DejaMessageBoxComponent:** add showCloseIcon property in order to display a close icon at the top and on the right of the title bar. ([7867617a](https://github.com/DSI-HUG/dejajs-components/commit/7867617a4a9fe9323c477cea9c0f33d8a62cdd42))
* **DejaDatePickerComponent:** Add event onDateChange and onTimeChange ([f3fa96f3](https://github.com/DSI-HUG/dejajs-components/commit/f3fa96f31c86b1dc4cf12e46891783c53c1305cb))
* **DejaBoldQueryComponent:** added new properties firstOccurenceOnly, firstOccurencePerWordOnly, atTheBeginningOfWordOnly, highlightClassName. ([3ccf5caa](https://github.com/DSI-HUG/dejajs-components/commit/3ccf5caa1a8382d1a295c4d9323128b568509b85))
* **DatePicker:**
  * layout as a string ([235e0f37](https://github.com/DSI-HUG/dejajs-components/commit/235e0f376236030b430ddff710ea4be77083828a))
  * time picker and time selector ([142b977b](https://github.com/DSI-HUG/dejajs-components/commit/142b977b5e9a9d3aa041bdc53027eea0a43909df))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d0405](https://github.com/DSI-HUG/dejajs-components/commit/c23d0405125f3d0af17a50fcae8901fb73de3f3b))

##### Bug Fixes

* **DejaTilesComponent:**
  * Fix crash if model is not defined ([41e26968](https://github.com/DSI-HUG/dejajs-components/commit/41e269680996450f4dc6c44c2d66532b588df411))
  * Fix a synchronization issue between tiles model and associated dictionary ([9712b189](https://github.com/DSI-HUG/dejajs-components/commit/9712b189872eae6ca5fce4a01e38513b9507e018))
* **GlobalEventService:** Fix test fail due to a missing sendaction.js script ([3fabaa53](https://github.com/DSI-HUG/dejajs-components/commit/3fabaa5334435b2d75362299835aa00761ebd1b1))
* **DejaTooltip:** Improve alignment because overlay material can't fit into body (DEJS-302 Régression UserCard) ([22834144](https://github.com/DSI-HUG/dejajs-components/commit/2283414438c6827b986b57be6958b7e4809b8525))
* **DejaTiles:**
  * Improved event and garbage collection to avoid null pointers onDestroy ([902f9cd7](https://github.com/DSI-HUG/dejajs-components/commit/902f9cd7d33fb4c6c1a58cb29cb775de4d2ca1cb))
  * Remove selection when tiles are empties ([55da6084](https://github.com/DSI-HUG/dejajs-components/commit/55da6084a9b331e51a4887abe901c8fc1f101c43))
* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf9](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf960e129d9d6fd5ecdbc4e6eb3d5fc0e6d))
* **DejaDatePickerComponent:** #94 check mask on blur and make control invalid if mask isn't ok ([7c25cf70](https://github.com/DSI-HUG/dejajs-components/commit/7c25cf70cf9264aa8345270f94e1edb704f2d5c9))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d9](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d95bde9463c3e662897716d48a7b7c7ac4))
* **DejaTile:**
  * Removed useless this in html ([ef9657ca](https://github.com/DSI-HUG/dejajs-components/commit/ef9657ca45856177b81cdfb41319fbcbeda6a25f))
  * Spinner position (Regression due to mateial spinner changes) ([5b773940](https://github.com/DSI-HUG/dejajs-components/commit/5b773940dc7f0def46ff8997fc51ababb02c879e))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba5520](https://github.com/DSI-HUG/dejajs-components/commit/b5ba5520025c62febb3910142cdc39add74f8c53))
* **DejaGrid:** Header bottom line style ([23fbe33c](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33c6604e1db68bc468a49cce612e1164662))
* **DejaSelect:**
  * Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666b](https://github.com/DSI-HUG/dejajs-components/commit/e11e666bdfa0b0e8a7bdb369bb1f56f305091b0f))
  * rxjs imports ([c0ca4ba9](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba911bed823fc152d939da889618cb1ce0e))
  * Hide when an element is clicked ([6236f108](https://github.com/DSI-HUG/dejajs-components/commit/6236f108d4fe175dc3ced30e08fbcf53863a64b8))
  * Autocomplete clear model when text is changed DEJS-246 ([14efbbde](https://github.com/DSI-HUG/dejajs-components/commit/14efbbde2140745ea1e62f5163645d908f63255d))
  * Width regression from material rc0 migration ([6188733f](https://github.com/DSI-HUG/dejajs-components/commit/6188733fe54d2913a13b9c5990534ca40dbfcf1a))
* **Global:**
  * rxjs imports ([409c7808](https://github.com/DSI-HUG/dejajs-components/commit/409c78089e43fe06e9b64ac6cf908591d28e6eb4))
  * RxJs Imports ([751fbebe](https://github.com/DSI-HUG/dejajs-components/commit/751fbebe16ae2488129c8fcbb1c00e374841cbdc))
  * RxJs Imports ([dd445747](https://github.com/DSI-HUG/dejajs-components/commit/dd445747d8e333428d62e24328f3a10bb0318633))
  * RxJs Imports ([4047f5d2](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d2074b3f608644b1255e47af969cb417a1))
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
* **DejaSelectComponent:** Issues fixing find by unit test ([279f5942](https://github.com/DSI-HUG/dejajs-components/commit/279f59420783ca4b7c4513aa6860fc4c97157850))

##### Refactors

* **DejaGrid:** Fix Lint errors and change signature observeViewPort$ ([1fad0139](https://github.com/DSI-HUG/dejajs-components/commit/1fad0139a05d9f6aa76b335170818c09bf7ea167))
* **DatePicker:**
  * check removed for layout classname in template ([04ac3db0](https://github.com/DSI-HUG/dejajs-components/commit/04ac3db07a6eea318fe3e91d30406dfdaad65e9d))
  * cleanup after time picker ([1c5d7c2d](https://github.com/DSI-HUG/dejajs-components/commit/1c5d7c2d931de27282ca88f531201a14464e2d46))

##### Tests

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

### 2.20.0 (2017-12-22)

##### BREAKING CHANGES

* **DejaTreeList:** Fix limited depth ([7f19da35](https://github.com/DSI-HUG/dejajs-components/commit/7f19da35906d035b617c49492c8afebd7b437a94))
    => Fix limited padding depth to 4 and remove background gradient for parent items

Padding of the parent element can change. There is no more background gradient for
parent items

DEJS-221


##### New Features

* **DejaMessageBoxComponent:** add showCloseIcon property in order to display a close icon at the top and on the right of the title bar. ([7867617a](https://github.com/DSI-HUG/dejajs-components/commit/7867617a4a9fe9323c477cea9c0f33d8a62cdd42))
* **DejaDatePickerComponent:** Add event onDateChange and onTimeChange ([f3fa96f3](https://github.com/DSI-HUG/dejajs-components/commit/f3fa96f31c86b1dc4cf12e46891783c53c1305cb))
* **DejaBoldQueryComponent:** added new properties firstOccurenceOnly, firstOccurencePerWordOnly, atTheBeginningOfWordOnly, highlightClassName. ([3ccf5caa](https://github.com/DSI-HUG/dejajs-components/commit/3ccf5caa1a8382d1a295c4d9323128b568509b85))
* **DatePicker:**
  * layout as a string ([235e0f37](https://github.com/DSI-HUG/dejajs-components/commit/235e0f376236030b430ddff710ea4be77083828a))
  * time picker and time selector ([142b977b](https://github.com/DSI-HUG/dejajs-components/commit/142b977b5e9a9d3aa041bdc53027eea0a43909df))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d0405](https://github.com/DSI-HUG/dejajs-components/commit/c23d0405125f3d0af17a50fcae8901fb73de3f3b))

##### Bug Fixes

* **DejadatePickerComponent:** Raise change events on keyboard navigation ([d9c43cf9](https://github.com/DSI-HUG/dejajs-components/commit/d9c43cf960e129d9d6fd5ecdbc4e6eb3d5fc0e6d))
* **DejaDatePickerComponent:** #94 check mask on blur and make control invalid if mask isn't ok ([7c25cf70](https://github.com/DSI-HUG/dejajs-components/commit/7c25cf70cf9264aa8345270f94e1edb704f2d5c9))
* **DejaDateSelectorComponent:** Hour cursor was displayed on 12 when click on 0 ([bfa740d9](https://github.com/DSI-HUG/dejajs-components/commit/bfa740d95bde9463c3e662897716d48a7b7c7ac4))
* **DejaTile:**
  * Removed useless this in html ([ef9657ca](https://github.com/DSI-HUG/dejajs-components/commit/ef9657ca45856177b81cdfb41319fbcbeda6a25f))
  * Spinner position (Regression due to mateial spinner changes) ([5b773940](https://github.com/DSI-HUG/dejajs-components/commit/5b773940dc7f0def46ff8997fc51ababb02c879e))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba5520](https://github.com/DSI-HUG/dejajs-components/commit/b5ba5520025c62febb3910142cdc39add74f8c53))
* **DejaGrid:** Header bottom line style ([23fbe33c](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33c6604e1db68bc468a49cce612e1164662))
* **DejaSelect:** Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666b](https://github.com/DSI-HUG/dejajs-components/commit/e11e666bdfa0b0e8a7bdb369bb1f56f305091b0f))
* **DejaTiles:** Remove selection when tiles are empties ([55da6084](https://github.com/DSI-HUG/dejajs-components/commit/55da6084a9b331e51a4887abe901c8fc1f101c43))
* **Global:** rxjs imports ([409c7808](https://github.com/DSI-HUG/dejajs-components/commit/409c78089e43fe06e9b64ac6cf908591d28e6eb4))
* **DatePicker:**
  * conflicts with 2.18.6 ([361de340](https://github.com/DSI-HUG/dejajs-components/commit/361de340e0c7eec131f102ceb58187af71209d95))
  * consecutives blank lines ([a7f41908](https://github.com/DSI-HUG/dejajs-components/commit/a7f4190841f84c467af188dfbc41f7fc59693d7a))
  * fixed circular dependencies ([1901ec17](https://github.com/DSI-HUG/dejajs-components/commit/1901ec170db4ac834b24da251fc0cbf1aa95f0c4))
* **ItemListService:** Ensure pre-selection from items object DEJS-256 ([70177209](https://github.com/DSI-HUG/dejajs-components/commit/70177209bac03daa97d4a2340b26661dc6b98b7a))

##### Refactors

* **DatePicker:**
  * check removed for layout classname in template ([04ac3db0](https://github.com/DSI-HUG/dejajs-components/commit/04ac3db07a6eea318fe3e91d30406dfdaad65e9d))
  * cleanup after time picker ([1c5d7c2d](https://github.com/DSI-HUG/dejajs-components/commit/1c5d7c2d931de27282ca88f531201a14464e2d46))

##### Tests

* **DejaBoldQueryComponent:** add junit test. ([d3f33ae5](https://github.com/DSI-HUG/dejajs-components/commit/d3f33ae5b3d2d81b4430ff40921605237aaaf719))
* **TimeAgoPipe:** Add unit test for TimeAgo pipe ([f7036292](https://github.com/DSI-HUG/dejajs-components/commit/f7036292219dfa2c895f4ec7c1c99a493a16e595))

### 2.19.0 (2017-12-15)

##### BREAKING CHANGES

* **DejaTreeList:** Fix limited depth ([7f19da35](https://github.com/DSI-HUG/dejajs-components/commit/7f19da35906d035b617c49492c8afebd7b437a94))
    => Fix limited padding depth to 4 and remove background gradient for parent items

Padding of the parent element can change. There is no more background gradient for
parent items

DEJS-221

* **DateValidator:** Remove the dateValidator because it makes useless validation (DEJS-264)

##### New Features

* **DatePicker:**
  * layout as a string ([235e0f37](https://github.com/DSI-HUG/dejajs-components/commit/235e0f376236030b430ddff710ea4be77083828a))
  * time picker and time selector ([142b977b](https://github.com/DSI-HUG/dejajs-components/commit/142b977b5e9a9d3aa041bdc53027eea0a43909df))
* **DejaItem:** Add selected input to deja item DEJS-250 ([c23d0405](https://github.com/DSI-HUG/dejajs-components/commit/c23d0405125f3d0af17a50fcae8901fb73de3f3b))

##### Bug Fixes

* **DejaTile:** Removed useless this in html ([ef9657ca](https://github.com/DSI-HUG/dejajs-components/commit/ef9657ca45856177b81cdfb41319fbcbeda6a25f))
* **ViewPortService:** ViewportService sometimes blocked when the last item is displayed and the scoll button up is pressed ([b5ba5520](https://github.com/DSI-HUG/dejajs-components/commit/b5ba5520025c62febb3910142cdc39add74f8c53))
* **DatePicker:**
  * conflicts with 2.18.6 ([361de340](https://github.com/DSI-HUG/dejajs-components/commit/361de340e0c7eec131f102ceb58187af71209d95))
  * consecutives blank lines ([a7f41908](https://github.com/DSI-HUG/dejajs-components/commit/a7f4190841f84c467af188dfbc41f7fc59693d7a))
  * fixed circular dependencies ([1901ec17](https://github.com/DSI-HUG/dejajs-components/commit/1901ec170db4ac834b24da251fc0cbf1aa95f0c4))
* **ItemListService:** Ensure pre-selection from items object DEJS-256 ([70177209](https://github.com/DSI-HUG/dejajs-components/commit/70177209bac03daa97d4a2340b26661dc6b98b7a))

##### Refactors

* **DatePicker:**
  * check removed for layout classname in template ([04ac3db0](https://github.com/DSI-HUG/dejajs-components/commit/04ac3db07a6eea318fe3e91d30406dfdaad65e9d))
  * cleanup after time picker ([1c5d7c2d](https://github.com/DSI-HUG/dejajs-components/commit/1c5d7c2d931de27282ca88f531201a14464e2d46))

#### 2.18.11 (2017-12-13)

##### Bug Fixes

* **DejaGrid:** Header bottom line style ([23fbe33c](https://github.com/DSI-HUG/dejajs-components/commit/23fbe33c6604e1db68bc468a49cce612e1164662))
* **DejaSelect:** Ensure SearchCriteria in auto-complete when min search length is set and a value already selected ([e11e666b](https://github.com/DSI-HUG/dejajs-components/commit/e11e666bdfa0b0e8a7bdb369bb1f56f305091b0f))
* **DejaTiles:** Remove selection when tiles are empties ([55da6084](https://github.com/DSI-HUG/dejajs-components/commit/55da6084a9b331e51a4887abe901c8fc1f101c43))

##### Tests

* **TimeAgoPipe:** Add unit test for TimeAgo pipe ([f7036292](https://github.com/DSI-HUG/dejajs-components/commit/f7036292219dfa2c895f4ec7c1c99a493a16e595))

#### 2.18.10 (2017-12-07)

##### Bug Fixes

* **DejaTile:** Spinner position (Regression due to mateial spinner changes) ([5b773940](https://github.com/DSI-HUG/dejajs-components/commit/5b773940dc7f0def46ff8997fc51ababb02c879e))
* **Global:** rxjs imports ([409c7808](https://github.com/DSI-HUG/dejajs-components/commit/409c78089e43fe06e9b64ac6cf908591d28e6eb4))
* **DejaNumericStepperComponent:** add possibility to remove value and fix onChangeCallback out of range. ([20376c3d](https://github.com/DSI-HUG/dejajs-components/commit/20376c3dd90597839c1a0bb38c11e99776cf14f7))

#### 2.18.9 (2017-12-07)

##### Chores

* **Dependencies:** Get RXJS from Angular CLI ([fbd0596b](https://github.com/DSI-HUG/dejajs-components/commit/fbd0596b2fe0567c22c51bfc19675217aca0150f))

##### Bug Fixes

* **DejaNumericStepperComponent:** add possibility to remove value and fix onChangeCallback out of range. ([20376c3d](https://github.com/DSI-HUG/dejajs-components/commit/20376c3dd90597839c1a0bb38c11e99776cf14f7))
* **DejaSelect:**
  * rxjs imports ([c0ca4ba9](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba911bed823fc152d939da889618cb1ce0e))
  * Hide when an element is clicked ([6236f108](https://github.com/DSI-HUG/dejajs-components/commit/6236f108d4fe175dc3ced30e08fbcf53863a64b8))
* **DemoTiles:** Drag cursor is missing ([cfccdeba](https://github.com/DSI-HUG/dejajs-components/commit/cfccdeba2c523676bb1c820f5b4244a4c00cb86e))
* **ColorPicker:** Disabled style ([3217117d](https://github.com/DSI-HUG/dejajs-components/commit/3217117d656dec93eef8c38e82b9e1ee827df23c))
* **Global:**
  * RxJs Imports ([751fbebe](https://github.com/DSI-HUG/dejajs-components/commit/751fbebe16ae2488129c8fcbb1c00e374841cbdc))
  * RxJs Imports ([dd445747](https://github.com/DSI-HUG/dejajs-components/commit/dd445747d8e333428d62e24328f3a10bb0318633))
  * RxJs Imports ([4047f5d2](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d2074b3f608644b1255e47af969cb417a1))

##### Refactors

* **DejaGrid:** Fix Lint errors and change signature observeViewPort$ ([1fad0139](https://github.com/DSI-HUG/dejajs-components/commit/1fad0139a05d9f6aa76b335170818c09bf7ea167))

##### Tests

* **ViewPortTest:**
  * fix ([835bc644](https://github.com/DSI-HUG/dejajs-components/commit/835bc644e80ae5fd8c5f9dadf5d603aa56949968))
  * fix ([753c95db](https://github.com/DSI-HUG/dejajs-components/commit/753c95db13c78ba3e68b2f252f6bb9442a5b3906))
* **DejaGrid:**
  * Fix travis test timing issue ([c8d7fc7b](https://github.com/DSI-HUG/dejajs-components/commit/c8d7fc7b5c7f1de2d75cd8b9fd8155ad937204fd))
  * Improve unit test ([5721cc8e](https://github.com/DSI-HUG/dejajs-components/commit/5721cc8e6ea1f79343976a3ad48920d9cfd21822))
  * Improve unit test ([06febec8](https://github.com/DSI-HUG/dejajs-components/commit/06febec870c666d250f3be8df7d63878ebfabbdb))
  * Improve unit test ([ffcc0a06](https://github.com/DSI-HUG/dejajs-components/commit/ffcc0a066fa9e7dbf2049b27eee289c296bc0e98))
  * Improve unit test ([1e1ae0ce](https://github.com/DSI-HUG/dejajs-components/commit/1e1ae0ceaf43f57436573bf5af8b002b59cc5b94))
  * Improve unit test ([72c6ac49](https://github.com/DSI-HUG/dejajs-components/commit/72c6ac49861bd2b5695689439b39c1395f2f12e2))
  * Added unit test ([9650633a](https://github.com/DSI-HUG/dejajs-components/commit/9650633a7fd50beb924ba7d896683f78ce253289))
* **Global:** Replaced deprecated function to initiate MouseEvent ([e9edb056](https://github.com/DSI-HUG/dejajs-components/commit/e9edb056ec4b535edd7971ceeeaa4965f94acbba))

#### 2.18.8 (2017-12-06)

##### Bug Fixes

* **DejaSelect:** rxjs imports ([c0ca4ba9](https://github.com/DSI-HUG/dejajs-components/commit/c0ca4ba911bed823fc152d939da889618cb1ce0e))

##### Tests

* **ViewPortTest:** fix ([835bc644](https://github.com/DSI-HUG/dejajs-components/commit/835bc644e80ae5fd8c5f9dadf5d603aa56949968))

#### 2.18.7 (2017-12-06)

##### Chores

* **Dependencies:** Get RXJS from Angular CLI ([fbd0596b](https://github.com/DSI-HUG/dejajs-components/commit/fbd0596b2fe0567c22c51bfc19675217aca0150f))

##### Refactors

* **DejaGrid:** Fix Lint errors and change signature observeViewPort$ ([1fad0139](https://github.com/DSI-HUG/dejajs-components/commit/1fad0139a05d9f6aa76b335170818c09bf7ea167))

##### Tests

* **ViewPortTest:** fix ([753c95db](https://github.com/DSI-HUG/dejajs-components/commit/753c95db13c78ba3e68b2f252f6bb9442a5b3906))
* **DejaGrid:**
  * Fix travis test timing issue ([c8d7fc7b](https://github.com/DSI-HUG/dejajs-components/commit/c8d7fc7b5c7f1de2d75cd8b9fd8155ad937204fd))
  * Improve unit test ([5721cc8e](https://github.com/DSI-HUG/dejajs-components/commit/5721cc8e6ea1f79343976a3ad48920d9cfd21822))
  * Improve unit test ([06febec8](https://github.com/DSI-HUG/dejajs-components/commit/06febec870c666d250f3be8df7d63878ebfabbdb))
  * Improve unit test ([ffcc0a06](https://github.com/DSI-HUG/dejajs-components/commit/ffcc0a066fa9e7dbf2049b27eee289c296bc0e98))
  * Improve unit test ([1e1ae0ce](https://github.com/DSI-HUG/dejajs-components/commit/1e1ae0ceaf43f57436573bf5af8b002b59cc5b94))
  * Improve unit test ([72c6ac49](https://github.com/DSI-HUG/dejajs-components/commit/72c6ac49861bd2b5695689439b39c1395f2f12e2))
  * Added unit test ([9650633a](https://github.com/DSI-HUG/dejajs-components/commit/9650633a7fd50beb924ba7d896683f78ce253289))
* **Global:** Replaced deprecated function to initiate MouseEvent ([e9edb056](https://github.com/DSI-HUG/dejajs-components/commit/e9edb056ec4b535edd7971ceeeaa4965f94acbba))

#### 2.18.6 (2017-11-29)

#### 2.18.5 (2017-11-29)

##### Bug Fixes

* **DemoTiles:** Drag cursor is missing ([cfccdeba](https://github.com/DSI-HUG/dejajs-components/commit/cfccdeba2c523676bb1c820f5b4244a4c00cb86e))
* **DejaSelect:** Hide when an element is clicked ([6236f108](https://github.com/DSI-HUG/dejajs-components/commit/6236f108d4fe175dc3ced30e08fbcf53863a64b8))
* **ColorPicker:** Disabled style ([3217117d](https://github.com/DSI-HUG/dejajs-components/commit/3217117d656dec93eef8c38e82b9e1ee827df23c))
* **Global:**
  * RxJs Imports ([751fbebe](https://github.com/DSI-HUG/dejajs-components/commit/751fbebe16ae2488129c8fcbb1c00e374841cbdc))
  * RxJs Imports ([dd445747](https://github.com/DSI-HUG/dejajs-components/commit/dd445747d8e333428d62e24328f3a10bb0318633))
  * RxJs Imports ([4047f5d2](https://github.com/DSI-HUG/dejajs-components/commit/4047f5d2074b3f608644b1255e47af969cb417a1))

#### 2.18.4 (2017-11-29)

##### Bug Fixes

* **SortingService:** Re-add test to check as a date when type date is specified inside SortInfo. ([8a945be7](https://github.com/DSI-HUG/dejajs-components/commit/8a945be78c5aa00857fffdc1feb69a668f494821))
* **DejaSelect:**
  * Autocomplete clear model when text is changed DEJS-246 ([14efbbde](https://github.com/DSI-HUG/dejajs-components/commit/14efbbde2140745ea1e62f5163645d908f63255d))
  * Width regression from material rc0 migration ([6188733f](https://github.com/DSI-HUG/dejajs-components/commit/6188733fe54d2913a13b9c5990534ca40dbfcf1a))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f00](https://github.com/DSI-HUG/dejajs-components/commit/fc173f00b5e80abbff31ef87c8cad2f20d89c9f5))
* **DejaSelectComponent:** Issues fixing find by unit test ([279f5942](https://github.com/DSI-HUG/dejajs-components/commit/279f59420783ca4b7c4513aa6860fc4c97157850))

##### Tests

* **DejaEditable:** Add unit test ([4d9434c3](https://github.com/DSI-HUG/dejajs-components/commit/4d9434c378341d3f3abde8cde0de008d795dfd1f))
* **Graphics:**
  * Improve unit test ([99158c83](https://github.com/DSI-HUG/dejajs-components/commit/99158c83ce9a9bdaca66683c26fbb1f89f83db68))
  * Add unit test ([c943744b](https://github.com/DSI-HUG/dejajs-components/commit/c943744b60dd420ab165dded9d81022111832d44))
* **DejaClipboardService:** Add unit test ([11488b1d](https://github.com/DSI-HUG/dejajs-components/commit/11488b1de61254b2c19bf6dc1cea3555dad1f5a8))
* **DejaSelectComponent:**
  * Improve unit test ([c645bdb4](https://github.com/DSI-HUG/dejajs-components/commit/c645bdb4b3fd6cb20e4a4b4aa5978ff39a8ded83))
  * Added unit test ([1a6c2e5a](https://github.com/DSI-HUG/dejajs-components/commit/1a6c2e5a37254ce215df1ded01a6ec5238e66767))
* **DejaSelect:**
  * Improve Unit Test ([18263df4](https://github.com/DSI-HUG/dejajs-components/commit/18263df459b104a9a05c79dee58cc5289ed603c4))
  * Improve Unit Test ([6eedd9f4](https://github.com/DSI-HUG/dejajs-components/commit/6eedd9f4506e1dea6d9758182c8f65df2d3f4ca2))

#### 2.18.3 (2017-11-28)

##### Bug Fixes

* **SortingService:** Re-add test to check as a date when type date is specified inside SortInfo. ([8a945be7](https://github.com/DSI-HUG/dejajs-components/commit/8a945be78c5aa00857fffdc1feb69a668f494821))
* **DejaSelect:**
  * Autocomplete clear model when text is changed DEJS-246 ([14efbbde](https://github.com/DSI-HUG/dejajs-components/commit/14efbbde2140745ea1e62f5163645d908f63255d))
  * Width regression from material rc0 migration ([6188733f](https://github.com/DSI-HUG/dejajs-components/commit/6188733fe54d2913a13b9c5990534ca40dbfcf1a))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f00](https://github.com/DSI-HUG/dejajs-components/commit/fc173f00b5e80abbff31ef87c8cad2f20d89c9f5))
* **DejaSelectComponent:** Issues fixing find by unit test ([279f5942](https://github.com/DSI-HUG/dejajs-components/commit/279f59420783ca4b7c4513aa6860fc4c97157850))

##### Tests

* **DejaEditable:** Add unit test ([4d9434c3](https://github.com/DSI-HUG/dejajs-components/commit/4d9434c378341d3f3abde8cde0de008d795dfd1f))
* **Graphics:**
  * Improve unit test ([99158c83](https://github.com/DSI-HUG/dejajs-components/commit/99158c83ce9a9bdaca66683c26fbb1f89f83db68))
  * Add unit test ([c943744b](https://github.com/DSI-HUG/dejajs-components/commit/c943744b60dd420ab165dded9d81022111832d44))
* **DejaClipboardService:** Add unit test ([11488b1d](https://github.com/DSI-HUG/dejajs-components/commit/11488b1de61254b2c19bf6dc1cea3555dad1f5a8))
* **DejaSelectComponent:**
  * Improve unit test ([c645bdb4](https://github.com/DSI-HUG/dejajs-components/commit/c645bdb4b3fd6cb20e4a4b4aa5978ff39a8ded83))
  * Added unit test ([1a6c2e5a](https://github.com/DSI-HUG/dejajs-components/commit/1a6c2e5a37254ce215df1ded01a6ec5238e66767))
* **DejaSelect:**
  * Improve Unit Test ([18263df4](https://github.com/DSI-HUG/dejajs-components/commit/18263df459b104a9a05c79dee58cc5289ed603c4))
  * Improve Unit Test ([6eedd9f4](https://github.com/DSI-HUG/dejajs-components/commit/6eedd9f4506e1dea6d9758182c8f65df2d3f4ca2))

#### 2.18.2 (2017-11-24)

##### BREAKING CHANGES

* **SortingServce:** Change compare method to static ([f7eefb1f](https://github.com/DSI-HUG/dejajs-components/commit/f7eefb1fad49c960d33a2c80b7f058013f9c5971))
    => Sorting service compare method is now static

* **CloningService:** Remove deprecated functions ([5eee9b37](https://github.com/DSI-HUG/dejajs-components/commit/5eee9b37943a23de89e0a6602155583bc24e1a5a))
    => Deprecated functions removed

* **DejaItemComponent:** Because DejaItem is part of DejaSelect and DejaTreeList, the import must be by a module. DejaItemModule is created. ([0b4eb76d](https://github.com/DSI-HUG/dejajs-components/commit/0b4eb76dc862d8751957dadc4da84206a2ff23d9))
    => The one use the component <deja-item></deja-item> must add DejaItemModule of his component import

* **ViewPortComponent:** Property items become models and another property items is added and representing an array of IViewPortItems. That allow to control the size of each items. ([bb11027d](https://github.com/DSI-HUG/dejajs-components/commit/bb11027d2058fe3a33a9b26c5cecad0dd7bceed4))
    => previous usage of the items input must be renamed to models

* **Dependencies:** upgrade dependencies ([4aad8a11](https://github.com/DSI-HUG/dejajs-components/commit/4aad8a112ffa8c408ce5aeebb563a80badde8826))
    => angular material-beta-12 breaking changes, please check https://github.com/angular/material2/blob/2.0.0-beta.12/CHANGELOG.md

##### Continuous Integration

* **Dependencies:**
  * upgrade dependencies ([e56e591f](https://github.com/DSI-HUG/dejajs-components/commit/e56e591fcc24148c2ec5600765b5773899e10675))
  * upgrade dependencies ([7d9629ca](https://github.com/DSI-HUG/dejajs-components/commit/7d9629ca93090689fe6b58046f73287a796155aa))
* **Global:** Update to Angular5 ([60f111bc](https://github.com/DSI-HUG/dejajs-components/commit/60f111bc4115e2d206ef4f9626e88787b037854d))
* **Test:**
  * Added script e2e:watch. Run npm i -g watch before use. ([50411ec4](https://github.com/DSI-HUG/dejajs-components/commit/50411ec48a592728be32fa2288e5729e58caff7e))
  * Increase karma timeout for PC with bad perf ([18f1d65a](https://github.com/DSI-HUG/dejajs-components/commit/18f1d65aa7a5a111106d2fae47524349d273b050))
* **Travis:** Improve build performance (concurrent execution) ([d591582e](https://github.com/DSI-HUG/dejajs-components/commit/d591582ec5c1ac2334aabc7553c796ef7b732313))

##### Documentation Changes

* **DejaOverlayComponent:** ajouter entête licence HUG ([541cc49e](https://github.com/DSI-HUG/dejajs-components/commit/541cc49eccf673d4506414aec2610587039282cc))

##### New Features

* **SideNav:** Add the possibility to specify the header's icon ([dd2432c5](https://github.com/DSI-HUG/dejajs-components/commit/dd2432c55685beab59c82a98e6e976680da4bb0b))
* **DejaSelectComponent:** support external error template ([f62c8cc4](https://github.com/DSI-HUG/dejajs-components/commit/f62c8cc4c29b2608ae28bd789dae17f61408a67a))
* **GlobaEventService:** Added unit test ([eb4e7b19](https://github.com/DSI-HUG/dejajs-components/commit/eb4e7b1926cd0f805627e662dc95de03ba37c67d))
* **SortingService:** Added unit test ([b54bd772](https://github.com/DSI-HUG/dejajs-components/commit/b54bd772256de5b26d3100f6c1337e2136470ef9))
* **GroupingService:** Added unit test ([b5c3e1cc](https://github.com/DSI-HUG/dejajs-components/commit/b5c3e1ccfe56bda0f0c3014cc17834b3312ccb76))
* **DejaNumericStepperComponent:** NumericStepper ([030a26cb](https://github.com/DSI-HUG/dejajs-components/commit/030a26cb44a132cc04a5fae72f4ea31794cb61c2))
* **DejaAutosizeTextAreaDirective:** Removed temporarily deprecated flag, until the material directive work correctly with reactive forms. (#215) ([0b883851](https://github.com/DSI-HUG/dejajs-components/commit/0b8838516ca48471194c72ae04bb5595b6b185e1))
* **DejaTreeListComponent:** Added e2e test ([17541bbd](https://github.com/DSI-HUG/dejajs-components/commit/17541bbdbdfba32b215630401f96e3280a003517))
* **ItemListService:** Added default values: defaultChildrenField, defaultTextField and defaultValueField ([1fa39b59](https://github.com/DSI-HUG/dejajs-components/commit/1fa39b59f7a0538bede18a66fe2ed7124ff50bdf))
* **DejaTileComponent:** Ability to refresh the tile ([d1d40b5a](https://github.com/DSI-HUG/dejajs-components/commit/d1d40b5a8ab26ddafa9868fdb713f8e6fdb074b8))
* **ItemListBase:** Possibility to pass an array of items to RefreshViewPort ([7f71ec38](https://github.com/DSI-HUG/dejajs-components/commit/7f71ec38df18744ff9d5dc7930bc816d7005e8e2))
* **RangeComponent:** Add refresh function ([96723d4d](https://github.com/DSI-HUG/dejajs-components/commit/96723d4d24351d8990d74e307f291fb244e6951e))

##### Bug Fixes

* **DejaSelect:**
  * Autocomplete clear model when text is changed DEJS-246 ([14efbbde](https://github.com/DSI-HUG/dejajs-components/commit/14efbbde2140745ea1e62f5163645d908f63255d))
  * Width regression from material rc0 migration ([6188733f](https://github.com/DSI-HUG/dejajs-components/commit/6188733fe54d2913a13b9c5990534ca40dbfcf1a))
  * Ensure selection when models setted after selected item (mode autocomplete and sele ([d18f9393](https://github.com/DSI-HUG/dejajs-components/commit/d18f9393b3c01bc5dd8d5dc0aa7012ba2eaeb6b1))
  * Current item was not displayed in multiselect mode ([dee99746](https://github.com/DSI-HUG/dejajs-components/commit/dee99746a94f7e469b8f9ac090f54d684a8a4562))
  * Fix an issue where the render of the ViewPort can be sometimes incomplete. ([8dfc2ea3](https://github.com/DSI-HUG/dejajs-components/commit/8dfc2ea3212398d66c5a1834cd04a9fec957eb9f))
  * modelIsValue property initialized to undefined and is determined by the first passed model ([bd7dc3cf](https://github.com/DSI-HUG/dejajs-components/commit/bd7dc3cf9d6559c0ecf1837d2eef65a8330316eb))
  * modelIsValue property can be defined for multiselect ([3d9c0673](https://github.com/DSI-HUG/dejajs-components/commit/3d9c0673d1e413686d77e28216e258312c763bf0))
* **DejaItemBase:** viewPortRowHeight and viewPortRowMode don't use coercion ([fc173f00](https://github.com/DSI-HUG/dejajs-components/commit/fc173f00b5e80abbff31ef87c8cad2f20d89c9f5))
* **Global:**
  * Remove private access inside template to fix AOT build ([ccafaec8](https://github.com/DSI-HUG/dejajs-components/commit/ccafaec889a1c0d08c2ca6694660603f5b908b50))
  * Disable chromium autocomplete for all controls using an input, except the treelist where the binding is modified to use autocomplete ([718408f3](https://github.com/DSI-HUG/dejajs-components/commit/718408f3fa4d02d2ef13772902e88b8820af0285))
* **DejaNumericStepperComponent:**
  * Updated CSS to fit with material rc0 ([3f621085](https://github.com/DSI-HUG/dejajs-components/commit/3f621085782de62d05ee66a4b98b1ab15655a2a1))
  * Fix button type + hide hint when max isn't set ([f45ec771](https://github.com/DSI-HUG/dejajs-components/commit/f45ec771689b089d178a522c875fced8460d6db3))
* **CloningService:**
  * return a new instance of date if object is a date ([55445526](https://github.com/DSI-HUG/dejajs-components/commit/55445526ccd92674fdb533646197726d8c690312))
  * Improve test with new functions ([525e1259](https://github.com/DSI-HUG/dejajs-components/commit/525e12598c501702c0ccddee46f0cca541c4e746))
  * Cloning an array with an array instance of target ([e297fe16](https://github.com/DSI-HUG/dejajs-components/commit/e297fe167c72e71567234fb87e1d74a89fb1a489))
  * Instance check fail if target is type ([68b5d6b6](https://github.com/DSI-HUG/dejajs-components/commit/68b5d6b631a3e06f0dac318af2a0e002e8818368))
  * fixing an issue when cloning array into a target array ([e926e953](https://github.com/DSI-HUG/dejajs-components/commit/e926e953bef78de41797162a4df08fafc89f9d37))
* **ViewPortService:**
  * Fix the ViewPort calculation in autosize mode. The issue can make sometimes that the rendered viewport is too small comparing the size of the container. ([03a30506](https://github.com/DSI-HUG/dejajs-components/commit/03a3050636d1bda0d1133107e4a0b7136ae1c732))
  * Fix view port crash if not element. ([40d4e8c5](https://github.com/DSI-HUG/dejajs-components/commit/40d4e8c5078eb6556e6d21893569c65500281117))
  * Clear items size when refresh with clearMeasuredSize is invoked ([4a3c9b52](https://github.com/DSI-HUG/dejajs-components/commit/4a3c9b52533e29470ba6ebf4598cfe87efb273ee))
* **DejaSelectComponent:** Issues fixing find by unit test ([279f5942](https://github.com/DSI-HUG/dejajs-components/commit/279f59420783ca4b7c4513aa6860fc4c97157850))
* **GlobaEventService:** Added unregister function ([9d890a35](https://github.com/DSI-HUG/dejajs-components/commit/9d890a3538f2a2826e1b0f6c56831c53ec95759c))
* **SortingService:** Comparison of numbers was inverted. Improve null or undefined comparison. ([1e47e055](https://github.com/DSI-HUG/dejajs-components/commit/1e47e055c38e6092f033026f80342aaef5354053))
* **DejaGridComponent:** calcColumnLayout on refresh method ([8b6f18c3](https://github.com/DSI-HUG/dejajs-components/commit/8b6f18c3430364562b9b58ab5eb0fefbfcac54b3))
* **DejaTreeListComponent:**
  * Updated listElement get method to avoid error when getElementById doesn't work ([07aaee30](https://github.com/DSI-HUG/dejajs-components/commit/07aaee309d0c80bd3726c1d47a6df31b4d12f166))
  * Selection on enter key can fail in single select mode. ([eb2c5d30](https://github.com/DSI-HUG/dejajs-components/commit/eb2c5d306719e20e5bf252c9a8c5f033a703e674))
  * DejaItemComponent was missing on the import ([f6f80d73](https://github.com/DSI-HUG/dejajs-components/commit/f6f80d739e73456d28f5054b7e110e16b966c4d9))
  * Added missing coercion for minSearchlength and pageSize ([c978ddad](https://github.com/DSI-HUG/dejajs-components/commit/c978ddade9defcbfca20e862099adfab8c7a2b17))
* **DejaViewPort:** Removed debug infos ([c7c7f29d](https://github.com/DSI-HUG/dejajs-components/commit/c7c7f29dd67adab99d4a162d741b2ff330182a83))
* **DejaTreeList:**
  * Ensure key code ([ed2c13e2](https://github.com/DSI-HUG/dejajs-components/commit/ed2c13e202169c3571ee2cf6df4513e9e50c317e))
  * model was not updated on multiselect mode ([611aaea1](https://github.com/DSI-HUG/dejajs-components/commit/611aaea1025e47edde19294a3059d4879ee7e559))
  * Missing coercion on pageSize ([2423b86b](https://github.com/DSI-HUG/dejajs-components/commit/2423b86b44f503d33e39622919e0ce398beda5a5))
  * modelIsValue property initialized to undefined and is determined by the first passed model ([1facb7ad](https://github.com/DSI-HUG/dejajs-components/commit/1facb7ada93baed4693769ceef0e0c28b44f8736))
  * modelIsValue property can be defined for multiselect ([a2b9adec](https://github.com/DSI-HUG/dejajs-components/commit/a2b9adec3450a99bd623524f0904250782400c42))
* **DejaTreeLIst:**
  * Allow 0 as model or item value ([d52e0a53](https://github.com/DSI-HUG/dejajs-components/commit/d52e0a5309ed1380703ef814470dd4c16f3b961c))
  * Selection from autocomplete is now pushed on the query model of the treelist ([5778495b](https://github.com/DSI-HUG/dejajs-components/commit/5778495b6cef8d87c8aff66240984f6db2fa6e6e))
* **DejaViewPortComponent:** Index error on test ([92274e9d](https://github.com/DSI-HUG/dejajs-components/commit/92274e9de6aef97ff7142f911fbb3fe3ad074269))
* **DejaOverlay:**
  * Avoid right click when overlay is open ([26bfc1f1](https://github.com/DSI-HUG/dejajs-components/commit/26bfc1f115aeeb7c95e1288263678ce80d65bc75))
  * For display block for deja-menu-content ([55e8d7c8](https://github.com/DSI-HUG/dejajs-components/commit/55e8d7c80f23790391e984c066a6f097e3770fff))
  * Replacing class cdk-overlay-container with deja-overlay-container ([a86f130d](https://github.com/DSI-HUG/dejajs-components/commit/a86f130d11db94da9e9f5e0dd0badb1bf0b19336))
  * Menu styling was broken ([bcb24836](https://github.com/DSI-HUG/dejajs-components/commit/bcb24836d872120f0ec0b61b2bcc04ade74d91d4))
* **DejaViewportComponent:** Improve buttons binding during lifecycle in button scrolling mode ([8949a4c2](https://github.com/DSI-HUG/dejajs-components/commit/8949a4c25221b9fc52aeafc8aaa401f15bcccef5))
* **DejaViewportService:** Prevent a possible infinite call of calcViewPort in fixed size mode ([bc3290b7](https://github.com/DSI-HUG/dejajs-components/commit/bc3290b79bad13deca332fe17871768cbaa4b16b))
* **DejaMarkdown:** Fix color margin in code sample ([02795273](https://github.com/DSI-HUG/dejajs-components/commit/0279527369c8e41694f3ac6b10e5528f7e22beca))
* **DejaOverlayComponent:**
  * only throw visibilityChanged if old value is different from new value ([607aa9f0](https://github.com/DSI-HUG/dejajs-components/commit/607aa9f045a58393160b2902e2e127f9e5427093))
  * tooltip style conflict with overlay style ([b3f6e3f1](https://github.com/DSI-HUG/dejajs-components/commit/b3f6e3f1e9e6fad1bd91049faf0916cd12005029))
* **Diacritics:** Remove crash when null or undefined was passed. ([60afeca1](https://github.com/DSI-HUG/dejajs-components/commit/60afeca1fb0483b6ee56499f7bbebf0b3191de24))

##### Other Changes

* **DejaTreeListComponent:** Added unit test ([2f612c73](https://github.com/DSI-HUG/dejajs-components/commit/2f612c73456614364d8d7337cf36217b8c345690))

##### Refactors

* **DejaTextMetricsModule:** Move text-metrics to src/common/core ([44e3f3c8](https://github.com/DSI-HUG/dejajs-components/commit/44e3f3c85295a18f8577888314c8293578b2599c))
* **DejaTreeListComponent:** Improve MouseDown and MouseUp functions ([8fccb73e](https://github.com/DSI-HUG/dejajs-components/commit/8fccb73e4388beef32f41d6f1617eb927a16bf21))
* **ViewPortService:** Make better element flow ([9174ed3a](https://github.com/DSI-HUG/dejajs-components/commit/9174ed3ad4bdbd5b2af6fffdbdfc5511333c180a))
* **DejaViewport:** Refactoring of observables unsubscription ([62df1780](https://github.com/DSI-HUG/dejajs-components/commit/62df1780ebbbb68a7afa1842577e03754862dc8b))

##### Reverts

* **DemoApp:** Revert updates on theme selector ([6e3434a8](https://github.com/DSI-HUG/dejajs-components/commit/6e3434a8e22b055a31ef4811daef8ca9d6e294ea))

##### Code Style Changes

* **Lint:** Remove unnecessary semicolon ([b662121c](https://github.com/DSI-HUG/dejajs-components/commit/b662121c4f071fc546f6486a2e81ac4ab770806b))
* **DejaDateSelectorComponent:** TsLint ([7e237bc4](https://github.com/DSI-HUG/dejajs-components/commit/7e237bc40273208b0313c7078d931bc9bce8df0f))
* **TSLint:** Fix lint issue ([1038adff](https://github.com/DSI-HUG/dejajs-components/commit/1038adff260aefbc1bb6f2369d56b710ae522989))

##### Tests

* **DejaEditable:** Add unit test ([4d9434c3](https://github.com/DSI-HUG/dejajs-components/commit/4d9434c378341d3f3abde8cde0de008d795dfd1f))
* **Graphics:**
  * Improve unit test ([99158c83](https://github.com/DSI-HUG/dejajs-components/commit/99158c83ce9a9bdaca66683c26fbb1f89f83db68))
  * Add unit test ([c943744b](https://github.com/DSI-HUG/dejajs-components/commit/c943744b60dd420ab165dded9d81022111832d44))
* **DejaClipboardService:** Add unit test ([11488b1d](https://github.com/DSI-HUG/dejajs-components/commit/11488b1de61254b2c19bf6dc1cea3555dad1f5a8))
* **DejaSelectComponent:**
  * Improve unit test ([c645bdb4](https://github.com/DSI-HUG/dejajs-components/commit/c645bdb4b3fd6cb20e4a4b4aa5978ff39a8ded83))
  * Added unit test ([1a6c2e5a](https://github.com/DSI-HUG/dejajs-components/commit/1a6c2e5a37254ce215df1ded01a6ec5238e66767))
* **CloningService:** Add array of dates cloning ([bf6b576b](https://github.com/DSI-HUG/dejajs-components/commit/bf6b576beefc81b6525540d402a119cc67e86c1e))
* **DejaTreeList:** Corrected test for the new view port item default size. ([01276b8d](https://github.com/DSI-HUG/dejajs-components/commit/01276b8d2f3c0a5a6c71b0426be4f60ed18d28a5))
* **DejaViewPortComponent:**
  * Corrected test for the new view port item default size. ([04135834](https://github.com/DSI-HUG/dejajs-components/commit/04135834b6f1e8d3384e7fcdc512ac3557a4b207))
  * improve unit test ([bdfb1294](https://github.com/DSI-HUG/dejajs-components/commit/bdfb12941979da00cd7b97ff4fad01d6f772b751))
  * improve unit test ([54497242](https://github.com/DSI-HUG/dejajs-components/commit/544972426ec7c3a8b18aab0c8f8e9b2b2e988c3b))
  * improve unit test ([6ab05a29](https://github.com/DSI-HUG/dejajs-components/commit/6ab05a2988d4fc6241d5ff8bcdacfc236354cdb3))
  * improve unit test ([180681c3](https://github.com/DSI-HUG/dejajs-components/commit/180681c3588152f3dd26658a1ba1d8a8049a473a))
  * added unit test ([b382ecc8](https://github.com/DSI-HUG/dejajs-components/commit/b382ecc8272dd0df93ac415143b7e18cfafc71e1))
* **DejaSelect:**
  * Improve Unit Test ([18263df4](https://github.com/DSI-HUG/dejajs-components/commit/18263df459b104a9a05c79dee58cc5289ed603c4))
  * Improve Unit Test ([6eedd9f4](https://github.com/DSI-HUG/dejajs-components/commit/6eedd9f4506e1dea6d9758182c8f65df2d3f4ca2))
* **cloningService:** Added unit test ([499cc576](https://github.com/DSI-HUG/dejajs-components/commit/499cc576224af737d55b5581d47cf1ca2db7d10f))
* **DejaTreeListComponent:** Added unit test ([b42542f8](https://github.com/DSI-HUG/dejajs-components/commit/b42542f81112161cd63000bda1fe3661151489b2))
* **DejaSidenav:** Add e2e test ([6c92482f](https://github.com/DSI-HUG/dejajs-components/commit/6c92482f427e26e8d42b16e3b0e2a307b22050fb))
* **DejaOverlayComponent:** added unit test ([622b28aa](https://github.com/DSI-HUG/dejajs-components/commit/622b28aa63d1e2eb5e88eed006decc73f5b762d3))
* **Sidenav:** Add sidenav tests ([95928040](https://github.com/DSI-HUG/dejajs-components/commit/95928040e70c7e537ce074c8d9645ce66df85b7a))

#### 2.18.1 (2017-11-20)

##### Continuous Integration

* **Dependencies:** upgrade dependencies ([e56e591f](https://github.com/DSI-HUG/dejajs-components/commit/e56e591fcc24148c2ec5600765b5773899e10675))

##### New Features

* **SideNav:** Add the possibility to specify the header's icon ([dd2432c5](https://github.com/DSI-HUG/dejajs-components/commit/dd2432c55685beab59c82a98e6e976680da4bb0b))

##### Bug Fixes

* **Global:** Remove private access inside template to fix AOT build ([ccafaec8](https://github.com/DSI-HUG/dejajs-components/commit/ccafaec889a1c0d08c2ca6694660603f5b908b50))

### 2.18.0 (2017-11-16)

##### BREAKING CHANGES

* **SortingServce:** Change compare method to static ([f7eefb1f](https://github.com/DSI-HUG/dejajs-components/commit/f7eefb1fad49c960d33a2c80b7f058013f9c5971))
    => Sorting service compare method is now static


##### Continuous Integration

* **Global:** Update to Angular5 ([60f111bc](https://github.com/DSI-HUG/dejajs-components/commit/60f111bc4115e2d206ef4f9626e88787b037854d))

##### New Features

* **DejaSelectComponent:** support external error template ([f62c8cc4](https://github.com/DSI-HUG/dejajs-components/commit/f62c8cc4c29b2608ae28bd789dae17f61408a67a))
* **GlobaEventService:** Added unit test ([eb4e7b19](https://github.com/DSI-HUG/dejajs-components/commit/eb4e7b1926cd0f805627e662dc95de03ba37c67d))
* **SortingService:** Added unit test ([b54bd772](https://github.com/DSI-HUG/dejajs-components/commit/b54bd772256de5b26d3100f6c1337e2136470ef9))
* **GroupingService:** Added unit test ([b5c3e1cc](https://github.com/DSI-HUG/dejajs-components/commit/b5c3e1ccfe56bda0f0c3014cc17834b3312ccb76))

##### Bug Fixes

* **DejaNumericStepperComponent:** Updated CSS to fit with material rc0 ([3f621085](https://github.com/DSI-HUG/dejajs-components/commit/3f621085782de62d05ee66a4b98b1ab15655a2a1))
* **CloningService:**
  * return a new instance of date if object is a date ([55445526](https://github.com/DSI-HUG/dejajs-components/commit/55445526ccd92674fdb533646197726d8c690312))
  * Improve test with new functions ([525e1259](https://github.com/DSI-HUG/dejajs-components/commit/525e12598c501702c0ccddee46f0cca541c4e746))
* **ViewPortService:** Fix the ViewPort calculation in autosize mode. The issue can make sometimes that the rendered viewport is too small comparing the size of the container. ([03a30506](https://github.com/DSI-HUG/dejajs-components/commit/03a3050636d1bda0d1133107e4a0b7136ae1c732))
* **DejaSelect:** Ensure selection when models setted after selected item (mode autocomplete and sele ([d18f9393](https://github.com/DSI-HUG/dejajs-components/commit/d18f9393b3c01bc5dd8d5dc0aa7012ba2eaeb6b1))
* **GlobaEventService:** Added unregister function ([9d890a35](https://github.com/DSI-HUG/dejajs-components/commit/9d890a3538f2a2826e1b0f6c56831c53ec95759c))
* **SortingService:** Comparison of numbers was inverted. Improve null or undefined comparison. ([1e47e055](https://github.com/DSI-HUG/dejajs-components/commit/1e47e055c38e6092f033026f80342aaef5354053))
* **DejaGridComponent:** calcColumnLayout on refresh method ([8b6f18c3](https://github.com/DSI-HUG/dejajs-components/commit/8b6f18c3430364562b9b58ab5eb0fefbfcac54b3))

##### Code Style Changes

* **Lint:** Remove unnecessary semicolon ([b662121c](https://github.com/DSI-HUG/dejajs-components/commit/b662121c4f071fc546f6486a2e81ac4ab770806b))

##### Tests

* **CloningService:** Add array of dates cloning ([bf6b576b](https://github.com/DSI-HUG/dejajs-components/commit/bf6b576beefc81b6525540d402a119cc67e86c1e))
* **DejaTreeList:** Corrected test for the new view port item default size. ([01276b8d](https://github.com/DSI-HUG/dejajs-components/commit/01276b8d2f3c0a5a6c71b0426be4f60ed18d28a5))
* **DejaViewPortComponent:** Corrected test for the new view port item default size. ([04135834](https://github.com/DSI-HUG/dejajs-components/commit/04135834b6f1e8d3384e7fcdc512ac3557a4b207))

### 2.17.0 (2017-11-15)

##### BREAKING CHANGES

* **SortingServce:** Change compare method to static ([f7eefb1f](https://github.com/DSI-HUG/dejajs-components/commit/f7eefb1fad49c960d33a2c80b7f058013f9c5971))
    => Sorting service compare method is now static

* **CloningService:** Remove deprecated functions ([5eee9b37](https://github.com/DSI-HUG/dejajs-components/commit/5eee9b37943a23de89e0a6602155583bc24e1a5a))
    => Deprecated functions removed

* **DejaItemComponent:** Because DejaItem is part of DejaSelect and DejaTreeList, the import must be by a module. DejaItemModule is created. ([0b4eb76d](https://github.com/DSI-HUG/dejajs-components/commit/0b4eb76dc862d8751957dadc4da84206a2ff23d9))
    => The one use the component <deja-item></deja-item> must add DejaItemModule of his component import


##### Continuous Integration

* **Dependencies:** upgrade dependencies ([7d9629ca](https://github.com/DSI-HUG/dejajs-components/commit/7d9629ca93090689fe6b58046f73287a796155aa))
* **Test:** Added script e2e:watch. Run npm i -g watch before use. ([50411ec4](https://github.com/DSI-HUG/dejajs-components/commit/50411ec48a592728be32fa2288e5729e58caff7e))

##### New Features

* **DejaSelectComponent:** support external error template ([f62c8cc4](https://github.com/DSI-HUG/dejajs-components/commit/f62c8cc4c29b2608ae28bd789dae17f61408a67a))
* **GlobaEventService:** Added unit test ([eb4e7b19](https://github.com/DSI-HUG/dejajs-components/commit/eb4e7b1926cd0f805627e662dc95de03ba37c67d))
* **SortingService:** Added unit test ([b54bd772](https://github.com/DSI-HUG/dejajs-components/commit/b54bd772256de5b26d3100f6c1337e2136470ef9))
* **GroupingService:** Added unit test ([b5c3e1cc](https://github.com/DSI-HUG/dejajs-components/commit/b5c3e1ccfe56bda0f0c3014cc17834b3312ccb76))
* **DejaNumericStepperComponent:** NumericStepper ([030a26cb](https://github.com/DSI-HUG/dejajs-components/commit/030a26cb44a132cc04a5fae72f4ea31794cb61c2))
* **DejaAutosizeTextAreaDirective:** Removed temporarily deprecated flag, until the material directive work correctly with reactive forms. (#215) ([0b883851](https://github.com/DSI-HUG/dejajs-components/commit/0b8838516ca48471194c72ae04bb5595b6b185e1))
* **DejaTreeListComponent:** Added e2e test ([17541bbd](https://github.com/DSI-HUG/dejajs-components/commit/17541bbdbdfba32b215630401f96e3280a003517))
* **ItemListService:** Added default values: defaultChildrenField, defaultTextField and defaultValueField ([1fa39b59](https://github.com/DSI-HUG/dejajs-components/commit/1fa39b59f7a0538bede18a66fe2ed7124ff50bdf))

##### Bug Fixes

* **CloningService:**
  * return a new instance of date if object is a date ([55445526](https://github.com/DSI-HUG/dejajs-components/commit/55445526ccd92674fdb533646197726d8c690312))
  * Improve test with new functions ([525e1259](https://github.com/DSI-HUG/dejajs-components/commit/525e12598c501702c0ccddee46f0cca541c4e746))
  * Cloning an array with an array instance of target ([e297fe16](https://github.com/DSI-HUG/dejajs-components/commit/e297fe167c72e71567234fb87e1d74a89fb1a489))
  * Instance check fail if target is type ([68b5d6b6](https://github.com/DSI-HUG/dejajs-components/commit/68b5d6b631a3e06f0dac318af2a0e002e8818368))
  * fixing an issue when cloning array into a target array ([e926e953](https://github.com/DSI-HUG/dejajs-components/commit/e926e953bef78de41797162a4df08fafc89f9d37))
* **DejaSelect:**
  * Ensure selection when models setted after selected item (mode autocomplete and sele ([d18f9393](https://github.com/DSI-HUG/dejajs-components/commit/d18f9393b3c01bc5dd8d5dc0aa7012ba2eaeb6b1))
  * Current item was not displayed in multiselect mode ([dee99746](https://github.com/DSI-HUG/dejajs-components/commit/dee99746a94f7e469b8f9ac090f54d684a8a4562))
  * Fix an issue where the render of the ViewPort can be sometimes incomplete. ([8dfc2ea3](https://github.com/DSI-HUG/dejajs-components/commit/8dfc2ea3212398d66c5a1834cd04a9fec957eb9f))
* **GlobaEventService:** Added unregister function ([9d890a35](https://github.com/DSI-HUG/dejajs-components/commit/9d890a3538f2a2826e1b0f6c56831c53ec95759c))
* **SortingService:** Comparison of numbers was inverted. Improve null or undefined comparison. ([1e47e055](https://github.com/DSI-HUG/dejajs-components/commit/1e47e055c38e6092f033026f80342aaef5354053))
* **DejaGridComponent:** calcColumnLayout on refresh method ([8b6f18c3](https://github.com/DSI-HUG/dejajs-components/commit/8b6f18c3430364562b9b58ab5eb0fefbfcac54b3))
* **DejaTreeListComponent:**
  * Updated listElement get method to avoid error when getElementById doesn't work ([07aaee30](https://github.com/DSI-HUG/dejajs-components/commit/07aaee309d0c80bd3726c1d47a6df31b4d12f166))
  * Selection on enter key can fail in single select mode. ([eb2c5d30](https://github.com/DSI-HUG/dejajs-components/commit/eb2c5d306719e20e5bf252c9a8c5f033a703e674))
  * DejaItemComponent was missing on the import ([f6f80d73](https://github.com/DSI-HUG/dejajs-components/commit/f6f80d739e73456d28f5054b7e110e16b966c4d9))
  * Added missing coercion for minSearchlength and pageSize ([c978ddad](https://github.com/DSI-HUG/dejajs-components/commit/c978ddade9defcbfca20e862099adfab8c7a2b17))
* **DejaNumericStepperComponent:** Fix button type + hide hint when max isn't set ([f45ec771](https://github.com/DSI-HUG/dejajs-components/commit/f45ec771689b089d178a522c875fced8460d6db3))
* **ViewPortService:** Fix view port crash if not element. ([40d4e8c5](https://github.com/DSI-HUG/dejajs-components/commit/40d4e8c5078eb6556e6d21893569c65500281117))
* **DejaViewPort:** Removed debug infos ([c7c7f29d](https://github.com/DSI-HUG/dejajs-components/commit/c7c7f29dd67adab99d4a162d741b2ff330182a83))
* **DejaTreeList:**
  * Ensure key code ([ed2c13e2](https://github.com/DSI-HUG/dejajs-components/commit/ed2c13e202169c3571ee2cf6df4513e9e50c317e))
  * Missing coercion on pageSize ([2423b86b](https://github.com/DSI-HUG/dejajs-components/commit/2423b86b44f503d33e39622919e0ce398beda5a5))
* **DejaTreeLIst:**
  * Allow 0 as model or item value ([d52e0a53](https://github.com/DSI-HUG/dejajs-components/commit/d52e0a5309ed1380703ef814470dd4c16f3b961c))
  * Selection from autocomplete is now pushed on the query model of the treelist ([5778495b](https://github.com/DSI-HUG/dejajs-components/commit/5778495b6cef8d87c8aff66240984f6db2fa6e6e))
* **DejaViewPortComponent:** Index error on test ([92274e9d](https://github.com/DSI-HUG/dejajs-components/commit/92274e9de6aef97ff7142f911fbb3fe3ad074269))
* **Global:** Disable chromium autocomplete for all controls using an input, except the treelist where the binding is modified to use autocomplete ([718408f3](https://github.com/DSI-HUG/dejajs-components/commit/718408f3fa4d02d2ef13772902e88b8820af0285))

##### Other Changes

* **DejaTreeListComponent:** Added unit test ([2f612c73](https://github.com/DSI-HUG/dejajs-components/commit/2f612c73456614364d8d7337cf36217b8c345690))

##### Refactors

* **DejaTextMetricsModule:** Move text-metrics to src/common/core ([44e3f3c8](https://github.com/DSI-HUG/dejajs-components/commit/44e3f3c85295a18f8577888314c8293578b2599c))
* **DejaTreeListComponent:** Improve MouseDown and MouseUp functions ([8fccb73e](https://github.com/DSI-HUG/dejajs-components/commit/8fccb73e4388beef32f41d6f1617eb927a16bf21))
* **ViewPortService:** Make better element flow ([9174ed3a](https://github.com/DSI-HUG/dejajs-components/commit/9174ed3ad4bdbd5b2af6fffdbdfc5511333c180a))

##### Code Style Changes

* **Lint:** Remove unnecessary semicolon ([b662121c](https://github.com/DSI-HUG/dejajs-components/commit/b662121c4f071fc546f6486a2e81ac4ab770806b))

##### Tests

* **cloningService:** Added unit test ([499cc576](https://github.com/DSI-HUG/dejajs-components/commit/499cc576224af737d55b5581d47cf1ca2db7d10f))
* **DejaTreeListComponent:** Added unit test ([b42542f8](https://github.com/DSI-HUG/dejajs-components/commit/b42542f81112161cd63000bda1fe3661151489b2))

#### 2.16.3 (2017-11-01)

##### Bug Fixes

* **DejaTreeListComponent:** Updated listElement get method to avoid error when getElementById doesn't work ([07aaee30](https://github.com/DSI-HUG/dejajs-components/commit/07aaee309d0c80bd3726c1d47a6df31b4d12f166))
* **DejaNumericStepperComponent:** Fix button type + hide hint when max isn't set ([f45ec771](https://github.com/DSI-HUG/dejajs-components/commit/f45ec771689b089d178a522c875fced8460d6db3))
* **ViewPortService:** Fix view port crash if not element. ([40d4e8c5](https://github.com/DSI-HUG/dejajs-components/commit/40d4e8c5078eb6556e6d21893569c65500281117))

#### 2.16.2 (2017-10-30)

##### Continuous Integration

* **Dependencies:** upgrade dependencies ([7d9629ca](https://github.com/DSI-HUG/dejajs-components/commit/7d9629ca93090689fe6b58046f73287a796155aa))

##### Bug Fixes

* **DejaViewPort:** Removed debug infos ([c7c7f29d](https://github.com/DSI-HUG/dejajs-components/commit/c7c7f29dd67adab99d4a162d741b2ff330182a83))

#### 2.16.1 (2017-10-30)

##### Refactors

* **DejaTextMetricsModule:** Move text-metrics to src/common/core ([44e3f3c8](https://github.com/DSI-HUG/dejajs-components/commit/44e3f3c85295a18f8577888314c8293578b2599c))

### 2.16.0 (2017-10-30)

##### BREAKING CHANGES

* **CloningService:** Remove deprecated functions ([5eee9b37](https://github.com/DSI-HUG/dejajs-components/commit/5eee9b37943a23de89e0a6602155583bc24e1a5a))
    => Deprecated functions removed

* **DejaItemComponent:** Because DejaItem is part of DejaSelect and DejaTreeList, the import must be by a module. DejaItemModule is created. ([0b4eb76d](https://github.com/DSI-HUG/dejajs-components/commit/0b4eb76dc862d8751957dadc4da84206a2ff23d9))
    => The one use the component <deja-item></deja-item> must add DejaItemModule of his component import

* **ViewPortComponent:** Property items become models and another property items is added and representing an array of IViewPortItems. That allow to control the size of each items. ([bb11027d](https://github.com/DSI-HUG/dejajs-components/commit/bb11027d2058fe3a33a9b26c5cecad0dd7bceed4))
    => previous usage of the items input must be renamed to models

* **Dependencies:** upgrade dependencies ([4aad8a11](https://github.com/DSI-HUG/dejajs-components/commit/4aad8a112ffa8c408ce5aeebb563a80badde8826))
    => angular material-beta-12 breaking changes, please check https://github.com/angular/material2/blob/2.0.0-beta.12/CHANGELOG.md

##### Continuous Integration

* **Test:**
  * Added script e2e:watch. Run npm i -g watch before use. ([50411ec4](https://github.com/DSI-HUG/dejajs-components/commit/50411ec48a592728be32fa2288e5729e58caff7e))
  * Increase karma timeout for PC with bad perf ([18f1d65a](https://github.com/DSI-HUG/dejajs-components/commit/18f1d65aa7a5a111106d2fae47524349d273b050))
* **Travis:** Improve build performance (concurrent execution) ([d591582e](https://github.com/DSI-HUG/dejajs-components/commit/d591582ec5c1ac2334aabc7553c796ef7b732313))

##### Documentation Changes

* **DejaOverlayComponent:** ajouter entête licence HUG ([541cc49e](https://github.com/DSI-HUG/dejajs-components/commit/541cc49eccf673d4506414aec2610587039282cc))

##### New Features

* **DejaNumericStepperComponent:** NumericStepper ([030a26cb](https://github.com/DSI-HUG/dejajs-components/commit/030a26cb44a132cc04a5fae72f4ea31794cb61c2))
* **DejaAutosizeTextAreaDirective:** Removed temporarily deprecated flag, until the material directive work correctly with reactive forms. (#215) ([0b883851](https://github.com/DSI-HUG/dejajs-components/commit/0b8838516ca48471194c72ae04bb5595b6b185e1))
* **DejaTreeListComponent:** Added e2e test ([17541bbd](https://github.com/DSI-HUG/dejajs-components/commit/17541bbdbdfba32b215630401f96e3280a003517))
* **ItemListService:** Added default values: defaultChildrenField, defaultTextField and defaultValueField ([1fa39b59](https://github.com/DSI-HUG/dejajs-components/commit/1fa39b59f7a0538bede18a66fe2ed7124ff50bdf))
* **DejaTileComponent:** Ability to refresh the tile ([d1d40b5a](https://github.com/DSI-HUG/dejajs-components/commit/d1d40b5a8ab26ddafa9868fdb713f8e6fdb074b8))
* **ItemListBase:** Possibility to pass an array of items to RefreshViewPort ([7f71ec38](https://github.com/DSI-HUG/dejajs-components/commit/7f71ec38df18744ff9d5dc7930bc816d7005e8e2))
* **RangeComponent:** Add refresh function ([96723d4d](https://github.com/DSI-HUG/dejajs-components/commit/96723d4d24351d8990d74e307f291fb244e6951e))

##### Bug Fixes

* **CloningService:**
  * Cloning an array with an array instance of target ([e297fe16](https://github.com/DSI-HUG/dejajs-components/commit/e297fe167c72e71567234fb87e1d74a89fb1a489))
  * Instance check fail if target is type ([68b5d6b6](https://github.com/DSI-HUG/dejajs-components/commit/68b5d6b631a3e06f0dac318af2a0e002e8818368))
  * fixing an issue when cloning array into a target array ([e926e953](https://github.com/DSI-HUG/dejajs-components/commit/e926e953bef78de41797162a4df08fafc89f9d37))
* **DejaTreeListComponent:**
  * Selection on enter key can fail in single select mode. ([eb2c5d30](https://github.com/DSI-HUG/dejajs-components/commit/eb2c5d306719e20e5bf252c9a8c5f033a703e674))
  * DejaItemComponent was missing on the import ([f6f80d73](https://github.com/DSI-HUG/dejajs-components/commit/f6f80d739e73456d28f5054b7e110e16b966c4d9))
  * Added missing coercion for minSearchlength and pageSize ([c978ddad](https://github.com/DSI-HUG/dejajs-components/commit/c978ddade9defcbfca20e862099adfab8c7a2b17))
* **DejaTreeList:**
  * Ensure key code ([ed2c13e2](https://github.com/DSI-HUG/dejajs-components/commit/ed2c13e202169c3571ee2cf6df4513e9e50c317e))
  * model was not updated on multiselect mode ([611aaea1](https://github.com/DSI-HUG/dejajs-components/commit/611aaea1025e47edde19294a3059d4879ee7e559))
  * Missing coercion on pageSize ([2423b86b](https://github.com/DSI-HUG/dejajs-components/commit/2423b86b44f503d33e39622919e0ce398beda5a5))
  * modelIsValue property initialized to undefined and is determined by the first passed model ([1facb7ad](https://github.com/DSI-HUG/dejajs-components/commit/1facb7ada93baed4693769ceef0e0c28b44f8736))
  * modelIsValue property can be defined for multiselect ([a2b9adec](https://github.com/DSI-HUG/dejajs-components/commit/a2b9adec3450a99bd623524f0904250782400c42))
* **DejaTreeLIst:**
  * Allow 0 as model or item value ([d52e0a53](https://github.com/DSI-HUG/dejajs-components/commit/d52e0a5309ed1380703ef814470dd4c16f3b961c))
  * Selection from autocomplete is now pushed on the query model of the treelist ([5778495b](https://github.com/DSI-HUG/dejajs-components/commit/5778495b6cef8d87c8aff66240984f6db2fa6e6e))
* **DejaViewPortComponent:** Index error on test ([92274e9d](https://github.com/DSI-HUG/dejajs-components/commit/92274e9de6aef97ff7142f911fbb3fe3ad074269))
* **DejaOverlay:**
  * Avoid right click when overlay is open ([26bfc1f1](https://github.com/DSI-HUG/dejajs-components/commit/26bfc1f115aeeb7c95e1288263678ce80d65bc75))
  * For display block for deja-menu-content ([55e8d7c8](https://github.com/DSI-HUG/dejajs-components/commit/55e8d7c80f23790391e984c066a6f097e3770fff))
  * Replacing class cdk-overlay-container with deja-overlay-container ([a86f130d](https://github.com/DSI-HUG/dejajs-components/commit/a86f130d11db94da9e9f5e0dd0badb1bf0b19336))
  * Menu styling was broken ([bcb24836](https://github.com/DSI-HUG/dejajs-components/commit/bcb24836d872120f0ec0b61b2bcc04ade74d91d4))
* **DejaSelect:**
  * Current item was not displayed in multiselect mode ([dee99746](https://github.com/DSI-HUG/dejajs-components/commit/dee99746a94f7e469b8f9ac090f54d684a8a4562))
  * Fix an issue where the render of the ViewPort can be sometimes incomplete. ([8dfc2ea3](https://github.com/DSI-HUG/dejajs-components/commit/8dfc2ea3212398d66c5a1834cd04a9fec957eb9f))
  * modelIsValue property initialized to undefined and is determined by the first passed model ([bd7dc3cf](https://github.com/DSI-HUG/dejajs-components/commit/bd7dc3cf9d6559c0ecf1837d2eef65a8330316eb))
  * modelIsValue property can be defined for multiselect ([3d9c0673](https://github.com/DSI-HUG/dejajs-components/commit/3d9c0673d1e413686d77e28216e258312c763bf0))
* **Global:** Disable chromium autocomplete for all controls using an input, except the treelist where the binding is modified to use autocomplete ([718408f3](https://github.com/DSI-HUG/dejajs-components/commit/718408f3fa4d02d2ef13772902e88b8820af0285))
* **ViewPortService:** Clear items size when refresh with clearMeasuredSize is invoked ([4a3c9b52](https://github.com/DSI-HUG/dejajs-components/commit/4a3c9b52533e29470ba6ebf4598cfe87efb273ee))
* **DejaViewportComponent:** Improve buttons binding during lifecycle in button scrolling mode ([8949a4c2](https://github.com/DSI-HUG/dejajs-components/commit/8949a4c25221b9fc52aeafc8aaa401f15bcccef5))
* **DejaViewportService:** Prevent a possible infinite call of calcViewPort in fixed size mode ([bc3290b7](https://github.com/DSI-HUG/dejajs-components/commit/bc3290b79bad13deca332fe17871768cbaa4b16b))
* **DejaMarkdown:** Fix color margin in code sample ([02795273](https://github.com/DSI-HUG/dejajs-components/commit/0279527369c8e41694f3ac6b10e5528f7e22beca))
* **DejaOverlayComponent:**
  * only throw visibilityChanged if old value is different from new value ([607aa9f0](https://github.com/DSI-HUG/dejajs-components/commit/607aa9f045a58393160b2902e2e127f9e5427093))
  * tooltip style conflict with overlay style ([b3f6e3f1](https://github.com/DSI-HUG/dejajs-components/commit/b3f6e3f1e9e6fad1bd91049faf0916cd12005029))
* **Diacritics:** Remove crash when null or undefined was passed. ([60afeca1](https://github.com/DSI-HUG/dejajs-components/commit/60afeca1fb0483b6ee56499f7bbebf0b3191de24))

##### Other Changes

* **DejaTreeListComponent:** Added unit test ([2f612c73](https://github.com/DSI-HUG/dejajs-components/commit/2f612c73456614364d8d7337cf36217b8c345690))

##### Refactors

* **DejaTreeListComponent:** Improve MouseDown and MouseUp functions ([8fccb73e](https://github.com/DSI-HUG/dejajs-components/commit/8fccb73e4388beef32f41d6f1617eb927a16bf21))
* **ViewPortService:** Make better element flow ([9174ed3a](https://github.com/DSI-HUG/dejajs-components/commit/9174ed3ad4bdbd5b2af6fffdbdfc5511333c180a))
* **DejaViewport:** Refactoring of observables unsubscription ([62df1780](https://github.com/DSI-HUG/dejajs-components/commit/62df1780ebbbb68a7afa1842577e03754862dc8b))

##### Reverts

* **DemoApp:** Revert updates on theme selector ([6e3434a8](https://github.com/DSI-HUG/dejajs-components/commit/6e3434a8e22b055a31ef4811daef8ca9d6e294ea))

##### Code Style Changes

* **DejaDateSelectorComponent:** TsLint ([7e237bc4](https://github.com/DSI-HUG/dejajs-components/commit/7e237bc40273208b0313c7078d931bc9bce8df0f))
* **TSLint:** Fix lint issue ([1038adff](https://github.com/DSI-HUG/dejajs-components/commit/1038adff260aefbc1bb6f2369d56b710ae522989))

##### Tests

* **cloningService:** Added unit test ([499cc576](https://github.com/DSI-HUG/dejajs-components/commit/499cc576224af737d55b5581d47cf1ca2db7d10f))
* **DejaTreeListComponent:** Added unit test ([b42542f8](https://github.com/DSI-HUG/dejajs-components/commit/b42542f81112161cd63000bda1fe3661151489b2))
* **DejaViewPortComponent:**
  * improve unit test ([bdfb1294](https://github.com/DSI-HUG/dejajs-components/commit/bdfb12941979da00cd7b97ff4fad01d6f772b751))
  * improve unit test ([54497242](https://github.com/DSI-HUG/dejajs-components/commit/544972426ec7c3a8b18aab0c8f8e9b2b2e988c3b))
  * improve unit test ([6ab05a29](https://github.com/DSI-HUG/dejajs-components/commit/6ab05a2988d4fc6241d5ff8bcdacfc236354cdb3))
  * improve unit test ([180681c3](https://github.com/DSI-HUG/dejajs-components/commit/180681c3588152f3dd26658a1ba1d8a8049a473a))
  * added unit test ([b382ecc8](https://github.com/DSI-HUG/dejajs-components/commit/b382ecc8272dd0df93ac415143b7e18cfafc71e1))
* **DejaSidenav:** Add e2e test ([6c92482f](https://github.com/DSI-HUG/dejajs-components/commit/6c92482f427e26e8d42b16e3b0e2a307b22050fb))
* **DejaOverlayComponent:** added unit test ([622b28aa](https://github.com/DSI-HUG/dejajs-components/commit/622b28aa63d1e2eb5e88eed006decc73f5b762d3))
* **Sidenav:** Add sidenav tests ([95928040](https://github.com/DSI-HUG/dejajs-components/commit/95928040e70c7e537ce074c8d9645ce66df85b7a))

#### 2.15.2 (2017-10-25)

##### Code Style Changes

* **DejaDateSelectorComponent:** TsLint ([7e237bc4](https://github.com/DSI-HUG/dejajs-components/commit/7e237bc40273208b0313c7078d931bc9bce8df0f))

#### 2.15.1 (2017-10-25)

##### BREAKING CHANGES

* **ViewPortComponent:** Property items become models and another property items is added and representing an array of IViewPortItems. That allow to control the size of each items. ([bb11027d](https://github.com/DSI-HUG/dejajs-components/commit/bb11027d2058fe3a33a9b26c5cecad0dd7bceed4))
    => previous usage of the items input must be renamed to models


##### Continuous Integration

* **Travis:** Improve build performance (concurrent execution) ([d591582e](https://github.com/DSI-HUG/dejajs-components/commit/d591582ec5c1ac2334aabc7553c796ef7b732313))

##### New Features

* **DejaTileComponent:** Ability to refresh the tile ([d1d40b5a](https://github.com/DSI-HUG/dejajs-components/commit/d1d40b5a8ab26ddafa9868fdb713f8e6fdb074b8))
* **ItemListBase:** Possibility to pass an array of items to RefreshViewPort ([7f71ec38](https://github.com/DSI-HUG/dejajs-components/commit/7f71ec38df18744ff9d5dc7930bc816d7005e8e2))

##### Bug Fixes

* **DejaTreeList:** model was not updated on multiselect mode ([611aaea1](https://github.com/DSI-HUG/dejajs-components/commit/611aaea1025e47edde19294a3059d4879ee7e559))
* **DejaOverlay:**
  * Avoid right click when overlay is open ([26bfc1f1](https://github.com/DSI-HUG/dejajs-components/commit/26bfc1f115aeeb7c95e1288263678ce80d65bc75))
  * For display block for deja-menu-content ([55e8d7c8](https://github.com/DSI-HUG/dejajs-components/commit/55e8d7c80f23790391e984c066a6f097e3770fff))
* **ViewPortService:** Clear items size when refresh with clearMeasuredSize is invoked ([4a3c9b52](https://github.com/DSI-HUG/dejajs-components/commit/4a3c9b52533e29470ba6ebf4598cfe87efb273ee))
* **DejaViewportComponent:** Improve buttons binding during lifecycle in button scrolling mode ([8949a4c2](https://github.com/DSI-HUG/dejajs-components/commit/8949a4c25221b9fc52aeafc8aaa401f15bcccef5))
* **DejaViewportService:** Prevent a possible infinite call of calcViewPort in fixed size mode ([bc3290b7](https://github.com/DSI-HUG/dejajs-components/commit/bc3290b79bad13deca332fe17871768cbaa4b16b))

##### Refactors

* **DejaViewport:** Refactoring of observables unsubscription ([62df1780](https://github.com/DSI-HUG/dejajs-components/commit/62df1780ebbbb68a7afa1842577e03754862dc8b))

##### Tests

* **DejaViewPortComponent:**
  * improve unit test ([bdfb1294](https://github.com/DSI-HUG/dejajs-components/commit/bdfb12941979da00cd7b97ff4fad01d6f772b751))
  * improve unit test ([54497242](https://github.com/DSI-HUG/dejajs-components/commit/544972426ec7c3a8b18aab0c8f8e9b2b2e988c3b))
  * improve unit test ([6ab05a29](https://github.com/DSI-HUG/dejajs-components/commit/6ab05a2988d4fc6241d5ff8bcdacfc236354cdb3))
  * improve unit test ([180681c3](https://github.com/DSI-HUG/dejajs-components/commit/180681c3588152f3dd26658a1ba1d8a8049a473a))
  * added unit test ([b382ecc8](https://github.com/DSI-HUG/dejajs-components/commit/b382ecc8272dd0df93ac415143b7e18cfafc71e1))

#### 2.15.1 (2017-10-25)

##### BREAKING CHANGES

* **ViewPortComponent:** Property items become models and another property items is added and representing an array of IViewPortItems. That allow to control the size of each items. ([bb11027d](https://github.com/DSI-HUG/dejajs-components/commit/bb11027d2058fe3a33a9b26c5cecad0dd7bceed4))
    => previous usage of the items input must be renamed to models


##### Continuous Integration

* **Travis:** Improve build performance (concurrent execution) ([d591582e](https://github.com/DSI-HUG/dejajs-components/commit/d591582ec5c1ac2334aabc7553c796ef7b732313))

##### New Features

* **DejaTileComponent:** Ability to refresh the tile ([d1d40b5a](https://github.com/DSI-HUG/dejajs-components/commit/d1d40b5a8ab26ddafa9868fdb713f8e6fdb074b8))
* **ItemListBase:** Possibility to pass an array of items to RefreshViewPort ([7f71ec38](https://github.com/DSI-HUG/dejajs-components/commit/7f71ec38df18744ff9d5dc7930bc816d7005e8e2))

##### Bug Fixes

* **DejaTreeList:** model was not updated on multiselect mode ([611aaea1](https://github.com/DSI-HUG/dejajs-components/commit/611aaea1025e47edde19294a3059d4879ee7e559))
* **DejaOverlay:**
  * Avoid right click when overlay is open ([26bfc1f1](https://github.com/DSI-HUG/dejajs-components/commit/26bfc1f115aeeb7c95e1288263678ce80d65bc75))
  * For display block for deja-menu-content ([55e8d7c8](https://github.com/DSI-HUG/dejajs-components/commit/55e8d7c80f23790391e984c066a6f097e3770fff))
* **ViewPortService:** Clear items size when refresh with clearMeasuredSize is invoked ([4a3c9b52](https://github.com/DSI-HUG/dejajs-components/commit/4a3c9b52533e29470ba6ebf4598cfe87efb273ee))
* **DejaViewportComponent:** Improve buttons binding during lifecycle in button scrolling mode ([8949a4c2](https://github.com/DSI-HUG/dejajs-components/commit/8949a4c25221b9fc52aeafc8aaa401f15bcccef5))
* **DejaViewportService:** Prevent a possible infinite call of calcViewPort in fixed size mode ([bc3290b7](https://github.com/DSI-HUG/dejajs-components/commit/bc3290b79bad13deca332fe17871768cbaa4b16b))

##### Refactors

* **DejaViewport:** Refactoring of observables unsubscription ([62df1780](https://github.com/DSI-HUG/dejajs-components/commit/62df1780ebbbb68a7afa1842577e03754862dc8b))

##### Tests

* **DejaViewPortComponent:**
  * improve unit test ([bdfb1294](https://github.com/DSI-HUG/dejajs-components/commit/bdfb12941979da00cd7b97ff4fad01d6f772b751))
  * improve unit test ([54497242](https://github.com/DSI-HUG/dejajs-components/commit/544972426ec7c3a8b18aab0c8f8e9b2b2e988c3b))
  * improve unit test ([6ab05a29](https://github.com/DSI-HUG/dejajs-components/commit/6ab05a2988d4fc6241d5ff8bcdacfc236354cdb3))
  * improve unit test ([180681c3](https://github.com/DSI-HUG/dejajs-components/commit/180681c3588152f3dd26658a1ba1d8a8049a473a))
  * added unit test ([b382ecc8](https://github.com/DSI-HUG/dejajs-components/commit/b382ecc8272dd0df93ac415143b7e18cfafc71e1))

### 2.15.0 (2017-10-12)

##### BREAKING CHANGES

* **Dependencies:** upgrade dependencies ([4aad8a11](https://github.com/DSI-HUG/dejajs-components/commit/4aad8a112ffa8c408ce5aeebb563a80badde8826))

#### 2.14.1 (2017-10-12)

##### Continuous Integration

* **Test:** Increase karma timeout for PC with bad perf ([18f1d65a](https://github.com/DSI-HUG/dejajs-components/commit/18f1d65aa7a5a111106d2fae47524349d273b050))

##### Documentation Changes

* **DejaOverlayComponent:** ajouter entête licence HUG ([541cc49e](https://github.com/DSI-HUG/dejajs-components/commit/541cc49eccf673d4506414aec2610587039282cc))

##### New Features

* **RangeComponent:** Add refresh function ([96723d4d](https://github.com/DSI-HUG/dejajs-components/commit/96723d4d24351d8990d74e307f291fb244e6951e))

##### Bug Fixes

* **DejaMarkdown:** Fix color margin in code sample ([02795273](https://github.com/DSI-HUG/dejajs-components/commit/0279527369c8e41694f3ac6b10e5528f7e22beca))
* **DejaTreeList:**
  * modelIsValue property initialized to undefined and is determined by the first passed model ([1facb7ad](https://github.com/DSI-HUG/dejajs-components/commit/1facb7ada93baed4693769ceef0e0c28b44f8736))
  * modelIsValue property can be defined for multiselect ([a2b9adec](https://github.com/DSI-HUG/dejajs-components/commit/a2b9adec3450a99bd623524f0904250782400c42))
* **DejaSelect:**
  * modelIsValue property initialized to undefined and is determined by the first passed model ([bd7dc3cf](https://github.com/DSI-HUG/dejajs-components/commit/bd7dc3cf9d6559c0ecf1837d2eef65a8330316eb))
  * modelIsValue property can be defined for multiselect ([3d9c0673](https://github.com/DSI-HUG/dejajs-components/commit/3d9c0673d1e413686d77e28216e258312c763bf0))
* **DejaOverlayComponent:**
  * only throw visibilityChanged if old value is different from new value ([607aa9f0](https://github.com/DSI-HUG/dejajs-components/commit/607aa9f045a58393160b2902e2e127f9e5427093))
  * tooltip style conflict with overlay style ([b3f6e3f1](https://github.com/DSI-HUG/dejajs-components/commit/b3f6e3f1e9e6fad1bd91049faf0916cd12005029))
* **Diacritics:** Remove crash when null or undefined was passed. ([60afeca1](https://github.com/DSI-HUG/dejajs-components/commit/60afeca1fb0483b6ee56499f7bbebf0b3191de24))
* **DejaOverlay:**
  * Replacing class cdk-overlay-container with deja-overlay-container ([a86f130d](https://github.com/DSI-HUG/dejajs-components/commit/a86f130d11db94da9e9f5e0dd0badb1bf0b19336))
  * Menu styling was broken ([bcb24836](https://github.com/DSI-HUG/dejajs-components/commit/bcb24836d872120f0ec0b61b2bcc04ade74d91d4))

##### Other Changes

* **Test:**
  * Fix Test E2E ([f57edb43](https://github.com/DSI-HUG/dejajs-components/commit/f57edb4338f701fbf5b8c6065bf6b3a67f68c8e2))
  *  conf travis ([f1447137](https://github.com/DSI-HUG/dejajs-components/commit/f14471370ee2c8f7dc8ac5a8486daeaebee51353))
  * Restore Karma config ([5802639a](https://github.com/DSI-HUG/dejajs-components/commit/5802639a3b9f4f5fc5edc876018f8c4130ec820b))
  * Test E2E conf ([70acfeff](https://github.com/DSI-HUG/dejajs-components/commit/70acfeff08119be7fee2d473aa4ec9da2c0763bf))
  * Try e2e without chrome headless ([91031620](https://github.com/DSI-HUG/dejajs-components/commit/9103162083afadf9b7bf919c06d9e22c46349288))
  * Try e2e without chrome headless ([e339cfe9](https://github.com/DSI-HUG/dejajs-components/commit/e339cfe96ddae18dd8d18a027a97772ebd53d561))
  * Travis test ([9a0b5c38](https://github.com/DSI-HUG/dejajs-components/commit/9a0b5c38e746ee35f81d678cc2b6cc92183bb31f))
  * Fix test ([8bb154da](https://github.com/DSI-HUG/dejajs-components/commit/8bb154dadbb633898075e14657d06bdab89be55a))

##### Reverts

* **DemoApp:** Revert updates on theme selector ([6e3434a8](https://github.com/DSI-HUG/dejajs-components/commit/6e3434a8e22b055a31ef4811daef8ca9d6e294ea))

##### Code Style Changes

* **TSLint:** Fix lint issue ([1038adff](https://github.com/DSI-HUG/dejajs-components/commit/1038adff260aefbc1bb6f2369d56b710ae522989))

##### Tests

* **DejaSidenav:** Add e2e test ([6c92482f](https://github.com/DSI-HUG/dejajs-components/commit/6c92482f427e26e8d42b16e3b0e2a307b22050fb))
* **DejaOverlayComponent:** added unit test ([622b28aa](https://github.com/DSI-HUG/dejajs-components/commit/622b28aa63d1e2eb5e88eed006decc73f5b762d3))
* **Sidenav:** Add sidenav tests ([95928040](https://github.com/DSI-HUG/dejajs-components/commit/95928040e70c7e537ce074c8d9645ce66df85b7a))

### 2.14.0 (2017-10-05)

##### BREAKING CHANGES

* **DejaMenuComponent:** DejaMenuComponent as DejaOverlayComponent ([fd1fea30](https://github.com/DSI-HUG/dejajs-components/commit/fd1fea30859c68ec6ee1abbd1954d371811c3ea6))

##### New Features

* **MonacoEditor:** Added loaded event after first load ([662e5695](https://github.com/DSI-HUG/dejajs-components/commit/662e56957b139a9b6722cae1492cd946944c809b))
* **Global:** Material 11 compatibility ([1351371f](https://github.com/DSI-HUG/dejajs-components/commit/1351371f163e52b0159bd4355ae5ce1976a40f15))

##### Bug Fixes

* **ViewportService:** Fix crash when treelist parent is collapsed and viewport mode is disabled ([c3571929](https://github.com/DSI-HUG/dejajs-components/commit/c3571929d2abbae3cf6d28b2d91637a534840a32))
* **DejaDatePickerComponent:** markForCheck() on close to avoid bug when close function isn't called by user action ([b5f17991](https://github.com/DSI-HUG/dejajs-components/commit/b5f17991f414b48e9023eeab08f300f45c2caef6))
* **BoldQuery:** Removed encapsulation ([96ca2b5e](https://github.com/DSI-HUG/dejajs-components/commit/96ca2b5e6a987d0c9e887c3bc49f7981608de523))
* **Global:**
  * Material 11 Compatibility ([9d3a674e](https://github.com/DSI-HUG/dejajs-components/commit/9d3a674e7cdc156055b60117aa1576fdc7d6d2af))
  * Ignore and remove .d.ts files ([64825216](https://github.com/DSI-HUG/dejajs-components/commit/64825216472bb0dcc1cfd98e7d58dedfe6bf8a0b))
  * Ignore and remove .d.ts files ([b23644ff](https://github.com/DSI-HUG/dejajs-components/commit/b23644ffc42919c55ceb72e5afe50854e05fea3c))
* **Demo:** Material10 Compatibility fix(Tiles): Small step move issue ([ba4131df](https://github.com/DSI-HUG/dejajs-components/commit/ba4131df1c1b588e144596fa52ba349beb7c6005))
* **TilesComponent:** Work in push mode quiet(MonacoEditor): Fixed wrong value emitted by the event ([e800fd21](https://github.com/DSI-HUG/dejajs-components/commit/e800fd2187fb3f415eec5ad7e0d2555039b55102))
* **MonacoEditor:** Use Observables to avoid life cycle issues ([0e5752dd](https://github.com/DSI-HUG/dejajs-components/commit/0e5752dda57dd73d8223fea12a9f2f32c140177f))

##### Other Changes

* **DejaTag:** Fix test Material 11 compatibility ([8bf1524c](https://github.com/DSI-HUG/dejajs-components/commit/8bf1524cade4efd5db1f4cbc9ba8357311e63d71))
* **Global:**
  * Fix issues due to the material 11 migration ([c3807044](https://github.com/DSI-HUG/dejajs-components/commit/c38070444327716400053b60e40548e822ed1bad))
  * Fix issues due to the material 11 migration ([dec01d0d](https://github.com/DSI-HUG/dejajs-components/commit/dec01d0da79668b8fc43a0d2e3b5f301fb137020))
* **GlobalEvent:** Restored .d.ts ([03b32dda](https://github.com/DSI-HUG/dejajs-components/commit/03b32ddacc001d1a50eaaed8de128a372df078ca))
* **MonacoEditor:** Revrted: Use Observables to avoid life cycle issues ([d436aa14](https://github.com/DSI-HUG/dejajs-components/commit/d436aa143ba711fe8b276f386672907b212c5306))

### 2.13.0 (2017-10-04)

##### Continuous Integration

* **Test:**
  * Depoy test coverage ([7e0aee82](https://github.com/DSI-HUG/dejajs-components/commit/7e0aee822f25b98e70330a939b5ad85b47cab221))
  * Include a Material Theme in Karma config to remove warnings ([682529a4](https://github.com/DSI-HUG/dejajs-components/commit/682529a4971fb72fcbd073c6074050b5134b4406))
  * Fix mocha reporter configuration ([3bee32d5](https://github.com/DSI-HUG/dejajs-components/commit/3bee32d5b1804b1a5e6dfe8645364465d574e276))
  * Use Chrome Headless ([cdfb73a6](https://github.com/DSI-HUG/dejajs-components/commit/cdfb73a63e5cfd551ddca42cb6790abdaac2d8b7))
  * Use Chrome Headless ([c93248d7](https://github.com/DSI-HUG/dejajs-components/commit/c93248d76fd6c4b4c37d05e6db49357f119b7304))
  * Add Mocha reporter ([d89c802f](https://github.com/DSI-HUG/dejajs-components/commit/d89c802fc91dd2b4a8c2dde758f3ec83e61f319e))
* **UnitTest:** Add unit test configuration ([3af15fa1](https://github.com/DSI-HUG/dejajs-components/commit/3af15fa1f3b104ea2c1c3c5d0e37336a3e80691b))

##### New Features

* **DejaGrid:** Deeo model for column name ([c67eae71](https://github.com/DSI-HUG/dejajs-components/commit/c67eae717c2ac5e1fbd06dc67a9f4ad705562828))
* **DejaTreelist:** Deeo model for textField and valueField feat(DejaSelect): Deeo model for textField and valueField ([41e5e008](https://github.com/DSI-HUG/dejajs-components/commit/41e5e008e7005c144177a8de928366797179a5b2))
* **AutosizeTextArea:** deja-autosize is deprecated, use mat-autosize instead ([e795fd67](https://github.com/DSI-HUG/dejajs-components/commit/e795fd6745f26e3ced07d79eb95f7879b02ee357))

##### Bug Fixes

* **DejaTreeListComponent:** remove null value inside array of selected values ([da374f1c](https://github.com/DSI-HUG/dejajs-components/commit/da374f1c28127fa3bb6fdd7d1f4884664b4a6b9d))
* **DejaTiles:** Tiles min with and min height cant't be 0 ([b4dc3cc4](https://github.com/DSI-HUG/dejajs-components/commit/b4dc3cc4858adf68c6c916d96e9d82989c408c2b))
* **DejaColorPicker:** Fix change detection bug and add unit test ([2b60a133](https://github.com/DSI-HUG/dejajs-components/commit/2b60a133bc2ab7885f4284d86a7a0fd9813f2edf))
* **DejaDatePicker:** add weight to close button styling ([b3d93569](https://github.com/DSI-HUG/dejajs-components/commit/b3d935692a737caad5234299e9effc3b347884c1))
* **Snackbar:**
  * Snackbar internal layout ([32ab75df](https://github.com/DSI-HUG/dejajs-components/commit/32ab75dfc644fa09dfecca18616654b05c6ef125))
  * Snackbar position ([82169b13](https://github.com/DSI-HUG/dejajs-components/commit/82169b13871e58c7e5100f09fea5eabeecd8fdec))
* **DejaTreelistDemo:** Wrong borders ([a35a689d](https://github.com/DSI-HUG/dejajs-components/commit/a35a689d31568ffb653cea1ac2aa7cc922227036))
* **DejaTag:** Full width ([946dd4f7](https://github.com/DSI-HUG/dejajs-components/commit/946dd4f73fa0694602392f9d7a9668e6bb178f08))

##### Other Changes

* **DejaColorSelector:** Change colors to see a problem more quickly ([83e3632b](https://github.com/DSI-HUG/dejajs-components/commit/83e3632b527bd5bf7451e7c29257cef702b2fe9b))
* **Test:** Karma single run mode ([7ce94d06](https://github.com/DSI-HUG/dejajs-components/commit/7ce94d06cf245c974c5a13f1c3a808dcded692e4))
* **ItemListService:** Keep possibility to override getTextValue and getValue ([ca9f7687](https://github.com/DSI-HUG/dejajs-components/commit/ca9f768755621dc96b0fd52c5e60455ba98afa06))

##### Tests

* **DejaMessageBox:** Add unit test ([c45d043c](https://github.com/DSI-HUG/dejajs-components/commit/c45d043c5107071de3a9646b28e1e69f71aebb30))
* **DejaDialog:** Add unit test ([5275d11e](https://github.com/DSI-HUG/dejajs-components/commit/5275d11e1f774c39b82f2cec110ede1ac98139c1))
* **DejaTag:**
  * Improve test ([f5110748](https://github.com/DSI-HUG/dejajs-components/commit/f5110748d21488de16d3c7466ad9462bb9df6c7a))
  * Add e2e tests ([cfe66900](https://github.com/DSI-HUG/dejajs-components/commit/cfe66900932088ffccf500617eabdc8d23846595))
* **DejaCircularPickercomponent:** Add unit testing ([a0e50079](https://github.com/DSI-HUG/dejajs-components/commit/a0e50079154379b2a899e1a21fefaccaa385622b))
* **DejaChipsComponent:** Add unit test on DejaChipsComponent ([e7d08afa](https://github.com/DSI-HUG/dejajs-components/commit/e7d08afa6f782b147bd7e40097a80008283b286b))

#### 2.12.2 (2017-09-18)

##### Bug Fixes

* **DataGrid:** Fixed regression from AOT improvements ([e36f930f](https://github.com/DSI-HUG/dejajs-components/commit/e36f930ff18989df1272e0dd1823ee8225cab978))
* **DejaTag:** Full width ([9e94aec8](https://github.com/DSI-HUG/dejajs-components/commit/9e94aec8528118f2be18d6215c3012791b61cc5a))
* **DejaSplitter:** Gutter size can be 0 ([3a989f56](https://github.com/DSI-HUG/dejajs-components/commit/3a989f566e580d29b097a32d882a6f7b797a3532))
* **DejaTreeList:** Selection can fail sometimes in multiselect mode. ([e630a4da](https://github.com/DSI-HUG/dejajs-components/commit/e630a4dab9768c1004dd8fc4fab5b0dd43e43757))
* **MenuDemo:** ContextMenu position ([91a6e5b4](https://github.com/DSI-HUG/dejajs-components/commit/91a6e5b428a8c41488c08c2a8f5a84a574ef9038))

##### Other Changes

* **DejaSplitter:** Gutter size can be 0 (bis) ([49111eb7](https://github.com/DSI-HUG/dejajs-components/commit/49111eb7bad5c1a472f290ba3d4bb1435cf77461))

#### 2.12.1 (2017-09-14)

##### BREAKING CHANGES

* **DejaSelect:**
  * Removed useless dropdownContainerId input. ([f027f51c](https://github.com/DSI-HUG/dejajs-components/commit/f027f51c94f52eb4c7fc8e3b6746cebe410da927))
  * Using angular/cdk/overlay to open the dropdown in the body ([009723d4](https://github.com/DSI-HUG/dejajs-components/commit/009723d45a152c40d592c694f12b32bd881595e7))
* **DejaDatePicker:** Using angular/cdk/overlay to open the dropdown in the body refactor(DejaDropDown): Removed. Replaced by the angular/cdk/overlay refactor(DejaBackDrop): Removed. Replaced by the angular/cdk/overlay ([e9fd7f72](https://github.com/DSI-HUG/dejajs-components/commit/e9fd7f7217c08dc322f4e2f8a2a362c9cfb12e87))
* **DejaColorPicker:** Using angular/cdk/overlay to open the dropdown in the body ([0ee8b8a3](https://github.com/DSI-HUG/dejajs-components/commit/0ee8b8a391d11be5b6188d1bafc289224a43f601))
* **DejaTooltip:** Using angular/cdk/overlay to open the dropdown in the body ([13c897d8](https://github.com/DSI-HUG/dejajs-components/commit/13c897d82c6b55fdf9eaa232fb73aa2b232e3b05))
* **DejaMenu:** Using angular/cdk/overlay to open the dropdown in the body ([9298fb68](https://github.com/DSI-HUG/dejajs-components/commit/9298fb688709fc656b230fb796808da0f28c879a))

##### New Features

* **DejaToolTip:** Accept also ng-content feat(backdrop): backdrop css to create a backdrop with a simple div with a class name deja-backdrop ([acd4ee30](https://github.com/DSI-HUG/dejajs-components/commit/acd4ee30018d2a8d20aad06fa4ca20e149456ad4))
* **DropDownContainerService:** Added DropDownContainerService ([f016e55c](https://github.com/DSI-HUG/dejajs-components/commit/f016e55c2a9180e889ccb36d68b0485518db5981))

##### Bug Fixes

* **DejaToolTip:** Hide timer on leave from 20ms to 100ms ([5025e585](https://github.com/DSI-HUG/dejajs-components/commit/5025e585f55836eb2d99834ca54cbd2080b06c6d))
* **Global:** Member access mandatory feat(Global): Usage of angular/cdk/coercion ([bded9b45](https://github.com/DSI-HUG/dejajs-components/commit/bded9b4597afd6877d0aa47f45de7234374861ee))

### 2.12.0 (2017-09-13)

##### BREAKING CHANGES

* **DejaDatePicker:** Using angular/cdk/overlay to open the dropdown in the body refactor(DejaDropDown): Removed. Replaced by the angular/cdk/overlay refactor(DejaBackDrop): Removed. Replaced by the angular/cdk/overlay ([e9fd7f72](https://github.com/DSI-HUG/dejajs-components/commit/e9fd7f7217c08dc322f4e2f8a2a362c9cfb12e87))
* **DejaSelect:** Using angular/cdk/overlay to open the dropdown in the body ([009723d4](https://github.com/DSI-HUG/dejajs-components/commit/009723d45a152c40d592c694f12b32bd881595e7))
* **DejaColorPicker:** Using angular/cdk/overlay to open the dropdown in the body ([0ee8b8a3](https://github.com/DSI-HUG/dejajs-components/commit/0ee8b8a391d11be5b6188d1bafc289224a43f601))
* **DejaTooltip:** Using angular/cdk/overlay to open the dropdown in the body ([13c897d8](https://github.com/DSI-HUG/dejajs-components/commit/13c897d82c6b55fdf9eaa232fb73aa2b232e3b05))
* **DejaMenu:** Using angular/cdk/overlay to open the dropdown in the body ([9298fb68](https://github.com/DSI-HUG/dejajs-components/commit/9298fb688709fc656b230fb796808da0f28c879a))
* **Dependencies:**
  * Upgrade dependencies ([8608d42a](https://github.com/DSI-HUG/dejajs-components/commit/8608d42af221d5dc66e40e6aa91f51e2d32b97da))
  * Change dependencies to PeerDependencies ([76e7ee85](https://github.com/DSI-HUG/dejajs-components/commit/76e7ee85268e8e4827adc8656d045c908b1b87b0))

##### Continuous Integration

* **Build:**
  * Fix rollup build ([2a683725](https://github.com/DSI-HUG/dejajs-components/commit/2a6837258e586846dab39ef3ac1c1f2d511d4352))
  * Remove rollup warning ([63abfa68](https://github.com/DSI-HUG/dejajs-components/commit/63abfa68dc03deaedf29b67c54bebca592e97c8b))

##### New Features

* **DejaToolTip:** Accept also ng-content feat(backdrop): backdrop css to create a backdrop with a simple div with a class name deja-backdrop ([acd4ee30](https://github.com/DSI-HUG/dejajs-components/commit/acd4ee30018d2a8d20aad06fa4ca20e149456ad4))
* **DropDownContainerService:** Added DropDownContainerService ([f016e55c](https://github.com/DSI-HUG/dejajs-components/commit/f016e55c2a9180e889ccb36d68b0485518db5981))
* **SlimScroll:**
  * Add slimScroll ([17ab898d](https://github.com/DSI-HUG/dejajs-components/commit/17ab898d668935c44559531937bdfc5b0c3d3685))
  * Add slimScroll ([92878944](https://github.com/DSI-HUG/dejajs-components/commit/928789447826610e75d0a6e28a7e8d36faaceb9d))
* **Sidenav:** Add sidenav component ([424c64e8](https://github.com/DSI-HUG/dejajs-components/commit/424c64e8a410d86f554d920ecf919dbb38052a5f))

##### Bug Fixes

* **DejaToolTip:** Hide timer on leave from 20ms to 100ms ([5025e585](https://github.com/DSI-HUG/dejajs-components/commit/5025e585f55836eb2d99834ca54cbd2080b06c6d))
* **Sidenav:**
  * Mobile compliance ([356490a9](https://github.com/DSI-HUG/dejajs-components/commit/356490a9aa3cba9e8ad6ec10a2eb710ed0b99753))
  * unused variable ([a96fdf99](https://github.com/DSI-HUG/dejajs-components/commit/a96fdf993f9080841154991fc0e912123cd99124))
* **Global:**
  * Member access mandatory feat(Global): Usage of angular/cdk/coercion ([bded9b45](https://github.com/DSI-HUG/dejajs-components/commit/bded9b4597afd6877d0aa47f45de7234374861ee))
  * Update theme selector ([2c4a52a6](https://github.com/DSI-HUG/dejajs-components/commit/2c4a52a6ee711d65a476ebb503729d50a296616d))
  * Build AOT part 1 ([73cfbe2b](https://github.com/DSI-HUG/dejajs-components/commit/73cfbe2b19a1b59f4170fb4bd66255e211d7a1da))
* **Select:** Material style ([b30ada73](https://github.com/DSI-HUG/dejajs-components/commit/b30ada7353f75d95609bb0975c94a90d137c1f7a))
* **DemoApp:** Demo style ([5f1cc9d8](https://github.com/DSI-HUG/dejajs-components/commit/5f1cc9d8d5ecd70965d2fdc9e74b30eadf877d15))
* **DejaGrid:** Wrong binding on function ([dbffc967](https://github.com/DSI-HUG/dejajs-components/commit/dbffc967a14dc4e9200dca447de76304bd3dc73e))
* **Tiles:** AOT Compilation ([4adecd9b](https://github.com/DSI-HUG/dejajs-components/commit/4adecd9bcb411abd02af5e4f844184e40321b907))
* **Dependencies:** CDK Build error version ([21436239](https://github.com/DSI-HUG/dejajs-components/commit/21436239a4686c298b4a8060a389a36592c5a0ac))

##### Other Changes

* **License:** Fix ([52617536](https://github.com/DSI-HUG/dejajs-components/commit/526175360b206c435c59f1bc791b5d81f8751c61))
* **Dependencies:** upgrade dependencies ([fd6aff26](https://github.com/DSI-HUG/dejajs-components/commit/fd6aff26e25ef75a0a3b266c99ca4f3bac68bb50))
* **Sidenav:** Fix license ([1bc6f0f4](https://github.com/DSI-HUG/dejajs-components/commit/1bc6f0f42720f66f3d48f3bf3a01cd667eb91ce7))

##### Refactors

* **Demo:** Add new sidebar in demo app and css refactor ([a2cae2e4](https://github.com/DSI-HUG/dejajs-components/commit/a2cae2e4c824832e08fe6f6e3b80b18a7a85e89d))

##### Tests

* **Global:**
  * Remove temporary E2E ([dc4521f0](https://github.com/DSI-HUG/dejajs-components/commit/dc4521f059d4cfddfdcd35645ab068d9875ed543))
  * Remove temporary E2E ([97b7d004](https://github.com/DSI-HUG/dejajs-components/commit/97b7d00414ad6e2e95f0e01a0085646d8d6d0ffc))
* **Accordion:**
  * Change route url ([b96f9841](https://github.com/DSI-HUG/dejajs-components/commit/b96f9841cb34d7bf356279c26fbb9955172b0495))
  * Change route url ([3d8ed034](https://github.com/DSI-HUG/dejajs-components/commit/3d8ed034e9805cb05b50640854219f989f833bb5))

### 2.11.0 (2017-09-11)

##### BREAKING CHANGES

* **Dependencies:**
  * Upgrade dependencies ([8608d42a](https://github.com/DSI-HUG/dejajs-components/commit/8608d42af221d5dc66e40e6aa91f51e2d32b97da))
  * Change dependencies to PeerDependencies ([76e7ee85](https://github.com/DSI-HUG/dejajs-components/commit/76e7ee85268e8e4827adc8656d045c908b1b87b0))

##### Continuous Integration

* **Build:**
  * Fix rollup build ([2a683725](https://github.com/DSI-HUG/dejajs-components/commit/2a6837258e586846dab39ef3ac1c1f2d511d4352))
  * Remove rollup warning ([63abfa68](https://github.com/DSI-HUG/dejajs-components/commit/63abfa68dc03deaedf29b67c54bebca592e97c8b))

##### New Features

* **SlimScroll:**
  * Add slimScroll ([17ab898d](https://github.com/DSI-HUG/dejajs-components/commit/17ab898d668935c44559531937bdfc5b0c3d3685))
  * Add slimScroll ([92878944](https://github.com/DSI-HUG/dejajs-components/commit/928789447826610e75d0a6e28a7e8d36faaceb9d))
* **Sidenav:** Add sidenav component ([424c64e8](https://github.com/DSI-HUG/dejajs-components/commit/424c64e8a410d86f554d920ecf919dbb38052a5f))

##### Bug Fixes

* **Sidenav:**
  * Mobile compliance ([356490a9](https://github.com/DSI-HUG/dejajs-components/commit/356490a9aa3cba9e8ad6ec10a2eb710ed0b99753))
  * unused variable ([a96fdf99](https://github.com/DSI-HUG/dejajs-components/commit/a96fdf993f9080841154991fc0e912123cd99124))
* **Select:** Material style ([b30ada73](https://github.com/DSI-HUG/dejajs-components/commit/b30ada7353f75d95609bb0975c94a90d137c1f7a))
* **Global:**
  * Update theme selector ([2c4a52a6](https://github.com/DSI-HUG/dejajs-components/commit/2c4a52a6ee711d65a476ebb503729d50a296616d))
  * Build AOT part 1 ([73cfbe2b](https://github.com/DSI-HUG/dejajs-components/commit/73cfbe2b19a1b59f4170fb4bd66255e211d7a1da))
* **DemoApp:** Demo style ([5f1cc9d8](https://github.com/DSI-HUG/dejajs-components/commit/5f1cc9d8d5ecd70965d2fdc9e74b30eadf877d15))
* **DejaGrid:** Wrong binding on function ([dbffc967](https://github.com/DSI-HUG/dejajs-components/commit/dbffc967a14dc4e9200dca447de76304bd3dc73e))
* **Tiles:** AOT Compilation ([4adecd9b](https://github.com/DSI-HUG/dejajs-components/commit/4adecd9bcb411abd02af5e4f844184e40321b907))
* **Dependencies:** CDK Build error version ([21436239](https://github.com/DSI-HUG/dejajs-components/commit/21436239a4686c298b4a8060a389a36592c5a0ac))

##### Other Changes

* **License:** Fix ([52617536](https://github.com/DSI-HUG/dejajs-components/commit/526175360b206c435c59f1bc791b5d81f8751c61))
* **Dependencies:** upgrade dependencies ([fd6aff26](https://github.com/DSI-HUG/dejajs-components/commit/fd6aff26e25ef75a0a3b266c99ca4f3bac68bb50))
* **Sidenav:** Fix license ([1bc6f0f4](https://github.com/DSI-HUG/dejajs-components/commit/1bc6f0f42720f66f3d48f3bf3a01cd667eb91ce7))

##### Refactors

* **Demo:** Add new sidebar in demo app and css refactor ([a2cae2e4](https://github.com/DSI-HUG/dejajs-components/commit/a2cae2e4c824832e08fe6f6e3b80b18a7a85e89d))

##### Tests

* **Global:**
  * Remove temporary E2E ([dc4521f0](https://github.com/DSI-HUG/dejajs-components/commit/dc4521f059d4cfddfdcd35645ab068d9875ed543))
  * Remove temporary E2E ([97b7d004](https://github.com/DSI-HUG/dejajs-components/commit/97b7d00414ad6e2e95f0e01a0085646d8d6d0ffc))
* **Accordion:**
  * Change route url ([b96f9841](https://github.com/DSI-HUG/dejajs-components/commit/b96f9841cb34d7bf356279c26fbb9955172b0495))
  * Change route url ([3d8ed034](https://github.com/DSI-HUG/dejajs-components/commit/3d8ed034e9805cb05b50640854219f989f833bb5))

### 2.10.0 (2017-09-06)

##### BREAKING CHANGES

* **Dependencies:** Change dependencies to PeerDependencies ([76e7ee85](https://github.com/DSI-HUG/dejajs-components/commit/76e7ee85268e8e4827adc8656d045c908b1b87b0))

##### Continuous Integration

* **Build:** Remove rollup warning ([63abfa68](https://github.com/DSI-HUG/dejajs-components/commit/63abfa68dc03deaedf29b67c54bebca592e97c8b))

##### New Features

* **Sidenav:** Add sidenav component ([424c64e8](https://github.com/DSI-HUG/dejajs-components/commit/424c64e8a410d86f554d920ecf919dbb38052a5f))

##### Bug Fixes

* **DemoApp:** Demo style ([5f1cc9d8](https://github.com/DSI-HUG/dejajs-components/commit/5f1cc9d8d5ecd70965d2fdc9e74b30eadf877d15))
* **DejaGrid:** Wrong binding on function ([dbffc967](https://github.com/DSI-HUG/dejajs-components/commit/dbffc967a14dc4e9200dca447de76304bd3dc73e))
* **Sidenav:** unused variable ([a96fdf99](https://github.com/DSI-HUG/dejajs-components/commit/a96fdf993f9080841154991fc0e912123cd99124))
* **Tiles:** AOT Compilation ([4adecd9b](https://github.com/DSI-HUG/dejajs-components/commit/4adecd9bcb411abd02af5e4f844184e40321b907))
* **Dependencies:** CDK Build error version ([21436239](https://github.com/DSI-HUG/dejajs-components/commit/21436239a4686c298b4a8060a389a36592c5a0ac))
* **Global:** Build AOT part 1 ([73cfbe2b](https://github.com/DSI-HUG/dejajs-components/commit/73cfbe2b19a1b59f4170fb4bd66255e211d7a1da))

##### Refactors

* **Demo:** Add new sidebar in demo app and css refactor ([a2cae2e4](https://github.com/DSI-HUG/dejajs-components/commit/a2cae2e4c824832e08fe6f6e3b80b18a7a85e89d))

##### Tests

* **Accordion:**
  * Change route url ([b96f9841](https://github.com/DSI-HUG/dejajs-components/commit/b96f9841cb34d7bf356279c26fbb9955172b0495))
  * Change route url ([3d8ed034](https://github.com/DSI-HUG/dejajs-components/commit/3d8ed034e9805cb05b50640854219f989f833bb5))

### 2.9.0 (2017-09-01)

##### BREAKING CHANGES

* **Dependencies:** Change dependencies to PeerDependencies ([ad4d8ebd](https://github.com/DSI-HUG/dejajs-components/commit/ad4d8ebdc1e2fcf6f5d45d6dd3c5ac036ca4e7d1))

##### Continuous Integration

* **Build:** Remove rollup warning ([acfc272f](https://github.com/DSI-HUG/dejajs-components/commit/acfc272fabd2cf37f491b7cc571e6b526d1144c1))

##### Bug Fixes

* **Tiles:** AOT Compilation ([4adecd9b](https://github.com/DSI-HUG/dejajs-components/commit/4adecd9bcb411abd02af5e4f844184e40321b907))
* **Dependencies:** CDK Build error version ([21436239](https://github.com/DSI-HUG/dejajs-components/commit/21436239a4686c298b4a8060a389a36592c5a0ac))
* **Global:** Build AOT part 1 ([73cfbe2b](https://github.com/DSI-HUG/dejajs-components/commit/73cfbe2b19a1b59f4170fb4bd66255e211d7a1da))

#### 2.8.1 (2017-08-31)

##### BREAKING CHANGES

* **MaterialColor:** Removed circular dependency warnings ([57c9715e](https://github.com/DSI-HUG/dejajs-components/commit/57c9715e7771198319e6953d1c02dfd3827f313b))

##### Build System / Dependencies

* **Dependencies:** Update all dependencies in latest version ([e2f16623](https://github.com/DSI-HUG/dejajs-components/commit/e2f166234a83eb835f27603ffdf095cdc8765262))

##### Continuous Integration

* **Travis:** Upgrade to node 8 ([1875c980](https://github.com/DSI-HUG/dejajs-components/commit/1875c980b11d079820feae86e5728572ff14c17e))

##### New Features

* **DejaGridDemo:** Added pre-selection demo feat(DejaTreeListDemo): Added pre-selection demo ([74a62d6e](https://github.com/DSI-HUG/dejajs-components/commit/74a62d6e391743977bae5d028954532f8bcf3f3c))
* **DejaGrid:** Map selectedModel, selectedModels and selectedItem to the internal tree list ([6ecac951](https://github.com/DSI-HUG/dejajs-components/commit/6ecac951c6d7eac752dcd7ae524d3b8e046a72d8))
* **DejaTag:** Add DejaTag component. ([b8228ce1](https://github.com/DSI-HUG/dejajs-components/commit/b8228ce1d668f751e13812396ad3fe7a5ad1ec08))

##### Bug Fixes

* **Dependencies:** CDK Build error version ([21436239](https://github.com/DSI-HUG/dejajs-components/commit/21436239a4686c298b4a8060a389a36592c5a0ac))
* **ItemListService:** Improvement of the comparison to pre-select one or more elements of a list ([7ede9515](https://github.com/DSI-HUG/dejajs-components/commit/7ede9515f88532ee136bdebead1befaa2b631d9b))
* **Select:**
  * Remove position relative on select ([e900d1ba](https://github.com/DSI-HUG/dejajs-components/commit/e900d1ba70d17c6402f09a13e8a97791d6162b77))
  * Remove autocomplete on select search input ([cc4ec9ff](https://github.com/DSI-HUG/dejajs-components/commit/cc4ec9ff8659b9b09356e4ba3d47abb151b8ee25))
* **DejaGrid:**
  * Assign an empty array to the columns collection, clear columns and remove header component ([05c0b083](https://github.com/DSI-HUG/dejajs-components/commit/05c0b083278ee9a921475b1adad6594509a837f5))
  * Row observable was subscribed two times ([36f51182](https://github.com/DSI-HUG/dejajs-components/commit/36f51182ee849fbdabcbc8021c522930321f6bbb))
* **CircularPicker:** Update for to for...of to remove tslint error ([ad23fc17](https://github.com/DSI-HUG/dejajs-components/commit/ad23fc17e9e8a37a497b56ddf66cb4f70d3a5d25))
* **Global:** rxjs:5.4.3 ([f899fd59](https://github.com/DSI-HUG/dejajs-components/commit/f899fd5985e0fbae74ba0bdf0595a84b93d8d9a1))
* **DejaTag:** Remove flex layout into the component ([80dc0519](https://github.com/DSI-HUG/dejajs-components/commit/80dc051925bb476c7c42868f8fbfdd64365652e3))
* **Cloning:** Clone date in array of date ([4dfd752a](https://github.com/DSI-HUG/dejajs-components/commit/4dfd752a21632bc8375f02d83fc1841ce4d6397c))

##### Other Changes

* **Travis:** Remove npm prune ([6afc69c5](https://github.com/DSI-HUG/dejajs-components/commit/6afc69c5da505f2e61becc377f269c02bbcb2813))
* **DemoApp:** Add list loader demo ([66eaaeaa](https://github.com/DSI-HUG/dejajs-components/commit/66eaaeaa5bab1111229a6fa92541ace69c2c87f4))
* **Changelog:**
  * Fix changelog...... ([707ff2ac](https://github.com/DSI-HUG/dejajs-components/commit/707ff2ac149fab1f69a972eecff976fe5f36e858))
  * fix duplicate commit info ([0e8ea9c4](https://github.com/DSI-HUG/dejajs-components/commit/0e8ea9c484c02c00976ec345f89b5bc438ee007c))
* **License:** Add license ([70d5dcdc](https://github.com/DSI-HUG/dejajs-components/commit/70d5dcdc2cce9435fe8d4afa07d99cda17aaa10c))

### 2.8.0 (2017-08-30)

##### BREAKING CHANGES

* **MaterialColor:** Removed circular dependency warnings ([57c9715e](https://github.com/DSI-HUG/dejajs-components/commit/57c9715e7771198319e6953d1c02dfd3827f313b))

##### Build System / Dependencies

* **Dependencies:** Update all dependencies in latest version ([e2f16623](https://github.com/DSI-HUG/dejajs-components/commit/e2f166234a83eb835f27603ffdf095cdc8765262))

##### Continuous Integration

* **Travis:** Upgrade to node 8 ([1875c980](https://github.com/DSI-HUG/dejajs-components/commit/1875c980b11d079820feae86e5728572ff14c17e))

##### New Features

* **DejaGridDemo:** Added pre-selection demo feat(DejaTreeListDemo): Added pre-selection demo ([74a62d6e](https://github.com/DSI-HUG/dejajs-components/commit/74a62d6e391743977bae5d028954532f8bcf3f3c))
* **DejaGrid:** Map selectedModel, selectedModels and selectedItem to the internal tree list ([6ecac951](https://github.com/DSI-HUG/dejajs-components/commit/6ecac951c6d7eac752dcd7ae524d3b8e046a72d8))

##### Bug Fixes

* **ItemListService:** Improvement of the comparison to pre-select one or more elements of a list ([7ede9515](https://github.com/DSI-HUG/dejajs-components/commit/7ede9515f88532ee136bdebead1befaa2b631d9b))
* **Select:**
  * Remove position relative on select ([e900d1ba](https://github.com/DSI-HUG/dejajs-components/commit/e900d1ba70d17c6402f09a13e8a97791d6162b77))
  * Remove autocomplete on select search input ([cc4ec9ff](https://github.com/DSI-HUG/dejajs-components/commit/cc4ec9ff8659b9b09356e4ba3d47abb151b8ee25))
* **DejaGrid:**
  * Assign an empty array to the columns collection, clear columns and remove header component ([05c0b083](https://github.com/DSI-HUG/dejajs-components/commit/05c0b083278ee9a921475b1adad6594509a837f5))
  * Row observable was subscribed two times ([36f51182](https://github.com/DSI-HUG/dejajs-components/commit/36f51182ee849fbdabcbc8021c522930321f6bbb))
* **CircularPicker:** Update for to for...of to remove tslint error ([ad23fc17](https://github.com/DSI-HUG/dejajs-components/commit/ad23fc17e9e8a37a497b56ddf66cb4f70d3a5d25))

##### Other Changes

* **Travis:** Remove npm prune ([6afc69c5](https://github.com/DSI-HUG/dejajs-components/commit/6afc69c5da505f2e61becc377f269c02bbcb2813))
* **DemoApp:** Add list loader demo ([66eaaeaa](https://github.com/DSI-HUG/dejajs-components/commit/66eaaeaa5bab1111229a6fa92541ace69c2c87f4))
* **Changelog:**
  * Fix changelog...... ([707ff2ac](https://github.com/DSI-HUG/dejajs-components/commit/707ff2ac149fab1f69a972eecff976fe5f36e858))
  * fix duplicate commit info ([0e8ea9c4](https://github.com/DSI-HUG/dejajs-components/commit/0e8ea9c484c02c00976ec345f89b5bc438ee007c))

### 2.7.0 (2017-08-17)

##### Build System / Dependencies

* **Dependencies:** Update all dependencies in latest version ([e2f16623](https://github.com/DSI-HUG/dejajs-components/commit/e2f166234a83eb835f27603ffdf095cdc8765262))

##### Bug Fixes

* **CircularPicker:** Update for to for...of to remove tslint error ([ad23fc17](https://github.com/DSI-HUG/dejajs-components/commit/ad23fc17e9e8a37a497b56ddf66cb4f70d3a5d25))

#### 2.6.1 (2017-08-14)

##### New Features

* **DejaTag:** Add DejaTag component. ([b8228ce1](https://github.com/DSI-HUG/dejajs-components/commit/b8228ce1d668f751e13812396ad3fe7a5ad1ec08))

##### Bug Fixes

* **Global:** rxjs:5.4.3 ([f899fd59](https://github.com/DSI-HUG/dejajs-components/commit/f899fd5985e0fbae74ba0bdf0595a84b93d8d9a1))
* **DejaTag:** Remove flex layout into the component ([80dc0519](https://github.com/DSI-HUG/dejajs-components/commit/80dc051925bb476c7c42868f8fbfdd64365652e3))
* **Cloning:** Clone date in array of date ([4dfd752a](https://github.com/DSI-HUG/dejajs-components/commit/4dfd752a21632bc8375f02d83fc1841ce4d6397c))

##### Other Changes

* **License:** Add license ([70d5dcdc](https://github.com/DSI-HUG/dejajs-components/commit/70d5dcdc2cce9435fe8d4afa07d99cda17aaa10c))

### 2.6.0 (2017-07-31)

##### BREAKING CHANGES

* **DejaTreelist:** Treelist NgModel to the selected items same as the DejaSelect ([5874d2d8](https://github.com/DSI-HUG/dejajs-components/commit/5874d2d8f467d63df2ecee40387caac5766f3ff0))
* **DejaSelect:** NgModel type same as set ([87627bfb](https://github.com/DSI-HUG/dejajs-components/commit/87627bfb75834fa57b6e376f168015f114e1bba8))

##### Bug Fixes

* **SelectDemoComponent validator:** license header ([b7247f1c](https://github.com/DSI-HUG/dejajs-components/commit/b7247f1ccf4b08484946ae9e5d6548106d57d072))
* **SelectDemoComponent:** validator declaration ([16d6249d](https://github.com/DSI-HUG/dejajs-components/commit/16d6249d5b71076c3da93fb2f0b2dea046af71c3))

#### 2.5.0 (2017-07-20)

##### BREAKING CHANGES

* **Dependencies:** Update all dependencies (Angular 4.3 & Ngrx 4) ([62d612a0](https://github.com/DSI-HUG/dejajs-components/commit/62d612a0778ede150ae47a40a59b55a1598cd856))
* **Fonts:** Remove fonts from the libraries ([1b4e8968](https://github.com/DSI-HUG/dejajs-components/commit/1b4e896816cb169ab7b42c03fb6a0c50b924be48))

##### Documentation Changes

* **DatePicker:** Update doc ([090b47ff](https://github.com/DSI-HUG/dejajs-components/commit/090b47ffef9a151d2a269c197ecf0b890504ec5d))

##### New Features

* **DatePicker:** Add required attribute and mdError templating ([2482cc06](https://github.com/DSI-HUG/dejajs-components/commit/2482cc06cbc1e7e8d56b4e726a79e7c271d9264e))

##### Bug Fixes

* **DatePicker:**
  * button type ([d3ebb3df](https://github.com/DSI-HUG/dejajs-components/commit/d3ebb3dfca3347685aa276db293ada8313fb501e))
  * add DejaChildValidatorDirective to datepicker input to make it work with reactive forms ([3afe12b1](https://github.com/DSI-HUG/dejajs-components/commit/3afe12b1d410ffd69116fad4cdd94f7971c6e9ed))
  * update icon font-size to 100% ([cfaa4e64](https://github.com/DSI-HUG/dejajs-components/commit/cfaa4e647c5ff990739c693d5a97bae45e66611b))
  * Fix reactive form implementation ([7b2a9185](https://github.com/DSI-HUG/dejajs-components/commit/7b2a9185a1cb6fdfeaf7fb158fb31943d5a5b216))
* **flexLayout:** Add flexLayout import where it's needed ([d2c69acc](https://github.com/DSI-HUG/dejajs-components/commit/d2c69acc96bec08aee1ced3d1d1b97ef1f850be9))
* **Global:** Update rxjs ([bbb55617](https://github.com/DSI-HUG/dejajs-components/commit/bbb556176605ce9a2218dbae01a80b9435dfb796))

##### Other Changes

* **Config:** Add npmrc file to force registry ([bfb5130d](https://github.com/DSI-HUG/dejajs-components/commit/bfb5130d33f5e617c1871811200e23bfe1741d7c))
* **Global:** Update yarn.lock ([42b64e23](https://github.com/DSI-HUG/dejajs-components/commit/42b64e239554fc821dc92ae3afe1999bd63bc744))
* **Fonts:** Update dejajs resources ([b4965147](https://github.com/DSI-HUG/dejajs-components/commit/b4965147da47b72467752f2a02916442bd2cd491))
* **Conf:** Add lint on start ([fafd50a7](https://github.com/DSI-HUG/dejajs-components/commit/fafd50a7b85a2cebb045d5b95f9539053a503d39))

#### 2.4.0 (2017-07-19)

##### BREAKING CHANGES

* **Fonts:** Remove fonts from the libraries ([1b4e8968](https://github.com/DSI-HUG/dejajs-components/commit/1b4e896816cb169ab7b42c03fb6a0c50b924be48))
* **DejaChips:** CloseEvent is now a custom event containing item and index instead index only. The index is now available in event.index


##### Documentation Changes

* **DatePicker:** Update doc ([090b47ff](https://github.com/DSI-HUG/dejajs-components/commit/090b47ffef9a151d2a269c197ecf0b890504ec5d))

##### New Features

* **DatePicker:** Add required attribute and mdError templating ([2482cc06](https://github.com/DSI-HUG/dejajs-components/commit/2482cc06cbc1e7e8d56b4e726a79e7c271d9264e))

##### Bug Fixes

* **DatePicker:**
  * add DejaChildValidatorDirective to datepicker input to make it work with reactive forms ([3afe12b1](https://github.com/DSI-HUG/dejajs-components/commit/3afe12b1d410ffd69116fad4cdd94f7971c6e9ed))
  * update icon font-size to 100% ([cfaa4e64](https://github.com/DSI-HUG/dejajs-components/commit/cfaa4e647c5ff990739c693d5a97bae45e66611b))
* **flexLayout:** Add flexLayout import where it's needed ([d2c69acc](https://github.com/DSI-HUG/dejajs-components/commit/d2c69acc96bec08aee1ced3d1d1b97ef1f850be9))

##### Other Changes

* **Global:** Update yarn.lock ([42b64e23](https://github.com/DSI-HUG/dejajs-components/commit/42b64e239554fc821dc92ae3afe1999bd63bc744))
* **Fonts:** Update dejajs resources ([b4965147](https://github.com/DSI-HUG/dejajs-components/commit/b4965147da47b72467752f2a02916442bd2cd491))

#### 2.3.5 (2017-07-17)

##### Bug Fixes

* **Global:** Update rxjs ([bbb55617](https://github.com/DSI-HUG/dejajs-components/commit/bbb556176605ce9a2218dbae01a80b9435dfb796))

#### 2.3.4 (2017-07-17)

##### Bug Fixes

* **DatePicker:** Fix reactive form implementation ([7b2a9185](https://github.com/DSI-HUG/dejajs-components/commit/7b2a9185a1cb6fdfeaf7fb158fb31943d5a5b216))
* **Demo:** add scrollbar to menu ([4bb32496](https://github.com/DSI-HUG/dejajs-components/commit/4bb32496b0ef7ba9cc9d3ab7af6f6ad4805f8c64))
* **Grid:** Add debounce to calcColumnsLayout ([00fa4c93](https://github.com/DSI-HUG/dejajs-components/commit/00fa4c93732cc068ccdfb35555f2b9cbb658ee9f))

##### Other Changes

* **Conf:** Add lint on start ([fafd50a7](https://github.com/DSI-HUG/dejajs-components/commit/fafd50a7b85a2cebb045d5b95f9539053a503d39))

#### 2.3.3 (2017-07-12)

##### New Features

* **CloningService:** Clone with prototype using ObjectMapper ([53c39054](https://github.com/DSI-HUG/dejajs-components/commit/53c39054871a7eaebdc03d2b2172a7ae1f2a722c))

##### Bug Fixes

* **Demo:** add scrollbar to menu ([4bb32496](https://github.com/DSI-HUG/dejajs-components/commit/4bb32496b0ef7ba9cc9d3ab7af6f6ad4805f8c64))
* **Grid:** Add debounce to calcColumnsLayout ([00fa4c93](https://github.com/DSI-HUG/dejajs-components/commit/00fa4c93732cc068ccdfb35555f2b9cbb658ee9f))
* **DemoApp:** Fix datepicker demo ([4d9716b7](https://github.com/DSI-HUG/dejajs-components/commit/4d9716b7f3772b31900c798b83444f061f5bc795))

##### Other Changes

* **Global:** Fix yarn.lock urls ([dbb9ea39](https://github.com/DSI-HUG/dejajs-components/commit/dbb9ea39e8c4f7b9f5fa9fb44c64b251d685ad60))
* **Changelog:** Add breaking changes support ([727ea323](https://github.com/DSI-HUG/dejajs-components/commit/727ea323ab1fb58884f644dcac988a637aa3ad45))

#### 2.3.2 (2017-07-06)

##### Build System / Dependencies

* **Dependencies:** Update dependencies in latest version ([ffca0f8a](https://github.com/DSI-HUG/dejajs-components/commit/ffca0f8a59c5a9d32a844114304be0733b40a2e4))

##### New Features

* **CloningService:** Clone with prototype using ObjectMapper ([53c39054](https://github.com/DSI-HUG/dejajs-components/commit/53c39054871a7eaebdc03d2b2172a7ae1f2a722c))
* **DatePicker:** Keyboard updates are now according to format ([8d8bff71](https://github.com/DSI-HUG/dejajs-components/commit/8d8bff712b06e8e81c4b6057c4aee1d8dd9e52a8))
* **ItemService:** show waiter from external parent component ([6587e1f6](https://github.com/DSI-HUG/dejajs-components/commit/6587e1f60e52d77e09f538881fc553cb55c8312f))
* **ItemList:** push css class name ([d5cde9b3](https://github.com/DSI-HUG/dejajs-components/commit/d5cde9b31a7329a8b6f0184e6944587eb6030044))

##### Bug Fixes

* **DemoApp:** Fix datepicker demo ([4d9716b7](https://github.com/DSI-HUG/dejajs-components/commit/4d9716b7f3772b31900c798b83444f061f5bc795))
* **ViewPortService:**
  * Last item scrolling fix(ViewPortService): EnsureParams at end if viewport is not complete ([21da57da](https://github.com/DSI-HUG/dejajs-components/commit/21da57dadeefc8a3c688fe85bc2dcf9f828a151b))
  * auto height calculation fix ([3b06a853](https://github.com/DSI-HUG/dejajs-components/commit/3b06a8538fd1973c6ebd1bee89259cad054539fa))
* **Select:**
  * Arrow overflowing ([dadfe221](https://github.com/DSI-HUG/dejajs-components/commit/dadfe221739464179aa55022f9332e140c1364db))
  * Arrow was not properly displayed in [multiselection][above] mode ([085a5939](https://github.com/DSI-HUG/dejajs-components/commit/085a5939e0c7c67d9056ca37c67bccde5ab185ad))
  * Waiter z-index fix ([b3089bcf](https://github.com/DSI-HUG/dejajs-components/commit/b3089bcf11fc5002ecab99325d1f9f196b6ea703))
* **Diacritics:**
  * Fix locale dependencies ([3cee17f7](https://github.com/DSI-HUG/dejajs-components/commit/3cee17f793e9c3e38b36f6de2ec8f1e5c4f3372d))
  * Fix locale dependencies ([9fcd1608](https://github.com/DSI-HUG/dejajs-components/commit/9fcd16085c65ec44aad64f62cdb124d269ca62f4))

##### Other Changes

* **Global:** Fix yarn.lock urls ([dbb9ea39](https://github.com/DSI-HUG/dejajs-components/commit/dbb9ea39e8c4f7b9f5fa9fb44c64b251d685ad60))
* **Changelog:** Add breaking changes support ([727ea323](https://github.com/DSI-HUG/dejajs-components/commit/727ea323ab1fb58884f644dcac988a637aa3ad45))

##### Refactors

* **DatePicker:** Cursor based keyboard update ([afdcdd10](https://github.com/DSI-HUG/dejajs-components/commit/afdcdd10f92543c00d9d959fbae65092a19fe2d0))

#### 2.3.1 (2017-07-05)

##### BREAKING CHANGES

* **DejaTreeList:** Treelist border #124 fix(DejaGrid): Grid border ([39ee8dcd](https://github.com/DSI-HUG/dejajs-components/commit/39ee8dcd5389e8a953701d6d0998b41341ba7d15))
* **MonacoEditor:** Clean code & comment ([c8c2188e](https://github.com/DSI-HUG/dejajs-components/commit/c8c2188e2a8c3c4daa0377a156e5be83dad8af1a))

##### Build System / Dependencies

* **Dependencies:**
  * Update dependencies in latest version ([ffca0f8a](https://github.com/DSI-HUG/dejajs-components/commit/ffca0f8a59c5a9d32a844114304be0733b40a2e4))
  * Update dependencies in latest version ([c06b7424](https://github.com/DSI-HUG/dejajs-components/commit/c06b7424c897be79f338838de446720f5be3dd30))

##### Continuous Integration

* **Dependencies:**
  * Update dependencies version ([8f103704](https://github.com/DSI-HUG/dejajs-components/commit/8f103704a1e4435ce3be55d092a559acc5eedf03))
  * Update dependencies version ([d540f225](https://github.com/DSI-HUG/dejajs-components/commit/d540f2254d94594731bec105518001630c2b950b))
* **Deploy:** Copy assets during the build prod ([8ebab52e](https://github.com/DSI-HUG/dejajs-components/commit/8ebab52ea9603d5cc091cc423b3911bd8be244a6))

##### Documentation Changes

* **TextMetrics:** comment ([97fd7ea0](https://github.com/DSI-HUG/dejajs-components/commit/97fd7ea057fb133b643335fc8240c7ead4795c72))
* **TooltipComponent:** comment ([b64eff25](https://github.com/DSI-HUG/dejajs-components/commit/b64eff251193030034bed82aafe6faa626f39fc1))
* **Pipe:** comment ([1e46f823](https://github.com/DSI-HUG/dejajs-components/commit/1e46f8239de003ea57d39e5c798e2cfe78631589))
* **DatePickerComponent:** comment ([94877ced](https://github.com/DSI-HUG/dejajs-components/commit/94877cedb78310cee6c6d09880d3c543e83d0ddb))
* **DialogComponent:** comment ([01f0ab5f](https://github.com/DSI-HUG/dejajs-components/commit/01f0ab5fd34e5d88b62214ed189b281b0e4b8426))
* **CodeViewer:** comment ([7d3aef1a](https://github.com/DSI-HUG/dejajs-components/commit/7d3aef1a9e8ded72ff160a5728a4ab314b58ae12))
* **CircularPicker:** comment ([de19260e](https://github.com/DSI-HUG/dejajs-components/commit/de19260e396e96d1fce926497fa696975d713a9a))
* **AccordionComponent:** comment ([8cf16670](https://github.com/DSI-HUG/dejajs-components/commit/8cf166705804335784ad669ff38942fa01affca9))
* **README:** Migrate to Yarn ([d8217895](https://github.com/DSI-HUG/dejajs-components/commit/d821789548387e771960c2bede03b19196b4c72a))
* **Splitter:** Add comments for documentation ([3853b1fd](https://github.com/DSI-HUG/dejajs-components/commit/3853b1fd993a7722086d9ef5ae3ff48d2a8c8e21))
* **Contributing:** Add quiet type in contrib doc ([7852633a](https://github.com/DSI-HUG/dejajs-components/commit/7852633a7812c1eeba2159f5be671c2ceaa43db9))

##### New Features

* **CloningService:** Clone with prototype using ObjectMapper ([53c39054](https://github.com/DSI-HUG/dejajs-components/commit/53c39054871a7eaebdc03d2b2172a7ae1f2a722c))
* **DatePicker:** Keyboard updates are now according to format ([8d8bff71](https://github.com/DSI-HUG/dejajs-components/commit/8d8bff712b06e8e81c4b6057c4aee1d8dd9e52a8))
* **ItemService:** show waiter from external parent component ([6587e1f6](https://github.com/DSI-HUG/dejajs-components/commit/6587e1f60e52d77e09f538881fc553cb55c8312f))
* **ItemList:** push css class name ([d5cde9b3](https://github.com/DSI-HUG/dejajs-components/commit/d5cde9b31a7329a8b6f0184e6944587eb6030044))
* **List:** toggleAll$ can have a collapsed parameter ([07190ba6](https://github.com/DSI-HUG/dejajs-components/commit/07190ba6309087fe3054dd09ffef5126e7098a48))
* **Global:**
  * Add warning if doctype is not set ([a993c543](https://github.com/DSI-HUG/dejajs-components/commit/a993c543b850d980e874ff0d60f978781df50dc4))
  * Move Polyfills and SendAction to src folder to avoid missing files when linked ([02ea544a](https://github.com/DSI-HUG/dejajs-components/commit/02ea544a33e2465db132ad79f7f0cbfae8532564))
* **DejaTreeList:** Selection by valueFiled as string is now possible ([f904991d](https://github.com/DSI-HUG/dejajs-components/commit/f904991d82e9a8984ecaeca6d064694f8de90717))
* **DateSelector:** #96 Add disabled property ([e4db8a18](https://github.com/DSI-HUG/dejajs-components/commit/e4db8a18185c4ee54b462403902885ce6dbade23))
* **DejaMenu:** Context menu if buttonAlignment is not specified ([901ee4b1](https://github.com/DSI-HUG/dejajs-components/commit/901ee4b12c2d2dcf230c36c683fd31ce22954a19))
* **DEMO:** Add documentation link ([c1f145dc](https://github.com/DSI-HUG/dejajs-components/commit/c1f145dc9b66d3816dff1cf6a10e0bd37f57fd36))
* **DejaGrid:** User grouping can be specified on the HTML ([5b56692c](https://github.com/DSI-HUG/dejajs-components/commit/5b56692c154a02a5eb90bc8c65487b233e6eb3cb))

##### Bug Fixes

* **DemoApp:** Fix datepicker demo ([4d9716b7](https://github.com/DSI-HUG/dejajs-components/commit/4d9716b7f3772b31900c798b83444f061f5bc795))
* **ViewPortService:**
  * Last item scrolling fix(ViewPortService): EnsureParams at end if viewport is not complete ([21da57da](https://github.com/DSI-HUG/dejajs-components/commit/21da57dadeefc8a3c688fe85bc2dcf9f828a151b))
  * auto height calculation fix ([3b06a853](https://github.com/DSI-HUG/dejajs-components/commit/3b06a8538fd1973c6ebd1bee89259cad054539fa))
* **Select:**
  * Arrow overflowing ([dadfe221](https://github.com/DSI-HUG/dejajs-components/commit/dadfe221739464179aa55022f9332e140c1364db))
  * Arrow was not properly displayed in [multiselection][above] mode ([085a5939](https://github.com/DSI-HUG/dejajs-components/commit/085a5939e0c7c67d9056ca37c67bccde5ab185ad))
  * Waiter z-index fix ([b3089bcf](https://github.com/DSI-HUG/dejajs-components/commit/b3089bcf11fc5002ecab99325d1f9f196b6ea703))
* **Diacritics:**
  * Fix locale dependencies ([3cee17f7](https://github.com/DSI-HUG/dejajs-components/commit/3cee17f793e9c3e38b36f6de2ec8f1e5c4f3372d))
  * Fix locale dependencies ([9fcd1608](https://github.com/DSI-HUG/dejajs-components/commit/9fcd16085c65ec44aad64f62cdb124d269ca62f4))
* **Dependencies:** Rollback cli version ([4dfd9cb6](https://github.com/DSI-HUG/dejajs-components/commit/4dfd9cb6afd256d8eb44a0dc4eb16bd77bace1b8))
* **Theme:** Remove customized color for input bar (not working also in invalid mode) ([ab2b56f3](https://github.com/DSI-HUG/dejajs-components/commit/ab2b56f3796bb47372018e5259c90fb53f079bbd))
* **Prism:** Bundle issue with Prism import ([014a1ee9](https://github.com/DSI-HUG/dejajs-components/commit/014a1ee9c4bef37e456ea2f0d798e6d87155a63e))
* **ItemListService:**
  * Broken DejaTreeList and DejaGrid search area. ([e79be1b5](https://github.com/DSI-HUG/dejajs-components/commit/e79be1b5de75fbcfc3646eaec687a6b7a76ed4d0))
  * Cache re-filtered on lazy loading ([3b0545bb](https://github.com/DSI-HUG/dejajs-components/commit/3b0545bbf3e4f73ea9636959106f8538a23499a4))
* **DejaSelect:** Parent items are not selectable with the mouse, even if the flag selectable is set to true ([6435809b](https://github.com/DSI-HUG/dejajs-components/commit/6435809b6dd8a25c0b8da14d000f47afc9089683))
* **Demo:**
  * displayed datetime are now in 24h format. ([615b90ec](https://github.com/DSI-HUG/dejajs-components/commit/615b90ecb91579fac25e6127806c687b41bb3652))
  * Fix imports in gris demo ([9eb2cc2c](https://github.com/DSI-HUG/dejajs-components/commit/9eb2cc2c0c38630a8eef7bff8dc49670a640727c))
* **CircularPicker:**
  * #128 Make disabled property work ([2b1da727](https://github.com/DSI-HUG/dejajs-components/commit/2b1da727583bd9e41bcfabcbd03697c06eeb679f))
  * Use _value inside updateCursor instead of value ([be4fda24](https://github.com/DSI-HUG/dejajs-components/commit/be4fda24ed5d6eb83929c149811f15b50a01a02c))
* **DatePicker:** #110 I think it's ok, I hope it will not have any side effect ([2ad1a2e7](https://github.com/DSI-HUG/dejajs-components/commit/2ad1a2e7eb0e54b682b6748723be37610b49a9d4))
* **DejaTreeList:** Parent row padding when no-children fix(DejaSelect): Parent row padding when no-children fix(DejaGrid): Parent row padding when no-children ([a7dc91f7](https://github.com/DSI-HUG/dejajs-components/commit/a7dc91f7f4edef9727d251d9081021eda3d0e5ad))
* **DejaSplitter:** Fix height of the gutter in horizontal mode ([92e1a4d3](https://github.com/DSI-HUG/dejajs-components/commit/92e1a4d339441cd425cb686b2bd6617fcf0f99a9))
* **DejaGrid:**
  * Laggy columns drag and drop ([3b163eae](https://github.com/DSI-HUG/dejajs-components/commit/3b163eaec8d8b47d14ab15d24a23f0a75fdd5d17))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([e96fa7ac](https://github.com/DSI-HUG/dejajs-components/commit/e96fa7ac3a8696acd08df467f30bf9aa5078fce4))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([528a0aaf](https://github.com/DSI-HUG/dejajs-components/commit/528a0aaffc9c346a49abebf9723c2ee2b18bd5cb))
  * Scroll return to 0 when refreshViewPort() was called ([74bbdb83](https://github.com/DSI-HUG/dejajs-components/commit/74bbdb83f7fc9dd2c08857d3733798c70d1e8d6f))
  * Scroll return to 0 when refreshViewPort() was called ([612da559](https://github.com/DSI-HUG/dejajs-components/commit/612da55920f892ca43c09296a8be1e40c73e2398))
* **DejaDroppable:** Event leak ([8d60c789](https://github.com/DSI-HUG/dejajs-components/commit/8d60c78943db7d07ef9b9425f931daf7ea909cc8))
* **Graphics:** Double import make /graphics/ classes undefined when imported by the index fix(DejaIFrame): Center screen on IE11 ([d57bf525](https://github.com/DSI-HUG/dejajs-components/commit/d57bf5255e708e4d818511fa1438b311e9be5b41))
* **GroupingService:** Grouping fail after the third level ([d5696ea3](https://github.com/DSI-HUG/dejajs-components/commit/d5696ea313970664c36df2d89a1297d2de61a384))
* **Docs:** Add required dependencie for linux doc build ([38ad6eba](https://github.com/DSI-HUG/dejajs-components/commit/38ad6ebaca84b994776d8c26672fcfa9d030e9e9))

##### Other Changes

* **Global:**
  * Fix yarn.lock urls ([dbb9ea39](https://github.com/DSI-HUG/dejajs-components/commit/dbb9ea39e8c4f7b9f5fa9fb44c64b251d685ad60))
  * Licence in all TS files ([c3f76e71](https://github.com/DSI-HUG/dejajs-components/commit/c3f76e71bfac7f138f6b1d1b1f00a2e2b71c181b))
* **Changelog:** Add breaking changes support ([727ea323](https://github.com/DSI-HUG/dejajs-components/commit/727ea323ab1fb58884f644dcac988a637aa3ad45))
* **dependencies:** use real registry ([a197b364](https://github.com/DSI-HUG/dejajs-components/commit/a197b364c734943c9263ce6c59eb64d3bc449a39))
* **dependancies:**
  * remove changelog, add generate-changelog ([cb2e1d9b](https://github.com/DSI-HUG/dejajs-components/commit/cb2e1d9b9a806ad3ae0ca5b54754a76c1528d53c))
  * add changelog ([55b7745f](https://github.com/DSI-HUG/dejajs-components/commit/55b7745fcd126da15fa064eb984863803c1d9b89))
* Laggy columns drag and drop ([7c9b3450](https://github.com/DSI-HUG/dejajs-components/commit/7c9b3450cecd9dcf5b0f27474b9ecf54947517f5))
* **Polyfills:** Fix polyfills location ([09b24614](https://github.com/DSI-HUG/dejajs-components/commit/09b246141958f0955d24e054ae2bbfbbd9d9aeb0))
* **Travis:**
  * Fix node version to avoid dependencies error ([90f177d6](https://github.com/DSI-HUG/dejajs-components/commit/90f177d6b2d5a085be0b0627721bc7276b999444))
  * Add licence check in global dependencies ([37a65080](https://github.com/DSI-HUG/dejajs-components/commit/37a650806143f18b91fef25f7e1c8a11c289d3e3))

##### Refactors

* **DatePicker:** Cursor based keyboard update ([afdcdd10](https://github.com/DSI-HUG/dejajs-components/commit/afdcdd10f92543c00d9d959fbae65092a19fe2d0))
* **DejaSelect:** Minimize clear-button & add arrow ([28362e85](https://github.com/DSI-HUG/dejajs-components/commit/28362e854922625df3937fd9b69c7edb7e9943c2))
* **Loader:** #123 done ([949c487f](https://github.com/DSI-HUG/dejajs-components/commit/949c487f852938b3ff1527b6e4e765cc2ff6206c))

##### Code Style Changes

* **LINT:** Fix lint warning ([c2de666e](https://github.com/DSI-HUG/dejajs-components/commit/c2de666ec6ed98b849cb480f2e8a96eb099f0ef4))

### 2.3.0 (2017-06-30)

##### Build System / Dependencies

* **Dependencies:** Update dependencies in latest version ([ffca0f8a](https://github.com/DSI-HUG/dejajs-components/commit/ffca0f8a59c5a9d32a844114304be0733b40a2e4))

##### New Features

* **DatePicker:** Keyboard updates are now according to format ([8d8bff71](https://github.com/DSI-HUG/dejajs-components/commit/8d8bff712b06e8e81c4b6057c4aee1d8dd9e52a8))
* **ItemService:** show waiter from external parent component ([6587e1f6](https://github.com/DSI-HUG/dejajs-components/commit/6587e1f60e52d77e09f538881fc553cb55c8312f))
* **ItemList:** push css class name ([d5cde9b3](https://github.com/DSI-HUG/dejajs-components/commit/d5cde9b31a7329a8b6f0184e6944587eb6030044))
* **List:** toggleAll$ can have a collapsed parameter ([07190ba6](https://github.com/DSI-HUG/dejajs-components/commit/07190ba6309087fe3054dd09ffef5126e7098a48))
* **Global:** Add warning if doctype is not set ([a993c543](https://github.com/DSI-HUG/dejajs-components/commit/a993c543b850d980e874ff0d60f978781df50dc4))

##### Bug Fixes

* **ViewPortService:**
  * Last item scrolling fix(ViewPortService): EnsureParams at end if viewport is not complete ([21da57da](https://github.com/DSI-HUG/dejajs-components/commit/21da57dadeefc8a3c688fe85bc2dcf9f828a151b))
  * auto height calculation fix ([3b06a853](https://github.com/DSI-HUG/dejajs-components/commit/3b06a8538fd1973c6ebd1bee89259cad054539fa))
* **Select:**
  * Arrow overflowing ([dadfe221](https://github.com/DSI-HUG/dejajs-components/commit/dadfe221739464179aa55022f9332e140c1364db))
  * Arrow was not properly displayed in [multiselection][above] mode ([085a5939](https://github.com/DSI-HUG/dejajs-components/commit/085a5939e0c7c67d9056ca37c67bccde5ab185ad))
  * Waiter z-index fix ([b3089bcf](https://github.com/DSI-HUG/dejajs-components/commit/b3089bcf11fc5002ecab99325d1f9f196b6ea703))
* **Diacritics:**
  * Fix locale dependencies ([3cee17f7](https://github.com/DSI-HUG/dejajs-components/commit/3cee17f793e9c3e38b36f6de2ec8f1e5c4f3372d))
  * Fix locale dependencies ([9fcd1608](https://github.com/DSI-HUG/dejajs-components/commit/9fcd16085c65ec44aad64f62cdb124d269ca62f4))
* **Dependencies:** Rollback cli version ([4dfd9cb6](https://github.com/DSI-HUG/dejajs-components/commit/4dfd9cb6afd256d8eb44a0dc4eb16bd77bace1b8))
* **Theme:** Remove customized color for input bar (not working also in invalid mode) ([ab2b56f3](https://github.com/DSI-HUG/dejajs-components/commit/ab2b56f3796bb47372018e5259c90fb53f079bbd))

##### Refactors

* **DatePicker:** Cursor based keyboard update ([afdcdd10](https://github.com/DSI-HUG/dejajs-components/commit/afdcdd10f92543c00d9d959fbae65092a19fe2d0))
* **DejaSelect:** Minimize clear-button & add arrow ([28362e85](https://github.com/DSI-HUG/dejajs-components/commit/28362e854922625df3937fd9b69c7edb7e9943c2))

#### 2.2.2 (2017-6-26)

##### Documentation Changes

* **TextMetrics:** comment ([97fd7ea0](https://github.com/DSI-HUG/dejajs-components/commit/97fd7ea057fb133b643335fc8240c7ead4795c72))
* **TooltipComponent:** comment ([b64eff25](https://github.com/DSI-HUG/dejajs-components/commit/b64eff251193030034bed82aafe6faa626f39fc1))
* **Pipe:** comment ([1e46f823](https://github.com/DSI-HUG/dejajs-components/commit/1e46f8239de003ea57d39e5c798e2cfe78631589))
* **DatePickerComponent:** comment ([94877ced](https://github.com/DSI-HUG/dejajs-components/commit/94877cedb78310cee6c6d09880d3c543e83d0ddb))
* **DialogComponent:** comment ([01f0ab5f](https://github.com/DSI-HUG/dejajs-components/commit/01f0ab5fd34e5d88b62214ed189b281b0e4b8426))
* **CodeViewer:** comment ([7d3aef1a](https://github.com/DSI-HUG/dejajs-components/commit/7d3aef1a9e8ded72ff160a5728a4ab314b58ae12))
* **CircularPicker:** comment ([de19260e](https://github.com/DSI-HUG/dejajs-components/commit/de19260e396e96d1fce926497fa696975d713a9a))
* **AccordionComponent:** comment ([8cf16670](https://github.com/DSI-HUG/dejajs-components/commit/8cf166705804335784ad669ff38942fa01affca9))
* **README:** Migrate to Yarn ([d8217895](https://github.com/DSI-HUG/dejajs-components/commit/d821789548387e771960c2bede03b19196b4c72a))
* **Splitter:** Add comments for documentation ([3853b1fd](https://github.com/DSI-HUG/dejajs-components/commit/3853b1fd993a7722086d9ef5ae3ff48d2a8c8e21))
* **Contributing:** Add quiet type in contrib doc ([7852633a](https://github.com/DSI-HUG/dejajs-components/commit/7852633a7812c1eeba2159f5be671c2ceaa43db9))

##### New Features

* **List:** toggleAll$ can have a collapsed parameter ([07190ba6](https://github.com/DSI-HUG/dejajs-components/commit/07190ba6309087fe3054dd09ffef5126e7098a48))
* **Global:**
  * Add warning if doctype is not set ([a993c543](https://github.com/DSI-HUG/dejajs-components/commit/a993c543b850d980e874ff0d60f978781df50dc4))
  * Move Polyfills and SendAction to src folder to avoid missing files when linked ([02ea544a](https://github.com/DSI-HUG/dejajs-components/commit/02ea544a33e2465db132ad79f7f0cbfae8532564))
* **DejaTreeList:** Selection by valueFiled as string is now possible ([f904991d](https://github.com/DSI-HUG/dejajs-components/commit/f904991d82e9a8984ecaeca6d064694f8de90717))
* **DateSelector:** #96 Add disabled property ([e4db8a18](https://github.com/DSI-HUG/dejajs-components/commit/e4db8a18185c4ee54b462403902885ce6dbade23))
* **DejaMenu:** Context menu if buttonAlignment is not specified ([901ee4b1](https://github.com/DSI-HUG/dejajs-components/commit/901ee4b12c2d2dcf230c36c683fd31ce22954a19))
* **DEMO:** Add documentation link ([c1f145dc](https://github.com/DSI-HUG/dejajs-components/commit/c1f145dc9b66d3816dff1cf6a10e0bd37f57fd36))
* **DejaGrid:** User grouping can be specified on the HTML ([5b56692c](https://github.com/DSI-HUG/dejajs-components/commit/5b56692c154a02a5eb90bc8c65487b233e6eb3cb))

##### Bug Fixes

* **Dependencies:** Rollback cli version ([4dfd9cb6](https://github.com/DSI-HUG/dejajs-components/commit/4dfd9cb6afd256d8eb44a0dc4eb16bd77bace1b8))
* **Theme:** Remove customized color for input bar (not working also in invalid mode) ([ab2b56f3](https://github.com/DSI-HUG/dejajs-components/commit/ab2b56f3796bb47372018e5259c90fb53f079bbd))
* **Prism:** Bundle issue with Prism import ([014a1ee9](https://github.com/DSI-HUG/dejajs-components/commit/014a1ee9c4bef37e456ea2f0d798e6d87155a63e))
* **ItemListService:**
  * Broken DejaTreeList and DejaGrid search area. ([e79be1b5](https://github.com/DSI-HUG/dejajs-components/commit/e79be1b5de75fbcfc3646eaec687a6b7a76ed4d0))
  * Cache re-filtered on lazy loading ([3b0545bb](https://github.com/DSI-HUG/dejajs-components/commit/3b0545bbf3e4f73ea9636959106f8538a23499a4))
* **DejaSelect:** Parent items are not selectable with the mouse, even if the flag selectable is set to true ([6435809b](https://github.com/DSI-HUG/dejajs-components/commit/6435809b6dd8a25c0b8da14d000f47afc9089683))
* **Demo:**
  * displayed datetime are now in 24h format. ([615b90ec](https://github.com/DSI-HUG/dejajs-components/commit/615b90ecb91579fac25e6127806c687b41bb3652))
  * Fix imports in gris demo ([9eb2cc2c](https://github.com/DSI-HUG/dejajs-components/commit/9eb2cc2c0c38630a8eef7bff8dc49670a640727c))
* **CircularPicker:**
  * #128 Make disabled property work ([2b1da727](https://github.com/DSI-HUG/dejajs-components/commit/2b1da727583bd9e41bcfabcbd03697c06eeb679f))
  * Use _value inside updateCursor instead of value ([be4fda24](https://github.com/DSI-HUG/dejajs-components/commit/be4fda24ed5d6eb83929c149811f15b50a01a02c))
* **DatePicker:** #110 I think it's ok, I hope it will not have any side effect ([2ad1a2e7](https://github.com/DSI-HUG/dejajs-components/commit/2ad1a2e7eb0e54b682b6748723be37610b49a9d4))
* **DejaTreeList:**
  * Parent row padding when no-children fix(DejaSelect): Parent row padding when no-children fix(DejaGrid): Parent row padding when no-children ([a7dc91f7](https://github.com/DSI-HUG/dejajs-components/commit/a7dc91f7f4edef9727d251d9081021eda3d0e5ad))
  * Treelist border #124 fix(DejaGrid): Grid border ([39ee8dcd](https://github.com/DSI-HUG/dejajs-components/commit/39ee8dcd5389e8a953701d6d0998b41341ba7d15))
* **DejaSplitter:** Fix height of the gutter in horizontal mode ([92e1a4d3](https://github.com/DSI-HUG/dejajs-components/commit/92e1a4d339441cd425cb686b2bd6617fcf0f99a9))
* **DejaGrid:**
  * Laggy columns drag and drop ([3b163eae](https://github.com/DSI-HUG/dejajs-components/commit/3b163eaec8d8b47d14ab15d24a23f0a75fdd5d17))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([e96fa7ac](https://github.com/DSI-HUG/dejajs-components/commit/e96fa7ac3a8696acd08df467f30bf9aa5078fce4))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([528a0aaf](https://github.com/DSI-HUG/dejajs-components/commit/528a0aaffc9c346a49abebf9723c2ee2b18bd5cb))
  * Scroll return to 0 when refreshViewPort() was called ([74bbdb83](https://github.com/DSI-HUG/dejajs-components/commit/74bbdb83f7fc9dd2c08857d3733798c70d1e8d6f))
  * Scroll return to 0 when refreshViewPort() was called ([612da559](https://github.com/DSI-HUG/dejajs-components/commit/612da55920f892ca43c09296a8be1e40c73e2398))
* **DejaDroppable:** Event leak ([8d60c789](https://github.com/DSI-HUG/dejajs-components/commit/8d60c78943db7d07ef9b9425f931daf7ea909cc8))
* **Graphics:** Double import make /graphics/ classes undefined when imported by the index fix(DejaIFrame): Center screen on IE11 ([d57bf525](https://github.com/DSI-HUG/dejajs-components/commit/d57bf5255e708e4d818511fa1438b311e9be5b41))
* **GroupingService:** Grouping fail after the third level ([d5696ea3](https://github.com/DSI-HUG/dejajs-components/commit/d5696ea313970664c36df2d89a1297d2de61a384))
* **Docs:** Add required dependencie for linux doc build ([38ad6eba](https://github.com/DSI-HUG/dejajs-components/commit/38ad6ebaca84b994776d8c26672fcfa9d030e9e9))

##### Other Changes

* **Dependencies:**
  * Update dependencies in latest version ([c06b7424](https://github.com/DSI-HUG/dejajs-components/commit/c06b7424c897be79f338838de446720f5be3dd30))
  * Update dependencies version ([8f103704](https://github.com/DSI-HUG/dejajs-components/commit/8f103704a1e4435ce3be55d092a559acc5eedf03))
  * Update dependencies version ([d540f225](https://github.com/DSI-HUG/dejajs-components/commit/d540f2254d94594731bec105518001630c2b950b))
* **dependencies:** use real registry ([a197b364](https://github.com/DSI-HUG/dejajs-components/commit/a197b364c734943c9263ce6c59eb64d3bc449a39))
* **dependancies:**
  * remove changelog, add generate-changelog ([cb2e1d9b](https://github.com/DSI-HUG/dejajs-components/commit/cb2e1d9b9a806ad3ae0ca5b54754a76c1528d53c))
  * add changelog ([55b7745f](https://github.com/DSI-HUG/dejajs-components/commit/55b7745fcd126da15fa064eb984863803c1d9b89))
* **undefined:** Laggy columns drag and drop ([7c9b3450](https://github.com/DSI-HUG/dejajs-components/commit/7c9b3450cecd9dcf5b0f27474b9ecf54947517f5))
* **Polyfills:** Fix polyfills location ([09b24614](https://github.com/DSI-HUG/dejajs-components/commit/09b246141958f0955d24e054ae2bbfbbd9d9aeb0))
* **Global:** Licence in all TS files ([c3f76e71](https://github.com/DSI-HUG/dejajs-components/commit/c3f76e71bfac7f138f6b1d1b1f00a2e2b71c181b))
* **Travis:**
  * Fix node version to avoid dependencies error ([90f177d6](https://github.com/DSI-HUG/dejajs-components/commit/90f177d6b2d5a085be0b0627721bc7276b999444))
  * Add licence check in global dependencies ([37a65080](https://github.com/DSI-HUG/dejajs-components/commit/37a650806143f18b91fef25f7e1c8a11c289d3e3))
* **Deploy:** Copy assets during the build prod ([8ebab52e](https://github.com/DSI-HUG/dejajs-components/commit/8ebab52ea9603d5cc091cc423b3911bd8be244a6))

##### Refactors

* **DejaSelect:** Minimize clear-button & add arrow ([28362e85](https://github.com/DSI-HUG/dejajs-components/commit/28362e854922625df3937fd9b69c7edb7e9943c2))
* **Loader:** #123 done ([949c487f](https://github.com/DSI-HUG/dejajs-components/commit/949c487f852938b3ff1527b6e4e765cc2ff6206c))
* **MonacoEditor:** Clean code & comment ([c8c2188e](https://github.com/DSI-HUG/dejajs-components/commit/c8c2188e2a8c3c4daa0377a156e5be83dad8af1a))

##### Code Style Changes

* **LINT:** Fix lint warning ([c2de666e](https://github.com/DSI-HUG/dejajs-components/commit/c2de666ec6ed98b849cb480f2e8a96eb099f0ef4))

#### 2.2.1 (2017-6-14)

##### Bug Fixes

* **Prism:** Bundle issue with Prism import ([014a1ee9](https://github.com/DSI-HUG/dejajs-components/commit/014a1ee9c4bef37e456ea2f0d798e6d87155a63e))

### 2.2.0 (2017-6-14)

##### Documentation Changes

* **TextMetrics:** comment ([97fd7ea0](https://github.com/DSI-HUG/dejajs-components/commit/97fd7ea057fb133b643335fc8240c7ead4795c72))
* **TooltipComponent:** comment ([b64eff25](https://github.com/DSI-HUG/dejajs-components/commit/b64eff251193030034bed82aafe6faa626f39fc1))
* **Pipe:** comment ([1e46f823](https://github.com/DSI-HUG/dejajs-components/commit/1e46f8239de003ea57d39e5c798e2cfe78631589))
* **DatePickerComponent:** comment ([94877ced](https://github.com/DSI-HUG/dejajs-components/commit/94877cedb78310cee6c6d09880d3c543e83d0ddb))
* **DialogComponent:** comment ([01f0ab5f](https://github.com/DSI-HUG/dejajs-components/commit/01f0ab5fd34e5d88b62214ed189b281b0e4b8426))
* **CodeViewer:** comment ([7d3aef1a](https://github.com/DSI-HUG/dejajs-components/commit/7d3aef1a9e8ded72ff160a5728a4ab314b58ae12))
* **CircularPicker:** comment ([de19260e](https://github.com/DSI-HUG/dejajs-components/commit/de19260e396e96d1fce926497fa696975d713a9a))
* **AccordionComponent:** comment ([8cf16670](https://github.com/DSI-HUG/dejajs-components/commit/8cf166705804335784ad669ff38942fa01affca9))
* **README:** Migrate to Yarn ([d8217895](https://github.com/DSI-HUG/dejajs-components/commit/d821789548387e771960c2bede03b19196b4c72a))
* **Splitter:** Add comments for documentation ([3853b1fd](https://github.com/DSI-HUG/dejajs-components/commit/3853b1fd993a7722086d9ef5ae3ff48d2a8c8e21))
* **Contributing:** Add quiet type in contrib doc ([7852633a](https://github.com/DSI-HUG/dejajs-components/commit/7852633a7812c1eeba2159f5be671c2ceaa43db9))

##### New Features

* **DejaTreeList:** Selection by valueFiled as string is now possible ([f904991d](https://github.com/DSI-HUG/dejajs-components/commit/f904991d82e9a8984ecaeca6d064694f8de90717))
* **DateSelector:** #96 Add disabled property ([e4db8a18](https://github.com/DSI-HUG/dejajs-components/commit/e4db8a18185c4ee54b462403902885ce6dbade23))
* **DejaMenu:** Context menu if buttonAlignment is not specified ([901ee4b1](https://github.com/DSI-HUG/dejajs-components/commit/901ee4b12c2d2dcf230c36c683fd31ce22954a19))
* **Global:** Move Polyfills and SendAction to src folder to avoid missing files when linked ([02ea544a](https://github.com/DSI-HUG/dejajs-components/commit/02ea544a33e2465db132ad79f7f0cbfae8532564))
* **DEMO:** Add documentation link ([c1f145dc](https://github.com/DSI-HUG/dejajs-components/commit/c1f145dc9b66d3816dff1cf6a10e0bd37f57fd36))
* **DejaGrid:** User grouping can be specified on the HTML ([5b56692c](https://github.com/DSI-HUG/dejajs-components/commit/5b56692c154a02a5eb90bc8c65487b233e6eb3cb))

##### Bug Fixes

* **ItemListService:**
  * Broken DejaTreeList and DejaGrid search area. ([e79be1b5](https://github.com/DSI-HUG/dejajs-components/commit/e79be1b5de75fbcfc3646eaec687a6b7a76ed4d0))
  * Cache re-filtered on lazy loading ([3b0545bb](https://github.com/DSI-HUG/dejajs-components/commit/3b0545bbf3e4f73ea9636959106f8538a23499a4))
* **DejaSelect:** Parent items are not selectable with the mouse, even if the flag selectable is set to true ([6435809b](https://github.com/DSI-HUG/dejajs-components/commit/6435809b6dd8a25c0b8da14d000f47afc9089683))
* **Demo:**
  * displayed datetime are now in 24h format. ([615b90ec](https://github.com/DSI-HUG/dejajs-components/commit/615b90ecb91579fac25e6127806c687b41bb3652))
  * Fix imports in gris demo ([9eb2cc2c](https://github.com/DSI-HUG/dejajs-components/commit/9eb2cc2c0c38630a8eef7bff8dc49670a640727c))
* **CircularPicker:**
  * #128 Make disabled property work ([2b1da727](https://github.com/DSI-HUG/dejajs-components/commit/2b1da727583bd9e41bcfabcbd03697c06eeb679f))
  * Use _value inside updateCursor instead of value ([be4fda24](https://github.com/DSI-HUG/dejajs-components/commit/be4fda24ed5d6eb83929c149811f15b50a01a02c))
* **DatePicker:** #110 I think it's ok, I hope it will not have any side effect ([2ad1a2e7](https://github.com/DSI-HUG/dejajs-components/commit/2ad1a2e7eb0e54b682b6748723be37610b49a9d4))
* **DejaTreeList:**
  * Parent row padding when no-children fix(DejaSelect): Parent row padding when no-children fix(DejaGrid): Parent row padding when no-children ([a7dc91f7](https://github.com/DSI-HUG/dejajs-components/commit/a7dc91f7f4edef9727d251d9081021eda3d0e5ad))
  * Treelist border #124 fix(DejaGrid): Grid border ([39ee8dcd](https://github.com/DSI-HUG/dejajs-components/commit/39ee8dcd5389e8a953701d6d0998b41341ba7d15))
* **DejaSplitter:** Fix height of the gutter in horizontal mode ([92e1a4d3](https://github.com/DSI-HUG/dejajs-components/commit/92e1a4d339441cd425cb686b2bd6617fcf0f99a9))
* **DejaGrid:**
  * Laggy columns drag and drop ([3b163eae](https://github.com/DSI-HUG/dejajs-components/commit/3b163eaec8d8b47d14ab15d24a23f0a75fdd5d17))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([e96fa7ac](https://github.com/DSI-HUG/dejajs-components/commit/e96fa7ac3a8696acd08df467f30bf9aa5078fce4))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([528a0aaf](https://github.com/DSI-HUG/dejajs-components/commit/528a0aaffc9c346a49abebf9723c2ee2b18bd5cb))
  * Scroll return to 0 when refreshViewPort() was called ([74bbdb83](https://github.com/DSI-HUG/dejajs-components/commit/74bbdb83f7fc9dd2c08857d3733798c70d1e8d6f))
  * Scroll return to 0 when refreshViewPort() was called ([612da559](https://github.com/DSI-HUG/dejajs-components/commit/612da55920f892ca43c09296a8be1e40c73e2398))
* **DejaDroppable:** Event leak ([8d60c789](https://github.com/DSI-HUG/dejajs-components/commit/8d60c78943db7d07ef9b9425f931daf7ea909cc8))
* **Graphics:** Double import make /graphics/ classes undefined when imported by the index fix(DejaIFrame): Center screen on IE11 ([d57bf525](https://github.com/DSI-HUG/dejajs-components/commit/d57bf5255e708e4d818511fa1438b311e9be5b41))
* **GroupingService:** Grouping fail after the third level ([d5696ea3](https://github.com/DSI-HUG/dejajs-components/commit/d5696ea313970664c36df2d89a1297d2de61a384))
* **Docs:** Add required dependencie for linux doc build ([38ad6eba](https://github.com/DSI-HUG/dejajs-components/commit/38ad6ebaca84b994776d8c26672fcfa9d030e9e9))

##### Other Changes

* **Dependencies:**
  * Update dependencies in latest version ([c06b7424](https://github.com/DSI-HUG/dejajs-components/commit/c06b7424c897be79f338838de446720f5be3dd30))
  * Update dependencies version ([8f103704](https://github.com/DSI-HUG/dejajs-components/commit/8f103704a1e4435ce3be55d092a559acc5eedf03))
  * Update dependencies version ([d540f225](https://github.com/DSI-HUG/dejajs-components/commit/d540f2254d94594731bec105518001630c2b950b))
* **dependencies:** use real registry ([a197b364](https://github.com/DSI-HUG/dejajs-components/commit/a197b364c734943c9263ce6c59eb64d3bc449a39))
* **dependancies:**
  * remove changelog, add generate-changelog ([cb2e1d9b](https://github.com/DSI-HUG/dejajs-components/commit/cb2e1d9b9a806ad3ae0ca5b54754a76c1528d53c))
  * add changelog ([55b7745f](https://github.com/DSI-HUG/dejajs-components/commit/55b7745fcd126da15fa064eb984863803c1d9b89))
* Laggy columns drag and drop ([7c9b3450](https://github.com/DSI-HUG/dejajs-components/commit/7c9b3450cecd9dcf5b0f27474b9ecf54947517f5))
* **Polyfills:** Fix polyfills location ([09b24614](https://github.com/DSI-HUG/dejajs-components/commit/09b246141958f0955d24e054ae2bbfbbd9d9aeb0))
* **Global:** Licence in all TS files ([c3f76e71](https://github.com/DSI-HUG/dejajs-components/commit/c3f76e71bfac7f138f6b1d1b1f00a2e2b71c181b))
* **Travis:**
  * Fix node version to avoid dependencies error ([90f177d6](https://github.com/DSI-HUG/dejajs-components/commit/90f177d6b2d5a085be0b0627721bc7276b999444))
  * Add licence check in global dependencies ([37a65080](https://github.com/DSI-HUG/dejajs-components/commit/37a650806143f18b91fef25f7e1c8a11c289d3e3))
* **Deploy:** Copy assets during the build prod ([8ebab52e](https://github.com/DSI-HUG/dejajs-components/commit/8ebab52ea9603d5cc091cc423b3911bd8be244a6))

##### Refactors

* **Loader:** #123 done ([949c487f](https://github.com/DSI-HUG/dejajs-components/commit/949c487f852938b3ff1527b6e4e765cc2ff6206c))
* **MonacoEditor:** Clean code & comment ([c8c2188e](https://github.com/DSI-HUG/dejajs-components/commit/c8c2188e2a8c3c4daa0377a156e5be83dad8af1a))

##### Code Style Changes

* **LINT:** Fix lint warning ([c2de666e](https://github.com/DSI-HUG/dejajs-components/commit/c2de666ec6ed98b849cb480f2e8a96eb099f0ef4))

#### 2.1.1 (2017-6-12)

##### New Features

* **DejaTreeList:** Selection by valueFiled as string is now possible ([f904991d](https://github.com/DSI-HUG/dejajs-components/commit/f904991d82e9a8984ecaeca6d064694f8de90717))
* **DateSelector:** #96 Add disabled property ([e4db8a18](https://github.com/DSI-HUG/dejajs-components/commit/e4db8a18185c4ee54b462403902885ce6dbade23))

##### Bug Fixes

* **CircularPicker:** #128 Make disabled property work ([2b1da727](https://github.com/DSI-HUG/dejajs-components/commit/2b1da727583bd9e41bcfabcbd03697c06eeb679f))
* **DatePicker:** #110 I think it's ok, I hope it will not have any side effect ([2ad1a2e7](https://github.com/DSI-HUG/dejajs-components/commit/2ad1a2e7eb0e54b682b6748723be37610b49a9d4))

##### Other Changes

* **dependencies:** use real registry ([a197b364](https://github.com/DSI-HUG/dejajs-components/commit/a197b364c734943c9263ce6c59eb64d3bc449a39))

##### Refactors

* **Loader:** #123 done ([949c487f](https://github.com/DSI-HUG/dejajs-components/commit/949c487f852938b3ff1527b6e4e765cc2ff6206c))

### 2.2.0 (2017-6-8)

### 2.1.0 (2017-6-8)

##### Documentation Changes

* **TextMetrics:** comment ([97fd7ea0](https://github.com/DSI-HUG/dejajs-components/commit/97fd7ea057fb133b643335fc8240c7ead4795c72))
* **TooltipComponent:** comment ([b64eff25](https://github.com/DSI-HUG/dejajs-components/commit/b64eff251193030034bed82aafe6faa626f39fc1))
* **Pipe:** comment ([1e46f823](https://github.com/DSI-HUG/dejajs-components/commit/1e46f8239de003ea57d39e5c798e2cfe78631589))
* **DatePickerComponent:** comment ([94877ced](https://github.com/DSI-HUG/dejajs-components/commit/94877cedb78310cee6c6d09880d3c543e83d0ddb))
* **DialogComponent:** comment ([01f0ab5f](https://github.com/DSI-HUG/dejajs-components/commit/01f0ab5fd34e5d88b62214ed189b281b0e4b8426))
* **CodeViewer:** comment ([7d3aef1a](https://github.com/DSI-HUG/dejajs-components/commit/7d3aef1a9e8ded72ff160a5728a4ab314b58ae12))
* **CircularPicker:** comment ([de19260e](https://github.com/DSI-HUG/dejajs-components/commit/de19260e396e96d1fce926497fa696975d713a9a))
* **AccordionComponent:** comment ([8cf16670](https://github.com/DSI-HUG/dejajs-components/commit/8cf166705804335784ad669ff38942fa01affca9))
* **README:** Migrate to Yarn ([d8217895](https://github.com/DSI-HUG/dejajs-components/commit/d821789548387e771960c2bede03b19196b4c72a))
* **Splitter:** Add comments for documentation ([3853b1fd](https://github.com/DSI-HUG/dejajs-components/commit/3853b1fd993a7722086d9ef5ae3ff48d2a8c8e21))
* **Contributing:** Add quiet type in contrib doc ([7852633a](https://github.com/DSI-HUG/dejajs-components/commit/7852633a7812c1eeba2159f5be671c2ceaa43db9))

##### New Features

* **DejaMenu:** Context menu if buttonAlignment is not specified ([901ee4b1](https://github.com/DSI-HUG/dejajs-components/commit/901ee4b12c2d2dcf230c36c683fd31ce22954a19))
* **Global:** Move Polyfills and SendAction to src folder to avoid missing files when linked ([02ea544a](https://github.com/DSI-HUG/dejajs-components/commit/02ea544a33e2465db132ad79f7f0cbfae8532564))
* **DEMO:** Add documentation link ([c1f145dc](https://github.com/DSI-HUG/dejajs-components/commit/c1f145dc9b66d3816dff1cf6a10e0bd37f57fd36))
* **DejaGrid:** User grouping can be specified on the HTML ([5b56692c](https://github.com/DSI-HUG/dejajs-components/commit/5b56692c154a02a5eb90bc8c65487b233e6eb3cb))

##### Bug Fixes

* **DejaTreeList:**
  * Parent row padding when no-children fix(DejaSelect): Parent row padding when no-children fix(DejaGrid): Parent row padding when no-children ([a7dc91f7](https://github.com/DSI-HUG/dejajs-components/commit/a7dc91f7f4edef9727d251d9081021eda3d0e5ad))
  * Treelist border #124 fix(DejaGrid): Grid border ([39ee8dcd](https://github.com/DSI-HUG/dejajs-components/commit/39ee8dcd5389e8a953701d6d0998b41341ba7d15))
* **ItemListService:** Cache re-filtered on lazy loading ([3b0545bb](https://github.com/DSI-HUG/dejajs-components/commit/3b0545bbf3e4f73ea9636959106f8538a23499a4))
* **DejaSplitter:** Fix height of the gutter in horizontal mode ([92e1a4d3](https://github.com/DSI-HUG/dejajs-components/commit/92e1a4d339441cd425cb686b2bd6617fcf0f99a9))
* **Demo:** Fix imports in gris demo ([9eb2cc2c](https://github.com/DSI-HUG/dejajs-components/commit/9eb2cc2c0c38630a8eef7bff8dc49670a640727c))
* **DejaGrid:**
  * Laggy columns drag and drop ([3b163eae](https://github.com/DSI-HUG/dejajs-components/commit/3b163eaec8d8b47d14ab15d24a23f0a75fdd5d17))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([e96fa7ac](https://github.com/DSI-HUG/dejajs-components/commit/e96fa7ac3a8696acd08df467f30bf9aa5078fce4))
  * Incorrect elected and hover row backcolor when the horizontal scroll was not at 0 ([528a0aaf](https://github.com/DSI-HUG/dejajs-components/commit/528a0aaffc9c346a49abebf9723c2ee2b18bd5cb))
  * Scroll return to 0 when refreshViewPort() was called ([74bbdb83](https://github.com/DSI-HUG/dejajs-components/commit/74bbdb83f7fc9dd2c08857d3733798c70d1e8d6f))
  * Scroll return to 0 when refreshViewPort() was called ([612da559](https://github.com/DSI-HUG/dejajs-components/commit/612da55920f892ca43c09296a8be1e40c73e2398))
* **DejaDroppable:** Event leak ([8d60c789](https://github.com/DSI-HUG/dejajs-components/commit/8d60c78943db7d07ef9b9425f931daf7ea909cc8))
* **Graphics:** Double import make /graphics/ classes undefined when imported by the index fix(DejaIFrame): Center screen on IE11 ([d57bf525](https://github.com/DSI-HUG/dejajs-components/commit/d57bf5255e708e4d818511fa1438b311e9be5b41))
* **CircularPicker:** Use _value inside updateCursor instead of value ([be4fda24](https://github.com/DSI-HUG/dejajs-components/commit/be4fda24ed5d6eb83929c149811f15b50a01a02c))
* **GroupingService:** Grouping fail after the third level ([d5696ea3](https://github.com/DSI-HUG/dejajs-components/commit/d5696ea313970664c36df2d89a1297d2de61a384))
* **Docs:** Add required dependencie for linux doc build ([38ad6eba](https://github.com/DSI-HUG/dejajs-components/commit/38ad6ebaca84b994776d8c26672fcfa9d030e9e9))

##### Other Changes

* **dependancies:**
  * remove changelog, add generate-changelog ([cb2e1d9b](https://github.com/DSI-HUG/dejajs-components/commit/cb2e1d9b9a806ad3ae0ca5b54754a76c1528d53c))
  * add changelog ([55b7745f](https://github.com/DSI-HUG/dejajs-components/commit/55b7745fcd126da15fa064eb984863803c1d9b89))
* **Dependencies:**
  * Update dependencies version ([8f103704](https://github.com/DSI-HUG/dejajs-components/commit/8f103704a1e4435ce3be55d092a559acc5eedf03))
  * Update dependencies version ([d540f225](https://github.com/DSI-HUG/dejajs-components/commit/d540f2254d94594731bec105518001630c2b950b))
* **undefined:** Laggy columns drag and drop ([7c9b3450](https://github.com/DSI-HUG/dejajs-components/commit/7c9b3450cecd9dcf5b0f27474b9ecf54947517f5))
* **Polyfills:** Fix polyfills location ([09b24614](https://github.com/DSI-HUG/dejajs-components/commit/09b246141958f0955d24e054ae2bbfbbd9d9aeb0))
* **Global:** Licence in all TS files ([c3f76e71](https://github.com/DSI-HUG/dejajs-components/commit/c3f76e71bfac7f138f6b1d1b1f00a2e2b71c181b))
* **Travis:**
  * Fix node version to avoid dependencies error ([90f177d6](https://github.com/DSI-HUG/dejajs-components/commit/90f177d6b2d5a085be0b0627721bc7276b999444))
  * Add licence check in global dependencies ([37a65080](https://github.com/DSI-HUG/dejajs-components/commit/37a650806143f18b91fef25f7e1c8a11c289d3e3))
* **Deploy:** Copy assets during the build prod ([8ebab52e](https://github.com/DSI-HUG/dejajs-components/commit/8ebab52ea9603d5cc091cc423b3911bd8be244a6))

##### Refactors

* **MonacoEditor:** Clean code & comment ([c8c2188e](https://github.com/DSI-HUG/dejajs-components/commit/c8c2188e2a8c3c4daa0377a156e5be83dad8af1a))

##### Code Style Changes

* **LINT:** Fix lint warning ([c2de666e](https://github.com/DSI-HUG/dejajs-components/commit/c2de666ec6ed98b849cb480f2e8a96eb099f0ef4))

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
* **DejaAutosizeTextAreaDirective:** The directive deja-autositze is now placed on the textarea element inside an mat-input-container. ngModel must be also declared on the textarea element.
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
