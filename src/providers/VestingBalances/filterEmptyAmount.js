import { path, filter, compose, gt, __ } from 'ramda';

export const amount = path(['balance', 'amount']);
export const filterEmptyAmount = filter(compose(gt(__, 0), amount));
