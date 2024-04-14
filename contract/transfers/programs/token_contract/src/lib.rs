use anchor_lang::prelude::*;
use anchor_spl::token;
use anchor_spl::token::{Token, MintTo, Mint, Transfer};

declare_id!("CnQY56UWDHc6kkeENU7jp4QZEkEpUsE3cJNKRm9Q5qvK");


#[program]
pub mod token_contract {
    use super::*;

    pub fn initialize_mint(ctx: Context<InitializeMint>) -> Result<()> {
        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitializeMint<'info> {
    #[account(
        init,
        payer = payer,
        mint::decimals = 9,
        mint::authority = payer,
        mint::freeze_authority = payer,
    )]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    ///CHECK: This is not dangerous because we don't read or write from this account
    pub rent: AccountInfo<'info>,
}
