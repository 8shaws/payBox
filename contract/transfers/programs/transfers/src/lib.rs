use anchor_lang::prelude::*;
use std::mem::size_of;
use std::ops::DerefMut;
use anchor_lang::solana_program::{
    pubkey::Pubkey,
};

declare_id!("AGXridxL3idGh8HJThTWciVEAAtqA7NKm7hEF5vDRJvE");

#[program]
mod paybox_txn {
    use super::*;

    pub fn get_length(ctx: Context<GetLength>) -> Result<usize> {
        require_keys_eq!(
            ctx.accounts.authority.key(),
            ctx.accounts.client.authority,
            ErrorCode::Unauthorized
        );

        let client = &mut ctx.accounts.client;
        let txn = &client.transactions;
        msg!("Txn Length: # {}", txn.len());
        Ok(txn.len())
    }

    // pub fn transer() -> Result<()> {

    // }

    pub fn add_account(ctx: Context<AddAccount>, _program_id: Pubkey) -> Result<()> {
        let client = ctx.accounts.client.deref_mut();
        let bump = ctx.bumps.client;

        *client = AccountData {
            authority: *ctx.accounts.authority.key,
            bump,
            transactions: [].to_vec(),
        };

        msg!("Initialized new client with default account with txn: {}!", client.transactions.len());
        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Counter {
    pub count: u64
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Transaction {
    pub sender: Pubkey,
    pub receiver: Pubkey,
    pub amount: u64,
}

#[account]
pub struct AccountData {
    pub authority: Pubkey,
    pub bump: u8,
    pub transactions: Vec<Transaction>,
}

#[derive(Accounts)]
pub struct GetLength<'info> {
    #[account(
        mut,
        seeds = [b"account".as_ref()],
        bump = client.bump
    )]
    pub client: Account<'info, AccountData>,
    #[account(mut)]
    authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddAccount<'info> {
    #[account(
        init, 
        payer = authority, 
        space = size_of::<AccountData>(), 
        seeds = [b"account".as_ref()], 
        bump
    )]
    pub client: Account<'info, AccountData>,
    #[account(mut)]
    authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// pub struct Transfer<'info> {
//     #[account()]
// }