import { Composer } from 'grammy';
import type { BotContext } from '../types/session.types';
import { createRatesCommand } from '../commands/rates.command';
import { RatesService } from '../rates.service';



export function createRatesComposer(
    ratesService: RatesService,
): Composer<BotContext> {


  const ratesComposer = new Composer<BotContext>();

  const { ratesCommand,showRates } =
   createRatesCommand(ratesService)
   

  ratesComposer.command('rates',ratesCommand)


  return ratesComposer;
}