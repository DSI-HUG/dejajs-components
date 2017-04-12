# Viewport
Ce contrôle permet de créer le DOM que pour la partie visible d'une liste scrollable. Il peut prendre en entrée juste un tableau d'éléments. Le contrôle peut fonctionner avec trois modes:
 
 - Éléments de taille fixe, dans ce cas la taille des éléments doit être spécifiée.
 - Éléments de taille variables, dans ce cas la taille des éléments doit être spécifiée pour chaque ;l;ments.
 - Éléments de taille auto, dans ce cas, il est préférable de spécifier la taille moyenne des éléments pour éviter un trop grand réajustement de la scrollbar. Le contrôle calculera la taille des éléments au rendu et réajustera la scrollbar au fur et à mesure. 

### Utilisation
> Ne pas oublier d'importer le `DejaViewPortModule` dans les `imports` de votre module concern&eacute; !

Ensuite utiliser le composant comme ceci dans votre template :

 - impl&eacute;mentation :

```html
<deja-viewport [items]="news$ | async" viewportMode="auto" direction="vertical">
    <ng-template #itemTemplate let-item>
        <!-- Your content template here -->
    </ng-template>
</deja-viewport>
```

####Note :
 - items: Tableau des éléments à afficher.
 - itemSize: Taille par défaut ou taille moyenne des éléments (facultatif).
 - viewportMode: 
    - disabled: Le viewport est désactivé, toute la liste est rendue
    - fixed: Tous les éléments ont la même taille. (défaut)
    - variable: Les éléments ont la taille spécifiée dans le model.
	- auto: La taille des éléments est calculée dynamiquement et la scrollbar est réajustée.
 - direction:
	 - vertical: La liste est rendu verticalement. (défaut)
	 - horizontal: La liste est rendue horizontalement
