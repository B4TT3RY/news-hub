import { Component, For } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import NewsItem from './NewsItem';

interface Props {
  news: Array<{ id: string; text: string }>;
}

const NewsList: Component<Props> = (props) => {
  return (
    <TransitionGroup name='group-item'>
      <For each={props.news}>{(item) => <NewsItem title={item.text} timestamp={item.id} />}</For>
    </TransitionGroup>
  );
};

export default NewsList;
