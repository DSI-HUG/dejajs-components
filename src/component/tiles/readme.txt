Usage:

<deja-tiles [(ngModel)]="tiles" (onTitleEditClick)="onTitleEditClick($event)" [designMode]="designMode" maxwidth="100%" tileminwidth="5%" tileminheight="3%" tilemaxheight="50%"  tilemaxwidth="50%" (tilesLayoutChange)="tilesLayoutChange($event);">
    <template #tileTemplate let-tile>
        // Here the component to instanciate inside each tiles
    </template>
</deja-tiles>

Exemple of service code to generate a tile model            
orderGroupList[0].orders.forEach(order => {
this.tiles = [];
this.tiles.push({
    id: order.id,
    templateModel: order,
    color: '#fff',
    bounds: new Rect(
        15 * (order.uiAttributes && order.uiAttributes.row && +order.uiAttributes.row) || 0,
        15 * (order.uiAttributes && order.uiAttributes.col && +order.uiAttributes.col) || 0,
        15,
        15),
    dragging: false,
    cursor: 'pointer'
    });
});