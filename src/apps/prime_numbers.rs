use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn prime_numbers(max_number: u32) -> String {
    let mut primes = Vec::new();
    for num in 2..=max_number {
        if is_prime(num) {
            primes.push(num.to_string());
        }
    }
    primes.join(", ")
}

fn is_prime(n: u32) -> bool {
    if n <= 1 {
        return false;
    }
    for i in 2..(n as f64).sqrt() as u32 + 1 {
        if n % i == 0 {
            return false;
        }
    }
    true
}
