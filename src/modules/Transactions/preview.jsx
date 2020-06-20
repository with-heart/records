import { Box, Flex, IconButton, Stack, Collapse, Badge, useColorMode } from '@chakra-ui/core';
import { useState } from 'react';
import Card from 'src/components/Card';
import Money from 'src/assets/Money';
import moment from 'moment';
import Form from './form';
import Mutation from 'src/graphql/mutation';
export default ({ record, onSubmit }) => {
  const [show, setShow] = useState(false);
  const { colorMode } = useColorMode();

  const handleToggle = () => setShow(!show);
  return (
    <Card
      cursor="pointer"
    >
      <Flex
        textAlign={'center'}
        alignItems={'center'}
        pr={4}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleToggle();
        }}
      >
        <Box mx={3}>
          <Money width={20} height={20} />
        </Box>
        <Stack alignItems={'flex-start'} flexGrow={1}>
          <Stack isInline spacing={10} w={'100%'}>
            <Box>{record.name} - {record.value}</Box>
            <Box flexGrow={1}></Box>
          </Stack>
          <Box>
            {record.timestamp
              ? moment(record.timestamp).format('Do, MMMM YYYY, H:mm')
              : '-'}
          </Box>
        </Stack>
        <Box mr={2}>
          <Badge>{record.priority}</Badge>
        </Box>
        <Box mr={2}>
          <Badge variantColor={'yellow'}>{record.status}</Badge>
        </Box>
        <Box>
          <Badge variantColor={'teal'}>{record.team}</Badge>
        </Box>

        <Mutation resource={'tasks'} operation={'delete'}>
          {(mutate) => (
            <IconButton
              variant={'ghost'}
              variantColor={'red'}
              ml={2}
              size={'sm'}
              icon={'delete'}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                mutate({ variables: { where: { id: { _eq: record.id } } } });
              }}
            />
          )}
        </Mutation>
      </Flex>
      <Collapse isOpen={show}>
        <Form model={record} onSubmit={onSubmit}/>
      </Collapse>
    </Card>
  );
};
