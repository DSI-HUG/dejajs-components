(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tree-list-tree-list-demo-module"],{

/***/ "./src/app/tree-list/tree-list-demo.html":
/*!***********************************************!*\
  !*** ./src/app/tree-list/tree-list-demo.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group [selectedIndex]=\"tabIndex\" (selectedTabChange)=\"tabIndex = $event.index\">\n\t<!--<mat-tab label=\"OVERVIEW\">-->\n\t<!--<mat-card class=\"demo-card demo-basic\">-->\n\t<!--TODO-->\n\t<!--</mat-card>-->\n\t<!--</mat-tab>-->\n\t<mat-tab label=\"API REFERENCE\"></mat-tab>\n\t<mat-tab label=\"SIMPLE EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"ADVANCED EXAMPLES\"></mat-tab>\n\t<mat-tab label=\"TEMPLATING\"></mat-tab>\n\t<mat-tab label=\"PRE-SELECTIONS\"></mat-tab>\n\t<mat-tab label=\"PRE-EVENTS AND ON_DEMAND\"></mat-tab>\n\t<mat-tab label=\"PERFORMANCES\"></mat-tab>\n</mat-tab-group>\n\n<deja-dialog *ngIf=\"dialogVisible\">\n\t<deja-message-box type=\"primary\" title=\"Confirm\">\n\t\tPlease confirm your operation!\n\t\t<ng-template #actionsTemplate>\n\t\t\t<button id=\"cancelbtn\" mat-raised-button (click)=\"dialogResponse$.next('cancel')\">Cancel</button>\n\t\t\t<button id=\"okbtn\" mat-raised-button color=\"primary\" (click)=\"dialogResponse$.next('ok')\">Ok</button>\n\t\t</ng-template>\n\t</deja-message-box>\n</deja-dialog>\n\n<mat-card class=\"demo-card demo-basic\" *ngIf=\"tabIndex === 0\">\n\t<deja-markdown [url]=\"'https://raw.githubusercontent.com/DSI-HUG/dejajs-components/dev/projects/deja-js/component/tree-list/readme.md'\"></deja-markdown>\n</mat-card>\n\n<div *ngIf=\"tabIndex === 1\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Simple Usage</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Just passing an array of objects</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list fxFlex=\"0 0 400px\" [(ngModel)]=\"country\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<h4>Selected country model :</h4>\n\t\t\t\t\t<pre>{{country | json}}</pre>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Keyboard Navigation</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>deja-tree-list has some keyboard navigation feature</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list fxFlex=\"0 0 400px\" [(ngModel)]=\"country\" textField=\"naqme\" valueField=\"code\" [models]=\"countries\"></deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<ul fxFlex=\"0 0 50%\" fxFlexOffset=\"5%\" id=\"shortcut-list\">\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to select the previous item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to select the next item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to change the current item to the previous</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to change the current item to the next</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to change the current item to the previous</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to change the current item to the next</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageUp</span> to select the next page item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">PageDown</span> to select the previous page item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Home</span> to select the first item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">End</span> to select the last item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">Space</span> to collapse/expand a group header or to select/unselect the current item</li>\n\t\t\t\t\t<li>Press\n\t\t\t\t\t\t<span class=\"keyboard-key\">A</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">Z</span>\n\t\t\t\t\t\t<span class=\"keyboard-key\">0</span>..\n\t\t\t\t\t\t<span class=\"keyboard-key\">9</span> to select the next item started with the pressed key</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Treelist with options</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>These treelists has a list coming from html options</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<deja-tree-list fxFlex=\"0 0 45%\" class=\"demo-half-width optionstl\" [(ngModel)]=\"fruct\">\n\t\t\t\t\t<deja-item value=\"Apricots\" text=\"My preferred fruct is Apricots\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Banana\" text=\"My preferred fruct is Banana\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Cantaloupe\" text=\"My preferred fruct is Cantaloupe\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Cherries\" text=\"My preferred fruct is Cherries\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Coconut\" text=\"My preferred fruct is Coconut\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Cranberries\" text=\"My preferred fruct is Cranberries\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Durian\" text=\"My preferred fruct is Durian\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Grapes\" text=\"My preferred fruct is Grapes\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Lemon\" text=\"My preferred fruct is Lemon\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Mango\" text=\"My preferred fruct is Mango\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Pineapple\" text=\"My preferred fruct is Pineapple\"></deja-item>\n\t\t\t\t\t<deja-item value=\"Watermelon\" text=\"My preferred fruct is Watermelon\"></deja-item>\n\t\t\t\t</deja-tree-list>\n\t\t\t\t<deja-tree-list fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" class=\"demo-half-width optionstl\" multiSelect=\"true\" selectedModels=\"mango, apricots, coconut\">\n\t\t\t\t\t<deja-item value=\"apricots\" text=\"Apricots\"></deja-item>\n\t\t\t\t\t<deja-item value=\"banana\" text=\"Banana\"></deja-item>\n\t\t\t\t\t<deja-item value=\"cantaloupe\" text=\"Cantaloupe\"></deja-item>\n\t\t\t\t\t<deja-item value=\"cherries\" text=\"Cherries\"></deja-item>\n\t\t\t\t\t<deja-item value=\"coconut\" text=\"Coconut\"></deja-item>\n\t\t\t\t\t<deja-item value=\"cranberries\" text=\"Cranberries\"></deja-item>\n\t\t\t\t\t<deja-item value=\"durian\" text=\"Durian\"></deja-item>\n\t\t\t\t\t<deja-item value=\"grapes\" text=\"Grapes\"></deja-item>\n\t\t\t\t\t<deja-item value=\"lemon\" text=\"Lemon\"></deja-item>\n\t\t\t\t\t<deja-item value=\"mango\" text=\"Mango\"></deja-item>\n\t\t\t\t\t<deja-item value=\"pineapple\" text=\"Pineapple\"></deja-item>\n\t\t\t\t\t<deja-item value=\"watermelon\" text=\"Watermelon\"></deja-item>\n\t\t\t\t</deja-tree-list>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">String Array Model</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<span fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\t\t\t\t<deja-tree-list class=\"demo-half-width\" [(ngModel)]=\"fruct\" [models]=\"fructs\"></deja-tree-list>\n\t\t\t\t<span fxFlex=\"0 0 50%\" fxFlexOffset=\"5%\">Selected fruct model is: {{ fruct }}</span>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Disabled tree-list</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>\n\t\t\t\t<mat-checkbox [(ngModel)]=\"disabled\" color=\"primary\">Check me to disable tree-list below</mat-checkbox>\n\t\t\t</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list searchArea nodataholder=\"No record to display\" maxHeight=\"auto\" [disabled]=\"disabled\" selectionClearable [(ngModel)]=\"deepCountry\" textField=\"l1.l2.name\" valueField=\"l1.l2.value\" [models]=\"deepCountries\"></deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<h4>Selected deep country model :</h4>\n\t\t\t\t\t<pre>{{deepCountry | json}}</pre>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Multi level</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list nodataholder=\"No record to display\" maxHeight=\"auto\" [models]=\"folders\" textField=\"label\" childrenField=\"children\"></deja-tree-list>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 2\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Multi selection</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Multi selection example</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list sortable multiSelect textField=\"naqme\" valueField=\"code\" [selectedItems]=\"multiselectModel\" (itemDragStart)=\"onItemDragStart($event)\" (selectedChange)=\"multiselectModelChange($event.items)\" [items]=\"countriesForMultiselect\">\n\t\t\t\t\t</deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" fxLayout=\"column\">\n\t\t\t\t\t<h4>Multi selection shortcuts :</h4>\n\t\t\t\t\t<ul id=\"shortcut-list\">\n\t\t\t\t\t\t<li>Press\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">Ctrl</span>\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">Space</span> to add/remove the current item to the selection</li>\n\t\t\t\t\t\t<li>Press\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">↑</span> to select a range orf items</li>\n\t\t\t\t\t\t<li>Press\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">Shift</span>\n\t\t\t\t\t\t\t<span class=\"keyboard-key\">↓</span> to select a range orf items</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<h4>Selected country model :</h4>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li *ngFor=\"let item of multiselectModel\">\n\t\t\t\t\t\t\t<span>{{ item.naqme }}</span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Grouping and Drag Drop</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Grouping example</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list textField=\"naqme\" valueField=\"code\" [items]=\"groupedCountries\" [deja-mouse-draggable]=\"getDragContext()\">\n\t\t\t\t\t\t<ng-template #itemTemplate let-item let-flatindex=\"flatindex\">\n\t\t\t\t\t\t\t<span [attr.ddid]=\"item.model.code\">{{ item.model.naqme }}</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t<ng-template #parentItemTemplate let-item>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">public</mat-icon>&nbsp;\n\t\t\t\t\t\t\t<span>{{ item.groupName }}</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<div>You can drag and drop items the the area bellow (That will display a JSON representation of the dropped model) :</div>\n\t\t\t\t\t<div #dropArea [deja-mouse-droppable]=\"getDropContext(dropArea)\" [deja-droppable]=\"{dragovercallback: onDivDragOver, dragentercallback:onDivDragOver, dropcallback:onDivDropEvent}\" style=\"border:1px solid red;min-height:150px;\"></div>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Autocomplete</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Autocomplete 2 characters minimum</div>\n\t\t\t<deja-tree-list class=\"demo-half-width\" nodataholder=\"No record to display\" [itemListService]=\"countriesListService\" textField=\"naqme\" valueField=\"code\" min-search-length=\"2\"></deja-tree-list>\n\t\t</mat-card-content>\n\t\t<mat-toolbar color=\"primary\">Variable Row Size</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>Variable Row height example</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list [items]=\"loremList\" multiSelect viewportMode=\"variable\" searchArea sortable></deja-tree-list>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 3\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Templating Examples</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>Item Template</h1>\n\t\t\t<div>An exemple with auto sized item template</div>\n\t\t\t<deja-tree-list #news class=\"news\" viewportMode=\"auto\" textField=\"title\" searchField=\"description\" [models]=\"news$\">\n\t\t\t\t<ng-template #itemTemplate let-item let-flatindex=\"flatindex\">\n\t\t\t\t\t<news-card [item]=\"item.model\" (imageLoaded)=\"imageLoaded(item)\"></news-card>\n\t\t\t\t</ng-template>\n\t\t\t</deja-tree-list>\n\t\t\t<h1>Header Template and Group Template</h1>\n\t\t\t<div>Treelist with an header template</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list #headertreelist textField=\"naqme\" valueField=\"code\" [models]=\"countries\">\n\t\t\t\t\t\t<ng-template #headerTemplate>\n\t\t\t\t\t\t\t<span id=\"headerTemplateContent\" (click)=\"headertreelist.sort()\">\n\t\t\t\t\t\t\t\t<span id=\"title\">\n\t\t\t\t\t\t\t\t\tThis is a header template, click to sort the list.\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<deja-sort-indicator [sort-infos]=\"headertreelist.sortInfos\"></deja-sort-indicator>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-tree-list>\n\t\t\t\t</span>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list textField=\"naqme\" [items]=\"groupedCountries\">\n\t\t\t\t\t\t<ng-template #parentItemTemplate let-item>\n\t\t\t\t\t\t\t<mat-icon id=\"placeholder-icon\">public</mat-icon>&nbsp;\n\t\t\t\t\t\t\t<span>{{ item.groupName }}</span>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-tree-list>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<h1>Search Prefix and Suffix Templates</h1>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxLayout=\"column\">\n\t\t\t\t\t<deja-tree-list searchArea textField=\"naqme\" valueField=\"code\" [items]=\"countries\">\n\t\t\t\t\t\t<ng-template #searchPrefixTemplate>\n\t\t\t\t\t\t\t<mat-icon (click)=\"onFilterTemplateClicked('Prefix')\">public</mat-icon>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t\t<ng-template #searchSuffixTemplate>\n\t\t\t\t\t\t\t<mat-icon (click)=\"onFilterTemplateClicked('Suffix')\">more_vert</mat-icon>\n\t\t\t\t\t\t</ng-template>\n\t\t\t\t\t</deja-tree-list>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 4\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Pre-Selections from html inputs</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<div fxFlex=\"40\" fxLayout=\"column\">\n\t\t\t\t\t<div>Preselection with the input selectedModel</div>\n\t\t\t\t\t<deja-tree-list class=\"fixed-height\" selectedModel=\"Mango\" [models]=\"fructs\"></deja-tree-list>\n\t\t\t\t</div>\n\t\t\t\t<div fxFlex=\"40\" fxFlexOffset=\"15\" fxLayout=\"column\">\n\t\t\t\t\t<div>Preselections with the input selectedModels</div>\n\t\t\t\t\t<deja-tree-list class=\"fixed-height\" multiSelect=\"true\" selectedModels=\"Mango, Apricots, Coconut\" [models]=\"fructs\"></deja-tree-list>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div fxLayout=\"row\">\n\t\t\t\t<div fxFlex=\"40\" fxLayout=\"column\">\n\t\t\t\t\t<div>Preselection with the input selectedItem</div>\n\t\t\t\t\t<deja-tree-list class=\"fixed-height\" selectedItem=\"mango\" [items]=\"fructItems\"></deja-tree-list>\n\t\t\t\t</div>\n\t\t\t\t<div fxFlex=\"40\" fxFlexOffset=\"15\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</mat-card-content>\n\n\t\t<mat-toolbar color=\"primary\">Pre-Selections from javascript</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<div>The collection fructItemsWithPreSelection has a pre-selected item</div>\n\t\t\t<deja-tree-list class=\"fixed-height\" [items]=\"fructItemsWithPreSelection\"></deja-tree-list>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n\n<div *ngIf=\"tabIndex === 5\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Pre-Events and on Demand</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>On Demand Loading </h1>\n\t\t\t<div>The items are loaded from the loading event</div>\n\t\t\t<deja-tree-list #ondemand class=\"demo-half-width fixed-height\" textField=\"naqme\" valueField=\"code\" [loadingItems]=\"loadingItems()\"></deja-tree-list>\n\t\t\t<h1>Confirm Selection</h1>\n\t\t\t<div>A dialog will confirm the selection of an item</div>\n\t\t\t<deja-tree-list class=\"demo-half-width fixed-height\" multiSelect textField=\"naqme\" valueField=\"code\" [selectingItem]=\"confirmDialog()\" [items]=\"countries\"> </deja-tree-list>\n\t\t\t<h1>Confirm Expand and Collapse </h1>\n\t\t\t<div>A dialog will confirm the expand and collapse or an item if the children are not loaded. The children will be loaded asynchronously after the item expansion.</div>\n\t\t\t<deja-tree-list #onexpand class=\"demo-half-width fixed-height\" textField=\"naqme\" valueField=\"code\" [items]=\"onDemandGroupedCountries\" [expandingItem]=\"expandingItems()\" [collapsingItem]=\"collapsingItems()\"></deja-tree-list>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>\n\n<div *ngIf=\"tabIndex === 6\">\n\t<mat-card class=\"deja-treelist-demo demo-card demo-basic\">\n\t\t<mat-toolbar color=\"primary\">Performance Examples</mat-toolbar>\n\t\t<mat-card-content>\n\t\t\t<h1>10K items with Item Template </h1>\n\t\t\t<div class=\"flexContainer\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"1rem\">\n\t\t\t\t<span fxFlex=\"1 1 auto\">An exemple with 10000 auto sized templatized items</span>\n\t\t\t\t<mat-form-field fxFlex=\"0 0 5rem\">\n\t\t\t\t\t<input matInput type=\"number\" [(ngModel)]=\"ensureIndex\" autocomplete=\"off\">\n\t\t\t\t</mat-form-field>\n\t\t\t\t<button fxFlex=\"0 0 auto\" mat-button (click)=\"news.ensureItemVisible(ensureIndex)\">Ensure index</button>\n\t\t\t</div>\n\t\t\t<deja-tree-list #news class=\"news\" viewportMode=\"auto\" textField=\"title\" searchField=\"description\" [models]=\"bigNews$\">\n\t\t\t\t<ng-template #itemTemplate let-item let-flatindex=\"flatindex\">\n\t\t\t\t\t<news-card [item]=\"item.model\" (imageLoaded)=\"imageLoaded(item)\"></news-card>\n\t\t\t\t</ng-template>\n\t\t\t</deja-tree-list>\n\n\t\t\t<h1>Fixed size rows 100K items</h1>\n\t\t\t<div>An exemple with 100000 fixed size items</div>\n\t\t\t<span fxLayout=\"row\">\n\t\t\t\t<deja-tree-list #bigCountries id=\"bigCountries\" fxFlex=\"0 0 45%\" [items]=\"bigCountries$\" textField=\"naqme\" valueField=\"code\"></deja-tree-list>\n\t\t\t\t<span fxFlex=\"0 0 45%\" fxFlexOffset=\"5%\" fxFlexOffset=\"5%\">\n\t\t\t\t\t<h4 id=\"vptitle\">Viewport Infos:</h4>\n\t\t\t\t\t<div *ngFor=\"let info of viewPortInfos\">\n\t\t\t\t\t\t<span class=\"vpinfoname\">{{info.name}}</span>\n\t\t\t\t\t\t<span>{{info.value}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</span>\n\t\t\t</span>\n\t\t</mat-card-content>\n\t</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/tree-list/tree-list-demo.module.ts":
/*!****************************************************!*\
  !*** ./src/app/tree-list/tree-list-demo.module.ts ***!
  \****************************************************/
/*! exports provided: DejaTreeListDemoModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTreeListDemoModule", function() { return DejaTreeListDemoModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/esm5/card.es5.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/esm5/toolbar.es5.js");
/* harmony import */ var _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @deja-js/component/dialog */ "./dist/deja-js/component/fesm5/deja-js-component-dialog.js");
/* harmony import */ var _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @deja-js/component/dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-dragdrop.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @deja-js/component/message-box */ "./dist/deja-js/component/fesm5/deja-js-component-message-box.js");
/* harmony import */ var _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @deja-js/component/mouse-dragdrop */ "./dist/deja-js/component/fesm5/deja-js-component-mouse-dragdrop.js");
/* harmony import */ var _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @deja-js/component/tree-list */ "./dist/deja-js/component/fesm5/deja-js-component-tree-list.js");
/* harmony import */ var _component_markdown_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../component/markdown/index */ "./src/component/markdown/index.ts");
/* harmony import */ var _common_news_card_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../common/news-card.module */ "./src/app/common/news-card.module.ts");
/* harmony import */ var _tree_list_demo__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./tree-list-demo */ "./src/app/tree-list/tree-list-demo.ts");
/* harmony import */ var _tree_list_demo_routes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./tree-list-demo.routes */ "./src/app/tree-list/tree-list-demo.routes.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


















