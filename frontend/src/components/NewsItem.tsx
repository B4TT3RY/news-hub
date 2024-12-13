import clsx from 'clsx';
import { Component } from 'solid-js';

interface Props {
  title: string;
  timestamp: string;
}

const NewsItem: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'group-item',
        'p-4 rounded bg-gray-800 hover:bg-gray-700 text-gray-400',
        'flex justify-between'
      )}
    >
      <span>{props.title}</span>
      <span>{props.timestamp}</span>
    </div>
  );
};

export default NewsItem;
