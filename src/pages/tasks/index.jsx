import {
  Box,
  Stack,
  Button,
  Divider,
  Heading,
  Select,
  FormControl,
  FormLabel,
  useColorMode,
  Flex,
} from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import DatePicker from 'src/components/DatePicker';
import Card from 'src/components/Card';
import Tasks from 'src/modules/Tasks';
import moment from 'moment';
import * as TaskFilters from 'src/modules/Tasks/filters';
import ResourceSelector from 'src/components/collection/Selector';
export default () => {
  const { colorMode } = useColorMode();
  const [filters, setFilters] = useState(undefined);
  const [activePreset, setActivePreset] = useState('today');
  const [team, setTeam] = useState('');
  const [project, setProject] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState(moment().toISOString(true));
  const activateTodayFilter = () => {
    setActivePreset('today');
    setFilters(TaskFilters.activeToday(date));
  };
  const activateBacklogFilter = () => {
    setActivePreset('backlog');
    setFilters(TaskFilters.backlog());
  };
  const activateAllFilter = () => {
    setActivePreset('all');
    setFilters({});
  };
  const activateOverdueFilter = () => {
    setActivePreset('overdue');
    setFilters(TaskFilters.overDue(date));
  };
  const activateNext7DaysFilter = () => {
    setActivePreset('next7days');
    setFilters(TaskFilters.activeNext7Days(date));
  };
  useEffect(() => {
    let result = {};
    if (team !== '') {
      result = { ...result, team: { _eq: team } };
    }
    if (status !== '') {
      result = { ...result, status: { _eq: status } };
    }
    if (priority !== '') {
      result = { ...result, priority: { _eq: priority } };
    }
    if (priority !== '') {
      result = { ...result, priority: { _eq: priority } };
    }
    if (project !== '') {
      result = { ...result, project_id: { _eq: project } };
    }
    if (date !== '') {
      result = {
        ...result,
        _and: [
          { due_date: { _gte: moment(date).startOf('day').toISOString(true) } },
          { due_date: { _lte: moment(date).endOf('day').toISOString(true) } },
        ],
      };
    }
    setFilters(result);
  }, [team, status, priority, date, project]);
  useEffect(() => {
    activateTodayFilter();
  }, []);
  return (
    <Box>
      <Box w={'100%'}>
        <Stack spacing={10} w={'100%'}>
          <Box w={'100%'} p={5}>
            <Tasks.List
              order_by={{
                team: 'asc',
                due_date: 'asc',
              }}
              where={filters}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};