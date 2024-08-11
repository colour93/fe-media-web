import React from 'react';
import { Heading } from '@chakra-ui/react';

interface IErrorPageProps {
  message?: string;
}

export const ErrorPage: React.FC<IErrorPageProps> = ({ message }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Heading as="h2" size="3xl">
        出错了！{message}
      </Heading>
    </div>
  );
};
