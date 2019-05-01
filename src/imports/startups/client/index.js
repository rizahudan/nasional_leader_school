import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import routes from 'imports/routes/client/route';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

render(routes(), document.getElementById('root'));