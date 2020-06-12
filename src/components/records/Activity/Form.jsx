import { Box, FormControl, FormLabel, Stack, Textarea } from '@chakra-ui/core';
import moment from 'moment';
import DatePicker from 'components/DatePicker';
export default ({ record = {}, setRecord }) => {
  const value = record ? (record.data ? record.data.value : '') : '';
  let timestamp = moment();
  const from = record
    ? record.data
      ? record.data.from
      : timestamp
    : timestamp;
  const to = record ? (record.data ? record.data.to : timestamp) : timestamp;
  return (
    <Stack>
      <Stack isInline>
        <Box mr={2}>
          <FormControl>
            <FormLabel htmlFor="email">From</FormLabel>
            <DatePicker.InputDatePicker
              selected={from}
              onChange={(v) =>
                setRecord({ ...record, data: { ...record.data, from: v } })
              }
            />
          </FormControl>
        </Box>
        <Box mr={2}>
          <FormControl>
            <FormLabel htmlFor="email">To</FormLabel>
            <DatePicker.InputDatePicker
              selected={to}
              onChange={(v) =>
                setRecord({ ...record, data: { ...record.data, to: v } })
              }
            />
          </FormControl>
        </Box>
      </Stack>
      <Box mr={2}>
        <FormControl>
          <FormLabel htmlFor="email">Description</FormLabel>
          <Textarea
            ref={(input) => input && input.focus()}
            variant="unstyled"
            placeholder="Add new activity"
            borderRadius={3}
            resize={'none'}
            value={value}
            onChange={(e) =>
              setRecord({
                ...record,
                data: { ...record.data, value: e.target.value },
              })
            }
          />
        </FormControl>
      </Box>
    </Stack>
  );
};