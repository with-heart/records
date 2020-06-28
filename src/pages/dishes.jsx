import Dishes from 'src/modules/Dishes';
import { Box, Stack } from '@chakra-ui/core';

export default () => {
  return (
    <Box w={'100%'} p={10}>
      <Dishes.List />
    </Box>
  );
};