var DejaTreeListDemoModule = /** @class */ (function () {
    function DejaTreeListDemoModule() {
    }
    DejaTreeListDemoModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _tree_list_demo__WEBPACK_IMPORTED_MODULE_16__["DejaTreeListDemoComponent"]
            ],
            exports: [
                _tree_list_demo__WEBPACK_IMPORTED_MODULE_16__["DejaTreeListDemoComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material_card__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"],
                _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_13__["DejaTreeListModule"],
                _component_markdown_index__WEBPACK_IMPORTED_MODULE_14__["DejaMarkdownModule"],
                _deja_js_component_message_box__WEBPACK_IMPORTED_MODULE_11__["DejaMessageBoxModule"],
                _deja_js_component_dialog__WEBPACK_IMPORTED_MODULE_8__["DejaDialogModule"],
                _deja_js_core__WEBPACK_IMPORTED_MODULE_10__["DejaItemModule"],
                _deja_js_component_mouse_dragdrop__WEBPACK_IMPORTED_MODULE_12__["DejaMouseDragDropModule"].forRoot(),
                _deja_js_component_dragdrop__WEBPACK_IMPORTED_MODULE_9__["DejaDragDropModule"],
                _deja_js_core__WEBPACK_IMPORTED_MODULE_10__["DejaSortingModule"],
                _common_news_card_module__WEBPACK_IMPORTED_MODULE_15__["NewsCardModule"],
                _tree_list_demo_routes__WEBPACK_IMPORTED_MODULE_17__["routing"],
            ],
            providers: [
                _deja_js_core__WEBPACK_IMPORTED_MODULE_10__["GroupingService"],
            ],
        })
    ], DejaTreeListDemoModule);
    return DejaTreeListDemoModule;
}());



