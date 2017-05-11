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
		<button id="more" md-icon-button (click)="onSuffixClicked()">
			<md-icon>more_vert</md-icon>
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
            <td></td>
            <td>Hauteur maximum avant que le composant affiche une scrollbar (Spécifier une grande valeur pour ne jamais afficher de scroolbar)</td>
        </tr>
        <tr>
            <td>searchArea</td>
            <td></td>
            <td></td>
            <td>Si true, ajoute une barre de recherche au dessus de la liste</td>
        </tr>
        <tr>
            <td>sortable</td>
            <td>boolean</td>
            <td>false</td>
            <td>Rent la liste triable. Voir l'exemple dans la demo-app ou avec @sdil et @maxf pour l'utilisation</td>
        </tr>
        <tr>
            <td>itemsDraggable</td>
            <td>boolean</td>
            <td>false</td>
            <td>Rend les lignes de la liste draggable vers un autre composant (ne pas confondre avec la propriété `sortable`)</td>
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
            <td></td>
            <td>0</td>
            <td>Definit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown</td>
        </tr>
        <tr>
            <td>childrenField</td>
            <td>string</td>
            <td>items</td>
            <td>Champ utilisé pour la liste des enfants d'un parent</td>
        </tr>
        <tr>
            <td>items</td>
            <td>IItemBase[]</td>
            <td></td>
            <td>Tableau d'items. Si n'est pas défini, on utilisera un service pour fournir les données.</td>
        </tr>
        <tr>
            <td>multiSelect</td>
            <td>true</td>
            <td>false</td>
            <td>Permet la multi-selection des items de la ligne (avec la touche shift ou ctrl)</td>
        </tr>
        <tr>
            <td>textField</td>
            <td>string</td>
            <td>displayName</td>
            <td>Nom du champ des objets à utiliser comme label. Si n'est pas setté, récupère la propriété `displayName` de l'objet qui peut etre un string ou une fonction.</td>
        </tr>
        <tr>
            <td>valueField</td>
            <td>string</td>
            <td></td>
            <td>Définit le champ à utiliser comme valeur de comparaison.</td>
        </tr>
        <tr>
            <td>hintLabel</td>
            <td>string</td>
            <td>TODO</td>
            <td>TODO</td>
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
            <td>TODO</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td>multiSelect</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Autorise la sélection multiple</td>
        </tr>
        <tr>
            <td>selectedItems</td>
            <td>IItemBase[]</td>
            <td></td>
            <td>List d'items sélectionnés (multiSelect doit être à true)</td>
        </tr>
        <tr>
            <td>selectedItem</td>
            <td>IItemBase</td>
            <td></td>
            <td>Item sélectionné (multiSelect doit être à false)</td>
        </tr>
        <tr>
            <td>itemListService</td>
            <td>ItemListService</td>
            <td>Utilisation du service interne</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td>sortingService</td>
            <td>SortingService</td>
            <td>Utilisation du service interne</td>
            <td>TODO</td>
        </tr>
        <tr>
            <td>groupingService</td>
            <td>GroupingService</td>
            <td>Utilisation du service interne</td>
            <td>TODO</td>
        </tr>
    </tbody>
</table>


</table>

  - `@Output`

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
            <td>itemDragEnd</td>
            <td>EventEmitter</td>
            <td></td>
            <td>Exécuté lorsque le déplacement d'un item terminé</td>
        </tr>
        <tr>
            <td>itemDragStart</td>
            <td>EventEmitter</td>
            <td></td>
            <td>Exécuté lorsque le déplacement d'un item commence</td>
        </tr>
        <tr>
            <td>scroll</td>
            <td>EventEmitter</td>
            <td></td>
            <td>Exécuté lorsque l'utilisateur scroll la liste d'item</td>
        </tr>
        <tr>
            <td>selectedChange</td>
            <td>EventEmitter</td>
            <td></td>
            <td>Exécuté lorsque l'utilisateur sélectionne ou désélectionne un item</td>
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
	<button id="more" md-icon-button (click)="onSuffixClicked()">
		<md-icon>more_vert</md-icon>
	</button>
</ng-template>
```
  
  - `loaderTemplate`
```html
<ng-template #loaderTemplate>
	<span>Chargement en cours ...</span>
</ng-template>
```
