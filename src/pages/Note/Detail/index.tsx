import { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

import { RootContext } from '../../../context/RootContext';

import './index.less';

const NoteDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { notes } = useContext(RootContext);

  const note = useMemo(
    () => {
      return notes?.find(item => item.id === id);
    },
    [id, notes]
  );

  return (
    <div className='note-detail-container'>
      <div className="note-detail-title">
        <LeftOutlined onClick={() => navigate(-1)} />
        <span className='title'>{note?.name}</span>
        <span className="time">更新时间：{note?.updateTime}</span>
      </div>
      <div className='note-detail-content' dangerouslySetInnerHTML={{ __html: note?.content || '' }} />
    </div>
  )
}

export default NoteDetail;