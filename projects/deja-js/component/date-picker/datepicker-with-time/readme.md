# Time Picker
Composant pour sélectionner une date et une heure. Il doit être utilisé avec le composant MatDatepicker d'angular Material.  

### Utilisation

Pour pouvoir utiliser le composant, il faut qu'il puisse utiliser un `DateAdapter` supportant les heures. L'interface `DateTimeAdapter` défini la méthode `setTime` que votre `DateAdapter` devra supporter afin que le composant fonctionne correctement.

```typescript
export interface DateTimeAdapter<D> {
    setTime: (date: D, hours: number, minutes: number, seconds: number) => D;
}
```

Par ailleurs, il faudra également fournit les formats d'affichage et d'interprétation permettant d'afficher les informations `time`, les formats fournit par les modules `DateAdapter` fournit par `@angular/material` ne permettent pas leur utilisation. Il faudra ainsi fournir à votre module ou composant une valeur pour le token `MAT_DATE_FORMATS`.

Vous trouverez ci-dessous un example de configuration pour un module et un composant :

```typescript

const myDateTimeFormats = {
    parse: {
        dateInput: 'dd.MM.yyyy HH:mm'
    },
    display: {
        dateInput: 'dd.MM.yyyy HH:mm',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'dd.MM.yyyy HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@NgModule({
    ...,
    imports: [
        ...,
        DateWithTimePickerComponent,
        ...
    ],
    providers: [
        { provide: DateAdapter, useClass: MyDateTimeAdapter },
        { provide: MAT_DATE_FORMATS, useValue: myDateTimeFormats }
    ],
    ...
})
export class SampleModule {}
```

ou au niveau du composant : 

```typescript

const myDateTimeFormats = {
    parse: {
        dateInput: 'dd.MM.yyyy HH:mm'
    },
    display: {
        dateInput: 'dd.MM.yyyy HH:mm',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'dd.MM.yyyy HH:mm',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@Component({
    ...,
    providers: [
        { provide: DateAdapter, useClass: MyDateTimeAdapter },
        { provide: MAT_DATE_FORMATS, useValue: myDateTimeFormats }
    ]
})
export class SampleComponent {}
```
> Ne pas oublier d'importer le `DateWithTimePickerComponent` dans les `imports` et de fournir `MAT_DATE_FORMATS` et `DateApapter` dans les `providers` de vos modules et/ou composants concernés !

Ensuite utiliser le composant comme ceci dans votre template :

```html
<mat-datepicker #dateTimePicker>
    <datepicker-with-time></datepicker-with-time>
</mat-datepicker>
```
