import '@/styles/App.css';

import { createEffect, createSignal, onCleanup } from 'solid-js';
import Header from '@/components/Header';
import NewsList from '@/components/NewsList';
import Container from '@/components/Container';
import scrollbarStyle from '@/styles/scrollbar.module.css';
import createSSE from '@/utils/sse';
import { INewsItem } from '@/types/NewsItem';

const App = () => {
  const [items, setItems] = createSignal<INewsItem[]>([]);

  createEffect(() => {
    const sse = createSSE({
      url: 'http://10.0.0.5:3000/sse',
      messageHandler: (event) => {
        const newItem = JSON.parse(event.data);
        setItems((prev) => [...newItem, ...prev]);
      },
      errorHandler: (event) => {
        console.error('Error:', event);
      },
    });

    onCleanup(() => {
      sse.close();
    });
  });

  return (
    <Container>
      <Header />
      <main class='flex flex-col flex-1 h-full overflow-y-auto'>
        <div
          class={`flex-1 space-y-2 overflow-x-hidden overflow-y-auto h-full ${scrollbarStyle.scrollbar}`}
        >
          <NewsList news={items()} />
        </div>
      </main>
    </Container>
  );
};

export default App;
