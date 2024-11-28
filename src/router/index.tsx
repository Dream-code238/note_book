import { createBrowserRouter } from 'react-router-dom';

import Layouts from '../Layouts';
import Note from '../pages/Note';
import NoteDetail from '../pages/Note/Detail';
import Label from '../pages/Label';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        path: '/',
        element: <Note />,
      },
      {
        path: '/note/:id',
        element: <NoteDetail />
      },
      {
        path: '/label',
        element: <Label />
      }
    ]
  }
]);

export default router;