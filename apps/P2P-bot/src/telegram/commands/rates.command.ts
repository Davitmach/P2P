import type { Context } from 'grammy';

import { RatesService } from '../rates.service';
import { formatRatesMessage } from '../messages/rates.messages';

function calculatePercentChange(
  current: number,
  previous: number,
): number | undefined {
  if (previous === 0) {
    return undefined;
  }

  const percent = Number(
    (((current - previous) / previous) * 100).toFixed(2),
  );

  return percent === 0 ? undefined : percent;
}

export function createRatesCommand(ratesService: RatesService) {
  async function showRates(ctx: Context): Promise<void> {
    const lastHour = await ratesService.getLastHourRate();
    const current = await ratesService.getCurrentRate();

    if (!current) {
      await ctx.reply('❌ Не удалось получить текущие курсы.');
      return;
    }

    let sellMaxPercent: number | undefined;
    let sellAvgPercent: number | undefined;
    let sellMinPercent: number | undefined;

    let buyMaxPercent: number | undefined;
    let buyAvgPercent: number | undefined;
    let buyMinPercent: number | undefined;


    if (lastHour) {
      sellMaxPercent = calculatePercentChange(
        current.sell.max,
        Number(lastHour.sellMaxPrice),
      );

      sellAvgPercent = calculatePercentChange(
        current.sell.avg,
        Number(lastHour.sellAvgPrice),
      );

      sellMinPercent = calculatePercentChange(
        current.sell.min,
        Number(lastHour.sellMinPrice),
      );

      buyMaxPercent = calculatePercentChange(
        current.buy.max,
        Number(lastHour.buyMaxPrice),
      );

      buyAvgPercent = calculatePercentChange(
        current.buy.avg,
        Number(lastHour.buyAvgPrice),
      );

      buyMinPercent = calculatePercentChange(
        current.buy.min,
        Number(lastHour.buyMinPrice),
      );
    }

    const text = formatRatesMessage({
      date: new Date(current.date),

      asset: 'USDT',
      fiat: 'AMD',

      sell: {
        max: current.sell.max,
        avg: current.sell.avg,
        min: current.sell.min,

        maxPercent: sellMaxPercent,
        avgPercent: sellAvgPercent,
        minPercent: sellMinPercent,
      },

      buy: {
        max: current.buy.max,
        avg: current.buy.avg,
        min: current.buy.min,

        maxPercent: buyMaxPercent,
        avgPercent: buyAvgPercent,
        minPercent: buyMinPercent,
      },
    });

    await ctx.reply(text, {
      parse_mode: 'HTML',
    });
  }

  async function ratesCommand(ctx: Context): Promise<void> {
    await showRates(ctx);
  }

  return {
    showRates,
    ratesCommand,
  };
}