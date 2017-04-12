<a name="@next"></a>
# [@next] (2017-04-xx)

### Breaking changes from 1.6.3

### Known issues

### Features

### Bug fixes

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
