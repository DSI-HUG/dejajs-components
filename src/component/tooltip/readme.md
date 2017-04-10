# Toltip
Directive + composant pour afficher une tooltip avec un contenu riche

### Utilisation
```html
<deja-tooltip name="test-tt" *ngIf="tooltipVisible" (hide)="tooltipVisible = false">
    <ng-template #tooltipTemplate let-model>
        {{model}}
    </ng-template>
</deja-tooltip>
...

<span deja-tooltip="test-tt" tooltip-model="un model" (tooltip-show)="tooltipVisible = true">texte avec tooltip</span>
```

***model affichera : un model***
