import { ask } from '../common.js';

export async function personalInfo() {
    const name = await ask('What is your name?');
    const age = await ask('What is your age?');
    let driversLicense = '';

    if (parseInt(age) > 15) {
      driversLicense = await ask('Do you have a driver\'s license? (yes/no)');
    }

    const confirmation = `Your name is ${name} and you are ${age} years old.`;
    const licenseInfo = driversLicense ? ` Driver's License: ${driversLicense}.` : ' You are too young for a driver\'s license.';

    return confirmation + licenseInfo;
}