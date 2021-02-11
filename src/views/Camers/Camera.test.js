import React from 'react';
import ReactDOM from 'react-dom';
import Camers from './Camers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Users />, div);
  ReactDOM.unmountComponentAtNode(div);
});
