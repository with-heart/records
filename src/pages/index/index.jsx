import {
  Box,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  Text,
  Divider,
  Heading,
} from '@chakra-ui/core';
import Task from 'src/assets/Task';
import Card from 'src/components/Card';
import TabCard from 'src/components/TabCard';
import Tasks from 'src/modules/Tasks';
import Water from 'src/modules/Water';
import { useStore } from 'src/store';
import TasksSummary from 'src/pages/index/TasksSummary';
import GlucoseSummary from 'src/pages/index/GlucoseSummary';
import WaterSummary from 'src/pages/index/WaterSummary';
import TransactionSummary from 'src/pages/index/TransactionSummary';
export default () => {
  const { date } = useStore((state) => ({
    date: state.ui.date,
  }));
  return (
    <Box p={10}>
      <Stack spacing={10}>
        <Stack>
          <Heading size={'md'}>Tasks</Heading>
          <Card>
            <TasksSummary />
          </Card>
        </Stack>
        <Stack isInline spacing={10}>
          <Stack flex={1}>
            <Heading size={'md'}>Glucose</Heading>
            <Card>
              <GlucoseSummary />
            </Card>
          </Stack>
          <Stack flex={1}>
            <Heading size={'md'}>Water</Heading>
            <Card>
              <WaterSummary />
            </Card>
          </Stack>
        </Stack>
        <Stack>
          <Heading size={'md'}>Transactions</Heading>
          <Card>
            <TransactionSummary />
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};
