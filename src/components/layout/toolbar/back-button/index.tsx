import { Icon, IconButton } from '@chakra-ui/react';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useRouter } from '@tanstack/react-router';

export const BackButton: React.FC = () => {

  const { history } = useRouter();

  return (
    <IconButton
      onClick={() => {
        history.back();
      }}
      aria-label="返回上一页"
      icon={<Icon as={ChevronLeft} />}
    />
  );
};
