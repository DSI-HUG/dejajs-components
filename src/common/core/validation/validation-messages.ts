/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */

// Attention, spécifier ici que les messages génériques. Créez votre propre objet pour les messages spécifiques à votre page
export class ValidationMessages {
    private messages = {
        duplicatename: 'Ce nom existe déjà.',
        invalideDate: 'Date invalide',
        required: 'Ce champ est obligatoire.',
    };

    public getMessage(key: string) {
        return this.messages[key];
    }
};
