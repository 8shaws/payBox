use anchor_lang::prelude::*;
use std::mem::size_of;
use anchor_lang::solana_program::{
    pubkey::Pubkey,
};

declare_id!("GGHvN3Yp4RGJd6NePJKipb3VUrwyYuhxHeUqvuyiCqzM");

#[program]
mod paybox_txn {
    use super::*;

    pub fn get_length(ctx: Context<GetLength>) -> Result<usize> {
        let client = &mut ctx.accounts.client;
        let txn = &client.transactions;
        msg!("Txn Length: # {}", txn.len());
        Ok(txn.len())
    }

    pub fn add_account(ctx: Context<AddAccount>, program_id: Pubkey) -> Result<()> {
        // require!(ctx.accounts.authority.key() != program_id, Err::InvalidAccountData);
        let client = &mut ctx.accounts.client;
        client.transactions = [].to_vec();

        msg!("Initialized new client with default transactions: {}!", client.transactions.len());
        Ok(())
    }
}

#[error_code]
pub enum Err {
    #[msg("Invalid Authority!")]
    InvalidAccountData
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
pub struct Transactions {
    pub transactions: Vec<Transaction>,
}

#[derive(Accounts)]
pub struct GetLength<'info> {
    #[account(mut)]
    pub client: Account<'info, Transactions>,
}

#[derive(Accounts)]
pub struct AddAccount<'info> {
    #[account(init, payer = signer, space = 100 * size_of::<Transaction>())]
    pub client: Account<'info, Transactions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    // #[account(mut, signer)]
    // authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ClientAccount {
    pub amount: u64
}
