import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import routes from '../../routes/route';

render(routes(), document.getElementById('root'));
