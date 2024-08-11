import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Ellipsis, FilePenLine, FolderCog, Trash } from 'lucide-react';
import { ITagCate } from '../../../../../../typings/tag-cate.ts';
import { deleteTagCate } from '../../../../../../apis/manage/tag-cate.ts';
import { Link } from '@tanstack/react-router';

interface IManageTagCateOperateProps {
  tagCate: ITagCate;
  onFinish?: () => void;
}

export const ManageTagCateOperate: React.FC<IManageTagCateOperateProps> = ({ tagCate, onFinish }) => {
  const toast = useToast();

  const { isOpen: isDeleteAlertOpen, onOpen: onDeleteAlertOpen, onClose: onDeleteAlertClose } = useDisclosure();
  const cancelDeleteAlertRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    toast.promise(deleteTagCate(tagCate.cid), {
      loading: {
        title: '删除中...',
      },
      success: () => {
        onFinish?.();
        return {
          title: '删除成功',
        };
      },
      error: (err) => {
        return {
          title: '删除失败',
          description: err.message,
        };
      },
    });
  };

  return (
    <>
      <Menu isLazy>
        <MenuButton as={IconButton} aria-label="操作" icon={<Icon as={Ellipsis} />} variant="outline" />
        <MenuList>
          <Link
            search={{
              tagCateCid: tagCate.cid,
            }}
            to="/manage/tag"
          >
            <MenuItem icon={<Icon as={FolderCog} />}>管理标签</MenuItem>
          </Link>
          <MenuItem icon={<Icon as={FilePenLine} />}>编辑</MenuItem>
          <MenuItem color="red" icon={<Icon as={Trash} />} onClick={onDeleteAlertOpen}>
            删除
          </MenuItem>
        </MenuList>
      </Menu>
      <AlertDialog isOpen={isDeleteAlertOpen} leastDestructiveRef={cancelDeleteAlertRef} onClose={onDeleteAlertClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>删除标签分类确认</AlertDialogHeader>

            <AlertDialogBody>
              确认删除「{tagCate.displayName}（{tagCate.name}）」吗？删除后将无法恢复？
            </AlertDialogBody>

            <AlertDialogFooter className="flex gap-2">
              <Button ref={cancelDeleteAlertRef} onClick={onDeleteAlertClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                确认
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
