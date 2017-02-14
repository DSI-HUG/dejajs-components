# Scale
Composant pour afficher une échelle avec des valeurs paramétrables.

### Utilisation

```html
<deja-scale [min]="0"
            [max]="24"
            [steps]="24"
            [horizontal]="false"
            [labelXPos]="'1rem'"
            [labelYPos]="'0.5rem'"
            [labelFrequency]="1"
            [zoomLabelXPos]="'1rem'"
            [zoomLabelYPos]="'0.25rem'"
            [zoomEnabled]="true"
            [zoomFactor]="20"
            [zoomSteps]="4"
            [labels]="myLabels"
            (selectedValue)="selectedValueListener($event)"></deja-scale>
```

### Propriétés

<table>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Defaut</th>
    <th>Description</th>
</tr>
<tr>
	<td>min</td>
	<td>number</td>
	<td>0</td>
	<td>Définit la valeur initiale de l'échelle</td>
</tr>
<tr>
	<td>min</td>
	<td>number</td>
	<td>100</td>
	<td>Définit la valeur finale de l'échelle</td>
</tr>
<tr>
	<td>steps</td>
	<td>number</td>
	<td>100</td>
	<td>Définit le nombre de pas de l'échelle</td>
</tr>
<tr>
	<td>horizontal</td>
	<td>boolean</td>
	<td>true</td>
	<td>Définit l'affichage de l'échelle: horizontal, vertical</td>
</tr>
<tr>
	<td>labelXPos</td>
	<td>string</td>
	<td>0rem</td>
	<td>Définit la position horizontale des libellés</td>
</tr>
<tr>
	<td>labelYPos</td>
	<td>string</td>
	<td>1rem</td>
	<td>Définit la position verticale des libellés</td>
</tr>
<tr>
	<td>labelFrequency</td>
	<td>number</td>
	<td>5</td>
	<td>Définit la fréquence d'affichage des libellés</td>
</tr>
<tr>
	<td>zoomLabelXPos</td>
	<td>string</td>
	<td>0rem</td>
	<td>Définit la position horizontale des libellés des éléments <i>zoomés</i></td>
</tr>
<tr>
	<td>zoomLabelYPos</td>
	<td>string</td>
	<td>1rem</td>
	<td>Définit la position varticale des libellés des éléments <i>zoomés</i></td>
</tr>
<tr>
	<td>zoomEnabled</td>
	<td>boolean</td>
	<td>true</td>
	<td>Active le zoom</td>
</tr>
<tr>
	<td>zoomFactor</td>
	<td>number</td>
	<td>10</td>
	<td>Définit le factor d'agrandissement (de 10, 20, 30 ... à 90)</td>
</tr>
<tr>
	<td>zoomSteps</td>
	<td>number</td>
	<td>2</td>
	<td>Définit le nombre de pas de l'élément <i>zoomé</i></td>
</tr>
<tr>
	<td>selectedValue</td>
	<td>EventEmitter<string></td>
	<td></td>
	<td>Émeteur qui renvoit la valeur sélectionnée</td>
</tr>
<tr>
	<td>labels</td>
	<td>IScale[]</td>
	<td></td>
	<td>Libellés métier avec leurs respectifs éléments <i>zoomés</i> pour remplacer ceux par défaut (0,1,2,etc); Le nombre d'éléments doit correspondre au nombre de pas défini par le paremètre <i>steps</i></td>
</tr>
</table>

Toute autre configuration visuelle sera faite par css.

### Templating

  - `à venir`
```html
<template>
</template>
```



### Exemple
Un exemple d'utilisation est présent dans l'application test de **deja-angular2**.