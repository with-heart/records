import { Badge, Box, Flex, Stack, Text, useToast } from '@chakra-ui/core';
import moment from 'moment';
import { FaTasks } from 'react-icons/fa';
import DatePicker from 'src/components/DatePicker';
import { useStore } from 'src/store';

export default ({ record }) => {
  const { updateRecord } = useStore((state) => ({
    updateRecord: state.updateRecord,
  }));

  const toast = useToast();
  const onDateChange = async (value) => {
    updateRecord({ ...record, timestamp: moment(value).toISOString() }, toast);
  };
  const tags = record.tags || [];
  return (
    <Flex alignItems={'center'}>
      <Box as={FaTasks} alignSelf={'center'} mr={3} color={'green.500'} />
      <Stack>
        <Text>{record.data.value}</Text>
        <DatePicker
          includeTime={true}
          type={'text'}
          selected={moment(record.timestamp)}
          onChange={onDateChange}
        />
      </Stack>
      <Flex alignSelf={'center'}>
        {tags.map((tag) => (
          <Badge key={tag} mr={1}>
            {tag}
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
