import { Component, For } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import NewsItem from '@/components/NewsItem';
import { INewsItem } from '@/types/NewsItem';

interface Props {
  news: INewsItem[];
}

const NewsList: Component<Props> = (props) => {
  return (
    <TransitionGroup name='group-item'>
      <For each={props.news}>
        {(item) => (
          <NewsItem
            provider={item.provider}
            title={item.title}
            link={item.link}
            timestamp={item.pubDate}
          />
        )}
      </For>
    </TransitionGroup>
  );
};

export default NewsList;
