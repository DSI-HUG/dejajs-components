# Data Grid
Composant pour afficher des données dans un tableau, avec une fonction de recherche.  

### Dépendances 
> Ne pas oublier d'importer le `DataGridModule` dans les `imports` de votre module concerné !

### Utilisation 
> créer un tableau à partir des lignes *rows* et des colonnes *columns* passées en paramètres : 

```html
<deja-grid #grid searchArea sortable multiSelect 
	[maxHeight]="600" 
	[viewPortRowHeight]="33" 
	[ngModel]="rows" 
	[columns]="columns"
	nodataholder="Pas de données" 
	placeholder="Filtrer la liste par le nom" 
	searchField="name"
>
```

### Propriétés

 - `deja-grid`
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
	<td>columns</td>
	<td>IDejaGridColumn[]</td>
	<td>null</td>
	<td>Définit la structure des colonnes de la grille.</td>
</tr>
<tr>
	<td>rows (ngModel)</td>
	<td>IItemBase[], Promise<iitembase[] ou Observable</iitembase[]</td>
	<td>null</td>
	<td>Définit le modèle affiché dans les lignes de la grille (c'est le contenu du tableau). Si le contenu renvoie une information indéfinie (valeur <code>null</code>), une information visuelle est affichée signifiant que les données sont en cours de chargement. Si la liste est définie mais ne contient pas de données, le message passé dans l'attribut "nodataholder" est affiché.</td>
</tr>
<tr>
	<td>currentColumn</td>
	<td>IDejaGridColumn</td>
	<td></td>
	<td>Définit la colonne en surbrillance.</td>
</tr>
<tr>
	<td>currentRow</td>
	<td>IItemBase</td>
	<td></td>
	<td>Ligne courante ou ligne active</td>
</tr>
<tr>
	<td>itemListService</td>
	<td>ItemListService</td>
	<td></td>
	<td>Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.</td>
</tr>
<tr>
	<td>depthMax</td>
	<td>number</td>
	<td></td>
	<td>Retourne une valeur indiquant le nombre de niveau hierarchiques affichés par la grille.</td>
</tr>
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
	<td>Texte affiché si aucune donnée n'est présente dans le tableau</td>
</tr>
<tr>
	<td>min-search-length</td>
	<td>number</td>
	<td>0</td>
	<td>Permet de définir la longueur minimale de caractères dans le champ de recherche avant que la recherche ou le filtrage soient effectués</td>
</tr>
<tr>
	<td>query</td>
	<td></td>
	<td>''</td>
	<td>Correspond au ngModel du champ de filtrage ou recherche</td>
</tr>
<tr>
	<td>maxHeight</td>
	<td>number</td>
	<td>0</td>
	<td>Hauteur maximum avant que le composant affiche une scrollbar (spécifier une grande valeur pour ne jamais afficher de scrollbar)</td>
</tr>
<tr>
	<td>pageSize</td>
	<td>number</td>
	<td>0</td>
	<td>Définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown</td>
</tr>
<tr>
	<td>hintLabel</td>
	<td>string</td>
	<td>''</td>
	<td>Définit un texte de conseil en cas d'erreur de validation ou autre</td>
</tr>
<tr>
	<td>viewPortRowHeight</td>
	<td>number</td>
	<td>33</td>
	<td>Définit la hauteur d'une ligne pour le calcul du viewport en mode constant</td>
</tr>
<tr>
	<td>viewportMode</td>
	<td>ViewportMode (enum)</td>
	<td>ViewportMode.fixed</td>
	<td>Définit le mode de calcul du viewport. Le Viewport ne fonctionne qu'avec des hauteurs de lignes fixe / ou définies sur chaque items. Pour désactiver le viewport, mettre le mode disabled. Attention, une désactivation du viewport dégrade considérablement les performances de la liste et ne doit pas être activée si la liste est suceptible de contenir beaucoup d'éléments.</td>
</tr>
<tr>
	<td>childrenField</td>
	<td>string</td>
	<td>items</td>
	<td>Champ utilisé pour la liste des enfants d'un parent</td>
</tr>
<tr>
	<td>textField</td>
	<td>string</td>
	<td>displayName or toString()</td>
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
	<td>displayName or toString()</td>
	<td>Définit le champ à utiliser comme champ de recherche. Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.</td>
</tr>
<tr>
	<td>selectedItems</td>
	<td>IItemBase[]</td>
	<td></td>
	<td>Liste des éléments sélectionnés.</td>
</tr>
<tr>
	<td>sortingService</td>
	<td>SortingService</td>
	<td></td>
	<td>Definit le service de tri utilisé par ce composant.</td>
</tr>
<tr>
	<td>groupingService</td>
	<td>GroupingService</td>
	<td></td>
	<td>Definit le service de regroupement utilisé par ce composant.</td>
</tr>
<tr>
	<td>columnsMinWidth</td>
	<td>number</td>
	<td>15</td>
	<td>Définit la largeur minimum que peut prendre une colonne en cas de redimensionement.</td>
</tr>
<tr>
	<td>rowTemplateExternal</td>
	<td>Template</td>
	<td>false</td>
	<td>Permet de définir un template de ligne par binding.</td>
</tr>
<tr>
	<td>parentRowTemplateExternal</td>
	<td>Template</td>
	<td>false</td>
	<td>Permet de définir un template de ligne parente par binding.</td>
</tr>
<tr>
	<td>headerTemplateExternal</td>
	<td>Template</td>
	<td>false</td>
	<td>Permet de définir un template d'entête de colonne par binding.</td>
</tr>
<tr>
	<td>searchPrefixTemplateExternal</td>
	<td>Template</td>
	<td>false</td>
	<td>Permet de définir un template comme prefixe de la zone de recherche par binding.</td>
</tr>
<tr>
	<td>searchSuffixTemplateExternal</td>
	<td>Template</td>
	<td>false</td>
	<td>Permet de définir un template comme suffixe de la zone de recherche par binding.</td>
</tr>
<tr>
	<td>sortable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Permet de trier le tableau au clic sur l'entête de la colonne.</td>
</tr>
<tr>
	<td>searchArea</td>
	<td>boolean</td>
	<td>false</td>
	<td>Affiche un barre de recherche au dessus du tableau.</td>
</tr>
<tr>
	<td>groupArea</td>
	<td>boolean</td>
	<td>false</td>
	<td>Affiche une zone de regroupement des colonnes par drag and drop.</td>
</tr>
<tr>
	<td>rowsDraggable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Rend les lignes du tableau draggable vers un autre composant (ne pas confondre avec la propriété `sortable`)</td>
</tr>
<tr>
	<td>rowsSortable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Rend les lignes du tableau triables par drag-and-drop</td>
</tr>
<tr>
	<td>columnsDraggable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Définit si toutes les colonnes peuvent être draggable vers un autre composant.</td>
</tr>
<tr>
	<td>columnsSortable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Définit si toutes les colonnes peuvent être déplacées parmis les autres colonnes.</td>
</tr>
<tr>
	<td>columnsSizable</td>
	<td>boolean</td>
	<td>false</td>
	<td>Permet de redimensionner manuellement les colonnes du tableau.</td>
</tr>
<tr>
	<td>multiSelect</td>
	<td>boolean</td>
	<td>false</td>
	<td>Permet la sélection multiple des ligne de la grille (avec la touche shift ou ctrl)</td>
</tr>
<tbody>
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
	<td>Exécuté lorsque le déplacement d'une ligne est terminée.</td>
</tr>
<tr>
	<td>itemDragStart</td>
	<td>EventEmitter</td>
	<td>Exécuté lorsque le déplacement d'une ligne commence.</td>
</tr>
<tr>
	<td>selectedChange</td>
	<td>EventEmitter</td>
	<td>Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne.</td>
</tr>
</tbody>
</table>


### Méthodes
<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
	<td>Refresh</td>
	<td>Nettoye les caches et réaffiche le viewport.</td>
</tr>
<tr>
	<td>ensureColumnVisible</td>
	<td>Calcul la position de la scrollbar horizontale pour que la colonne spéfiée soit dans la zone visible.</td>
</tr>
</tbody>
</table>


### Templating

  - `rowTemplate`
```html
<ng-template #rowTemplate let-item let-query="query" let-flatindex="flatindex">
</ng-template>
```

  - `parentRowTemplate`
```html
<ng-template #parentRowTemplate let-item let-query="query" let-flatindex="flatindex">
</ng-template>
```

  - `cellTemplate`
```html
<ng-template #cellTemplate let-row let-flatIndex="flatIndex" let-column="column">
</ng-template>
```

  - `columnHeaderTemplate`
```html
<ng-template #columnHeaderTemplate let-column>
</ng-template>
```

  - `columnsHeaderTemplate`
```html
<ng-template #columnsHeaderTemplate>
</ng-template>
```

- `searchPrefixTemplate`
`
```html
<ng-template #searchPrefixTemplate>
</ng-template>
```

- `searchSuffixTemplate`
`
```html
<ng-template #searchSuffixTemplate>
</ng-template>
```
