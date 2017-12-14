import { ValidationMessages } from './validation-messages';

fdescribe('ValidationMessages', () => {

    const validationMessages = new ValidationMessages();

    it('should return duplicatename message', () => {
       expect(validationMessages.getMessage('duplicatename')).toEqual('Ce nom existe déjà.');
    });

    it('should return invalideDate message', () => {
        expect(validationMessages.getMessage('invalideDate')).toEqual('Date invalide');
    });

    it('should return required message', () => {
        expect(validationMessages.getMessage('required')).toEqual('Ce champ est obligatoire.');
    });

    it('should return undefined', () => {
        expect(validationMessages.getMessage('qwertzqwertz')).toBeUndefined();
    });

    it('should return undefined', () => {
        expect(validationMessages.getMessage(null)).toBeUndefined();
    });
});
