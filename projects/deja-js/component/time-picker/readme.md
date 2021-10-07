# Time Picker
Composant pour sélectionner une heure en écrivant dans les input ou en cliquant sur les flèches. Implémente NgModel.  

### Utilisation
> Ne pas oublier d'importer le `DejaTimePickerModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation avec ngModel :

```html
<deja-time-picker [(ngModel)]="test" [step]="15"></deja-time-picker>
```

- implémentation avec un reactive form :

```html
<form [formGroup]="myFormGroup">
    <deja-time-picker formControlName="time"></deja-time-picker>
</form>
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
            <td>Pour désactiver tout le time picker</td>
        </tr>
        <tr>
            <td>formControlName</td>
            <td>string</td>
            <td></td>
            <td>N'est pas une propriété de deja-time-picker mais une directive d'@angular/form. Permet de binder une FormControl au select. **Le type de la valeur passée comme input détermine le type rendu en output: si en première instance on passe null, deja-time-picker retourne un objet générique.**</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>TimePickerDisplayMode *</td>
            <td>fullTime</td>
            <td>Mode d'affichage du composant permettant d'afficher ou de désactiver les heures ou les minutes</td>
        </tr>
        <tr>
            <td>step</td>
            <td>number</td>
            <td>1</td>
            <td>Le pas des minutes lors du click sur les flèches</td>
        </tr>
    </tbody>
</table>

### Notes : 
`*` : TimePickerDisplayMode : 
```javascript
type TimePickerDisplayMode = 'fullTime' | 'fullTimeWithHoursDisabled' | 'fullTimeWithMinutesDisabled' | 'hoursOnly' | 'minutesOnly';
```
