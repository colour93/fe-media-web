import { IconButton, Icon, useColorMode } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';
import React from 'react';

export const ColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      aria-label="切换颜色模式"
      icon={<Icon as={colorMode === 'light' ? Moon : Sun} />}
    />
  );
};
