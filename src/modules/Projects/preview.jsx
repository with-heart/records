import {
  Box,
  IconButton,
  Stack,
  Collapse,
  Progress,
  Text,
  Button,
  Divider,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import useMutation from 'src/graphql/hooks/useMutation';
import Form from './form';
import ListItem from 'src/components/collection/List/ListItem';

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
    <ListItem>
      <Stack
        isInline
        textAlign={'center'}
        alignItems={'center'}
        pr={4}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleToggle();
        }}
      >
        <Box flex={10} textAlign={'initial'}>
          {record.name}
        </Box>
        <Box flex={4} alignSelf={'baseline'}>
          {record?.ref_team?.name && <Badge>{record.ref_team?.name}</Badge>}
        </Box>
        <Stack flex={1} spacing={1} alignItems={'baseline'}>
          <Text fontSize={12}>
            Completed {completedTasks} out of {totalTasks} Tasks
          </Text>

          <Progress
            color={progress > 85 ? 'green' : progress < 25 ? 'red' : 'yellow'}
            value={totalTasks ? progress : 0}
            w={200}
            borderRadius={5}
          />
        </Stack>

        <Box flex={5} />
        <Box>
          <Link as={`/projects/${record.id}`} href={'/projects/[id]'}>
            <Button
              flex={2}
              variant={'outline'}
              size={'xs'}
              rightIcon={'chevron-right'}
            >
              View Details
            </Button>
          </Link>
        </Box>
        <IconButton
          flex={1}
          ml={2}
          variant={'ghost'}
          size={'sm'}
          icon={'delete'}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            mutate({ variables: { where: { id: { _eq: record.id } } } });
          }}
        />
      </Stack>
      <Drawer
        size={'xl'}
        isOpen={show}
        placement="right"
        onClose={() => setShow(false)}
        finalFocusRef={show}
      >
        <DrawerOverlay />
        <DrawerContent overflowY={'scroll'}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Form model={record} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ListItem>
  );
};
