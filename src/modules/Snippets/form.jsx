// Render Prop
import { Stack, Box, Button, Text } from '@chakra-ui/core';
import Link from 'next/link';
import { ResourceSelector } from 'src/containers/collection/Selector';
import Loader from 'src/components/core/Loader';
import Tasks from './index';
import Snippets from './index';
import { getNextRevisionDate } from './spaced-repetition';
import moment from 'moment';
import { useForm, FormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Field from 'src/components/forms/Field';
import useMutation from 'src/hooks/graphql/useMutation';

export default ({ model, onSubmitCallback = () => {}, formContext = {} }) => {
  const [operation, setOperation] = useState('insert');
  const methods = useForm();
  const [showProjects, setShowProjects] = useState(false);
  useEffect(() => {
    methods.reset(model);
    if (model?.id) {
      setOperation('update');
    }
  }, [model]);

  const mutate = useMutation({
    resource: 'snippets',
    operation,
  });
  const onCheckin = (currentEasiness) => {
    const response = getNextRevisionDate(model, currentEasiness);
    mutate({
      variables: {
        where: { id: { _eq: model?.id } },
        object: {
          due_date: response.due_date,
          checkins: [
            ...model.checkins,
            {
              timestamp: response.due_date.toISOString(true),
              easiness: currentEasiness,
              interval: response.interval,
            },
          ],
        },
      },
    });
  };

  const onSubmit = () => {
    methods.handleSubmit((data) => {
      return mutate({
        variables: {
          object: { ...model, ...formContext, ...data },
          where: { id: { _eq: model?.id } },
        },
      });
    })();
    onSubmitCallback();
  };
  return (
    <Stack spacing={10}>
      {model && model?.id && (
        <Stack isInline borderWidth={1} borderRadius={3} p={3}>
          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(0)}
          >
            0
          </Button>

          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(1)}
          >
            1
          </Button>
          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(2)}
          >
            2
          </Button>
          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(3)}
          >
            3
          </Button>
          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(4)}
          >
            4
          </Button>
          <Button
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={() => onCheckin(5)}
          >
            5
          </Button>
        </Stack>
      )}
      <Stack spacing={10}>
        <FormContext {...methods} schema={Tasks.schema}>
          <Field name={'name'} />
          <Field name={'due_date'} />
          <Field name={'difficulty'} />
          <Field name={'description'} height={1000} />
        </FormContext>
      </Stack>

      <Stack isInline>
        <Box flexGrow={1} />
        <Button
          type="submit"
          variant={'solid'}
          variantColor={'brand'}
          size={'sm'}
          onClick={onSubmit}
        >
          {model?.id ? 'Update' : 'Create'}
        </Button>
      </Stack>
      {/*{model && model.id && (*/}
      {/*  <Loader title={'References'}>*/}
      {/*    <Stack spacing={10}>*/}
      {/*      <Box mb={5}>*/}
      {/*        <Text fontSize={13} mb={3}>*/}
      {/*          References*/}
      {/*        </Text>*/}
      {/*        <Snippets.List*/}
      {/*          where={{*/}
      {/*            _and: [{ ref_snippets: { source_id: { _eq: model.id } } }],*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </Box>*/}
      {/*      <ResourceSelector*/}
      {/*        resource={'snippets'}*/}
      {/*        onChange={onSelectSnippet}*/}
      {/*      />*/}

      {/*      <Box>*/}
      {/*        <Text fontSize={13} mb={3}>*/}
      {/*          Referenced By*/}
      {/*        </Text>*/}
      {/*        <Snippets.List*/}
      {/*          where={{*/}
      {/*            _and: [{ ref_snippets: { target_id: { _eq: model.id } } }],*/}
      {/*          }}*/}
      {/*        />*/}
      {/*      </Box>*/}
      {/*    </Stack>*/}
      {/*  </Loader>*/}
      {/*)}*/}
    </Stack>
  );
};
