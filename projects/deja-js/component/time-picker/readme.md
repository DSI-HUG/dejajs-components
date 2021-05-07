# Time Picker
Composant pour séléctionner un nombre en écrivant dans l'input ou en cliquant sur les flèches. Implémente NgModel.  

### Utilisation
> Ne pas oublier d'importer le `DejaTimePickerModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation :

```html
<deja-time-picker [(ngModel)]="test" [step]="15"></deja-time-picker>
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
            <td>disabled</td>
            <td>boolean</td>
            <td>false</td>
            <td>Pour désactiver le time picker</td>
        </tr>
        <tr>
            <td>hours</td>
            <td>boolean</td>
            <td>false</td>
            <td>Pour indiquer 00 au lieu de 24 lorsque ce sont des heures</td>
        </tr>
        <tr>
            <td>step</td>
            <td>number</td>
            <td>1</td>
            <td>Le pas à utiliser lors du click sur les flèches</td>
        </tr>
    </tbody>
</table>
