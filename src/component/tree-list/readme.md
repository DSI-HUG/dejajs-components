# Tree List
Crée une liste récursive. 

### Utilisation 
> Ne pas oublier d'importer le `DejaTreeListModule` dans les `imports` de votre module concerné !

```html
<deja-tree-list min-search-length="0" searchArea sortable multiSelect [selectedItems]=selectedItems (selectedChange)="onSelectionChanged($event)" nodataholder="Pas de données" placeholder="Liste des pays, groupés par la première lettre" textField="naqme" [(ngModel)]="groupedCountries" (itemDragStart)="onItemDragStart($event)" #treelist childrenField="children">
	<ng-template #headerTemplate>
		<span id="headerTemplateContent" (click)="treelist.sort()">
			<span id="title">
				This is a header template, click to sort the list.
			</span>
			<deja-sort-indicator [sort-infos]="treelist.sortInfos"></deja-sort-indicator>
		</span>
	</ng-template>
	
	<ng-template #itemTemplate let-item let-flatindex="flatindex">
		<span>{{ item.naqme + ' - ' + item.code }} </span>
	</ng-template>
	
	<ng-template #searchSuffixTemplate>
		<button type="button" id="more" mat-icon-button (click)="onSuffixClicked()">
			<mat-icon>more_vert</mat-icon>
		</button>
	</ng-template>
</deja-tree-list>
```


