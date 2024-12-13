import clsx from 'clsx';
import { Component } from 'solid-js';

interface Props {
  provider: string;
  title: string;
  timestamp: string;
}

const NewsItem: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'group-item',
        'p-4 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer',
        'flex flex-col'
      )}
    >
      <span class='text-lg text-gray-100 truncate'>{props.title}</span>
      <div class="flex justify-between text-sm text-gray-400">
        <span class='truncate'>{props.provider}</span>
        <span class='truncate'>{props.timestamp}</span>
      </div>
    </div>
  );
};

export default NewsItem;
