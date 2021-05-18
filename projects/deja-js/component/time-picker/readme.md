# Time Picker
Composant pour sélectionner une heure en écrivant dans les input ou en cliquant sur les flèches. Implémente NgModel.  

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
            <td>Pour désactiver tout le time picker</td>
        </tr>
        <tr>
            <td>mode</td>
            <td>TimePickerDisplayModeEnum *</td>
            <td>TimePickerDisplayModeEnum.FULL_TIME</td>
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
`*` : TimePickerDisplayModeEnum : 
```javascript
enum TimePickerDisplayModeEnum {
    FULL_TIME,
    FULL_TIME_WITH_HOURS_DISABLED,
    FULL_TIME_WITH_MINUTES_DISABLED,
    HOURS_ONLY,
    MINUTES_ONLY,
}
```
