import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import routes from 'imports/routes/client/route';

render(routes(), document.getElementById('root'));
