import * as cheerio from 'cheerio';

export async function getNews() {
  const items = [];
  const html = await fetch(
    'https://news.sbs.co.kr/news/newsflash.do'
  ).then((res) => res.text());
  const $ = cheerio.load(html);

  $('div.w_news_list ul li').map((_, element) => {
    items.push({
      provider: 'SBS 뉴스',
      title: $(element).find('strong.sub').text().trim(),
      link: $(element).find('a.news').attr('href'),
      pubDate: new Date($(element).find('span.date').text()),
    });
  });

  return items;
}
