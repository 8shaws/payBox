use anchor_lang::prelude::*;

declare_id!("CiY6jVvB6WEyXEBR8nTJXapQNoNvsqDhKUhv6BFWaA85");

#[program]
mod hello_world {
    use super::*;
    pub fn say_hello(ctx: Context<SayHello>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Hello World! - Greeting # {}", counter.count);
        Ok(())
    }
    pub fn initialize_counter(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        msg!("Initialized new count. Current value: {}!", counter.count);
        Ok(())
    }
}

#[account]
pub struct Counter {
    count: u64
}

#[derive(Accounts)]
pub struct SayHello<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}