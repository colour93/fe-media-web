import { createFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { tagManageSearchSchema } from '../../../search-schemas/manage/tag.ts';
import { Icon, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';
import { ManageCreateTagCateModal } from '../../../components/pages/manage/tag/cate/create-modal';
import { ITag } from '../../../typings/tag.ts';
import { getManageTagList } from '../../../apis/manage/tag.ts';

export const TagManagePage: React.FC = () => {
  const { tagCateCid } = Route.useSearch();

  const [tagList, setTagList] = useState<ITag[]>([]);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    getManageTagList({ tagCateCid }).then(({ data, total }) => {
      setTagList(data);
      setTotal(total);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex gap-2">
        <IconButton onClick={fetchData} aria-label="刷新" icon={<Icon as={RefreshCw} />} />
        <ManageCreateTagCateModal onFinish={fetchData} />
      </div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>CID</Th>
              <Th>名称</Th>
              <Th>分类</Th>
              <Th>显示名称</Th>
              <Th>描述</Th>
              <Th>封面</Th>
              <Th>视频</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tagList.map((tag) => {
              const { cid, cate, name, displayName, description, cover, videos } = tag;
              return (
                <Tr key={cid}>
                  <Td>{cid}</Td>
                  <Td>{name}</Td>
                  <Td>{cate?.displayName}</Td>
                  <Td>{displayName}</Td>
                  <Td>{description}</Td>
                  <Td>{cover}</Td>
                  <Td>{videos?.length ?? 0} 个</Td>
                  <Td>{/*<ManageTagCateOperate tagCate={cate} onFinish={fetchData} />*/}</Td>
                </Tr>
              );
            })}
          </Tbody>
          <TableCaption>总共 {total} 条</TableCaption>
        </Table>
      </TableContainer>
    </>
  );
};
export const Route = createFileRoute('/manage/tag/')({
  component: TagManagePage,
  validateSearch: tagManageSearchSchema,
});
