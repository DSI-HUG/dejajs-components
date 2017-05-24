# @deja-js/component   ItemList

Ceci est une documentation de la gestion des listes dans deja-js/component.

## Intro

La gestion des listes se fait principalement par le service ItemListService, et les modèles de liste IItemBase, pour les listes simples ou IItemTree pour les listes hiérarchiques. Ces modèles peuvent être modifiés par l'ItemListService et sont considérés comme mutables.

Les composants utilisant l'ItemListService sont DejaSelect, DejaTreeList et DejaGrid.

### Points d'entrées

Pour fournir une liste au DejaSelect ou à la DejaTreeList, deux points d'entrée sont possibles

 - items: Point d'entrée pour un tableau d'éléments de type IItemBase ou
   IItemTree.  
 - models: Point d'entrée pour un tableau d'éléments de
   n'importe quel type.

En entrant depuis items, vous avec le contrôle sur les propriétés d'affichage des éléments disponibles dans IItemBase et IItemTree . Mais votre modèle est mutable et sera modifié par les composants

En entrant depuis models, vous n'aurez pas accès aux propriétés des éléments internes, mais votre modèle est immutable et ne sera pas modifié par les contrôles de liste.

Notez que vous avecz la possibilité de rentrer par items et de stocker votre modèle métier dans item.model. Cette propriété ne sera pas modifiée.

### Correspondances

| Entrée de la liste    | Entrée de la sélection (E/S) | Evénement selectedChange          | 
|-----------------------|-----------------|-----------------------------------|
| models (Single Select)| selectedModel   | (event as DejaItemsEvent).model   |                                
| models (Multi Select) | selectedModels  | (event as DejaItemsEvents).models |                                
| items (Single Select) | selectedItem    | (event as DejaItemsEvent).item    |                                
| items (Multi Select)  | selectedItems   | (event as DejaItemsEvents).items  |                                

### ngModel et ReactiveForms

Si vous entrez par models ou que vous entrez par items, mais que tout vos items ont une propriété models, ngModel ou formControlName seront toujours bindés sur le model en mode immutable.

### textField et valueField

Les propriétés textField et valueField qui permettent de déterminer le champs de l'élément à afficher et le champs de l'élément à utiliser pour comparer deux objets (clé unique) pointent sur une propriété du modèle si il existe ou sur une propriété de l'item si le modèle est absent.
