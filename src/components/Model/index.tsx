import React from 'react';
import { Modal } from 'antd';

import { IModelProps } from './interface';

const ModelProvide: React.FC<IModelProps> = ({
  children,
  ...otherParams
}) => {

  return (
    <Modal
      title="Basic Modal"
      {...otherParams}
    >
      { children }
    </Modal>
  )
}

export default ModelProvide;