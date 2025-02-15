import { Button, Flex, Input } from '@chakra-ui/react';

const InputForm = () => {
  return (
    <Flex mb={4} align="center">
      <Input placeholder="Enter repo URL" mr={2} />
      <Button bg="blue.600">Load issues</Button>
    </Flex>
  );
};

export default InputForm;
