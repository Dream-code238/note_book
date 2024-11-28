import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useImperativeHandle, useState, useRef } from 'react';
import { Input, Form } from 'antd';
import Model from '../../../../components/Model';
import { IUpdateLabelPayload } from '../../interface';

const LabelModel = React.forwardRef<any, any>((props, ref) => {

  const { value, onOk } = props;

  const formRef = useRef<any>();

  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({});

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

  const handleUpdateValues = (values: IUpdateLabelPayload) => {
    setFormData(() => values);
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
      title={ value ? '编辑标签' : '新增标签' }
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
          <Input placeholder="请输入标签类型" />
        </Form.Item>
      </Form>
    </Model>
  )
});

export default LabelModel;