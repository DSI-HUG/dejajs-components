# Color Selector
Composant de selection d'une couleur.  

### Utilisation 
> Ne pas oublier d'importer le module `DejaColorSelectorComponent` dans les `imports` de votre module concerné !

  - Vous pouvez utiliser la classe materialColors pour initialiser le selecteur avec les couleurs material.

```html
<deja-color-selector [colors]="materialColors.colors" [(ngModel)]="selectedColor" (colorhover)="onColorPickerHover($event)"></deja-color-selector>
```

#### Note
 - Le composant implémente `ngModel` sur la couleur selectionée. Utiliser ngModelChange pour être notifiés lorsuqe la couleur selectionée à changer.

### Propriétés

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
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>Désactive le selecteur de couleur.</td>
</tr>
<tr>
    <td>colors</td>
    <td>MaterialColor[]</td>
    <td>null</td>
    <td>Retourne ou définit les couleurs selectionables affichées.</td>
</tr>
</tbody>
</table>

### Evénements

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>colorhover</td>
    <td>Déclenché lorsqu'une couleur est survolée par la souris.</td>
</tr>
</tbody>
</table>
