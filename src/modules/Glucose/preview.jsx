import {
  Box,
  IconButton,
  Stack,
  Collapse,
  Divider,
} from '@chakra-ui/core';
import React, { useState } from 'react';
import Card from 'src/components/Card';
import moment from 'moment';
import useMutation from 'src/graphql/hooks/useMutation';
import Form from './form';

export default ({ record }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const mutate = useMutation({
    resource: 'glucose',
    operation: 'delete',
  });
  return (
    <Card
      m={0}
      borderRadius={0}
      borderBottomWidth={0}
      condensed
      highlight
      thickLeftBorder={show}
    >
      <Stack isInline textAlign={'center'} alignItems={'center'} pr={4}>
        <IconButton
          mr={0}
          variant={'ghost'}
          icon={show ? 'chevron-down' : 'chevron-right'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleToggle();
          }}
        />
        <Stack alignItems={'baseline'} flexGrow={1}>
          <Stack isInline spacing={10}>
            <Box>{record.value}</Box>
            <Box>{record.description}</Box>
          </Stack>
          <Box>{moment(record.timestamp).format('Do, MMMM YYYY, H:mm')}</Box>
        </Stack>

        <IconButton
          ml={2}
          size={'sm'}
          icon={'delete'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            mutate({ variables: { where: { id: { _eq: record.id } } } });
          }}
        />
      </Stack>
      <Collapse isOpen={show}>
        <Divider />
        <Form model={record}  />
      </Collapse>
    </Card>
  );
};
