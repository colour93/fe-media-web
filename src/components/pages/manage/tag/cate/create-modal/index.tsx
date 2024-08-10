import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  useDisclosure,
  FormHelperText,
  Select,
  useToast,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICreateTagCate, ICreateTagCateSchema } from '../../../../../../form-schemas/manage/create-tag-cate.ts';
import { createTagCate } from '../../../../../../apis/manage/tag-cate.ts';
import { Plus } from 'lucide-react';

interface IManageCreateModalProps {
  onFinish?: () => void | Promise<void>;
}

export const ManageCreateTagCateModal: React.FC<IManageCreateModalProps> = ({ onFinish }) => {
  const COLORS = [
    'whiteAlpha',
    'blackAlpha',
    'gray',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'cyan',
    'purple',
    'pink',
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ICreateTagCate>({
    resolver: zodResolver(ICreateTagCateSchema),
  });

  const toast = useToast();

  const onSubmit = async (data: ICreateTagCate) =>
    new Promise<void>((resolve) => {
      toast.promise(createTagCate(data), {
        loading: {
          title: '创建中...',
        },
        success: () => {
          onFinish?.();
          resolve();
          onClose();
          return { title: '创建成功' };
        },
        error: (err) => {
          resolve();
          return {
            title: '创建失败',
            description: err.message,
          };
        },
      });
    });
  return (
    <>
      <IconButton onClick={onOpen} aria-label="新建" icon={<Icon as={Plus} />} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>新建标签分类</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-2">
              <FormControl isInvalid={Boolean(errors['name'])} isRequired>
                <FormLabel htmlFor="name">名称</FormLabel>
                <Input id="name" placeholder="输入名称" {...register('name')} />
                {errors['name'] && <FormErrorMessage>{errors['name'].message}</FormErrorMessage>}
                <FormHelperText>标识唯一</FormHelperText>
              </FormControl>
              <FormControl isInvalid={Boolean(errors['displayName'])}>
                <FormLabel htmlFor="displayName">显示名称</FormLabel>
                <Input id="displayName" placeholder="输入显示名称" {...register('displayName')} />
                {errors['displayName'] && <FormErrorMessage>{errors['displayName'].message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={Boolean(errors['color'])}>
                <FormLabel htmlFor="name">颜色</FormLabel>
                <Select placeholder="选择颜色" {...register('color')}>
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </Select>
                {errors['name'] && <FormErrorMessage>{errors['name'].message}</FormErrorMessage>}
              </FormControl>
            </ModalBody>

            <ModalFooter className="flex gap-2">
              <Button onClick={onClose}>取消</Button>
              <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                新建
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
