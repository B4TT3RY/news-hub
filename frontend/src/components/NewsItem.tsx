import { Component } from 'solid-js';

interface Props {
  title: string;
}

const NewsItem: Component<Props> = (props) => {
  return (
    <div class='group-item p-4 rounded bg-gray-800 hover:bg-gray-700 text-gray-400'>
      {props.title}
    </div>
  );
};

export default NewsItem;
