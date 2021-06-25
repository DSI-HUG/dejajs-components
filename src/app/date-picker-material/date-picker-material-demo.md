# Datepicker Material

Utilisation du composant Datepicker de Material, avec intégration optionnelle du [Timepicker](https://dsi-hug.github.io/dejajs-components/date-picker) et/ou du date range Material

Documentation officielle : https://material.angular.io/components/datepicker/overview

## Setup initial

### Import des modules

> Importer `MatDatepickerModule` et `MatNativeDateModule` dans les `imports` de votre module  
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
public dateForm: FormGroup;

public constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
        date: null
    });
}
```

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
            <input matStartDate placeholder="Start date" formControlName="start">
            <input matEndDate placeholder="End date" formControlName="end">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="dateRangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #dateRangePicker></mat-date-range-picker>
    </mat-form-field>
</form>
```

### Component

```typescript
public dateRangeForm: FormGroup;

public constructor(private fb: FormBuilder) {
    this.dateRangeForm = this.fb.group({
        start: null,
        end: null
    });
}
```

## Date time picker

Le TimePicker de DejaJS peut être intégré à la popup du calendrier de Datepicker Material en l'insérant dans la partie `action buttons` du datepicker.  

La valeur du Timepicker est stockée dans un deuxième champ `time` du formulaire et des fonctions doivent être ajoutées dans le composant pour lier les heures et minutes au champ `date` lors les events `dateInput`, `dateChange` et `closed`

> Ne pas oublier de customiser le format de date pour gérer les heures et les minutes, en appliquant par exemple la directive `date-time-format`

### Template

```html
<form [formGroup]="dateTimeForm">
    <mat-form-field appearance="fill" date-time-format>
        <mat-label>Choose a date and time</mat-label>
        <mat-hint>Format : dd.MM.yyyy HH:mm</mat-hint>
        <input matInput [matDatepicker]="dateTimePicker" formControlName="date" (dateInput)="onDateTimeInput($event)" (dateChange)="onDateTimeChange($event)">
        <mat-datepicker-toggle matSuffix [for]="dateTimePicker"></mat-datepicker-toggle>
        <mat-datepicker #dateTimePicker (closed)="onDateTimeClosed(dateTimePicker)">
            <mat-datepicker-actions>
                <deja-time-picker formControlName="time"></deja-time-picker>
                <div class="action-buttons">
                    <button mat-raised-button color="primary" matDatepickerApply>OK</button>
                </div>
            </mat-datepicker-actions>
        </mat-datepicker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { isMatch, parse, set, startOfToday } from 'date-fns';
[...]
public dateTimeForm: FormGroup;

public constructor(private fb: FormBuilder) {
    this.dateTimeForm = this.fb.group({
        date: null,
        time: null
    });
}

/**
 * Triggered when changing date in calendar popup
 */
public onDateTimeInput(event: MatDatepickerInputEvent<unknown>): void {
    const time = this.dateTimeForm.get('time').value as Date;
    this.dateTimeForm.get('date').setValue(set(event.value as Date, { hours: time.getHours(), minutes: time.getMinutes() }));
}

/**
 * Triggered when changing date in input field or calendar popup
 */
public onDateTimeChange(event: MatDatepickerInputEvent<unknown>): void {
    const inputValue = (event.targetElement as HTMLInputElement).value;
    if (isMatch(inputValue, dateTimeFormat)) {
        const newDate = parse(inputValue, dateTimeFormat, startOfToday());
        this.dateTimeForm.get('date').setValue(newDate);
        this.dateTimeForm.get('time').setValue(newDate);
    }
}

/**
 * Triggered when closing the calendar popup
 */
public onDateTimeClosed(dateTimePicker: MatDatepicker<unknown>): void {
    // copy the date field value to the time field (useful if the timepicker was updated but the datepicker popup was closed without applying the change)
    this.dateTimeForm.get('time').setValue((dateTimePicker.datepickerInput as MatDatepickerInput<Date>).value);
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

C'est un mix entre le date time picker et le date range picker, du coup le formulaire contient quatre champs : `start`, `end`, `startTime` et `endTime`

### Template

```html
<form [formGroup]="dateTimeRangeForm">
    <mat-form-field appearance="fill" date-time-format>
        <mat-label>Enter a date range</mat-label>
        <mat-hint>Format : dd.MM.yyyy HH:mm - dd.MM.yyyy HH:mm</mat-hint>
        <mat-date-range-input [rangePicker]="dateTimeRangePicker">
            <input matStartDate placeholder="Start date" formControlName="start" (dateInput)="onDateTimeRangeInput($event, 'start')" (dateChange)="onDateTimeRangeChange($event, 'start')">
            <input matEndDate placeholder="End date" formControlName="end" (dateInput)="onDateTimeRangeInput($event,'end')" (dateChange)="onDateTimeRangeChange($event,'end')">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="dateTimeRangePicker"></mat-datepicker-toggle>
        <mat-date-range-picker #dateTimeRangePicker (closed)="onDateTimeRangeClosed(dateTimeRangePicker)">
            <mat-date-range-picker-actions>
                <div class="time-range">
                    <deja-time-picker formControlName="startTime"></deja-time-picker>
                    <div class="time-picker-separator">-</div>
                    <deja-time-picker formControlName="endTime"></deja-time-picker>
                </div>
                <div class="action-buttons">
                    <button mat-raised-button color="primary" matDateRangePickerApply (click)="this.dateTimeRangeApplied = true">OK</button>
                </div>
            </mat-date-range-picker-actions>
        </mat-date-range-picker>
    </mat-form-field>
