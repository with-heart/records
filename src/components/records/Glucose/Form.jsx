import { Input } from '@chakra-ui/core';

export default ({ record = {}, setRecord }) => {
  const value = record ? (record.data ? record.data.value : '') : '';
  return (
    <Input
      type={'number'}
      placeholder={'Enter blood glucose value'}
      value={value}
      onChange={(e) =>
        setRecord({
          ...record,
          data: { ...record.data, value: e.target.value },
        })
      }
    />
  );
};
