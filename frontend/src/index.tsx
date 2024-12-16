/* @refresh reload */
import { render } from 'solid-js/web';
import '@/styles/index.css';
import App from '@/app.tsx';

const root = document.getElementById('root');

render(() => <App />, root!);
