import { ask } from '../common.js';

export async function isItGood() {
    const rating = await ask('Please rate us 1-10');
    if (rating === '1') {
      return "Oh, I'm sorry we're not up to your standards.";
    } else {
      return `Thanks for rating us ${rating}, which is more than 1! 😅`;
    }
}