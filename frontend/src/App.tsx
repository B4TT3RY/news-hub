import { createSignal } from 'solid-js';
import './App.css';
import Header from '@/components/Header';
import NewsList from '@/components/NewsList';
import Container from '@/components/Container';

const App = () => {
  const [items, setItems] = createSignal<Array<{ id: string; text: string }>>(
    []
  );

  const addNewItemsWithAnimation = () => {
    const newItem = {
      id: Date.now().toString(),
      text: `Item ${items().length + 1}`,
    };

    setItems((prev) => [newItem, ...prev]);
  };

  return (
    <Container>
      <Header />
      <main class='flex flex-col flex-1 h-full overflow-y-auto '>
        <button
          onClick={addNewItemsWithAnimation}
          class='px-4 py-2 bg-blue-500 text-gray-100 rounded mb-4'
        >
          Add New Item
        </button>
        <div class='flex-1 space-y-2 overflow-y-auto h-full'>
          <NewsList news={items()} />
        </div>
      </main>
    </Container>
  );
};

export default App;