### Propriétés

 - `deja-tree-list`
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
            <td>nodataholder</td>
            <td>string</td>
            <td></td>
            <td>Texte affiché si aucune data dans la liste</td>
        </tr>
        <tr>
            <td>min-search-length</td>
            <td>number</td>
            <td>0</td>
            <td>Retourne ou définit la longeur minimum de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués.</td>
        </tr>
        <tr>
            <td>query</td>
            <td>string | RegExp</td>
            <td></td>
            <td>Correspond au ngModel du chanp de filtrage ou recherche.</td>
        </tr>
        <tr>
            <td>maxHeight</td>
            <td>number</td>
            <td></td>
            <td>Retourne ou définit la hauteur maximum avant que le composant affiche une scrollbar (Spécifier une grande valeur pour ne jamais afficher de scroolbar)</td>
        </tr>
        <tr>
            <td>searchArea</td>
            <td>boolean</td>
            <td></td>
            <td>Si true, ajoute une barre de recherche au dessus de la liste</td>
        </tr>
        <tr>
            <td>sortable</td>
            <td>boolean</td>
            <td>false</td>
            <td>Retourne ou définit une valeur indiquant si les lignes de la liste peuvent être déplacées manuelement par l'utilisateur</td>
        </tr>
        <tr>
            <td>itemsDraggable</td>
            <td>boolean</td>
            <td>false</td>
            <td>Retourne ou définit une valeur indiquant si les lignes peuvent être déplacées vers un autre composant</td>
        </tr>
        <tr>
            <td>itemTemplateExternal</td>
            <td>Template</td>
            <td>false</td>
            <td>Voir chapitre Templating</td>
        </tr>
        <tr>
            <td>parentItemTemplateExternal</td>
            <td>Template</td>
            <td>false</td>
            <td>Voir chapitre Templating</td>
        </tr>
        <tr>
            <td>headerTemplateExternal</td>
            <td>Template</td>
            <td>false</td>
            <td>Voir chapitre Templating</td>
        </tr>
        <tr>
            <td>searchPrefixTemplateExternal</td>
            <td>Template</td>
            <td>false</td>
            <td>Voir chapitre Templating</td>
        </tr>
        <tr>
            <td>searchSuffixTemplateExternal</td>
            <td>Template</td>
            <td>false</td>
            <td>Voir chapitre Templating</td>
        </tr>
        <tr>
            <td>pageSize</td>
            <td>number</td>
            <td>0</td>
            <td>Retourne ou définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown</td>
        </tr>
        <tr>
            <td>childrenField</td>
            <td>string</td>
            <td>items</td>
            <td>Retourne ou définit le champ utilisé pour la liste des enfants d'un parent</td>
        </tr>
        <tr>
            <td>items</td>
            <td>IItemBase[]</td>
            <td></td>
            <td>Tableau d'items. Si n'est pas défini, on utilisera un service pour fournir les données.</td>
        </tr>
        <tr>
            <td>models</td>
            <td>any[] | Observable<any[]></td>
            <td></td>
            <td>Définit la liste des éléments (tout type d'objet métier)</td>
        </tr>
        <tr>
            <td>multiSelect</td>
            <td>boolean</td>
            <td>false</td>
            <td>Permet la multi-selection des items de la ligne (avec la touche shift ou ctrl)</td>
        </tr>
        <tr>
            <td>textField</td>
            <td>string</td>
            <td>displayName</td>
            <td>Retourne ou définit le champ des objets à utiliser comme label. Si cette valeur n'est pas définie, la propriété `displayName` de l'objet sera utilisée, et qui peut etre un string ou une fonction.</td>
        </tr>
        <tr>
            <td>valueField</td>
            <td>string</td>
            <td></td>
            <td>Retourne ou définit le champ à utiliser comme valeur de comparaison.</td>
        </tr>
        <tr>
            <td>hintLabel</td>
            <td>string</td>
            <td></td>
            <td>Retourne ou définit un texte de conseil en cas d'erreur de validation ou autre</td>
        </tr>
        <tr>
            <td>viewPortRowHeight</td>
            <td>number</td>
            <td>33</td>
            <td>Hauteur en pixel d'une ligne affichée dans le composant</td>
        </tr>
        <tr>
            <td>searchField</td>
            <td>string</td>
            <td></td>
            <td>Retourne ou définit le champ à utiliser comme champ de recherche. Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.</td>
        </tr>
        <tr>
            <td>multiSelect</td>
            <td>boolean</td>
            <td>false</td>
            <td>Retourne ou définit une valeur indiquant si plusieurs lignes peuvent être sélectionées.</td>
        </tr>
        <tr>
            <td>selectedItem</td>
            <td>IItemBase</td>
            <td></td>
            <td>Retourne ou définit l'élément selectioné en mode single select</td>
        </tr>
        <tr>
            <td>selectedItems</td>
            <td>IItemBase[]</td>
            <td></td>
            <td>Retourne ou définit la liste des éléments selectionés en mode multiselect</td>
        </tr>
        <tr>
            <td>selectedModel</td>
            <td>any</td>
            <td></td>
            <td>Retourne ou définit le model selectioné en mode single select</td>
        </tr>
        <tr>
            <td>selectedModels</td>
            <td>any[]</td>
            <td></td>
            <td>Retourne ou définit la liste des models selectionés en mode multiselect</td>
        </tr>
        <tr>
            <td>itemListService</td>
            <td>ItemListService</td>
            <td></td>
            <td>Retourne le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.</td>
        </tr>
        <tr>
            <td>sortingService</td>
            <td>SortingService</td>
            <td></td>
            <td>Definit le service utilisé pour le tri de la liste</td>
        </tr>
        <tr>
            <td>groupingService</td>
            <td>GroupingService</td>
            <td></td>
            <td>Definit le service utilisé pour le regroupement de la liste</td>
        </tr>
    </tbody>
</table>


  - `@Output`

<table>
    <thead>
        <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>itemDragEnd</td>
            <td>EventEmitter</td>
            <td>Exécuté lorsque le déplacement d'un item terminé</td>
        </tr>
        <tr>
            <td>itemDragStart</td>
            <td>EventEmitter</td>
            <td>Exécuté lorsque le déplacement d'un item commence</td>
        </tr>
        <tr>
            <td>scroll</td>
            <td>EventEmitter</td>
            <td>Exécuté lorsque l'utilisateur scroll la liste d'item</td>
        </tr>
        <tr>
            <td>selectedChange</td>
            <td>EventEmitter</td>
            <td>Exécuté lorsque l'utilisateur sélectionne ou désélectionne un item</td>
        </tr>
        <tr>
            <td>viewPortChanged</td>
            <td>EventEmitter<IViewPort><any[]></td>
            <td>Exécuté lorsque le calcul du viewPort est terminé.</td>
        </tr>
    </tbody>
</table>

  - `@Pré-Events`

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>loadingItems</td>
    <td>(query: string | RegExp, selectedItems: IItemBase[]) => Observable<IItemBase></td>
    <td>Définit un Observable appelé avant que la liste ne soit affichée</td>
</tr>
<tr>
    <td>selectingItem</td>
    <td>(item: IItemBase) => Promise<IItemBase> | Observable<IItemBase></td>
    <td>Définit une promesse ou un observable appelé avant qu'un élément ne soit selectioné</td>
</tr>
<tr>
    <td>unselectingItem</td>
    <td>(item: IItemBase) => Promise<IItemBase> | Observable<IItemBase></td>
    <td>Définit une promesse ou un observable appelé avant qu'un élément ne soit déselectioné</td>
</tr>
<tr>
    <td>expandingItem</td>
    <td>(item: IItemTree) => Promise<IItemTree> | Observable<IItemTree></td>
    <td>Définit une promesse ou un observable appelé avant qu'un élément ne soit étendu</td>
</tr>
<tr>
    <td>collapsingItem</td>
    <td>(item: IItemTree) => Promise<IItemTree> | Observable<IItemTree></td>
    <td>Définit une promesse ou un observable appelé avant qu'un élément ne soit réduit</td>
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
    <button type="button" mat-icon-button (mouseup)="editSection($event, item)">
        <mat-icon>edit</mat-icon>
    </button>
</ng-template>
```
  
  - `headerTemplate`
```html
<ng-template #headerTemplate>
	<span id="headerTemplateContent" (click)="treelist.sort()">
		<span id="title">This is a header template, click to sort the list.</span>
		<deja-sort-indicator [sort-infos]="treelist.sortInfos"></deja-sort-indicator>
	</span>
</ng-template>
```
  
  - `searchPrefixTemplate`
TODO
  
  - `searchSuffixTemplate`
```html
<ng-template #searchSuffixTemplate>
	<button type="button" id="more" mat-icon-button (click)="onSuffixClicked()">
		<mat-icon>more_vert</mat-icon>
	</button>
</ng-template>
```
  
  - `loaderTemplate`
```html
<ng-template #loaderTemplate>
	<span>Chargement en cours ...</span>
</ng-template>
```
