import moment from 'moment';
export const today = (date) => ({
  _and: [
    {
      timestamp: { _gte: moment(date).startOf('day').toISOString(true) },
    },
    { timestamp: { _lte: moment(date).endOf('day').toISOString(true) } },
  ],
});

export const expenses = (date) => ({
  _and: [
    {
      timestamp: { _gte: moment(date).startOf('day').toISOString(true) },
    },
    { timestamp: { _lte: moment(date).endOf('day').toISOString(true) } },
    { type: { _eq: 'expense' } },
  ],
});

export const incomes = (date) => ({
  _and: [
    {
      timestamp: { _gte: moment(date).startOf('day').toISOString(true) },
    },
    { timestamp: { _lte: moment(date).endOf('day').toISOString(true) } },
    { type: { _eq: 'income' } },
  ],
});
