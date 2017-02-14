# Pipes

### Keys
 - Keys est un pipe qui permet de transformer à la volée un tableau en objet. Cela permet de l'utiliser dans un *ng-for

*Exemple d'utilisation :*

component.ts

```
...
let array = [
    {property:'value1'},
    {property:'value2'}
];
...
``` 

component.html

```
<li *ngFor="let object of array | keys">
    {{object.property}}
</li>
```

### Moment
Moment est un fichier de pipes regroupant les pipes qui utilisent moment.js
*_Pour utiliser ces pipes, ne pas oublier d'ajouter moment dans votre system.config.js_*

```
let map = {
    ...
    'moment': 'node_modules/moment',
    ...
}
let packages = {
    ...
    'moment': { main: 'moment.js', defaultExtension: 'js' },
    ...
}
```

*_Et de l'ajouter également dans votre index.html_*

```
<script src="node_modules/moment/moment.js"></script>
```

 - *stringToDateFormat* est un pipe permettant de transformer une date en string (au format standard _DD.MM.YYYY HH:mm:ss_) dans le format donné en paramètres.

*Exemple d'utilisation :*

component.ts

```
...
let date = '01.02.2003 04:05:06';
...
``` 

component.html

```
<span> {{date | stringToDateFormat:'DD/MM/YYYY'}} </span>
```

### MomentTimeAgo
Permet d'afficher une durée à partir d'une date.

*Exemple d'utilisation :*

```
Last updated: <span>{{ myDate | momentTimeAgo }}</span>
```
