# Content Editable
Rend le contenu texte d'un élément HTML editable

### Utilisation 
> Ne pas oublier d'importer le module `DejaEditableModule` dans les `imports` de votre module concerné !

```html
<span [deja-editable]="editionEnabled" multiline>Editable Content</span>
```

#### Note
 - Le composant implémente `ngModel`.

### Propriétés

<table>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Defaut</th>
    <th>Description</th>
</tr>
<tr>
    <td>multiline</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si le contenu édité est multiligne.</td>
</tr>
<tr>
    <td>mandatory</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si le contenu édité est obligatoire. Si la valeur est `true` la sortie du mode édition ne sera pas possible tant qu'un contenu n'est pas ajouté.</td>
</tr>
<tr>
    <td>editMode<br>attribut: deja-editable</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si l'édition est activée..</td>
</tr>
<tr>
    <td>inEdition</td>
    <td>boolean</td>
    <td>false</td>
    <td>Retourne ou définit une valeur indiquant si l'élément est en édition.</td>
</tr>
</table>
<br>

### Méthodes

<table>
<tr>
    <th>Nom</th>
    <th>Description</th>
</tr>
<tr>
    <td>focus</td>
    <td>Donne le focus à la zone d'édition.</td>
</tr>
<tr>
    <td>selectAll</td>
    <td>Place toute la zone d'édition en selectioné.</td>
</tr>
<tr>
    <td>edit</td>
    <td>Active la zone d'édition.</td>
</tr>
</table>
<br>

### Evénements

<table>
<tr>
    <th>Nom</th>
    <th>Description</th>
</tr>
<tr>
    <td>colorhover</td>
    <td>Déclenché lorsqu'une couleur est survolée par la souris.</td>
</tr>
</table>

### Exemple
Un exemple d'utilisation est pr&eacute;sent dans l'application test de **deja-angular2**.