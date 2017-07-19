/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CountriesService } from '../services/countries.service';
import { Country } from '../services/countries.service';

// ngrx
import { Store } from '@ngrx/store';
import { KeyCodes } from '../../../src/common/core/keycodes.enum';
import { MaterialColors } from '../../../src/common/core/style/material-colors';
import { IappState } from './model/app-state.interface';
import { IUser } from './model/user.interface';
import { UserService } from './service/user.service';

const formValidator = (control: AbstractControl): { [key: string]: string } => {
    const skillsCtrl = control.get('skills');
    const skillsErrorsCtrl = control.get('skillsErrors');
    skillsErrorsCtrl.setErrors(skillsCtrl.errors);
    skillsErrorsCtrl.markAsDirty();
    skillsErrorsCtrl.markAsTouched();
    return null;
};

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'reactive-form-demo',
    styleUrls: ['./reactive-form-demo.scss'],
    templateUrl: './reactive-form-demo.html',
})
export class ReactiveFormDemoComponent implements AfterContentInit, OnInit, OnDestroy {
    protected tabIndex = 1;
    protected form: FormGroup;

    protected formMap = {} as { [key: string]: any };

    protected user$: Observable<IUser>;

    private _readonly = false;
    private countries: Observable<Country[]>;

    private valueChanges$sub: Subscription;
    private user$sub: Subscription;

    @Input()
    public set readonly(value: boolean) {
        if (value) {
            this.form.disable();
        } else {
            this.form.enable();
        }
        this._readonly = value;
    }

    public get readonly() {
        return this._readonly;
    }

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        fb: FormBuilder,
        countriesService: CountriesService,
        protected materialColors: MaterialColors,
        private _store: Store<IappState>,
        private _userService: UserService,
    ) {
        this.countries = countriesService.getCountries$();

        this.form = fb.group({
            name: [{ value: '', disabled: this.readonly }, Validators.compose([Validators.required, Validators.maxLength(20)])],
            country: [{ value: null, disabled: this.readonly }, Validators.required],
            visitedCountries: [{ value: [], disabled: this.readonly }, Validators.required],
            birthDate: [{ value: null, disabled: this.readonly }, Validators.required],
            size: [{ value: 0, disabled: this.readonly }, Validators.pattern(new RegExp('[0-9]{1,3}'))],
            color: [{ value: null, disabled: this.readonly }],
            color2: [{ value: null, disabled: this.readonly }],
            skills: [{ value: null, disabled: this.readonly }, Validators.required],
            skillsErrors: [null],
            remark: [{ value: null, disabled: this.readonly }, Validators.compose([Validators.required, Validators.maxLength(500)])],
            ranges: [{ value: [], disabled: this.readonly }],
        },
            { validator: formValidator });

        this.user$ = this._store.select('user');
        this._userService.mockApiGetUser();

    }

    public ngOnDestroy() {
        if (this.valueChanges$sub) {
            this.valueChanges$sub.unsubscribe();
        }
        if (this.user$sub) {
            this.user$sub.unsubscribe();
        }
    }

    public ngOnInit() {
        this.valueChanges$sub = this.form.valueChanges
            .filter(() => this.form.status !== 'PENDING')
            .debounceTime(500)
            .distinctUntilChanged((previousForm: { [key: string]: any }, currentForm: { [key: string]: any }) => {
                // true stops, false executes subscribe
                return JSON.stringify(previousForm) === JSON.stringify(currentForm);
            })
            .subscribe((formMap) => {
                // this.form.valid
                this.formMap = formMap;
                this.changeDetectorRef.markForCheck();
            });
    }

    public ngAfterContentInit() {

        this.user$sub = this.user$
            .delay(1)
            .filter((user: IUser) => !!user)
            .subscribe((user: IUser) => {
                this.form.setValue({
                    name: user.name || '',
                    country: user.country || null,
                    visitedCountries: user.visitedCountries || [],
                    birthDate: user.birthDate || null,
                    size: user.size || 0,
                    color: user.color || null,
                    color2: user.color2 || null,
                    skills: user.skills || [],
                    skillsErrors: null,
                    remark: user.remark || null,
                    ranges: user.ranges || [],
                });
            });
    }

    protected onSkillKeyDown(e: KeyboardEvent) {
        if (e.keyCode === KeyCodes.Enter) {
            const target = e.target as HTMLInputElement;
            this.onAddSkill(target);
        }
    }

    protected onAddSkill(input: HTMLInputElement) {
        let skill = input.value;
        if (skill) {
            skill = skill.trim();
            if (skill) {
                const skills = this.form.value.skills as string[];
                skills.push(skill);
                input.value = '';
                this.form.controls.skills.updateValueAndValidity();
            }
        }
    }

    protected getError(fieldName: string) {
        const field = this.form.get(fieldName);
        if (field && field.errors) {
            const errors = Object.keys(field.errors);
            if (errors.length) {
                return errors[0];
            }
        }

        return undefined;
    }

    protected onSubmit() {
        console.log('Form submitted.');
    }
}
