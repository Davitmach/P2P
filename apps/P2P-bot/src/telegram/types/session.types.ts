
import { Context, SessionFlavor } from 'grammy';
import {
  Conversation,
  ConversationFlavor,
} from '@grammyjs/conversations';

export interface SessionData {}

export type BotContext = Context &
  SessionFlavor<SessionData> &
  ConversationFlavor<Context>;

export type BotConversation = Conversation<BotContext, BotContext>;
