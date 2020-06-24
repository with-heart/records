import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  Divider,
  Progress,
  Text, Button,
} from '@chakra-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import Card from 'src/components/Card';
import Sugar from 'src/assets/Sugar';
import moment from 'moment';
import useAggregate from 'src/graphql/hooks/useAggregate';
import useMutation from 'src/graphql/hooks/useMutation';
import Form from '../form';

export default ({ record }) => {
  const totalTasks = record.ref_tasks?.length;
  const completedTasks = (record.ref_tasks || []).filter(
    (t) => t.status === 'completed'
  ).length;
  const progress = (completedTasks * 100) / totalTasks;
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const mutate = useMutation({
    resource: 'projects',
    operation: 'delete',
  });
  return (
    <Card>
      <Stack
        isInline
        textAlign={'center'}
        alignItems={'center'}
        pr={4}
      >
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
        <Box>{record.name}</Box>
        <Box flexGrow={1}></Box>

        <Stack spacing={1} alignItems={'baseline'}>
          <Text fontSize={12}>Completed {completedTasks} out of {totalTasks}</Text>
          <Progress
            color={'brand'}
            value={totalTasks ? progress : 0}
            w={200}
            borderRadius={5}
          />
        </Stack>
        <Link as={`/projects/${record.id}`} href={'/projects/[id]'}>
          <Button
            variant={'outline'}
            size={'xs'}
            rightIcon={'chevron-right'}
          >
            View Details
          </Button>
        </Link>
        <IconButton
          ml={2}
          variant={"ghost"}
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
        <Form model={record} />
      </Collapse>
    </Card>
  );
};
