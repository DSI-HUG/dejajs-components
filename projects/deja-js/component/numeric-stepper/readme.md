# Numeric Stepper
Composant de sélection de nombres.

### Utilisation 
> Ne pas oublier d'importer le `DejaNumericStepperModule` dans les `imports` de votre module concerné !

  - Implémentation (crée un champ de type "number" avec des boutons d'incrémentation) : 

```html
<deja-numeric-stepper placeholder="Kilometers" [min]="1" [max]="10" unit="kms"></deja-numeric-stepper>
```

### Propriétés

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
    <td>max</td>
    <td>number</td>
    <td>null</td>
    <td>Champ obligatoire : maximum du numeric-stepper</td>
</tr>
<tr>
    <td>min</td>
    <td>number</td>
    <td>null</td>
    <td>Champ obligatoire : minimum du numeric-stepper</td>
</tr>
<tr>
    <td>step</td>
    <td>number</td>
    <td>1</td>
    <td>Intervales du stepper</td>
</tr>
<tr>
    <td>unit</td>
    <td>string</td>
    <td>null</td>
    <td>Unité de la valeur</td>
</tr>
<tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>null</td>
    <td>désactive le stepper</td>
</tr>
<tr>
    <td>placeholder</td>
    <td>string</td>
    <td>null</td>
    <td>Placeholder du stepper</td>
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
    <td>textChange</td>
    <td>EventEmitter</td>
    <td>Executé lorsque la valeur du numeric-stepper change</td>
</tr>
</tbody>
</table>

### Templating
  
  - `errorTemplate`
```html
<ng-template #errorTemplate>
    Template pour les erreurs de validation (se retrouvera dans le <mat-error></mat-error> de l'input)
</ng-template>
```