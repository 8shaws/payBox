#![cfg_attr(not(debug_assertions), deny(warnings))]
use anchor_lang::prelude::*;

#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

declare_id!("DTCrGLLNnbFZWRgwzz5WJU92q9CSkwTDbP2KWVcyGNnM");

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "Paybox Wallet Token Program",
    project_url: "https://github.com/shawakash/payBox",
    contacts: "mailto:dev.paybox@gmail.com",
    policy: "https://github.com/shawakash/payBox/blob/dev/SECURITY.md",
    preferred_languages: "en",
    source_code: "https://github.com/shawakash/payBox",
    source_release: "v0",
    auditors: "https://github.com/shawakash/"
}

pub mod instructions;
use instructions::*;

#[program]
pub mod token_contract {
    use super::*;

    pub fn mint_token(ctx: Context<MintToken>, amount: u64) -> Result<()> {
        instructions::mint::mint_token(ctx, amount)
    }

    pub fn transfer_token(ctx: Context<TransferToken>, amount: u64) -> Result<()> {
        instructions::transfer::transfer_token(ctx, amount)
    }

}

