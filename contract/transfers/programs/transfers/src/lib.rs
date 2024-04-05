use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("D7sGh1vHw26HB3vox3MogCVQE8ZBDXpPsfTXtewxzq6m");

// pub struct Transfer<'info> {
//     pub from: AccountInfo<'info>,
//     pub to: AccountInfo<'info>,
//     pub authority: AccountInfo<'info>,
// }

#[program]
pub mod sol_transfer {
    use super::*;

    pub fn transfer_sol(ctx: Context<TransferSol>, amount: u64) -> ProgramResult {
        msg!("Transferring SOL");
        msg!("From: {:?}", ctx.accounts.from.key);
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info(),
            to: ctx.accounts.to.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        Ok(token::transfer(cpi_ctx, amount)?)

    }
}



#[derive(Accounts)]
pub struct TransferSol<'info> {
    #[account(mut, constraint = from.owner == system_program.key)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub from: AccountInfo<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub to: AccountInfo<'info>,
    #[account(signer)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub authority: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub token_program: AccountInfo<'info>,
}