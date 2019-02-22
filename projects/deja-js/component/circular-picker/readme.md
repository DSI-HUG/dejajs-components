# Circular Picker
Composant pour séléctionner un nombre autours d'un cercle. Implémente NgModel.  

### Utilisation
> Ne pas oublier d'importer le `DejaCircularPickerModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation :

```html
<deja-circular-picker [(ngModel)]="test" [ranges]="ranges"></deja-circular-picker>
```

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
    <td>clockwiseFactor</td>
    <td>ClockwiseFactorEnum *</td>
    <td>ClockwiseFactorEnum.clockwise</td>
    <td>Sens dans lequel les valeurs tournent autours du cercle.</td>
</tr>
<tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>Pour désactiver le circular picker</td>
</tr>
<tr>
    <td>fullDiameter</td>
    <td>number</td>
    <td>310</td>
    <td>Diamètre du circular picker</td>
</tr>
<tr>
    <td>labelsDiameter</td>
    <td>number</td>
    <td>43</td>
    <td>Diamètre des labels</td>
</tr>
<tr>
    <td>outerLabels</td>
    <td>boolean</td>
    <td>false</td>
    <td>Les labels sont en dehors du cercle si cette valeur est à true</td>
</tr>
<tr>
    <td>ranges</td>
    <td>IRange[] **</td>
    <td>null</td>
    <td>Ranges a afficher sur le picker. Voir la demoApp pour plus de détails</td>
</tr>
</tbody>
</table>

### Notes : 
`*` : ClockwiseFactorEnum : 
```javascript
enum ClockwiseFactorEnum {
    clockwise = -1,
    counterClockwise = 1
}
```

`**` : IRange : 
```javascript
interface IRange {
    min: number; 
    max: number; 
    interval?: number; 
    labelInterval?: number; // x*interval
    beginOffset?: number;
}
```