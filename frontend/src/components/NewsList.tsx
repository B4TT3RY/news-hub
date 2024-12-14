import { Component, For } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import NewsItem from './NewsItem';

interface Props {
  news: Array<{
    provider: string;
    title: string;
    link: string;
    author: string;
    pubDate: string;
  }>;
}

const NewsList: Component<Props> = (props) => {
  return (
    <TransitionGroup name='group-item'>
      <For each={props.news}>
        {(item) => (
          <NewsItem provider={item.provider} title={item.title} link={item.link} timestamp={item.pubDate} />
        )}
      </For>
    </TransitionGroup>
  );
};

export default NewsList;
