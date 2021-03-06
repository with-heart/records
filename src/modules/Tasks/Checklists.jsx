// Render Prop
import {
  Stack,
  Box,
  Button,
  Text,
  Checkbox,
  Input,
  IconButton,
  PseudoBox,
  useColorMode,
} from '@chakra-ui/core';
import _ from 'lodash';
import React, { useCallback } from 'react';
import useMutation from 'src/hooks/graphql/useMutation';

const Checklists = ({ checklist, setChecklist, onUpdateCallback }) => {
  const { colorMode } = useColorMode();

  const addCheckListItem = () => {
    setChecklist([...checklist, { checked: false }]);
  };
  const setChecklistItem = (value, property, index) => {
    const list = [...checklist];
    const item = list[index];
    list[index] = {
      ...item,
      [property]: value,
    };
    setChecklist(list);
  };
  const deleteChecklistItem = (index) => {
    const list = [...checklist];
    list.splice(index, 1);
    setChecklist(list);
  };

  return (
    <Stack spacing={0} flex={1}>
      {checklist.map((item, index) => (
        <PseudoBox
          px={2}
          py={1}
          _hover={colorMode === 'light' ? { bg: 'gray.50' } : { bg: '#232626' }}
        >
          <Stack isInline key={index}>
            <Checkbox
              variantColor={'brand'}
              size={'xs'}
              isChecked={item?.isChecked}
              onChange={(e) => {
                setChecklistItem(e.target.checked, 'isChecked', index);
                onUpdateCallback()
              }}
            />
            <Input
              size={'xs'}
              onBlur={onUpdateCallback}
              flexGrow={1}
              variant={'unstyled'}
              textDecoration={item?.isChecked ? 'line-through' : ''}
              value={item?.value}
              onChange={(e) => setChecklistItem(e.target.value, 'value', index)}
            />
            <IconButton
              size={'xs'}
              icon={'delete'}
              onClick={() => deleteChecklistItem(index)}
            />
          </Stack>
        </PseudoBox>
      ))}
      <Box>
        <Button
          size={'xs'}
          variant={'link'}
          leftIcon={'small-add'}
          onClick={addCheckListItem}
        >
          Add New
        </Button>
      </Box>
    </Stack>
  );
};

export default Checklists;

export const SmartChecklists = ({ resource, id, name, ...rest }) => {
  const delayedQuery = useCallback(
    _.debounce((q) => update(q), 500),
    []
  );

  const mutate = useMutation({ resource, operation: 'update', silent: true });
  const update = (value) => {
    if (id) {
      mutate({
        variables: {
          object: { [name]: value },
          where: { id: { _eq: id } },
        },
      });
    }
  };
  const onUpdate = () => {
    update(rest.checklist);
  };
  const setChecklist = (v) => {
    rest.setChecklist(v);
  };
  return (
    <Checklists
      {...rest}
      setChecklist={setChecklist}
      onUpdateCallback={onUpdate}
    />
  );
};
