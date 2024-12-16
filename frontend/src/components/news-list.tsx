import '@/styles/news-list.css';

import { Component, For } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import NewsItem from '@/components/news-item';
import { INewsItem } from '@/types/news-item';

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
