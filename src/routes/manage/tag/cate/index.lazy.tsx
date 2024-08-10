import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  PopoverBody,
  PopoverContent,
  Popover,
  PopoverTrigger,
  Tag,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import { ITagCate } from '../../../../typings/tag-cate.ts';
import { getManageTagCateList } from '../../../../apis/manage/tag-cate.ts';
import { VideoTag } from '../../../../components/layout/video/tag';
import { ManageCreateTagCateModal } from '../../../../components/pages/manage/tag/cate/create-modal';
import { RefreshCw } from 'lucide-react';
import { ManageTagCateOperate } from '../../../../components/pages/manage/tag/cate/operate';

const TagCateManagePage: React.FC = () => {
  const [tagCateList, setTagCateList] = useState<ITagCate[]>([]);
  const [total, setTotal] = useState(0);

  const fetchData = () => {
    getManageTagCateList().then(({ data, total }) => {
      setTagCateList(data);
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
              <Th>显示名称</Th>
              <Th>颜色</Th>
              <Th>标签</Th>
              <Th>操作</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tagCateList.map((cate) => {
              const { cid, name, displayName, color, tags } = cate;
              return (
                <Tr key={cid}>
                  <Td>{cid}</Td>
                  <Td>{name}</Td>
                  <Td>{displayName}</Td>
                  <Td>{color ? <Tag colorScheme={color}>{color}</Tag> : '-'}</Td>
                  <Td>
                    {tags && tags.length > 0 ? (
                      <Popover>
                        <PopoverTrigger>
                          <span className="cursor-pointer">{tags.length} 个</span>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverBody>
                            <div className="p-2 flex gap-2">
                              {tags.map((tag) => (
                                <VideoTag
                                  tag={{
                                    ...tag,
                                    cate,
                                  }}
                                  key={tag.cid}
                                />
                              ))}
                            </div>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <span>0 个</span>
                    )}
                  </Td>
                  <Td>
                    <ManageTagCateOperate tagCate={cate} onFinish={fetchData} />
                  </Td>
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

export const Route = createLazyFileRoute('/manage/tag/cate/')({
  component: TagCateManagePage,
});
