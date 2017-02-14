<a name="@next"></a>
# [@next] (2017-02-xx)



<a name="@next"></a>
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
  <template #cellTemplate let-row let-column="column">
  </template>
  ```
* `ItemTemplateDirective` à été remplacée par ngTemplateOutlet. A l'utilisation, la déclaration de l'élément devient implicite.
  ```html
  <template #itemTemplate let-item>
  </template>
  ```

* `TileTemplateDirective` à été remplacée par ngTemplateOutlet. A l'utilisation, la déclaration de tile devient implicite.
  ```html
  <template #tileTemplate let-tile>
  </template>
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
