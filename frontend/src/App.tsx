import { createSignal, For } from "solid-js";

const App = () => {
  const [items, setItems] = createSignal<Array<{ id: string; text: string }>>([]);

  const addNewItemsWithAnimation = () => {
    const newItem = {
      id: Date.now().toString(),
      text: `Item ${items().length + 1}`
    };
    
    setItems(prev => [newItem, ...prev]);
  };

  return (
    <div class="p-4">
      <button
        onClick={addNewItemsWithAnimation}
        class="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Add New Item
      </button>
      <div class="space-y-2">
        <For each={items()}>
          {(item) => (
            <div
              class="p-4 bg-gray-100 rounded animate-slideUp"
            >
              {item.text}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;