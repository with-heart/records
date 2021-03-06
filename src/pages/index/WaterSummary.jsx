import { Stack, Progress, Text, Heading } from '@chakra-ui/core';
import React from 'react';
import useAggregate from 'src/hooks/graphql/useAggregate';
import useQuery from 'src/hooks/graphql/useQuery';
import * as WaterFilters from 'src/modules/Water/filters';
import moment from 'moment';
import { useStore } from 'src/store';
export default () => {
  const { date } = useStore((state) => ({
    date: state.ui.date,
  }));
  const [todayAgg] = useAggregate({
    name: 'water',
    where: WaterFilters.today(date),
    aggregates: { count: [], sum: ['quantity'] },
  });
  const [yesterdayItems] = useQuery({
    name: 'water',
    where: WaterFilters.today(moment(date).subtract(1, 'days')),
    fields: ['timestamp', 'quantity'],
  });
  const percentage = Math.ceil((todayAgg?.sum.quantity * 100) / 3000) || 0;
  const yestItemsBeforeNow = yesterdayItems
    ? yesterdayItems
        .filter((i) => moment(i.timestamp).unix() < date.unix())
        .map((i) => i.quantity)
    : [];
  const yestSum =
    yestItemsBeforeNow.reduce((p, c) => p + c, 0) || 0;
  const yestPercentage = (yestSum * 100) / 3000;

  const isTodayAhead = percentage > yestPercentage;
  return (
    <Stack w={'100%'} p={1} spacing={5} isInline alignItems={'center'}>
      <Stack alignItems={'center'}>
        <Heading mt={2} size={'md'}>
          Water
        </Heading>
      </Stack>
      <Stack w={'100%'}>
        <Stack isInline>
          <Text>Today's Consumption:</Text>
          <Text>{todayAgg?.sum.quantity} / 3000 ML</Text>
        </Stack>
        <Progress
          borderRadius={5}
          value={percentage}
          color={isTodayAhead ? 'green' : 'red'}
        />
        <Stack isInline>
          <Text>Yesterday till this time:</Text>
          <Text>{yestSum} / 3000 ML</Text>
        </Stack>
        <Progress
          borderRadius={5}
          value={yestPercentage}
        />
      </Stack>
    </Stack>
  );
};
