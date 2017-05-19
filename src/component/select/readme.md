# Select
Crée une liste déroulante. 

### Utilisation 
> Ne pas oublier d'importer le `DejaSelectModule` dans les `imports` de votre module concerné !

```html
<deja-select required selectionClearable placeholder="Liste des pays, avec templating" valueField="code" [(ngModel)]="countryForTemnplate" [models]="countriesForTemplate">
    <ng-template #itemTemplate let-item>
        <span>{{ item.naqme }}</span>
        <span>{{ item.code }}</span>
    </ng-template>
</deja-select>
```


### Propriétés

 - `deja-select`
    - `@input`

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Defaut</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>placeholder</td>
    <td>string</td>
    <td></td>
    <td>Texte pour la barre de recherche</td>
</tr>
<tr>
    <td>min-search-length</td>
    <td>number</td>
    <td>0</td>
    <td>Permet de définir la longeur minimum de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués.</td>
</tr>
<tr>
    <td>query</td>
    <td></td>
    <td></td>
    <td>Correspond au ngModel du chanp de filtrage ou recherche.</td>
</tr>
<tr>
    <td>maxHeight</td>
    <td>number</td>
    <td>500</td>
    <td>Hauteur maximum avant que le composant affiche une scrollbar (Spécifier une grande valeur pour ne jamais afficher de scroolbar)</td>
</tr>
<tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>null</td>
    <td>Désactive le select</td>
</tr>
<tr>
    <td>dropdownContainerId</td>
    <td>string</td>
    <td></td>
    <td>ID de l'élement dans lequel la liste déroulante doit s'afficher (la liste déroulante ne peut dépasser de l'élement spécifié ici)</td>
</tr>
<tr>
    <td>dropdownAlignment </td>
    <td>string</td>
    <td>left right bottom</td>
    <td>Ancre d'alignement de la liste déroulante. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'.</td>
</tr>
<tr>
    <td>itemTemplateExternal </td>
    <td>Template</td>
    <td></td>
    <td>Permet de définir un template de ligne par binding</td>
</tr>
<tr>
    <td>parentItemTemplateExternal</td>
    <td>Template</td>
    <td></td>
    <td>Permet de définir un template de ligne parente par binding.</td>
</tr>
<tr>
    <td>placeHolderTemplateExternal</td>
    <td>Template</td>
    <td></td>
    <td>Permet de définir un template pour la zone de texte d'information.</td>
</tr>
<tr>
    <td>hintTemplateExternal</td>
    <td>Template</td>
    <td></td>
    <td>Permet de définir un template pour l'élément de conseil ou d'affichage d'erreur.</td>
</tr>
<tr>
    <td>selectionClearable</td>
    <td>boolean</td>
    <td>false</td>
    <td>Indique ou détermine si le bouton pour effacer la selection doit être affiché</td>
</tr>
<tr>
    <td>hideSelected</td>
    <td>boolean</td>
    <td>false</td>
    <td>Définit une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante.</td>
</tr>
<tr>
    <td>currentItem</td>
    <td>IItemBase</td>
    <td></td>
    <td>Définit la ligne courant ou ligne active</td>
</tr>
<tr>
    <td>pageSize</td>
    <td>number</td>
    <td></td>
    <td>Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown</td>
</tr>
<tr>
    <td>hintLabel</td>
    <td>string</td>
    <td></td>
    <td>Définit un texte de conseil en cas d'erreur de validation ou autre</td>
</tr>
<tr>
    <td>viewPortRowHeight</td>
    <td>number</td>
    <td></td>
    <td>Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est setté).</td>
</tr>
<tr>
    <td>viewportMode</td>
    <td>ViewportMode</td>
    <td></td>
    <td>Les trois valeurs acceptés en paramètre se trouvent dans l'enum ViewportMode (disabled, fixed, variable ou auto). Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste est suceptible de contenir beaucoup d'éléments.</td>
</tr>
<tr>
    <td>childrenField</td>
    <td>string</td>
    <td></td>
    <td>Retourne le champ utilisé pour la liste des enfants d'un parent</td>
</tr>
<tr>
    <td>textField</td>
    <td>string</td>
    <td></td>
    <td>Définit le champ à utiliser comme valeur d'affichage.</td>
</tr>
<tr>
    <td>valueField</td>
    <td>string</td>
    <td></td>
    <td>Définit le champ à utiliser comme valeur de comparaison.</td>
</tr>
<tr>
    <td>searchField</td>
    <td>string</td>
    <td></td>
    <td>Définit le champ à utiliser comme champ de recherche. Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.</td>
</tr>
<tr>
    <td>type</td>
    <td>string</td>
    <td></td>
    <td>Définit le type du select. Valeur possible : autocomplete, multiselect, select</td>
</tr>
<tr>
    <td>selectingItem</td>
    <td>Fonction retournant une promise ou un observable</td>
    <td></td>
    <td>Set a promise called before an item selection</td>
</tr>
<tr>
    <td>unselectingItem</td>
    <td>Fonction retournant une promise ou un observable</td>
    <td></td>
    <td>Set a promise called before an item deselection</td>
</tr>
<tr>
    <td>itemListService</td>
    <td>ItemListService</td>
    <td></td>
    <td>Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.</td>
</tr>
<tr>
    <td>waiter</td>
    <td>boolean</td>
    <td></td>
    <td>Definit si le waiter doit être affiché dans le select.</td>
</tr>
<tr>
    <td>items</td>
    <td>IItemBase[] | Promise<IItemBase[]> | Observable<IItemBase[]></td>
    <td></td>
    <td>Définit la liste des éléments au format IItemBase</td>
</tr>
<tr>
    <td>models</td>
    <td>any[] | Observable<any[]></td>
    <td></td>
    <td>Définit la liste des éléments (tout type d'objet métier)</td>
</tr>
</tbody>
</table>

### Templating

  - `itemTemplate`
```html
<ng-template #itemTemplate let-item let-flatindex="flatindex">
	<span>{{ item.naqme + ' - ' + item.code }} </span>
</ng-template>
```

  - `parentItemTemplate`
```html
<ng-template #parentItemTemplate let-item let-flatindex="flatindex">
    <span>{{ item.label }} </span>
    <span flex></span>
    <button md-icon-button (mouseup)="editSection($event, item)">
        <md-icon>edit</md-icon>
    </button>
</ng-template>
```
  
  - `hintTemplate`
```html
<ng-template #hintTemplate>
    <span class="validation-error">
        Hint pour les errers de validations par exemple!
    </span>
</ng-template>
```
  
  - `placeHolderTemplate`
```html
<ng-template #placeHolderTemplate>
    <md-icon role="img" class="material-icons mat-icon" aria-label="info_outline">info_outline</md-icon>
    <span>Liste des pays</span>
</ng-template>
```
  
  - `selectedTemplate`
```html
<ng-template #selectedTemplate let-item>
    <span id="flight">
        <i *ngIf="item.code !== 'CH' && item.code !== 'FR'" class="material-icons">flight_land</i>
        <i *ngIf="item.code === 'FR'" class="material-icons">flight_landflight_takeoff</i>
        <i *ngIf="item.code === 'CH'" class="material-icons">flight_takeoff</i>
        <span>{{ item.naqme + ' - ' + item.code }}</span>
    </span>
</ng-template>
```
