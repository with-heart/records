import {
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
} from '@chakra-ui/core';
import DatePicker from 'src/components/DatePicker';
import RecordForm from 'src/components/records/form';
import RecordsList from 'src/components/records/list';
import moment from 'moment';
import { useState } from 'react';
import { useStore } from 'src/store';

export default ({ filters, frozenType }) => {
  const { date, nextDate, prevDate, setDate } = useStore((state) => ({
    date: state.ui.date,
    nextDate: state.nextDate,
    prevDate: state.prevDate,
    setDate: state.setDate,
  }));
  const [selectedRecord, setSelectedRecord] = useState();

  return (
    <Box>
      <Flex justifyContent={'flex-start'}>
        <IconButton
          size={'sm'}
          icon={'chevron-left'}
          mr={2}
          onClick={prevDate}
        />
        <DatePicker selected={date} onChange={setDate} />
        <Button mx={2} size={"sm"} onClick={() => setDate(moment())}>Today</Button>
        <IconButton
          size={'sm'}
          icon={'chevron-right'}
          onClick={nextDate}
        />
      </Flex>
      <Stack>
        <RecordForm
          date={date}
          model={selectedRecord}
          frozenType={frozenType}
        />
        <RecordsList filters={filters} onItemSelect={setSelectedRecord} />
      </Stack>
    </Box>
  );
};