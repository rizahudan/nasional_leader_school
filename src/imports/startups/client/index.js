// import { render } from 'react-dom';
// import React from 'react';
import { render } from 'react-dom';
// import App from '../../ui/home';
import routes from '../../routes/route';

// console.log('route', routes);
render(routes(), document.getElementById('root'));
// render(routes, document.getElementById('root'));
