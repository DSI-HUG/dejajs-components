# Dropdown
Composant pour afficher un panneau flottant.  

### Utilisation
> Ne pas oublier d'ajouter `DejaDropDownModule` dans les `imports` de votre module !

```html
<deja-dropdown class="dropdown" *ngIf="showDropdown" [ownerElement]="parent.htmlElement" ownerAlignment="top right" dropdownAlignment="top left">
  <div class="dropdown-body">
    ...
  </div>
</deja-dropdown>
```
#### Notes
- Le contrôle de l'affichage du dropdown doit se faire via une directive `*ngIf`. 
- La position du dropdown est calculé en fonction des dimensions du premier élément enfant de l'élement `<deja-dropdown>`.

### Propriétés

#### @Output

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
    <td>hide</td>
    <td>EventEmitter</td>
    <td>Déclenché lorsque le dropdown disparait</td>
</tr>
</tbody>
</table>

#### @Input

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Défaut</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>closeOnEscape</td>
    <td>boolean</td>
    <td>true</td>
    <td>Si true, le dropdown se ferme sur pression de la touche Echap</td>
</tr>
<tr>
    <td>ownerElement (requis)</td>
    <td>any (Element du DOM)</td>
    <td>null</td>
    <td>Element du DOM sur lequel le dropdown devra s'aligner</td>
</tr>
<tr>
    <td>ownerLeftMargin</td>
    <td>number</td>
    <td>0</td>
    <td>Marge en pixel à gauche entre le conteneur déroulant et l'élement propriétaire</td>
</tr>
<tr>
    <td>ownerRightMargin</td>
    <td>number</td>
    <td>0</td>
    <td>Marge en pixel à droite entre le conteneur déroulant et l'élement propriétaire</td>
</tr>
<tr>
    <td>ownerTopMargin</td>
    <td>number</td>
    <td>0</td>
    <td>Marge en pixel en haut entre le conteneur déroulant et l'élement propriétaire</td>
</tr>
<tr>
    <td>ownerBottomMargin</td>
    <td>number</td>
    <td>0</td>
    <td>Marge en pixel en bas entre le conteneur déroulant et l'élement propriétaire</td>
</tr>
<tr>
    <td>containerElement</td>
    <td>any (Element du DOM)</td>
    <td>null (body)</td>
    <td>Element dans lequel le conteneur déroulant doit s'afficher (le conteneur déroulant ne peut dépasser de l'éléemnt spécifié ici)</td>
</tr>
<tr>
    <td>avoidOnwerOverflow</td>
    <td>boolean</td>
    <td>true</td>
    <td>Renvoie ou définit une valeur indiquant si le conteneur déroulant peut s'afficher par dessus son propriétaire</td>
</tr>
<tr>
    <td>ownerAlignment (requis)</td>
    <td>string</td>
    <td>null</td>
    <td>Point de référence du propriétaire pour l'alignement du conteneur déroulant. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'.</td>
</tr>
<tr>
    <td>dropdownAlignment (requis)</td>
    <td>string</td>
    <td>null</td>
    <td>Ancre d'alignement du conteneur déroulant. Valeurs possible: top, bottom, right, left. Une combinaison des ces valeurs peut également être utilisée, par exemple 'top left'.</td>
</tr>
</tbody>
</table>
