import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { useCallback, useImperativeHandle, useState, useContext, useMemo, useRef, useEffect } from 'react';
import { Form, Input, Select } from 'antd';

import Model from '../../../../components/Model';
import NoteEditor from '../NoteEditor';

import { IUpdateNotePayload } from '../../interface';
import { RootContext } from '../../../../context/RootContext';

const NoteModel = React.forwardRef<any, any>((props, ref) => {

  const { value, onOk } = props;

  const formRef = useRef<any>(null);

  const { labels } = useContext(RootContext);

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({});

  const labelOps = useMemo(
    () => {
      return labels?.map(item => {
        return {
          label: item.name,
          value: item.name,
        };
      });
    }, 
    [labels]
  );

  const handleModelShow = useCallback(
    () => {
      formRef?.current?.resetFields();
      // 子组件的内部方法逻辑
      setVisible(true);
    },
    []
  );
  
  // 确定
  const handleModelOk = () => {

    // 抛出值
    onOk?.({
      ...formData,
      id: nanoid(8),
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    // 子组件的内部方法逻辑
    setVisible(false);
  };

  // 取消
  const handleModelCancel = () => {
    // 子组件的内部方法逻辑
    setVisible(false);
  };

  const handleUpdateValues = (values: IUpdateNotePayload) => {    
    setFormData({ ...formData, ...values });
  }

  // 暴露给父组件的方法
  useImperativeHandle(
    ref,
    () => ({
      onShow: handleModelShow
    }),
    [handleModelShow]
  );

  useEffect(
    () => {
      if (value) {
        formRef?.current?.setFieldsValue(value);
      }
    },
    [value]
  );

  return (
    <Model
      width={750}
      title={ value ? '编辑笔记' : '新增笔记' }
      open={visible}
      cancelText="取消"
      okText="确定"
      onCancel={handleModelCancel}
      onOk={handleModelOk}
      destroyOnClose
    >
      <Form
        ref={formRef}
        initialValues={{ ...value }}
        onValuesChange={handleUpdateValues}
      >
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Select mode="multiple" placeholder="请选择标签" options={labelOps} allowClear />
        </Form.Item>
        <Form.Item label="内容" name="content">
          <NoteEditor />
        </Form.Item>
      </Form>
    </Model>
  )
});

export default NoteModel;