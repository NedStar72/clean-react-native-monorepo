import type { JSON } from '@packages/ts-kit';

export type BaseStep = string;

export type BaseParams = Record<string, NonNullable<JSON>>;

export type BaseSteps = Record<BaseStep, BaseParams>;
