# Interval Selector
Service and Component to select lower and upper boundary values of an interval.

You can either define an interval by maintaining pressed the **ALT**or **CTRL** keys and mouse **Click** for multiple rows selection. Or you can click on the opening boundary marker ** [ ** or closing boundary marker **]** to define an interval.

### Usage
> Don't forget to import the `DejaIntervalSelectorModule` in the `imports` of your modules !

  - Your component must provide the required service 'IntervalSelectorService':
```html

    @Component({
        selector: 'my-comp',
        providers: [IntervalSelectorService],
    })
    
    In the Constructor of your component, you should declare an Interval 
    identified by a unique intervalId and provide a model compare function 
    implementing the ModelCompareFunction interface. This Interval is used 
    to handle boundaries selection for your list of models.
    
     constructor(public intervalSelectorService: IntervalSelectorService) {
        this.intervalSelectorService.addInterval('events', (event1: Event, 	event2: Event) => {
            return this.eventCompareFunction(event1, event2);
        });
    }
```


```html
Example of usage within the DejaTreeComponent. You encapsulate the item label inside the deja-interval-selector component.

<!--template for tree item -->
<ng-template #externalItemTemplate let-item>
	<deja-interval-selector [intervalSelectorData]="
	{'model':item.model,  'intervalId':'events'}">
		<span>{{item.model.date | date: 'dd/MM/yyyy'}} : {{ item.model.label }}</span>
	</deja-interval-selector>
</ng-template>```


### Properties

```
<table>
<thead>
<tr>
    <th>Nom</th>
    <th>Type</th>
    <th>Defaut</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>intervalSelectorData</td>
    <td>IntervalSelectorData</td>
    <td>null</td>
    <td>This object requires two members:
	- **'intervalId'** (of string type): a unique identifier of your list of data.
	- **'model'** (of any type): the data model of your list of data models.</td>
</tr>
</tbody>
</table>

### Events

Events are provided throught the IntervalSelectorService service. Your component should subscribe to the 'intervalSelectionChanged$' Subject to listen to interval selection changes.

Your component should listen to interval boundary selection changes and set the lower and upper date as expected.

```html
Observable.from(this.intervalSelectorService.intervalSelectionChanged$).takeWhile(() => this._isAlive)
  .subscribe((boundary:IntervalBoundary) => {
    const event:Event = boundary.model as Event;
    if (boundary.intervalId === 'events') {
      if (!boundary.openingBoundary) {
          if (boundary.selected) {
              this.lowerDate = event.date;
          } else {
              this.lowerDate = null;
          }
      } else {
          if (boundary.selected) {
              this.upperDate = event.date;
          } else {
              this.upperDate = null;
          }
      }
    }
  })```
  
```
<table>
<thead>
<tr>
    <th>Nom</th>
	<th>Type</th>
    <th>Description</th>
</tr>
</thead>
<tbody>
<tr>
    <td>intervalSelectionChanged$</td>
	<td>Subject&lt;IntervalBoundary&gt;</td>
    <td>a new IntervalBoundary sent when an Interval Boundary selection has changed (selected or deselected).</td>
</tr>
</tbody>
</table>

### Define interval by using ALT or CTRL keys pressed for multiple items selection

you must enable multiple selection for the list of models on which to perform interval selection. Then when a multiple selection occurs, you can use the **'IntervalSelectorService.selectBoundaries(intervalId, model1, model2)'** method to define the interval selection. Model1 and model2 must be the lowest and the highest items of the multiple selected models.
