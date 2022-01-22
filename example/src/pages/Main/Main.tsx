import React from 'react';
import { useToast } from 'library-react-hooks';

const Main: React.FC = () => {
  const { alert } = useToast();

  return (
    <div>
      <h3>Main</h3>
      <button onClick={() => alert({ text: 'Message text1', type: 'error', tag: 'error1' })}>Сообщение1</button>
      <button onClick={() => alert({ text: 'Message text2', type: 'warning' })}>Сообщение2</button>
    </div>
  );
};

export default Main;
