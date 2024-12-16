import * as cheerio from 'cheerio';

export async function getNews() {
  const items = [];
  const html = await fetch(
    'https://www.ytn.co.kr/news/list.php?mcd=recentnews'
  ).then((res) => res.text());
  const $ = cheerio.load(html);

  $('div.news_list').map((_, element) => {
    const titleElement = $(element).find('.title a');

    if (titleElement.text().trim().length === 0) {
      return;
    }

    items.push({
      provider: 'YTN',
      title: titleElement.text().trim(),
      link: titleElement.attr('href'),
      pubDate: new Date($(element).find('.date').text()),
    });
  });

  return items;
}
