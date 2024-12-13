import { createEffect, createSignal, onCleanup } from 'solid-js';
import Header from '@/components/Header';
import NewsList from '@/components/NewsList';
import Container from '@/components/Container';
import '@/styles/App.css';
import scrollbarStyle from '@/styles/scrollbar.module.css';
import createSSE from './utils/sse';

const App = () => {
  const [items, setItems] = createSignal<Array<{ id: string; text: string }>>(
    []
  );
  const [sse, setSSE] = createSignal<EventSource>();

  const addNewItemsWithAnimation = () => {
    const newItem = {
      id: Date.now().toString(),
      text: `Item ${items().length + 1}`,
    };

    setItems((prev) => [newItem, ...prev]);
  };

  createEffect(() => {
    setSSE(() =>
      createSSE({
        url: 'http://10.0.0.5:3000/sse',
        messageHandler: (event) => {
          const newItem = JSON.parse(event.data);
          setItems((prev) => [newItem, ...prev]);
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

  return (
    <Container>
      <Header />
      <main class='flex flex-col flex-1 h-full overflow-y-auto'>
        <button
          onClick={addNewItemsWithAnimation}
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
