use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
use anchor_lang::solana_program::system_instruction;

#[derive(Accounts)]
pub struct TransferSol<'info> {
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


pub fn transfer_lamports(ctx: Context<TransferSol>, amount: u64) -> Result<()> {
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

    msg!("Transferred {} lamports from {} to {}", amount, from_account.key, to_account.key);

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

    msg!("Transferred {} tokens from {} to {}", amount, source.to_account_info().key, destination.to_account_info().key);
    
    Ok(())
}