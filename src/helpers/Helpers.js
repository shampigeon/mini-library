import moment from 'moment';
import ISBN from 'isbn-validate';

export function validateValue(formErrors, value, types, fieldName, readName, patterns = {}, customMess) {
    let isValid = false, message = "Что-то пошло не так";

    for(var i = 0; i < types.length; i++ ) {
        let type = types[i];

        switch(type) {
            case 'email':
                isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                message = customMess ? customMess : 'Email is invalid';
                break;
            case 'isbn':
                isValid = ISBN.Validate(value);
                message = customMess ? customMess : 'ISBN не верен';
                break;
            case 'lesslength':
                isValid = value.length <= Number(patterns.vlength);
                message = customMess ? customMess : `${readName} должно быть не более 30 символов`;
                break;
            case 'morelength':
                isValid = value.length >= Number(patterns.vlength);
                message = customMess ? customMess : `${readName} должно быть более ${value.length} символов`;
                break;
            case 'interval':
                isValid = Number(patterns.vmax) >= value || value > Number(patterns.vmin);
                message = customMess ? customMess : `${readName} должно быть больше ${patterns.vmin} и не более ${patterns.vmax}`;
                break;
            case 'number':
                const isInteger = /^[0-9]+$/;
                isValid = (value === '' || isInteger.test(value));
                message = customMess ? customMess : `Поле ${readName} должно быть числом`;
                break;
            case 'more':
                isValid = (value === '' || Number(value) >= Number(patterns.vmin));
                message = customMess ? customMess : `${readName} должно быть больше ${patterns.vmin}`;
                break;
            case 'moredate':
                let tmpVal = moment(value, "DD.MM.YYYY").valueOf();
                isValid = (value === '' || tmpVal >= Number(patterns.vmin));
                message = customMess ? customMess : `${readName} должно быть больше ${patterns.vmin}`;
                break;
            case 'less':
                isValid = value <= Number(patterns.vmax);
                message = customMess ? customMess : `${readName} должно быть меньше ${patterns.vmax}`;
                break;
            case 'required':
                isValid = String(value).length > 0;
                message = customMess ? customMess : `${readName} должно быть заполнено`;
                break;
            default:
                break;
        }

        if(!isValid) {
            formErrors[fieldName] = message;
            break;
        } else {
            delete formErrors[fieldName];
        }
    }

    return formErrors;
}



export function getBase64Image(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export const defImage = 'data:image/png;base64,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';