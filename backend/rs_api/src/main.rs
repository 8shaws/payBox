use actix_web::{get, middleware::Logger, App, HttpResponse, HttpServer, Responder};
use env_logger::{Builder, Env};
use log::LevelFilter;
use serde_json::json;
use std::io::Result;
use std::time::{SystemTime};

mod config;

static START_TIME: SystemTime = SystemTime::UNIX_EPOCH;

#[get("/")]
async fn main_handler() -> impl Responder {
    let uptime = SystemTime::now()
        .duration_since(START_TIME)
        .expect("Time went backwards")
        .as_secs();
    HttpResponse::Ok().json(json!({
        "uptime": uptime,
        "message": "Server is healthy!",
        "status": "ok"
    }))
}

#[actix_web::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();
    // env_logger::init();

    let log_level = LevelFilter::Info;

    Builder::from_env(Env::default().default_filter_or(log_level.to_string())).init();

    let port = config::server_port();
    println!("Server running on port: {}", port);

    let worker_count = 5;

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::new("%a %{User-Agent}i %r %s in %T"))
            .service(main_handler)
    })
    .workers(worker_count)
    .bind(("127.0.0.1", port))?
    .on_connect(|_, _| {
        println!("Connection established");
    })
    .run()
    .await
}
