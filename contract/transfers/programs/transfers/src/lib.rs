#![cfg_attr(not(debug_assertions), deny(warnings))]

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
use anchor_lang::solana_program::system_instruction;

pub mod instructions;
// use instructions::*;

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

    pub fn transfer_lamports(ctx: Context<TransferLamports>, amount: u64) -> Result<()> {
        let from_account = &ctx.accounts.from;
        let to_account = &ctx.accounts.to;

        // Create the transfer instruction
        let transfer_instruction = system_instruction::transfer(from_account.key, to_account.key, amount);

        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                from_account.to_account_info(),
                to_account.clone(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        Ok(())
    }

    pub fn transfer_spl_tokens(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let token_program = &ctx.accounts.token_program;
        let authority = &ctx.accounts.from;

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();
        
        token::transfer(
            CpiContext::new(cpi_program, cpi_accounts),
            amount)?;
        
        Ok(())
    }
}



#[derive(Accounts)]
pub struct TransferLamports<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    /// CHECK: The account to transfer the lamports from
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}
 

#[derive(Accounts)]
pub struct TransferSpl<'info> {
    pub from: Signer<'info>, // WALLET FROM WHICH TOKENS WILL BE TRANSFERRED
    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>, // TOKEN ACCOUNT FROM WHICH TOKENS WILL BE TRANSFERRED
    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>, // TOKEN ACCOUNT TO WHICH TOKENS WILL BE TRANSFERRED
    pub token_program: Program<'info, Token>,
}