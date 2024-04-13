#![cfg_attr(not(debug_assertions), deny(warnings))]

use anchor_lang::prelude::*;

pub mod instructions;
use instructions::*;

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

declare_id!("UdwTHQ9ag5Cvjo1ZMPg3zqTeX1aodFAtVzrnwFGZYhb");

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "Paybox Wallet Transfer Program",
    project_url: "https://github.com/shawakash/payBox",
    contacts: "mailto:dev.paybox@gmail.com",
    policy: "https://github.com/shawakash/payBox/blob/dev/SECURITY.md",
    preferred_languages: "en",
    source_code: "https://github.com/shawakash/payBox",
    source_release: "v0",
    auditors: "https://github.com/shawakash/"
}

#[program]
pub mod paybox {
    use super::*;

    pub fn transfer_lamports(ctx: Context<TransferSol>, amount: u64) -> Result<()> {
        instructions::transfer::transfer_lamports(ctx, amount)
    }

    pub fn transfer_spl_tokens(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        instructions::transfer::transfer_spl_tokens(ctx, amount)
    }
}
