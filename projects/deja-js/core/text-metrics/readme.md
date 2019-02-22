# DejaTextMetrics
C'est un service qui permet de calculer la hauteur théorique qu'un texte va prendre dans un espace donné.

## Utilisation :
Pour commencer vous devez importer le `DejaTextMetricsModule`.<br />
Ensuite, vous devez ajouter le `DejaTextMetricsService` dans le constructeur de votre classe :

```javascript 
constructor(
    ...
    private textMetricsService: DejaTextMetricsService
    ...
) {}
```

___Attention : Vous devez fournir un `HTMLElement` au service pour qu'il fonctionne___

```javascript
...
this.textMetricsService.metricsElem = this.elementRef.nativeElement as HTMLElement;
...
```

Vous pouvez enfin utiliser la méthode `getTextHeight` pour connaitre la hauteur théorique que va prendre votre texte : 

```javascript
this.textMetricsService.getTextHeight(
    300, 
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate porttitor odio, non dictum massa vehicula nec.'
).then((height: number) => {
    console.info('La taille du lorem ipsum dans une div de 300px est de : ', height, 'px');
});
```

## Exemple
L'exemple se trouve dans la demo de la tree-list