import Parser from 'rss-parser';

export async function getNews() {
  const parser = new Parser({
    customFields: {
      creator: ['dc:creator'],
    },
  });
  const feed = await parser.parseURL('https://www.yna.co.kr/rss/news.xml');

  const items = feed.items.map((item) => ({
    provider: '연합뉴스',
    title: item.title,
    link: item.link,
    pubDate: new Date(item.pubDate),
  })).splice(0, 10);

  return items;
}
