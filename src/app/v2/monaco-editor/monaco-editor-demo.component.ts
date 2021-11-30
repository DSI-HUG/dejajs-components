/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Destroy } from '@deja-js/component/core';
import { Language } from '@deja-js/component/v2/monaco-editor';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { takeUntil } from 'rxjs';

import { MonacoEditorDemoService } from './monaco-editor-demo.service';

export interface PokemonForm {
    pokemons: string[];
}

export interface Pokemon {
    value: string;
    viewValue: string;
}

export interface PokemonGroup {
    disabled?: boolean;
    name: string;
    pokemon: Pokemon[];
}

@Component({
    selector: 'monaco-editor-demo',
    templateUrl: './monaco-editor-demo.component.html',
    styleUrls: ['./monaco-editor-demo.component.scss']
})
export class MonacoEditorDemoComponent extends Destroy implements OnInit {
    public pokemonFormGroup: IFormGroup<PokemonForm>;
    public pokemonGroups: PokemonGroup[] = [
        {
            name: 'Grass',
            pokemon: [
                { value: 'bulbasaur-0', viewValue: 'Bulbasaur' },
                { value: 'oddish-1', viewValue: 'Oddish' },
                { value: 'bellsprout-2', viewValue: 'Bellsprout' }
            ]
        },
        {
            name: 'Water',
            pokemon: [
                { value: 'squirtle-3', viewValue: 'Squirtle' },
                { value: 'psyduck-4', viewValue: 'Psyduck' },
                { value: 'horsea-5', viewValue: 'Horsea' }
            ]
        },
        {
            name: 'Fire',
            disabled: true,
            pokemon: [
                { value: 'charmander-6', viewValue: 'Charmander' },
                { value: 'vulpix-7', viewValue: 'Vulpix' },
                { value: 'flareon-8', viewValue: 'Flareon' }
            ]
        },
        {
            name: 'Psychic',
            pokemon: [
                { value: 'mew-9', viewValue: 'Mew' },
                { value: 'mewtwo-10', viewValue: 'Mewtwo' }
            ]
        }
    ];

    public tabIndex = 1;

    public xmlContent: string;
    public xmlContentToCompare: string;
    public jsonContent: string;
    public jsonContentToCompare: Language;

    public dynamicContent: string;
    public dynamicLanguage: Language;

    public readOnly = false;

    private formBuilder: IFormBuilder;

    public constructor(
        private fileService: MonacoEditorDemoService,
        formBuilder: FormBuilder
    ) {
        super();
        this.formBuilder = formBuilder;

        this.pokemonFormGroup = this.formBuilder.group<PokemonForm>({
            pokemons: []
        });

        this.pokemonFormGroup.valueChanges.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(values => {
            console.log(values);
        });
    }

    public allComplete(group: PokemonGroup): boolean {
        const selectedSet = new Set(this.pokemonFormGroup.controls.pokemons.value || []);
        return group.pokemon.filter(g => selectedSet.has(g.value)).length === group.pokemon.length;
    }

    public someComplete(group: PokemonGroup): boolean {
        const selectedSet = new Set(this.pokemonFormGroup.controls.pokemons.value || []);
        const selectedCount = group.pokemon.filter(g => selectedSet.has(g.value)).length;
        return selectedCount > 0 && selectedCount < group.pokemon.length;
    }

    public setAll(completed: boolean, group: PokemonGroup): void {
        let selected = this.pokemonFormGroup.controls.pokemons.value || [];

        if (completed) {
            const selectedSet = new Set(selected);
            group.pokemon.forEach(g => {
                if (!selectedSet.has(g.value)) {
                    selected.push(g.value);
                }
            });
        } else {
            const unselect = new Set(group.pokemon.map(g => g.value));
            selected = selected.filter(s => !unselect.has(s));
        }

        this.pokemonFormGroup.controls.pokemons.patchValue(selected, { emitEvent: false });
    }

    public ngOnInit(): void {
        this.fileService.getFile$('xmlFile.xml').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.xmlContent = val);

        this.fileService.getFile$('xmlFileToCompare.xml').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.xmlContentToCompare = val);

        this.fileService.getFile$('jsonFile.json').pipe(
            takeUntil(this.destroyed$)
        ).subscribe(val => this.jsonContent = val);

        this.fileService.getFile$('jsonFileToCompare.json').pipe(
            takeUntil(this.destroyed$)
        ).subscribe((val: Language) => this.jsonContentToCompare = val);

        this.updateLanguage('xml');
    }

    public onValueChange(): void {
        // console.log('Value changed');
    }

    public onValueToCompareChange(): void {
        // console.log('ValueToCompare changed');
    }

    public updateLanguage(lang: string): void {
        switch (lang) {
            case 'json':
                this.dynamicLanguage = lang;
                this.dynamicContent = this.jsonContent;
                break;
            default:
                this.dynamicLanguage = 'xml';
                this.dynamicContent = this.xmlContent;
                break;
        }
    }
}
