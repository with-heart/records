import { Box, Stack } from '@chakra-ui/core';
import React from 'react';
import Card from 'src/components/core/card';
import TasksSummary from 'src/pages/index/TasksSummary';
import GlucoseSummary from 'src/pages/index/GlucoseSummary';
import WaterSummary from 'src/pages/index/WaterSummary';
import TransactionSummary from 'src/pages/index/TransactionSummary';
import Tabs, { TabItem } from 'src/components/core/tabs';
import Water from 'src/pages/water';
export default () => {
  return (
    <Box>
      <Stack spacing={10}>
        <Card animate highlight p={2}>
          <TasksSummary />
        </Card>
        <Stack isInline spacing={10}>
          <Card animate highlight w={'100%'} p={2}>
            <GlucoseSummary />
          </Card>
          <Card animate highlight w={'100%'} p={2}>
            <WaterSummary />
          </Card>
        </Stack>
        <Card animate highlight p={2}>
          <TransactionSummary />
        </Card>
      </Stack>
    </Box>
  );
};
