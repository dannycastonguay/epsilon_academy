use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn about() -> String {
    let info = "The purpose of this web app is to run simple applications. Epsilon in math is a small positive number, and in our context, it symbolizes infinite curiosity.\n\
                Founders: Danny Castonguay (your bio here),\n\
                Pascale (Inspired by French math),\n\
                Linus (Inspired by the creator of Linux),\n\
                Ada (Inspired by the first programmer).\n\
                We design all software products ourselves and publish content on what we learn.";
    info.to_string()
}
