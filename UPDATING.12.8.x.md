# Mise à jour vers 12.7.x breaking changes et modifications

## Les services suivants sont maintenant providés inRoot et n'ont plus besoin d'être providés dans vos apps
* GroupingService
* SortingService
* IconService

## Les classes et fichiers suivants ont été renommés ou déplacés
* core/UUID est maintenant core/IconService
* core/IconService est maintenant dans core/graphics
* core/MaterialColors est maintenant dans core/graphics/MaterialColorService
* core/MaterialColor est maintenant dans core/graphics
* core/position est maintenant dans core/graphics
* core/rect est maintenant dans core/graphics
* core/circle est maintenant dans core/graphics
* core/directions est maintenant dans core/graphics
* core/size est maintenant dans core/graphics
* core/unit-value est maintenant dans core/graphics
* core/color est maintenant dans core/graphics
* core/DialogService est maintenant dans core/lazy-loading
* core/viewport.service est maintenant dans core/item-list
* core/item-base est maintenant dans core/item-list
* core/item-tree est maintenant dans core/item-list
* core/item-list.service est maintenant dans core/item-list
* core/item-list-base est maintenant dans core/item-list
* core/item-event est maintenant dans core/item-list
* core/items-event est maintenant dans core/item-list
* core/item.component est maintenant dans core/item-list
* core/sort-infos.model est maintenant dans core/item-list
* core/sorting.service est maintenant dans core/item-list
* core/sort-indicator.component est maintenant dans core/item-list
* core/group-infos est maintenant dans core/item-list
* core/group-parent est maintenant dans core/item-list
* core/grouping.service est maintenant dans core/item-list
* component/message-box/DejaMessageBoxType est maintenant dans core
* component/message-box/DejaMessageBoxAction est maintenant dans core
* core/Diacritics est maintenant dans core/DiacriticService et est injectable
