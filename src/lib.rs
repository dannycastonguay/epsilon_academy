mod apps {
    pub mod about;
    pub mod hello_world;
    pub mod prime_numbers;
}

use wasm_bindgen::prelude::*;
use crate::apps::about::about;
use crate::apps::hello_world::hello_world;
use crate::apps::prime_numbers::prime_numbers;

#[wasm_bindgen]
pub fn route_command(command: String, arg: Option<u32>) -> String {
    match command.as_str() {
        "about" => about(),
        "hello_world" => hello_world(),
        "prime_numbers" => {
            let max_number = arg.unwrap_or(10);  // Default to 10 if no argument is provided
            prime_numbers(max_number)
        }
        _ => about(),
    }
}
