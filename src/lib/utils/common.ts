export function getAgeFromDOB(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function round(value: number, precision: number = 0): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
}