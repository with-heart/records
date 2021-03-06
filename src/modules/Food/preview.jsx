import {
  Box,
  IconButton,
  Stack,
  Collapse,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Divider,
  Button,
  Progress,
  Tag,
  useColorMode,
} from '@chakra-ui/core';
import Link from 'next/link';
import React, { useState } from 'react';
import moment from 'moment';
import Delete from 'src/containers/actions/delete';
import useMutation from 'src/hooks/graphql/useMutation';
import Form from './form';
import ListItem from 'src/containers/collection/list/ListItem';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
export default ({ record }) => {

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { colorMode } = useColorMode();

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
        <Stack alignItems={'baseline'}>
          <Box>{record.ref_dish.name}</Box>
          <Stack isInline>
            <Text fontSize={12}>
              {record.timestamp
                ? moment(record.timestamp).format('Do, MMMM YYYY, HH:mm')
                : '-'}
            </Text>
          </Stack>
        </Stack>
        <Box flexGrow={1}></Box>
        <Delete resource={'food'} id={record.id} />
      </Stack>
      <Drawer
        size={'xl'}
        isOpen={show}
        placement="right"
        onClose={() => setShow(false)}
        finalFocusRef={show}
        bg={colorMode === 'light' ? 'white' : '#333'}
      >
        <DrawerOverlay />
        <DrawerContent
          overflowY={'scroll'}
          bg={colorMode === 'light' ? 'white' : '#333'}
        >
          <DrawerCloseButton />
          <DrawerHeader>{record.name}</DrawerHeader>

          <DrawerBody bg={colorMode === 'light' ? 'white' : '#333'}>
            <Form model={record} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </ListItem>
  );
};
