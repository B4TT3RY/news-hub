import { createEffect, createSignal, onCleanup } from 'solid-js';
import Header from '@/components/Header';
import NewsList from '@/components/NewsList';
import Container from '@/components/Container';
import '@/styles/App.css';
import scrollbarStyle from '@/styles/scrollbar.module.css';
import createSSE from './utils/sse';

const App = () => {
  const [items, setItems] = createSignal<
    Array<{
      provider: string;
      title: string;
      link: string;
      author: string;
      pubDate: string;
    }>
  >([]);
  const [sse, setSSE] = createSignal<EventSource>();

  createEffect(() => {
    setSSE(() =>
      createSSE({
        url: 'http://10.0.0.5:3000/sse',
        messageHandler: (event) => {
          const newItem = JSON.parse(event.data);
          setItems((prev) => [...newItem, ...prev]);
        },
        errorHandler: (event) => {
          console.error('Error:', event);
        },
      })
    );

    onCleanup(() => {
      const currentSSE = sse();
      if (currentSSE) {
        currentSSE.close();
      }
    });
  });

  const addNewItem = () => {
    const newItem = {
      provider: '테스트',
      title: `테스트용 뉴스 ${items().length + 1}`,
      link: 'https://www.naver.com/',
      author: 'New Author',
      pubDate: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <Container>
      <Header />
      <main class='flex flex-col flex-1 h-full overflow-y-auto'>
        <div>
          <button
            onClick={addNewItem}
            class='px-4 py-2 bg-blue-500 text-gray-100 rounded mb-4'
          >
            Add New Item
          </button>
          <button
            onClick={() => {
              const currentSSE = sse();
              if (currentSSE) {
                currentSSE.close();
              }
            }}
            class='px-4 py-2 bg-blue-500 text-gray-100 rounded mb-4'
          >
            Close SSE
          </button>
        </div>
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
