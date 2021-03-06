// Render Prop
import {
  Input,
  Stack,
  Box,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  Heading,
  Divider,
  SimpleGrid,
  Checkbox,
  Text,
} from '@chakra-ui/core';
import Link from 'next/link';
import Card from 'src/components/core/card';
import Transactions from './index';
import { useForm, Controller, FormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Field from 'src/components/forms/Field';
import useMutation from 'src/hooks/graphql/useMutation';
export default ({ model, onSubmitCallback = () => {}, showTasks }) => {
  const [operation, setOperation] = useState('insert');
  const methods = useForm();

  useEffect(() => {
    methods.reset(model);
    if (model?.id) {
      setOperation('update');
    }
  }, [model]);

  const mutate = useMutation({
    resource: 'transactions',
    operation,
  });
  const onSubmit = () => {
    methods.handleSubmit((data) =>
      mutate({
        variables: {
          object: { ...model, ...data },
          where: { id: { _eq: model?.id } },
        },
      })
    )();
    onSubmitCallback();
  };
  const deleteMutate = useMutation({
    resource: 'transactions',
    operation: 'delete',
  });

  return (
    <Stack spacing={10}>
      <FormContext
        {...methods}
        isSmart={model?.id}
        schema={Transactions.schema}
        resource={'transactions'}
        id={model?.id}
      >
        <Stack isInline spacing={5}>
          <Stack spacing={10} flex={2}>
            <Field name={'value'} />
            <Field name={'name'} />
            <Field rows={10} name={'description'} />
          </Stack>
          <Stack spacing={10} flex={1}>
            <Field name={'timestamp'} />
            <Field name={'type'} />
            <Field name={'mode'} />
            <Field name={'category_id'} />
          </Stack>
        </Stack>
      </FormContext>
      {!model?.id && (
        <Button
          my={5}
          type="submit"
          variant={'solid'}
          variantColor={'brand'}
          size={'sm'}
          onClick={onSubmit}
        >
          Create
        </Button>
      )}
    </Stack>
  );
};
