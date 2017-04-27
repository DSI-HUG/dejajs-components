# Color Selector
Composant de selection d'une couleur sous forme d'un bouton.  

### Utilisation 
> Ne pas oublier d'importer le module `DejaColorPickerModule` dans les `imports` de votre module concerné !

  - Vous pouvez utiliser la classe materialColors pour initialiser le selecteur avec les couleurs material.

```html
<deja-color-picker [colors]="materialColors.colors" [(ngModel)]="selectedColor" (colorhover)="onColorPickerHover($event)"></deja-color-picker>
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
    <td>small</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit la taille du bouton.</td>
</tr>
<tr>
    <td>colors</td>
    <td>MaterialColor[]</td>
    <td>null</td>
    <td>Retourne ou définit les couleurs selectionables affichées.</td>
</tr>
<tr>
    <td>dropdownContainerId</td>
    <td>string</td>
    <td>body</td>
    <td>Retourne ou definit une référence sur le conteneur de la partie déroulante. Pare default le body sera seelctioné.</td>
</tr>
<tr>
    <td>dropdownAlignment</td>
    <td>string</td>
    <td>left bottom</td>
    <td>Retourne ou définit l'alignement de la partie déroulante par rapport au bouton. Les valeurs admissibles sont left right top bottom et peuvent être combinées.</td>
</tr>
<tr>
    <td>isOpen</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou definit si la partie déroulante est visible.</td>
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
