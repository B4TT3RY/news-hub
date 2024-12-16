import clsx from 'clsx';
import { Component } from 'solid-js';
import Tag from './tag';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  provider: string;
  title: string;
  link: string;
  timestamp: string;
}

const NewsItem: Component<Props> = (props) => {
  const formattedDate = dayjs(props.timestamp)
    .tz('Asia/Seoul')
    .format('YYYY-MM-DD HH:mm:ss');

  return (
    <a
      href={props.link}
      target='_blank'
      class={clsx(
        'group-item',
        'px-3.5 py-3 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer',
        'flex flex-col gap-1'
      )}
    >
      <span class='text-lg text-gray-100 font-medium truncate'>{props.title}</span>
      <div class='flex justify-between'>
        <div class='flex gap-2'>
          <Tag color='blue'>{props.provider}</Tag>
          {props.title.startsWith('[속보]') && <Tag color='red'>속보</Tag>}
        </div>
        <Tag color='lightGray'>{formattedDate}</Tag>
      </div>
    </a>
  );
};

export default NewsItem;