/***/ }),

/***/ "./src/app/tree-list/tree-list-demo.routes.ts":
/*!****************************************************!*\
  !*** ./src/app/tree-list/tree-list-demo.routes.ts ***!
  \****************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tree_list_demo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tree-list-demo */ "./src/app/tree-list/tree-list-demo.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */


var routes = [
    { path: '', component: _tree_list_demo__WEBPACK_IMPORTED_MODULE_1__["DejaTreeListDemoComponent"] },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/tree-list/tree-list-demo.scss":
/*!***********************************************!*\
  !*** ./src/app/tree-list/tree-list-demo.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "deja-tree-list-demo .demo-card {\n  margin: 16px; }\n  deja-tree-list-demo .demo-card mat-card-content {\n    padding: 16px;\n    display: flex;\n    flex-direction: column; }\n  deja-tree-list-demo .demo-card mat-card-content deja-tree-list {\n      max-height: 400px;\n      position: relative;\n      margin: 1rem 0; }\n  deja-tree-list-demo .demo-card mat-card-content deja-tree-list.fixed-height {\n        height: 400px; }\n  deja-tree-list-demo .demo-card mat-card-content deja-tree-list.news {\n        max-height: 600px; }\n  deja-tree-list-demo .demo-basic {\n  padding: 0; }\n  deja-tree-list-demo .demo-full-width {\n  width: 100%; }\n  deja-tree-list-demo .demo-half-width {\n  width: 45%; }\n  deja-tree-list-demo .demo-icons {\n  font-size: 100%;\n  height: inherit;\n  vertical-align: top;\n  width: inherit; }\n  deja-tree-list-demo #flight {\n  display: flex;\n  align-items: center; }\n  deja-tree-list-demo news-card {\n  width: 100%; }\n  deja-tree-list-demo news-card .text {\n    overflow-x: hidden; }\n  deja-tree-list-demo .vpinfoname {\n  display: inline-block;\n  width: 7rem; }\n  deja-tree-list-demo #bigCountries {\n  height: 400px; }\n  deja-tree-list-demo #headerTemplateContent {\n  padding: 0.4rem;\n  display: block;\n  background-color: #aaa;\n  cursor: pointer;\n  display: flex; }\n  deja-tree-list-demo #headerTemplateContent #title {\n    flex: 1 0 auto; }\n  deja-tree-list-demo #headerTemplateContent step-indicator {\n    flex: 0 0 auto; }\n  deja-tree-list-demo [matPrefix] {\n  cursor: default;\n  padding: 4px; }\n  deja-tree-list-demo [matSuffix] {\n  padding: 4px;\n  display: flex;\n  justify-content: flex-end;\n  cursor: pointer; }\n  deja-tree-list-demo [ddid] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center; }\n  deja-tree-list-demo .optionstl {\n  overflow: visible; }\n  .item-base-cursor #content,\n.country-target-cursor #content {\n  background-color: #222 !important;\n  color: #fff;\n  opacity: 0.8;\n  display: flex;\n  align-items: center;\n  cursor: pointer; }\n  .item-base-cursor #content::before,\n  .country-target-cursor #content::before {\n    display: block;\n    width: 0.5rem;\n    content: \" \"; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9EU0ktSFVHL2RlamFqcy1jb21wb25lbnRzL3NyYy9hcHAvdHJlZS1saXN0L3RyZWUtbGlzdC1kZW1vLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxZQUFZLEVBQUE7RUFGcEI7SUFJWSxhQUFhO0lBQ2IsYUFBYTtJQUNiLHNCQUFzQixFQUFBO0VBTmxDO01BUWdCLGlCQUFpQjtNQUNqQixrQkFBa0I7TUFDbEIsY0FBYyxFQUFBO0VBVjlCO1FBWW9CLGFBQWEsRUFBQTtFQVpqQztRQWVvQixpQkFBaUIsRUFBQTtFQWZyQztFQXFCUSxVQUFVLEVBQUE7RUFyQmxCO0VBd0JRLFdBQVcsRUFBQTtFQXhCbkI7RUEyQlEsVUFBVSxFQUFBO0VBM0JsQjtFQThCUSxlQUFlO0VBQ2YsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixjQUFjLEVBQUE7RUFqQ3RCO0VBb0NRLGFBQWE7RUFDYixtQkFBbUIsRUFBQTtFQXJDM0I7RUF3Q1EsV0FBVyxFQUFBO0VBeENuQjtJQTBDWSxrQkFBa0IsRUFBQTtFQTFDOUI7RUE4Q1EscUJBQXFCO0VBQ3JCLFdBQVcsRUFBQTtFQS9DbkI7RUFrRFEsYUFBYSxFQUFBO0VBbERyQjtFQXFEUSxlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsYUFBYSxFQUFBO0VBekRyQjtJQTJEWSxjQUFjLEVBQUE7RUEzRDFCO0lBOERZLGNBQWMsRUFBQTtFQTlEMUI7RUFrRVEsZUFBZTtFQUNmLFlBQVksRUFBQTtFQW5FcEI7RUFzRVEsWUFBWTtFQUNaLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsZUFBZSxFQUFBO0VBekV2QjtFQTRFUSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUIsRUFBQTtFQS9FM0I7RUFrRlEsaUJBQWlCLEVBQUE7RUFJekI7O0VBR1EsaUNBQWlDO0VBQ2pDLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixlQUFlLEVBQUE7RUFSdkI7O0lBVVksY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC90cmVlLWxpc3QvdHJlZS1saXN0LWRlbW8uc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImRlamEtdHJlZS1saXN0LWRlbW8ge1xuICAgIC5kZW1vLWNhcmQge1xuICAgICAgICBtYXJnaW46IDE2cHg7XG4gICAgICAgIG1hdC1jYXJkLWNvbnRlbnQge1xuICAgICAgICAgICAgcGFkZGluZzogMTZweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgICAgZGVqYS10cmVlLWxpc3Qge1xuICAgICAgICAgICAgICAgIG1heC1oZWlnaHQ6IDQwMHB4O1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDFyZW0gMDtcbiAgICAgICAgICAgICAgICAmLmZpeGVkLWhlaWdodCB7XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNDAwcHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICYubmV3cyB7XG4gICAgICAgICAgICAgICAgICAgIG1heC1oZWlnaHQ6IDYwMHB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAuZGVtby1iYXNpYyB7XG4gICAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICAgIC5kZW1vLWZ1bGwtd2lkdGgge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgLmRlbW8taGFsZi13aWR0aCB7XG4gICAgICAgIHdpZHRoOiA0NSU7XG4gICAgfVxuICAgIC5kZW1vLWljb25zIHtcbiAgICAgICAgZm9udC1zaXplOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IGluaGVyaXQ7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgICAgIHdpZHRoOiBpbmhlcml0O1xuICAgIH1cbiAgICAjZmxpZ2h0IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgbmV3cy1jYXJkIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIC50ZXh0IHtcbiAgICAgICAgICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAudnBpbmZvbmFtZSB7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgd2lkdGg6IDdyZW07XG4gICAgfVxuICAgICNiaWdDb3VudHJpZXMge1xuICAgICAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIH1cbiAgICAjaGVhZGVyVGVtcGxhdGVDb250ZW50IHtcbiAgICAgICAgcGFkZGluZzogMC40cmVtO1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2FhYTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAjdGl0bGUge1xuICAgICAgICAgICAgZmxleDogMSAwIGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgc3RlcC1pbmRpY2F0b3Ige1xuICAgICAgICAgICAgZmxleDogMCAwIGF1dG87XG4gICAgICAgIH1cbiAgICB9XG4gICAgW21hdFByZWZpeF0ge1xuICAgICAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gICAgICAgIHBhZGRpbmc6IDRweDtcbiAgICB9XG4gICAgW21hdFN1ZmZpeF0ge1xuICAgICAgICBwYWRkaW5nOiA0cHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gICAgW2RkaWRdIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICB9XG4gICAgLm9wdGlvbnN0bCB7XG4gICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgIH1cbn1cblxuLml0ZW0tYmFzZS1jdXJzb3IsXG4uY291bnRyeS10YXJnZXQtY3Vyc29yIHtcbiAgICAjY29udGVudCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyMjIgIWltcG9ydGFudDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICB3aWR0aDogMC41cmVtO1xuICAgICAgICAgICAgY29udGVudDogXCIgXCI7XG4gICAgICAgIH1cbiAgICB9XG59Il19 */"

/***/ }),

