import { ask } from '../common.js';

export async function primeNumbers(max = 100) {
    let result = [];
    for(let i = 2; i <= max; i++) {
      if (isPrime(i)) {
        result.push(i);
      }
    }
    return result.join(", ");
}

function isPrime(n) {
    for(let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return n > 1;
}