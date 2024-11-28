import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { RootContext } from './context/RootContext';

import router from './router';

const App = () => {

  const [notes, setNotes] = useState<any>([]);
  const [labels, setLabels] = useState<any>([]);

  useEffect(
    () => {

      const notes = localStorage.getItem('notes');

      if (notes) {
        setNotes(JSON.parse(notes));
      }

    },
    []
  );

  useEffect(
    () => {

      const labels = localStorage.getItem('labels');

      if (labels) {
        setLabels(JSON.parse(labels));
      }

    },
    []
  );
  
  return (
    <RootContext.Provider
      value={
        {
          notes,
          updateNotesValue: newValue => {
            setNotes(newValue);
            localStorage.setItem('notes', JSON.stringify(newValue));
          },
          labels,
          updateLabelsValue: newValue => {
            setLabels(newValue);
            localStorage.setItem('labels', JSON.stringify(newValue));
          }
        }
      }
    >
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true }}
      />
    </RootContext.Provider>
  )
}

export default App
