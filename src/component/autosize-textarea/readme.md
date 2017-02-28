# Autosize TextArea
Directive pour rendre un textarea material (md-textarea) redimensioné automatiquement au contenu.  

### Utilisation 
> Ne pas oublier d'importer le module `DejaAutosizeTextAreaModule` dans les `imports` de votre module concerné !

  - Implémentation (crée un champ md-textarea et lui ajouter la directive deja-autosize
  - Attention, comme la directive utilise un validateur pour détecter les modifications de contenu du textarea, le contrôle doit impérativement utiliser ngModel.

```html
<md-textarea deja-autosize placeholder="This is an autosize text area" [(ngModel)]="multitext"></md-textarea>
```

#### Note
 - Pour les propriétés et méthodes concernant le textarea material, se référer la documentation de material design..

### Propriétés
- Aucune propriété n'est définie dans cette directive
