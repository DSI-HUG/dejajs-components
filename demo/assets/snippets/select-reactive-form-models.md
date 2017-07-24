*html*
```.html
<form novalidate [formGroup]="fruitForm">
    <div class="react-form-elem">
        <deja-select placeholder="Fruit" selectionClearable [models]="fruits$" formControlName="fruitName"></deja-select>
        <md-error align="end">{{fruitForm.get('fruitName').errors ? fruitForm.get('fruitName').errors[0] : ''}}</md-error>
    </div>
</form>

```
 


*ts*
```.js

export class FruitComponent{

    protected fruitForm: FormGroup;
    protected fruits$: Observable<string[]>;
    private _fruits = [
            'Apricots',
            'Banana',
            '...'
        ];

    constructor( private _fb: FormBuilder) {
        this.fruits$ = Observable.of(this._fruits);
        this.fruitForm = this._fb.group({
            fruitName: ['', [cheeseValidator]],
        });
    }
}

```