export function prettyString(input: string): string {
    if (!input) {
        return '';
    }


    return input.charAt(0).toUpperCase() + input.slice(1).replace(/_/g, ' ');
}

export function elipseText(input: string, length: number): string {
    return input.length > length ? input.slice(0, length) + '...' : input;
}

export function getNameFromEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        return '';
    }
    return email.substring(0, atIndex);
}

export function isEmailValid(valueEmail: string): boolean {
    return valueEmail.includes('@') && valueEmail.includes('.') && valueEmail.length >= 5 && valueEmail.length <= 200;
}

export function formatBigNumber(number: number | string): string {
    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };
    const parsedNumber = typeof number === 'string' ? parseFloat(number.replace(/,/g, '')) : number;
    return new Intl.NumberFormat('de-DE', options).format(parsedNumber) + ' €';
}


export function formatBoldText(input: string): string {
    return input.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>');
}

export function formatColoredText(input: string): string {
    if (input.includes('-')) {
        return `<span class="text-red-500">${input}</span>`;
    } else if (input.includes('+')) {
        return `<span class="text-green-500">${input}</span>`;
    }
    return input;
}


export function isAlphaNumeric(input: string): boolean {
    return /^[a-z0-9]+$/i.test(input);
}

export function isAlphaNumericAnd(input: string): boolean {
    return /^[a-z0-9&,. ]+$/i.test(input);
}

export function isOver200Char(input: string): boolean {
    return input.length > 200;
}

