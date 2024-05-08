use std::env;

pub fn server_port() -> u16 {
    match env::var("PORT") {
        Ok(port) => port.parse::<u16>().unwrap_or(8080),
        Err(_) => 8080,
    }
}
