import { useContext, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Table, Tag } from 'antd';

import NoteModel from './components/NoteModel';

import { RootContext } from '../../context/RootContext';
import { IUpdateNotePayload } from './interface';

import './index.less';

const Note = () => {

  const navigate = useNavigate();

  const { notes, updateNotesValue } = useContext(RootContext);
  const [str, setStr] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentLabel, setCurrentLabel] = useState(null);

  const addRef = useRef<any>();

  const handleNoteModel = () => {
    setCurrentLabel(null);
    if(addRef?.current) {
      addRef?.current?.onShow();
    }
  }

  const handleUpdateNote = (item: any) => {
    setCurrentLabel(item);
    if(addRef?.current) {
      addRef?.current?.onShow();
    }
  }

  const handleNoteSearch = () => {
    setKeyword(str);
  }

  const columns = useMemo(
    () => {

      return [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '类型标签',
          dataIndex: 'tags',
          key: 'tags',
          render: (text: Array<string>) => {

            return (
              <div className="note-tag-container">
                {
                  text?.map(
                    item => {

                      return <Tag key={item}>{ item }</Tag>
                    }
                  )
                }
              </div>
            )
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },
        {
          title: '操作',
          key: 'action',
          render: (record: any) => {

            return (
              <div className='operation-btn'>
                <Button type='primary' onClick={() => navigate(`/note/${record.id}`)}>详情</Button>
                <Button type='primary' onClick={() => handleUpdateNote(record)}>更新</Button>
                <Button
                  type='dashed'
                  onClick={
                    () => {
                      const newValue = notes?.filter(item => item.id !== record.id) || []
                      updateNotesValue?.(newValue)
                    }
                  }
                >删除</Button>
              </div>
            )
          }
        }
      ]
    },
    [notes, navigate, updateNotesValue]
  );

  const newFilter = useMemo(
    () => {

      if (keyword) {
        return notes?.filter(item => item.name.indexOf(keyword) || item.tags.includes(keyword));
      }
      
      return notes;
    },
    [notes, keyword]
  );

  return (
    <div className="note-page-container">
      <div className="note-filter-container">
        <div className="note-filter-search">
          <Input
            allowClear
            placeholder="请输入标签或关键字"
            value={str}
            onChange={evt => setStr(evt.target.value)}
            onClear={() => setKeyword('')}
            style={
              {
                width: '250px'
              }
            }
          />
          <Button type='primary' onClick={handleNoteSearch}>搜索</Button>
        </div>
        <div className="note-filter-opera">
          <Button type='primary' onClick={handleNoteModel}>添加</Button>
        </div>
      </div>
      <div className="note-table-container">
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={newFilter}
        />
      </div>
      <NoteModel
        ref={addRef}
        value={currentLabel}
        onOk={
          (value: IUpdateNotePayload) => {
            const newValue = notes?.concat(value) || [];
            updateNotesValue?.(newValue)
          }
        }
      />
    </div>
  )
}

export default Note;