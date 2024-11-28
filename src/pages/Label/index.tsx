import { useMemo, useRef, useContext, useState } from 'react';
import { Input, Button, Table } from 'antd';

import LabelModel from './components/LabelModel';

import { RootContext } from '../../context/RootContext';
import { IUpdateLabelPayload } from './interface';

import './index.less';

const Label = () => {
  
  const { labels, updateLabelsValue } = useContext(RootContext);
  const [str, setStr] = useState('');
  const [keyword, setKeyword] = useState('');
  const [currentLabel, setCurrentLabel] = useState(null);

  const addRef = useRef<any>();

  const handleLabelModel = () => {
    setCurrentLabel(null);
    if(addRef?.current) {
      addRef?.current?.onShow();
    }
  }

  const handleUpdateLabel = (item: any) => {
    setCurrentLabel(item);
    if(addRef?.current) {
      addRef?.current?.onShow();
    }
  }

  const handleLabelSearch = () => {
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
          title: '标签名称',
          dataIndex: 'name',
          key: 'name',
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
          width: 250,
          render: (record: any) => {

            return (
              <div className='operation-btn'>
                <Button type='primary' onClick={() => handleUpdateLabel(record)}>更新</Button>
                <Button
                  type='dashed'
                  onClick={
                    () => {
                      const newValue = labels?.filter(item => item.id !== record.id) || []
                      updateLabelsValue?.(newValue)
                    }
                  }
                >删除</Button>
              </div>
            )
          }
        }
      ]
    },
    [labels, updateLabelsValue]
  );

  const newFilter = useMemo(
    () => {

      if (keyword) {
        return labels?.filter(item => item.name.indexOf(keyword) > -1);
      }
      
      return labels;
    },
    [labels, keyword]
  );

  return (
    <div className='label-page-container'>
      <div className="label-filter-container">
        <div className="label-filter-search">
          <Input
            allowClear
            placeholder="请输入标签名称"
            value={str}
            onChange={evt => setStr(evt.target.value)}
            onClear={() => setKeyword('')}
            style={
              {
                width: '250px'
              }
            }
          />
          <Button type='primary' onClick={handleLabelSearch}>搜索</Button>
        </div>
        <div className="label-filter-opera">
          <Button type='primary' onClick={handleLabelModel}>添加</Button>
        </div>
      </div>
      <div className="label-table-container">
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={newFilter}
        />
      </div>
      <LabelModel
        ref={addRef}
        value={currentLabel}
        onOk={
          (value: IUpdateLabelPayload) => {
            const newValue = labels?.concat(value) || [];
            updateLabelsValue?.(newValue)
          }
        }
      />
    </div>
  )
}

export default Label;