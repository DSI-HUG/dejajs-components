# Message Box


### Utilisation
> Ne pas oublier d'importer le `DejaMessageBoxModule` dans les `imports` de votre module concerné !

Ensuite utiliser le composant comme ceci dans votre template :

 - implémentation :

```html
<deja-message-box>
    Le texte du messageBox !
</deja-message-box>
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
    <td>actions</td>
    <td>{text?: string, type?: 'info' | 'success' | 'warn' | 'danger', icon?: string, action: () => any}[]</td>
    <td>null</td>
    <td>Boutons à afficher avec le messageBox.</td>
</tr>
<tr>
    <td>horizontal</td>
    <td>boolean</td>
    <td>null / false</td>
    <td>Rend le message box horizontal.</td>
</tr>
<tr>
    <td>icon</td>
    <td>string</td>
    <td>null</td>
    <td>Nom d'un material-icon - sert à surcharger ceux par défaut.</td>
</tr>
<tr>
    <td>title</td>
    <td>string</td>
    <td>null</td>
    <td>Titre du message box.</td>
</tr>
<tr>
    <td>type</td>
    <td>'info' | 'success' | 'warn' | 'danger'</td>
    <td>null</td>
    <td>Type du messageBox. Cette propriété stylise le composant.</td>
</tr>
</tbody>
</table>
