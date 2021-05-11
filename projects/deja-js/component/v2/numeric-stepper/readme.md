# Numeric Stepper
Composant pour sélectionner un nombre en écrivant dans l'input ou en cliquant sur les flèches. Implémente NgModel.  

### Utilisation
> Ne pas oublier d'importer le `DejaNumericStepperModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation :

```html
<deja-numeric-stepper [ngModel]="test" (ngModelChange)="testChanged($event)" [maxlength]="2" numberFormat="2." [step]="15"></deja-numeric-stepper>
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
            <td>Pour désactiver le numeric stepper</td>
        </tr>
        <tr>
            <td>maxlength</td>
            <td>number</td>
            <td>null</td>
            <td>Longueur maximale de l'input. Par exemple, maxlength="2" ne traitera que les nombres de -99 à 99</td>
        </tr>
        <tr>
            <td>numberFormat</td>
            <td>string</td>
            <td>null</td>
            <td>Format du nombre à afficher. Plus d'info [https://angular.io/api/common/DecimalPipe](https://angular.io/api/common/DecimalPipe#digitsinfo)</td>
        </tr>
        <tr>
            <td>step</td>
            <td>number</td>
            <td>1</td>
            <td>Le pas à utiliser lors du click sur les flèches</td>
        </tr>
    </tbody>
</table>
