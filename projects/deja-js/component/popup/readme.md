# DPI Dialog

Service qui sert à afficher un dialog a l'écran.

## Utilisation simple

L'ouverture d'un dialog doit se faire via la méthode `DpiDialogService.open()`

Exemple
```
    public callOpenDialog() {
    
        this.dpiDialogService.open(
                "Titre",
                "Etes-vous sure de vouloire faire cela ?",
                this.viewContainerRef,
                [DpiDialogButton.Save]
            ).subscribe((response: DpiDialogReponse) => {
                if (response.accepted) {
                    // Ca roule!
                }
            });
    }
```

`ViewContainerRef` est injecté dans le constructeur
```
    public constructor(private dpiDialogService: DpiDialogService,
                private viewContainerRef: ViewContainerRef) {
    }
```

## Utilisation avec un custom dialog
Il doit implémenter un composant qui étant la class `DpiDialogComponent`

Un exemple complet se trouve dans la la DemoApp

Exemple

```

    import {Component} from "@angular/core";
    import {DpiDialogComponent} from "../../popup/popup.component";
    @Component({
        selector: 'custom-dialog',
        template: `
    <deja-popup title="Custom dialog"
                type="warn"
                [actions]="actions" >
                <p> This is a custom defined by the component <i>popup-custom.component</i></p>
    <mat-icon>accessibility</mat-icon>
    <mat-form-field>
            <textarea mat-autosize mat-form-field 
            [(ngModel)]="inputText" 
                    placeholder="Ceci est un test de saisie" >
            </textarea>
            </mat-form-field>
    </deja-popup>`,
    })
    export class DpiDialogDemoComponent extends DpiDialogComponent {
        public inputText: string;
    }

```

## ToDo
- [*] refactor: IButton to DpiDialogAction?
- [*] refactor: public actions: DpiButton[]; actions or button?
- [*] isolate DpiButton in DpiDialogActionComponent
- [*] isolate DpiDialogActionComponent for portal injection
- [*] refactor: move from MatDialog position directly
- [*] refactor: DPiDialogCom in Service
- [*] refactor: max toolbar click area
- [ ] feat: UpdateSize
- [ ] feat: Focus in tray
- [ ] feat: Move in tray
- [ ] refactor: rename Tray to Drawer
- [ ] refactor: remove popup-frameless?
- [*] refactor: DpiDialogAction
- [*] feat: unlisten on iframe overlay and keypress
- [ ] fix: DpiDialogConfig getDefaultPosition review 
- [*] refactor: abstract class DpiDialogBase 
- [ ] review DpiDialogReponse
- [*] fix: backdropclick for DpiDialogComponent do not close the box in the drawer
- [*] before close in abstract class
- [*] DpiDialogAction refreshDrawer
- [ ] refactor: readme 
- [*] refactor: service folder 
- [ ] tests
- [ ] template in DpiDialogBox
