# Datepicker Material

Utilisation du composant Datepicker de Material, avec intégration optionnelle du [Timepicker](https://dsi-hug.github.io/dejajs-components/date-picker) et/ou du date range Material

Documentation officielle : https://material.angular.io/components/datepicker/overview

## Setup initial

### Import des modules

> Importer `MatDatepickerModule` et `MatNativeDateModule` dans les `imports` de votre module (en plus des modules Material pour la gestion des formulaires, comme MatFormFieldModule, ReactiveFormsModule...)  
> Si vous intégrez le TimePicker, importer également `DejaTimePickerModule`

### Gestion des dates et heures

Le format de la date affichée et traitée dans l'`input form` peut être customisé via des directives que l'on peut appliquer à `mat-form-field`, par exemple :
```html
<mat-form-field date-time-format>
```
Vous trouverez un exemple de directive `date-time-format` pour afficher et parser la date avec les heures et les minutes ici : [custom-date-format.directive.ts](https://raw.githubusercontent.com/DSI-HUG/dejajs-components/develop/src/app/date-picker-material/custom-date-format.directive.ts) 

> Dans les exemples ci-dessous, les opérations sur les dates (format, parsing...) se font via la lib [date-fns](https://date-fns.org/)

### Style

Si vous utilisez un thème Material custom, il se peut que vous ayez un bug dans l'affichage de la popup de calendrier du Datepicker Material.  
Pour corriger ce problème, vous pouvez ajouter ce style :
```scss
// fix conflict with custom material theme in date picker calendar popup
.mat-calendar-body-cell-content.mat-focus-indicator {
    position: absolute;
}
```

## Datepicker

### Template

```html
<form [formGroup]="dateForm">
    <mat-form-field appearance="fill" date-format>
        <mat-label>Choose a date</mat-label>
        <input matInput [matDatepicker]="datePicker" formControlName="date">
        <mat-datepicker-toggle matSuffix [for]="datePicker"></mat-datepicker-toggle>
        <mat-datepicker #datePicker></mat-datepicker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { IFormBuilder, IFormGroup } from '@rxweb/types';
[...]
interface DateForm {
    date: Date;
}
[...]
public dateForm: IFormGroup<DateForm>;

public constructor(fb: FormBuilder) {
    const formBuilder = fb as IFormBuilder;

    this.dateForm = formBuilder.group<DateForm>({
        date: null
    });
}
```

> la lib [@rxweb/types](https://docs.rxweb.io/strongly-typed/angular-strongly-typed) est utilisée pour la gestion des reactive forms

## Date range picker

Le range de date est sélectionné dans la même popup du calendrier.  
Il faut cliquer une première fois pour sélectionner la date du début, puis une deuxième fois pour la date de fin.  
Au niveau du formulaire, on a deux champs pour gérer la date de début et la date de fin : `start` et `end`

### Template

```html
<form [formGroup]="dateRangeForm">
    <mat-form-field appearance="fill" date-format>
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input [rangePicker]="dateRangePicker">
            <input matStartDate placeholder="Start date" formControlName="from">
            <input matEndDate placeholder="End date" formControlName="to">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="dateRangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #dateRangePicker></mat-date-range-picker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { IFormBuilder, IFormGroup } from '@rxweb/types';
[...]
interface DateRangeForm {
    from: Date;
    to: Date;
}
[...]
public dateRangeForm: IFormGroup<DateRangeForm>;

public constructor(fb: FormBuilder) {
    const formBuilder = fb as IFormBuilder;

    this.dateRangeForm = formBuilder.group<DateRangeForm>({
        from: null,
        to: null
    });
}
```

## Date time picker

Le TimePicker de DejaJS peut être intégré à la popup du calendrier de Datepicker Material en l'insérant dans la partie `<mat-datepicker-actions>` du datepicker.  

La valeur du Timepicker est stockée dans une variable `time` du formulaire et des fonctions doivent être ajoutées dans le composant pour le lier au champ `date` lors de l'event `opened` et lors du click sur le bouton `OK`

> Ne pas oublier de customiser le format de date pour gérer les heures et les minutes, en appliquant par exemple la directive `date-time-format`

### Template

```html
<form [formGroup]="dateTimeForm">
    <mat-form-field appearance="fill" date-time-format>
        <mat-label>Choose a date and time</mat-label>
        <mat-hint>Format : dd.MM.yyyy HH:mm</mat-hint>
        <input matInput [matDatepicker]="dateTimePicker" formControlName="date">
        <mat-datepicker-toggle matSuffix [for]="dateTimePicker"></mat-datepicker-toggle>
        <mat-datepicker #dateTimePicker (opened)="onDateTimeOpened()">
            <mat-datepicker-actions>
                <deja-time-picker [(time)]="time"></deja-time-picker>
                <div class="action-buttons">
                    <button mat-raised-button color="primary" matDatepickerApply (click)="onDateTimeClosed(time)">OK</button>
                </div>
            </mat-datepicker-actions>
        </mat-datepicker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { IFormBuilder, IFormGroup } from '@rxweb/types';
[...]
interface DateForm {
    date: Date;
}
[...]
public dateTimeForm: IFormGroup<DateForm>;

public time: Date;

public constructor(fb: FormBuilder) {
    const formBuilder = fb as IFormBuilder;

    this.dateTimeForm = formBuilder.group<DateForm>({
        date: null
    });
}

public onDateTimeOpened(): void {
    const values = this.dateTimeForm.value;
    this.time = values.date ? new Date(values.date) : null;
}

public onDateTimeClosed(time: Date): void {
    const values = this.dateTimeForm.value;
    if (!values.date) {
        values.date = new Date();
    }
    if (!time) {
        time = new Date();
    }
    values.date.setHours(time.getHours());
    values.date.setMinutes(time.getMinutes());
    values.date.setSeconds(time.getSeconds());
    this.dateTimeForm.setValue(values);
}
```

### Style

```scss
.mat-datepicker-actions {
    justify-content: center !important;
    margin: 1rem;
    flex-direction: column;

    .action-buttons {
        margin-top: 2rem;
    }
}
```

## Date time range picker

C'est un mix entre le date time picker et le date range picker, avec deux variables `timeFrom` et `timeTo` pour stocker les heures de début et de fin.

### Template

```html
<form [formGroup]="dateTimeRangeForm">
    <mat-form-field appearance="fill" date-time-format>
        <mat-label>Enter a date range</mat-label>
        <mat-hint>Format : dd.MM.yyyy HH:mm - dd.MM.yyyy HH:mm</mat-hint>
        <mat-date-range-input [rangePicker]="dateTimeRangePicker">
            <input matStartDate placeholder="Start date" formControlName="from">
            <input matEndDate placeholder="End date" formControlName="to">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="dateTimeRangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #dateTimeRangePicker (opened)="onDateTimeRangeOpened()">
            <mat-date-range-picker-actions>
                <div class="time-range">
                    <deja-time-picker [(time)]="timeFrom"></deja-time-picker>
                    <div class="time-picker-separator">-</div>
                    <deja-time-picker [(time)]="timeTo"></deja-time-picker>
                </div>
                <div class="action-buttons">
                    <button mat-raised-button color="primary" matDateRangePickerApply (click)="onDateTimeRangeClosed(timeFrom, timeTo)">OK</button>
                </div>
            </mat-date-range-picker-actions>
        </mat-date-range-picker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { IFormBuilder, IFormGroup } from '@rxweb/types';
[...]
interface DateRangeForm {
    from: Date;
    to: Date;
}
[...]
public dateTimeRangeForm: IFormGroup<DateRangeForm>;
public timeFrom: Date;
public timeTo: Date;

public constructor(fb: FormBuilder) {
    const formBuilder = fb as IFormBuilder;

    this.dateTimeRangeForm = formBuilder.group<DateRangeForm>({
        from: null,
        to: null
    });
}

public onDateTimeRangeOpened(): void {
    const values = this.dateTimeRangeForm.value;
    this.timeFrom = values.from ? new Date(values.from) : null;
    this.timeTo = values.to ? new Date(values.to) : null;
}

public onDateTimeRangeClosed(from: Date, to: Date): void {
    const values = this.dateTimeRangeForm.value;
    if (!values.from && !values.to) {
        values.from = new Date();
        values.to = new Date();
    } else if (!values.from) {
        values.from = new Date(values.to);
    } else if (!values.to) {
        values.to = new Date(values.from);
    }
    if (!from) {
        from = new Date(0, 0, 0, 0, 0, 0);
    }
    if (!to) {
        to = new Date(0, 0, 0, 23, 59, 59);
    }
    values.from.setHours(from.getHours());
    values.from.setMinutes(from.getMinutes());
    values.from.setSeconds(from.getSeconds());
    values.to.setHours(to.getHours());
    values.to.setMinutes(to.getMinutes());
    values.to.setSeconds(to.getSeconds());
    this.dateTimeRangeForm.setValue(values);
}
```

### Style

```scss
.mat-datepicker-actions {
    justify-content: center !important;
    margin: 1rem;
    flex-direction: column;

    .time-range {
        display: flex;
        align-items: center;

        .time-picker-separator {
            text-align: center;
            margin: 0 0.5rem;
        }
    }

    .action-buttons {
        margin-top: 2rem;
    }
}

// increase the input width to make room for the additional time
.date-time-range .mat-form-field-type-mat-date-range-input .mat-form-field-infix {
    width: 250px !important;
}
```
