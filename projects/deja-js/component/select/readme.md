# Select
Crée une liste déroulante. 

### Utilisation 
> Ne pas oublier d'importer le `DejaSelectModule` dans les `imports` de votre module concerné !

```html
<deja-select required selectionClearable placeholder="Liste des pays, avec templating" valueField="code" [(ngModel)]="country" [models]="countries">
    <ng-template #itemTemplate let-item>
        <span>{{ item.model.naqme }}</span>
        <span>{{ item.model.code }}</span>
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
    <td>Correspond au model du chanp de filtrage ou recherche.</td>
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
    <td>positions</td>
    <td>string</td>
    <td>start bottom start top</td>
    <td>Ancre d'alignement de la liste déroulante. Valeurs possibles: start top end bottom. Une combinaison des ces valeurs peut également être utilisée, par exemple 'start top end bottom, end top start bottom'.</td>
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
    <td>delay-search-trigger</td>
    <td>number</td>
    <td>250</td>
    <td>Temps d'attente en ms avant que la recherche dans la liste soit lancée lorsque l'utilisateur tape dans le select </td>
</tr>
<tr>
    <td>selectionClearable</td>
    <td>boolean</td>
    <td>false</td>
    <td>Indique ou détermine si le bouton pour effacer la selection doit être affiché</td>
</tr>
<tr>
    <td>selectedItemsPosition</td>
    <td>DejaSelectSelectionPosition</td>
    <td>above</td>
    <td>Retourne ou définit la position des éléments selectionées en multiselect</td>
</tr>
<tr>
    <td>hideSelected</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si les éléments selectionés doivent être masqué de la liste déroulante.</td>
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
    <td>Retourne ou définit le nombre de lignes à sauter en cas de pression sur les touches PageUp ou PageDown</td>
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
    <td></td>
    <td>Définit la hauteur d'une ligne pour le calcul du viewport en pixels (la valeur par défaut sera utilisée si aucune valeur n'est définie).</td>
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
    <td>Retourne ou définit le champ utilisé pour la liste des enfants d'un parent</td>
</tr>
<tr>
    <td>textField</td>
    <td>string</td>
    <td></td>
    <td>Retourne ou définit le champ à utiliser comme valeur d'affichage.</td>
</tr>
<tr>
    <td>valueField</td>
    <td>string</td>
    <td></td>
    <td>Retourne ou définit le champ à utiliser comme valeur de comparaison.</td>
</tr>
<tr>
    <td>searchField</td>
    <td>string</td>
    <td></td>
    <td>Retourne ou définit le champ à utiliser comme champ de recherche. Ce champ peut indiquer, un champ contenant une valeur, un texte indexé, ou une fonction.</td>
</tr>
<tr>
    <td>type</td>
    <td>string</td>
    <td></td>
    <td>Définit le type du select. Valeur possible : autocomplete, multiselect, select</td>
</tr>
<tr>
    <td>itemListService</td>
    <td>ItemListService</td>
    <td></td>
    <td>Definit le service de liste utilisé par ce composant. Ce srevice permet de controller dynamiquement la liste, ou de faire du lazyloading.</td>
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
    <td>Retourne ou définit le model selectioné en mode single select. **Le type de la valeur passé comme input détermine le type rendu en output: si en première instance on passe null, deja-select retourne un objet générique.**  </td>
</tr>
<tr>
    <td>selectedModels</td>
    <td>any[]</td>
    <td></td>
    <td>Retourne ou définit la liste des models selectionés en mode multiselect. **Le type de la valeur passé comme input détermine le type rendu en output: si en première instance on passe null, deja-select retourne un objet générique.**  </td>
</tr>
<tr>
    <td>formControlName</td>
    <td>string<any[]></td>
    <td></td>
    <td>N'est pas une propriété de deja-select mais une directive d'@angular/form. Permets de binder une FormControl au select. **Le type de la valeur passé comme input détermine le type rendu en output: si en première instance on passe null, deja-select retourne un objet générique.**</td>
</tr>
<tr>
    <td>waiter</td>
    <td>boolean</td>
    <td></td>
    <td>Retourne ou définit si le waiter doit être affiché dans le select.</td>
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
    <td>Définit la liste des éléments (tout type d'objet métier).</td>
</tr>
<tr>
    <td>maxHeight</td>
    <td>number</td>
    <td>500</td>
    <td>Retourne ou définit la hauteur maximum avant que le composant affiche une scrollbar. Spécifier une grande valeur pour ne jamais afficher de scrollbar. Spécifier 0 pour que le composant determine sa hauteur à partir du container</td>
</tr>
<tr>
    <td>readonly</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si le composant est en lecture seule</td>
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
    <td>viewPortChanged</td>
    <td>EventEmitter<IViewPort><any[]></td>
    <td>Exécuté lorsque le calcul du viewPort est terminé.</td>
</tr>
<tr>
    <td>selectedChange</td>
    <td>EventEmitter<DejaItemsEvent | DejaItemEvent><any[]></td>
    <td>Exécuté lorsque l'utilisateur sélectionne ou désélectionne une ligne.</td>
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
    <mat-icon role="img" class="material-icons mat-icon" aria-label="info_outline">info_outline</mat-icon>
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
