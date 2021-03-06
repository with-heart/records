import {
  Box,
  IconButton,
  Stack,
  Collapse,
  Divider,
  Text,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import Delete from 'src/containers/actions/delete';
import Form from './form';
import ListItem from 'src/containers/collection/list/ListItem';
export default ({ record }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <ListItem>
      <Stack isInline textAlign={'center'} alignItems={'baseline'} pr={4}>
        <IconButton
          mr={0}
          size={'xs'}
          variant={'ghost'}
          icon={show ? 'chevron-down' : 'chevron-right'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleToggle();
          }}
        />
        <Stack isInline spacing={10} w={'100%'} alignItems={'baseline'}>
          <Box>{record.quantity}</Box>
          <Box flexGrow={1}/>
          <Text fontSize={10}>
            {moment(record.timestamp).format('Do, MMMM YYYY, H:mm')}
          </Text>
        </Stack>
        <Delete resource={'water'} id={record.id} />
      </Stack>
      <Collapse isOpen={show}>
        <Divider />
        <Form model={record} />
      </Collapse>
    </ListItem>
  );
};
