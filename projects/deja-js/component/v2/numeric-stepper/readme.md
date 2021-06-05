# Numeric Stepper
Composant pour sélectionner un nombre en écrivant dans l'input ou en cliquant sur les flèches. Implémente NgModel.  

### Utilisation
> Ne pas oublier d'importer le `DejaNumericStepperModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation avec un ngModel :

```html
<input type="text" [(ngModel)]="numberValue">
<deja-numeric-stepper
    (increment)="numberValue = numberValue + 1"
    (decrement)="numberValue = numberValue - 1">
```

 - implémentation avec un reactive form :

```html
<form [formGroup]="numberForm">
    <mat-form-field>
        <deja-numeric-stepper
            (increment)="numberForm.controls.numberValue.patchValue(numberForm.controls.numberValue + 1)"
            (decrement)="numberForm.controls.numberValue.patchValue(numberForm.controls.numberValue - 1)">
        </deja-numeric-stepper>
        <input matInput type="text" formControlName="numberValue" />
    </mat-form-field>
</form>
```

### Propriétés

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
            <td>increment</td>
            <td>EventEmitter</td>
            <td>Exécuté lors d'un click sur la flèche du haut ou lorsque l'on tape au clavier sur la flèche du haut</td>
        </tr>
        <tr>
            <td>decrement</td>
            <td>EventEmitter</td>
            <td>Exécuté lors d'un click sur la flèche du bas ou lorsque l'on tape au clavier sur la flèche du bas</td>
        </tr>
    </tbody>
</table>
