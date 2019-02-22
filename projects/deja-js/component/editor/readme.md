# Editor

Composant pour editer du texte riche.

### Utilisation

> Ne pas oublier d'importer le `DejaEditorModule` dans les `imports` de votre module concerné !

```html
<deja-editor [config]="editorConfig" [(ngModel)]="votreModel"></deja-editor>
<!--OU pour avoir le skin matérial-->
<mat-form-field>
    <deja-editor [config]="editorConfig" [(ngModel)]="votreModel"></deja-editor>
</mat-form-field>
```

#### Note

-   Pour que l'éditeur soit correctement affiché, vous devez mettre à jour votre fichier `angular.json` comme suit pour que CKEditor soit disponible dans les assets:

```json
{
    ...,
    "projects": {
        ...,
        "my_project": {
            ...,
            "architect": {
                ...,
                "build": {
                    ...,
                    "options": {
                        ...,
                        "assets": [
                            ...,
                            {
                                "glob": "**/*",
                                "input": "node_modules/ckeditor/",
                                "output": "assets/ckeditor/"
                            }
                            ...
                        ],
                        ...
                    },
                    ...
                },
                ...
            },
            ...
        },
        ...
    },
    ...
}
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
    <td>config</td>
    <td>any</td>
    <td>null</td>
    <td>La configuration de l'éditeur au format CKEditor (https://docs.ckeditor.com/ckeditor4/latest/api/CKEDITOR_config.html)</td>
</tr>
<tr>
    <td>readonly</td>
    <td>boolean</td>
    <td>null</td>
    <td>Affiche l'éditeur en mode lecture seule</td>
</tr>
<tr>
    <td>debounce</td>
    <td>number</td>
    <td>null</td>
    <td>Retarde l'affectation de la nouvelle valeur au model (NgModel ou FormControl) suite à une modification du texte. S'exprime en millisecondes</td>
</tr>
<tr>
    <td>inline</td>
    <td>boolean</td>
    <td>true</td>
    <td>Si `true` affiche l'editeur en mode inline directement dans le DOM de la page, si `false` affiche l'éditeur dans une iframe</td>
</tr>
</tbody>
</table>

### Evénements

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>change</td>
    <td>Emet la valeur courante après chaque changement du texte</td>
</tr>
<tr>
    <td>ready</td>
    <td>Emet lorsque l'editeur est initialisé</td>
</tr>
<tr>
    <td>blur</td>
    <td>Emet lorsque l'éditeur perd le focus</td>
</tr>
<tr>
    <td>focus</td>
    <td>Emet lorsque l'editeur gagne le focus</td>
</tr>
<tr>
    <td>disabled</td>
    <td>Emet lorsque l'editeur est désactivé</td>
</tr>
</tbody>
</table>

### Méthodes

<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Paramètres</th>
    <th>Type de retour</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>getWordAtCursor</td>
    <td></td>
    <td>string</td>
    <td>Retourne le mot situé à la position du curseur.</td>
</tr>
<tr>
    <td>hasActiveSelection</td>
    <td></td>
    <td>boolean</td>
    <td>Retourne `true` si du texte a été sélectionné dans l'éditeur, `false` sinon</td>
</tr>
<tr>
    <td>getSelectedText</td>
    <td></td>
    <td>string</td>
    <td>Retourne le texte sélectionné</td>
</tr>
<tr>
    <td>replace</td>
    <td>replace: string</td>
    <td>void</td>
    <td>Si une sélection est active, remplace la sélection avec `replace`. Si le curseur est situé au milieu d'un mot, au début ou à la fin de celui-ci sans qu'il n'y ait d'espace entre celui-ci et le curseur, remplace le mot avec `replace`. Sinon `replace` est inséré à l'endroit du curseur. </td>
</tr>
<tr>
    <td>setFocus</td>
    <td></td>
    <td>void</td>
    <td>Donne le focus à l'éditeur</td>
</tr>
</tbody>
</table>