</form>
```

### Component

```typescript
import { isMatch, parse, set, startOfToday } from 'date-fns';
[...]
public dateTimeRangeForm: FormGroup;
public dateTimeRangeApplied = false;

public constructor(private fb: FormBuilder) {
    this.dateTimeRangeForm = this.fb.group({
        start: null,
        end: null,
        startTime: null,
        endTime: null
    });
}

/**
 * Triggered when changing start or end date in calendar popup
 */
public onDateTimeRangeInput(event: MatDatepickerInputEvent<unknown>, dateFieldName: string): void {
    const time = this.dateTimeRangeForm.get(`${dateFieldName}Time`).value as Date;
    this.dateTimeRangeForm.get(dateFieldName).setValue(set(event.value as Date, { hours: time.getHours(), minutes: time.getMinutes() }));
}

/**
 * Triggered when changing start or end date in input field or calendar popup
 */
public onDateTimeRangeChange(event: MatDatepickerInputEvent<unknown>, dateFieldName: string): void {
    const inputValue = (event.targetElement as HTMLInputElement).value;
    if (isMatch(inputValue, dateTimeFormat)) {
        const newDate = parse(inputValue, dateTimeFormat, startOfToday());
        this.dateTimeRangeForm.get(dateFieldName).setValue(newDate);
        this.dateTimeRangeForm.get(`${dateFieldName}Time`).setValue(newDate);
    }
}

/**
 * Triggered when closing the calendar popup
 */
public onDateTimeRangeClosed(dateTimeRangePicker: MatDateRangePicker<unknown>): void {
    const dateRange = (dateTimeRangePicker.datepickerInput as MatDateRangeInput<Date>).value;
    if (this.dateTimeRangeApplied) {
        // workaround to apply time to date since the apply event is not fired when the date range is not changed
        const startTime = this.dateTimeRangeForm.get('startTime').value as Date;
        this.dateTimeRangeForm.get('start').setValue(set(dateRange.start, { hours: startTime.getHours(), minutes: startTime.getMinutes() }));
        const endTime = this.dateTimeRangeForm.get('endTime').value as Date;
        this.dateTimeRangeForm.get('end').setValue(set(dateRange.end, { hours: endTime.getHours(), minutes: endTime.getMinutes() }));
    } else {
        // copy the date field values to each time fields (useful if the timepicker was updated but the datepicker popup was closed without applying the change)
        this.dateTimeRangeForm.get('startTime').setValue(dateRange.start);
        this.dateTimeRangeForm.get('endTime').setValue(dateRange.end);
    }
    this.dateTimeRangeApplied = false;
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
