FROM rust:latest as build

WORKDIR /base

COPY ["turbo.json", "./turbo.json"]
COPY ["Cargo.toml", "./Cargo.toml"]
COPY ["Cargo.lock", "./Cargo.lock"]

COPY ["backend/rs_api", "./backend/rs_api"]


RUN cd /base
RUN cargo build --release

EXPOSE 8080

WORKDIR /base

CMD ["cargo", "run"]
