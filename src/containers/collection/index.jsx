import { Box, Button, Flex, Input, Spinner, Stack } from '@chakra-ui/core';
import Skeleton from 'src/components/core/Skeleton';
import { useStore } from 'src/store';
import List from './list';
import Board from './board';
import useQuery from 'src/hooks/graphql/useQuery';
import { useQuery as useApolloQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Card from 'src/components/core/card';
import Filters from 'src/containers/filters';
const FilteredCollection = ({
  resource,
  fields,
  where,
  order_by,
  limit,
  offset,
  preview,
  group_by_field,
  group_by_options,
  showBanners = true,
  formContext = {},
  type = 'list',
  ...rest
}) => {
  const { toggleFormPopup, setNewFormContext } = useStore((state) => ({
    toggleFormPopup: state.toggleFormPopup,
    setNewFormContext: state.setNewFormContext,
  }));

  const [data, loading, error] = useQuery({
    name: resource,
    where,
    fields,
    order_by,
    limit,
    offset,
  });

  const addNew = () => {
    setNewFormContext(formContext);
    toggleFormPopup(resource);
  };
  let response;
  if (loading) {
    response = group_by_field ? (
      <Stack p={2} spacing={30}>
        <Box my={4}>
          <Skeleton h={10} count={4} />
        </Box>
        <Box my={4}>
          <Skeleton h={10} count={4} />
        </Box>
        <Box my={4}>
          <Skeleton h={10} count={4} />
        </Box>
        <Box my={4}>
          <Skeleton h={10} count={4} />
        </Box>
      </Stack>
    ) : (
      <Box p={2}>
        <Skeleton h={10} count={10} />
      </Box>
    );
  } else if (error) {
    console.error(error);
    response = <Box>Something went wrong</Box>;
  } else if (data.length === 0) {
    response = showBanners ? (
      <Card>
        <Stack
          w={'100%'}
          alignItems={'center'}
          h={100}
          justifyContent={'center'}
        >
          <Box>No Results Found.</Box>
          <Button
            leftIcon={'small-add'}
            variant={'solid'}
            variantColor={'brand'}
            size={'sm'}
            onClick={addNew}
          >
            Add New
          </Button>
        </Stack>
      </Card>
    ) : (
      <div />
    );
  } else {
    response =
      type === 'list' ? (
        <List
          group_by_field={group_by_field}
          data={data}
          preview={preview}
          {...rest}
        />
      ) : (
        <Board
          group_by_field={group_by_field}
          group_by_options={group_by_options}
          data={data}
          preview={preview}
          {...rest}
        />
      );
  }
  return response;
};

export default ({ resource, showFilterBar = false, ...rest }) => {
  const { error, data, loading } = useApolloQuery(gql`query{
__type(name:"${resource}"){
    name
    fields{
      name
      type{
        name
          ofType {
              name
          }
      }
    }
  }
}`);
  return (
    <Filters
      showFilterBar={false}
      schema={data ? data['__type'] : {}}
      where={rest.where}
    >
      {(filters) => (
        <FilteredCollection resource={resource} {...rest} where={filters} />
      )}
    </Filters>
  );
};
