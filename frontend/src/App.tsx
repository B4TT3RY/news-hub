import { createSignal, For } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import './App.css';

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
    <div class='p-4 h-screen flex flex-col'>
      <button
        onClick={addNewItemsWithAnimation}
        class='px-4 py-2 bg-blue-500 text-white rounded mb-4'
      >
        Add New Item
      </button>
      <div
        class='space-y-2 flex-1 overflow-y-auto min-h-0'
      >
        <TransitionGroup name='group-item'>
          <For each={items()}>
            {(item) => (
              <div class='group-item p-4 bg-gray-100 rounded'>{item.text}</div>
            )}
          </For>
        </TransitionGroup>
      </div>
    </div>
  );
};

export default App;
