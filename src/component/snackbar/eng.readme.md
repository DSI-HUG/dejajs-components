# Snackbar

### Use

```html
<ng-template ngFor let-message [ngForOf]="messages | async">
  <deja-snackbar *ngIf="message.gate" alignment="left" [duration]="5000" (onAnimationDone)="message.gate = false">
  <!-- graphic component here -->
  </deja-snackbar>
</ng-template>
```

```html
<!-- container MUST have it's position set to relative if it's specified using outerContainerElement @Output -->
<section #containerEl id="container" [style.position]="'relative'">
  <ng-template ngFor let-message [ngForOf]="messages | async">
    <deja-snackbar *ngIf="message.gate" alignment="right" [outerContainerElement]="containerEl">
      <!-- if duration @Input & onAnimationDone @Output aren't specified, MUST have an event emitter to dispose the snackbar -->
      <!-- i.e button & click eventer emitter-->
      <div>
        <span>{{message.content}}</span>
        <button (click)="message.gate = false"></button>
      </div>
    </deja-snackbar>
  </ng-template>
</section>
```

### Properties (consumable only)

<table>
    <tr>
        <th>Name</th>
        <th>Mandatory</th>
        <th>Scope</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>alignment</td>
        <td>Yes</td>
        <td>@Input</td>
        <td>string</td>
        <td>Specify the anchor for the snackbar</td>
    </tr>
    <tr>
        <td>duration</td>
        <td>If onAnimationDone used, yes, otherwise musn't be used</td>
        <td>@Input</td>
        <td>number</td>
        <td>Specify the lifetime of the snackbar if not disposed by user</td>
    </tr>
    <tr>
        <td>onAnimationDone</td>
        <td>If duration used, yes, otherwise musn't be used</td>
        <td>@Output</td>
        <td>Event Emitter</td>
        <td>Negate the flag used for element removal from the DOM</td>
    </tr>
    <tr>
        <td>delay</td>
        <td>No</td>
        <td>@Input</td>
        <td>number</td>
        <td>Specify the delay before the animation is launched at element creation</td>
    </tr>
    <tr>
        <td>outerContainerElement</td>
        <td>No</td>
        <td>@Input</td>
        <td>HTML Element</td>
        <td>Specify the container of the snackbar, the container's position must be set as relative</td>
    </tr>

</table>


### Known bugs
See impl. for details, if you respect use cases, there shouldn't be any issue

### Demo
See demo app