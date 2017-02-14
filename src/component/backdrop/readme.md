# Backdrop
Simple composant à placer en arrière plan pour simuler un effet modale

### Utilisation 
> Ne pas oublier d'importer le module `DejaBackdropModule` dans les `imports` de votre module concerné !

  - Afficher le composant avec un *ngIf. Par defaut, le div affiché par le composant sera en pleine page avec un z-index de 10. Tous le contenu qui dois être accessible, en tant que contenu modale doit avoir un index supérieur à 10.

```html
<deja-backdrop (click)="useBackdrop=false" *ngIf="useBackdrop"></deja-backdrop>
```

### Propriétés
- Aucune propriété n'est définie dans ce composant
