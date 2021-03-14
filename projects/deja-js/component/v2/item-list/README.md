# @deja-js/component   ItemList
This documents the list management in deja-js/component.

## Intro

The list management is done mainly by the service `ItemListService`
and the models `Item`, for hierarchic lists.
These models are consdered as mutable and can be updated by the `ItemListService`.

The components using the `ItemListService` are `DejaSelect`, `DejaTreeList`.

### Entry points

To provide a list to components `DejaSelect` or `DejaTreeList` there are two possible entry points:

 - `items`: entry point for an array of elements implementing `Item`.
 - `models`: entry point for an array of elements of any type.

When using `items` you will keep the control on the display properties of the elements
available in `Item`.
But your model will be mutable and can be modified by the components.

When using `models` you will not have access to the element's internal properties
but your model will be immutable and will not be affected by the list controls.

Note that you have the possibility to use `items` and store your business model in `item.model`.
That property will not be modified.

### Correspondences

| List entry            | Selection entry (I/O) | selectedChange event        |
|-----------------------|-----------------|-----------------------------------|
| models (Single Select)| selectedModel   | event.model   |                                
| models (Multi Select) | selectedModels  | event.models  |                                
| items (Single Select) | selectedItem    | event.item    |                                
| items (Multi Select)  | selectedItems   | event.items   |          

### ngModel and ReactiveForms

If you use `models` or use `items`, but all your items have a `models` property,
`ngModel` or `formControlName` will be bound on the model in immutable mode.

### textField and valueField

The properties `textField` and `valueField` specify respectively the field used for display
and the field used as a unique key in comparisons.
These must refer to a property of the model if it exists or a property of the item otherwise.

