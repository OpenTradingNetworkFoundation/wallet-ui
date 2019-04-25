import {
  path,
  compose,
  converge,
  divide,
  multiply,
  prop,
  gt,
  __,
  ifElse,
  applySpec,
  curryN,
  reduce
} from 'ramda';
import { format, differenceInSeconds } from 'date-fns';
import { round, subtract, floor } from 'mathjs';

import { days, getUTCDate } from './helpers';

const policy = path(['policy', '1']);
const amount = path(['balance', 'amount']);
const assetId = path(['balance', 'asset_id']);

const vestingSeconds = compose(prop('vesting_seconds'), policy);
const coinSecondsEarned = compose(prop('coin_seconds_earned'), policy);
const startClaim = compose(prop('start_claim'), policy);
const beginTimestampProp = compose(prop('begin_timestamp'), policy);
const vestingCliff = compose(prop('vesting_cliff_seconds'), policy);
const vestingPeriod = compose(prop('vesting_duration_seconds'), policy);
const beginBalance = compose(prop('begin_balance'), policy);

// CDD
const elapsedSeconds = converge(differenceInSeconds, [getUTCDate, startClaim]);
const availableWithdrawal = compose(
  floor,
  converge(multiply, [amount, elapsedSeconds])
);
const amountOrTotal = ifElse(
  gt(vestingSeconds),
  amount,
  availableWithdrawal,
  elapsedSeconds
);

// LINEAR
const elapsedTime = converge(differenceInSeconds, [
  getUTCDate,
  beginTimestampProp
]);
const isBalanceAvailable = converge(gt, [elapsedTime, vestingCliff]);
const vestingPercentage = converge(divide, [elapsedTime, vestingPeriod]);
const remainingAmount = converge(multiply, [beginBalance, vestingPercentage]);
const withdrawnAlready = converge(subtract, [beginBalance, amount]);
const allowedWithdrawal = compose(
  floor,
  converge(subtract, [remainingAmount, withdrawnAlready])
);

const vestingBalanceType = path(['policy', '0']);

const formatLinearBalance = balance => {
  return {
    id: prop('id', balance),
    type: vestingBalanceType(balance),
    assetId: assetId(balance),
    startDate: format(beginTimestampProp(balance), 'DD.MM.YYYY'),
    cliff: round(days(vestingCliff(balance)), 2),
    period: round(days(vestingPeriod(balance)), 2),
    amount: amount(balance),
    availableWithdrawal: isBalanceAvailable(balance)
      ? elapsedTime(balance) > vestingPeriod(balance)
        ? amount(balance)
        : allowedWithdrawal(balance)
      : 0
  };
};

const curriedRound = curryN(2, round);
const curriedFormat = curryN(2, format);
const toReadableDays = compose(curriedRound(__, 2), days);

const formatCDDBalance = applySpec({
  id: prop('id'),
  type: vestingBalanceType,
  assetId: assetId,
  startDate: compose(curriedFormat(__, 'DD.MM.YYYY'), startClaim),
  amount: amount,
  availableWithdrawal: amountOrTotal,
  vestingSeconds: compose(toReadableDays, vestingSeconds),
  coinSecondsEarned: compose(toReadableDays, coinSecondsEarned)
});

export const vestingBalanceReducer = (acc, b) =>
  acc.concat(
    vestingBalanceType(b) === 0 ? formatLinearBalance(b) : formatCDDBalance(b)
  );

export const formatVestingBalances = reduce(vestingBalanceReducer, []);