/***/ "./src/app/tree-list/tree-list-demo.ts":
/*!*********************************************!*\
  !*** ./src/app/tree-list/tree-list-demo.ts ***!
  \*********************************************/
/*! exports provided: DejaTreeListDemoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DejaTreeListDemoComponent", function() { return DejaTreeListDemoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @deja-js/component/tree-list */ "./dist/deja-js/component/fesm5/deja-js-component-tree-list.js");
/* harmony import */ var _deja_js_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @deja-js/core */ "./dist/deja-js/core/fesm5/deja-js-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_countries_list_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/countries-list.service */ "./src/app/services/countries-list.service.ts");
/* harmony import */ var _services_countries_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/countries.service */ "./src/app/services/countries.service.ts");
/* harmony import */ var _services_folders_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/folders.service */ "./src/app/services/folders.service.ts");
/* harmony import */ var _services_news_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/news.service */ "./src/app/services/news.service.ts");
/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */










var DejaTreeListDemoComponent = /** @class */ (function () {
    function DejaTreeListDemoComponent(changeDetectorRef, countriesService, folderService, countriesListService, newsService, groupingService) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.countriesService = countriesService;
        this.folderService = folderService;
        this.countriesListService = countriesListService;
        this.newsService = newsService;
        this.groupingService = groupingService;
        this.fruct = 'apricots';
        this.fructs = [];
        this.fructItems = [];
        this.fructItemsWithPreSelection = [];
        this.deepCountry = {
            l1: {
                l2: {
                    name: 'Switzerland',
                    value: 'CH',
                }
            }
        };
        this.tabIndex = 1;
        this.dialogResponse$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.loremList = [];
        this._dialogVisible = false;
        this.subscriptions = [];
        this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        this.news$ = newsService.getNews$(50);
        this.bigNews$ = newsService.getNews$(10000);
        this.bigCountries$ = countriesService.getCountries$(null, 100000);
        for (var i = 0; i < 50; i++) {
            var rand = Math.floor(Math.random() * (70 - 33 + 1)) + 33; // random de 33 à 70
            this.loremList[i] = {};
            this.loremList[i].size = rand;
            this.loremList[i].displayName = i + " - Une ligne de test avec une taille de : " + rand;
        }
        groupingService.group(this.loremList, [{ groupByField: 'height' }]).then(function (groupedResult) {
            _this.loremList = groupedResult;
        });
        this.country = new _services_countries_service__WEBPACK_IMPORTED_MODULE_7__["Country"]();
        this.country.code = 'CH';
        this.country.displayName = 'Switzerland';
        this.country.naqme = 'Switzerland';
        this.country.color = 'rgb(211, 47, 47)';
        this.countries = this.countriesService.getCountries$();
        this.folders = this.folderService.getFolders();
        this.deepCountries = this.countriesService.getCountries$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (countries) { return countries; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (country) { return ({
            l1: {
                l2: {
                    name: country.naqme,
                    value: country.code,
                }
            }
        }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["reduce"])(function (acc, cur) { return acc.concat([cur]); }, []));
        this.fructs = [
            'Apricots',
            'Banana',
            'Cantaloupe',
            'Cherries',
            'Coconut',
            'Cranberries',
            'Durian',
            'Grapes',
            'Lemon',
            'Mango',
            'Pineapple',
            'Watermelon',
        ];
        this.fructItems = this.fructs.map(function (fruct) { return ({
            displayName: fruct,
            value: fruct.toLowerCase(),
        }); });
        this.fructItemsWithPreSelection = this.fructs.map(function (fruct, index) { return ({
            displayName: fruct,
            value: fruct.toLowerCase(),
            selected: index === 1,
        }); });
        this.subscriptions.push(this.countries.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (value) { return _this.countriesForMultiselect = value; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(1))
            .subscribe(function () {
            _this.multiselectModel = JSON.parse('[{"naqme":"ÅlandIslands","code":"AX","displayName":"ÅlandIslands","depth":0,"odd":true,"selected":true},{"naqme":"AmericanSamoa","code":"AS","displayName":"AmericanSamoa","depth":0,"odd":false,"selected":true},{"naqme":"Argentina","code":"AR","displayName":"Argentina","depth":0,"odd":false,"selected":true},{"naqme":"ChristmasIsland","code":"CX","displayName":"ChristmasIsland","depth":0,"odd":false,"selected":true},{"naqme":"Egypt","code":"EG","displayName":"Egypt","depth":0,"odd":true,"selected":true},{"naqme":"Dominica","code":"DM","displayName":"Dominica","depth":0,"odd":false,"selected":true}]');
        }));
        this.subscriptions.push(this.countries.subscribe(function (value) {
            var result = [];
            var onDemandResult = [];
            var countryMap = {};
            result.push({
                collapsible: true,
                collapsed: true,
                groupName: 'EmptyGroup',
                items: [],
                displayName: 'Empty Group',
                selectable: false,
            });
            value.map(function (country) {
                var groupName = "Group " + country.naqme[0];
                if (!countryMap[groupName]) {
                    countryMap[groupName] = [];
                    result.push({
                        collapsible: true,
                        groupName: groupName,
                        items: countryMap[groupName],
                        displayName: groupName,
                        selectable: false,
                    });
                    onDemandResult.push({
                        collapsible: true,
                        collapsed: true,
                        groupName: groupName,
                        items: [{
                                displayName: 'loading...',
                                selectable: false,
                            }],
                        displayName: groupName,
                        selectable: false,
                        loaded: false,
                    });
                }
                countryMap[groupName].push({ model: country });
            });
            _this.groupedCountries = result;
            _this.onDemandGroupedCountries = onDemandResult;
        }));
    }
    Object.defineProperty(DejaTreeListDemoComponent.prototype, "dialogVisible", {
        get: function () {
            return this._dialogVisible;
        },
        set: function (value) {
            this._dialogVisible = value;
            this.changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DejaTreeListDemoComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    DejaTreeListDemoComponent.prototype.loadingItems = function () {
        var self = this;
        return function (_query, _selectedItems) { return self.countriesService.getCountries$().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(3000)); };
    };
    DejaTreeListDemoComponent.prototype.collapsingItems = function () {
        var self = this;
        return function (item) {
            var country = item;
            return country.loaded ? Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(item) : self.confirmDialog()(item);
        };
    };
    DejaTreeListDemoComponent.prototype.expandingItems = function () {
        var _this = this;
        var self = this;
        return function (item) {
            var group = item;
            if (group.loaded) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(item);
            }
            else {
                return self.confirmDialog()(item).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (itm) {
                    if (!itm) {
                        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
                    }
                    Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(group).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["delay"])(2000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
                        .subscribe(function (grp) {
                        // Simulate asynchronous load
                        var original = _this.groupedCountries.find(function (c) { return c.displayName === grp.displayName; });
                        grp.items = original.items;
                        grp.loaded = true;
                        _this.onExpandList.refresh();
                    });
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(itm);
                }));
            }
        };
    };
    DejaTreeListDemoComponent.prototype.confirmDialog = function () {
        var _this = this;
        var self = this;
        return function (item) {
            self.dialogVisible = true;
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(_this.dialogResponse$).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (response) {
                self.dialogVisible = false;
                return response === 'ok' ? item : null;
            }));
        };
    };
    Object.defineProperty(DejaTreeListDemoComponent.prototype, "bigCountriesList", {
        set: function (treelist) {
            var _this = this;
            if (this.viewPortInfos$) {
                this.viewPortInfos$.unsubscribe();
                this.viewPortInfos = [];
                delete this.viewPortInfos$;
            }
            this.viewPortInfos$ = treelist && treelist.viewPort.viewPort$.subscribe(function (viewPort) {
                _this.viewPortInfos = [
                    { name: 'beforeSize', value: String(viewPort.beforeSize), },
                    { name: 'startIndex', value: String(viewPort.startIndex), },
                    { name: 'viewPortSize', value: String(viewPort.viewPortSize), },
                    { name: 'visibleCount', value: String(viewPort.visibleItems && viewPort.visibleItems.length), },
                    { name: 'endIndex', value: String(viewPort.endIndex), },
                    { name: 'afterSize', value: String(viewPort.afterSize), },
                    { name: 'itemsCount', value: String(viewPort.items && viewPort.items.length), }
                ];
            });
        },
        enumerable: true,
        configurable: true
    });
    DejaTreeListDemoComponent.prototype.imageLoaded = function (item) {
        var itemExt = item;
        if (!itemExt.loaded) {
            itemExt.loaded = true;
            this.newsList.refreshViewPort(itemExt);
        }
    };
    DejaTreeListDemoComponent.prototype.multiselectModelChange = function (countries) {
        this.multiselectModel = countries ? countries : null;
    };
    DejaTreeListDemoComponent.prototype.onFilterTemplateClicked = function (where) {
        alert(where + " clicked");
    };
    DejaTreeListDemoComponent.prototype.onItemDragStart = function (event) {
        event.dragInfo.country = event.dragObject;
    };
    DejaTreeListDemoComponent.prototype.onDivDragOver = function (event) {
        if (event.dragInfo.hasOwnProperty('country')) {
            event.preventDefault();
        }
    };
    DejaTreeListDemoComponent.prototype.onDivDropEvent = function (event) {
        if (event.dragInfo.hasOwnProperty('country')) {
            var country = event.dragInfo.country;
            event.target.innerText = "The dropped country is " + country.naqme + " - the code is: " + country.code;
            event.preventDefault();
        }
    };
    DejaTreeListDemoComponent.prototype.getDragContext = function () {
        var _this = this;
        return {
            target: '[ddid]',
            className: 'item-base-cursor',
            dragStart: function (target) {
                var id = target && target.getAttribute('ddid');
                return id && _this.countriesService.getCountryByCode$(id);
            },
        };
    };
    DejaTreeListDemoComponent.prototype.getDropContext = function (dropArea) {
        return {
            dragEnter: function (_dragContext) {
                return {
                    width: 200,
                    height: 60,
                    className: 'country-target-cursor',
                };
            },
            drop: function (dragContext) {
                var country = dragContext;
                dropArea.innerText = "The dropped country is " + country.naqme + " - the code is: " + country.code;
            },
        };
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('news'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_2__["DejaTreeListComponent"])
    ], DejaTreeListDemoComponent.prototype, "newsList", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('onexpand'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_2__["DejaTreeListComponent"])
    ], DejaTreeListDemoComponent.prototype, "onExpandList", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('bigCountries'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_2__["DejaTreeListComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_deja_js_component_tree_list__WEBPACK_IMPORTED_MODULE_2__["DejaTreeListComponent"]])
    ], DejaTreeListDemoComponent.prototype, "bigCountriesList", null);
    DejaTreeListDemoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            selector: 'deja-tree-list-demo',
            template: __webpack_require__(/*! ./tree-list-demo.html */ "./src/app/tree-list/tree-list-demo.html"),
            styles: [__webpack_require__(/*! ./tree-list-demo.scss */ "./src/app/tree-list/tree-list-demo.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"],
            _services_countries_service__WEBPACK_IMPORTED_MODULE_7__["CountriesService"],
            _services_folders_service__WEBPACK_IMPORTED_MODULE_8__["FoldersService"],
            _services_countries_list_service__WEBPACK_IMPORTED_MODULE_6__["CountriesListService"],
            _services_news_service__WEBPACK_IMPORTED_MODULE_9__["NewsService"],
            _deja_js_core__WEBPACK_IMPORTED_MODULE_3__["GroupingService"]])
    ], DejaTreeListDemoComponent);
    return DejaTreeListDemoComponent;
}());



/***/ })

}]);
//# sourceMappingURL=tree-list-tree-list-demo-module.js.map