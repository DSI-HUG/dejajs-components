# Deja-dialog

Composant pour afficher une alerte au centre de l'écran.

### Utilisation

Pour ajouter/retirer l'élément du DOM, utilisez la directive structurelle ngIf.

```html
<deja-dialog *ngIf="isDialogVisible">
    Du texte dans un dialog
</deja-dialog>
```