/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { AfterContentInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { IEditorLanguage } from '../../component/monaco-editor/options/editor-language.model';
import { Color } from './../../common/core/graphics/color';
import { IRange } from './../../component/range/range.interface';
import { CountriesService } from './../services/countries.service';
import { ICountry } from './../services/countries.service';

@Component({
    selector: 'reactive-form-demo',
    styleUrls: ['./reactive-form-demo.scss'],
    templateUrl: './reactive-form-demo.html',
})
export class ReactiveFormDemoComponent implements AfterContentInit {
    protected tabIndex = 1;
    protected form: FormGroup;

    protected exampleValue = `
    `;

    protected html = IEditorLanguage.HTML;
    protected formMap = {} as { [key: string]: any };

    private _readonly = false;
    private countries: Observable<ICountry[]>;

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

    constructor(private changeDetectorRef: ChangeDetectorRef, fb: FormBuilder, countriesService: CountriesService) {
        this.countries = countriesService.getCountries$();

        this.form = fb.group({
            name: [{ value: '', disabled: this.readonly }, Validators.compose([Validators.required, Validators.maxLength(20)])],
            country: [{ value: null, disabled: this.readonly }, Validators.required],
            visitedCountries: [{ value: [], disabled: this.readonly }, Validators.required],
            birthDate: [{ value: null, disabled: this.readonly }, Validators.required],
            size: [{ value: 0, disabled: this.readonly }, Validators.pattern(new RegExp('[0-9]{1,3}'))],
            color: [{ value: null, disabled: this.readonly }],
            skills: [{ value: null, disabled: this.readonly }],
            remark: [{ value: null, disabled: this.readonly }, Validators.compose([Validators.required, Validators.maxLength(500)])],
            ranges: [{ value: [], disabled: this.readonly }],
        });

        this.form.valueChanges
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
        const user = {
            birthDate: new Date(1968, 5, 24),
            color: new Color(2, 119, 189),
            size: 174,
            ranges: [
                {
                    min: 0,
                    max: 10,
                },
                {
                    min: 10,
                    max: 30,
                },
                {
                    min: 30,
                    max: 80,
                }
            ],
            country: {
                naqme: 'Switzerland',
                code: 'CH',
            } as ICountry,
            visitedCountries: [{
                naqme: 'Switzerland',
                code: 'CH',
            } as ICountry],
            name: 'Serge',
            skills: ['angular2', 'ngrx', 'typescript', 'html5', 'css3'],
            remark: 'vapkse',
        } as IUser;

        Observable.of(user)
            .delay(1)
            .subscribe(() => {
                this.form.setValue({
                    name: user.name || '',
                    country: user.country || null,
                    visitedCountries: user.visitedCountries || [],
                    birthDate: user.birthDate || null,
                    size: user.size || 0,
                    color: user.color || null,
                    skills: user.skills || [],
                    remark: user.remark || null,
                    ranges: user.ranges || [],
                });
            });
    }
}

interface IUser {
    name: string;                       // MdInput
    country: ICountry;                  // DejaSelect
    visitedCountries: ICountry[];       // DejaSelect => MultiSelect
    birthDate: Date;                    // DejaDatePicker && DejaDateSelector
    size: number,                       // DejaCircularPicker
    color: Color,                       // DejaColorPicker && DejaColor Selector
    skills: string[];                   // DejaChips
    remark: string;                     // DejaContentEditable
    ranges: IRange[];                   // DejaRange
}
