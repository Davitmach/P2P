import type { Api } from 'grammy';

export async function setCommands(api: Api): Promise<void> {
  await api.setMyCommands([
    {
      command: 'start',
      description: 'Запустить бота',
    },
    {
      command: 'orders',
      description: 'Список ордеров',
    },
    {
      command: 'rates',
      description: 'Текущие курсы',
    },
  ]);
}