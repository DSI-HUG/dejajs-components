# Date Picker
Composant pour séléctionner une date sur un calendrier et l'affficher dans un champ texte. Implémente NgModel.  

### Utilisation 
> Ne pas oublier d'importer le `DatePickerModule` dans les `imports` de votre module concerné !

  - Implémentation (crée un champ texte qui, au click fait apparaitre un *date-selector* contenu dans un *dropdown*) : 

```html
<deja-date-picker [disableDates]="[0, 6]" [(ngModel)]="votreModel"></deja-date-picker>
```

#### Note
 - Vous pouvez ajouter la propriété `disabled` comme sur tout les champs input.

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
    <td>dateMax</td>
    <td>Date</td>
    <td>null</td>
    <td>Date maximum sélectionnable dans le calendrier</td>
</tr>
<tr>
    <td>dateMin</td>
    <td>Date</td>
    <td>null</td>
    <td>Date minimum sélectionnable dans le calendrier</td>
</tr>
<tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>Désactive le datepicker</td>
</tr>
<tr>
    <td>disableDates</td>
    <td>(DaysOfWeek | Date)[]</td>
    <td>null</td>
    <td>Désactive les dates correspondantes. Prend un tableau qui contient des nombres (de 0 à 6 pour désactiver les jours) et/ou des dates pour désactiver une date specifique. TODO : prendre une fonction 8promise / observable) pour récupérer les disablesDates depuis un service.</td>
</tr>
<tr>
    <td>dropdownAlignment</td>
    <td>string</td>
    <td>left right top bottom</td>
    <td>Voir la documentation du *DejaDropdownComponent* pour plus d'informations</td>
</tr>
<tr>
    <td>dropdownContainerId</td>
    <td>string</td>
    <td>null</td>
    <td>Voir la documentation du *DejaDropdownComponent* pour plus d'informations</td>
</tr>
<tr>
    <td>format</td>
    <td>string</td>
    <td>null</td>
    <td>Le format de la date à afficher dans le champ texte. Par défaut ce aui est affiché est YYYY-MM-DD + HH:mm si c'est aussi un timepicker</td>
</tr>
<tr>
    <td>ownerAlignment</td>
    <td>string</td>
    <td>left bottom</td>
    <td>Voir la documentation du *DejaDropdownComponent* pour plus d'informations</td>
</tr>
<tr>
    <td>placeholder</td>
    <td>string</td>
    <td>Date</td>
    <td>Le placeholder du champ texte du datepicker</td>
</tr>
</tbody>
</table>
