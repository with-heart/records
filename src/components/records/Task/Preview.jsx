import { Badge, Box, Flex, Stack, Text, useToast } from '@chakra-ui/core';
import moment from 'moment';
import { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import DatePicker from 'src/components/DatePicker';

export default ({ recordData, refetch }) => {
  const [timestamp, setTimestamp] = useState(new Date(recordData.timestamp));
  const toast = useToast();
  const onDateChange = async (value) => {
    setTimestamp(new Date(value));
    await fetch(`/api/records/${recordData.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...recordData,
        timestamp: moment(value).toISOString(),
      }),
    });
    refetch()
    toast({
      title: 'Record updated successfully',
      status: 'success',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };
  const tags = recordData.tags || []
  return (
    <Flex alignItems={'center'}>
      <Box as={FaTasks} alignSelf={'center'} mr={3} color={"green.500"}/>
      <Stack flexGrow={1}>
        <Text>{recordData.data.value}</Text>
        <Badge w={100}>
          <DatePicker.TextDatePicker selected={moment(timestamp)}  onChange={onDateChange}/>
        </Badge>
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
