import { Box, SimpleGrid, Stack } from '@chakra-ui/core';
import { useEffect } from 'react';
import Filters from 'src/components/records/Filters';
import RecordsWithForm from 'src/components/records/RecordsWithForm';
import DailyTrends from 'src/components/records/charts/DailyTrends';
import WeeklyTrends from 'src/components/records/charts/WeeklyTrends';
import { useStore } from 'src/store';

export default () => {
  const { date, setColors } = useStore((state) => ({
    date: state.ui.date,
    setColors: state.setColors,
  }));

  useEffect(() => {
    setColors({ primary: 'red', secondary: 'orange' });
  }, []);
  return (
    <Box py={30}>
      <Filters filters={{ date: date, recordType: 'glucose' }}>
        {(filters) => (
          <Box>
            <RecordsWithForm filters={filters} frozenType={'glucose'} />
            <Box mt={4}>
              <SimpleGrid columns={2} spacing={10}>
                <DailyTrends filters={filters} />
                <WeeklyTrends filters={filters} />
              </SimpleGrid>
            </Box>
          </Box>
        )}
      </Filters>
    </Box>
  );
};