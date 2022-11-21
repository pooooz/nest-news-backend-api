import { NewsData, NewsEntity } from '../../news/news.interfaces';

export const renderNewsList = (news: NewsData): string => {
  let newsListHtml = '';

  for (const newsItem in news) {
    newsListHtml += renderNewsItem(news[newsItem]);
  }

  return `
    <h1>News</h1>
    <ul class="row">
        ${newsListHtml}
    </ul>
    `;
};

export const renderNewsItem = (news: NewsEntity) => {
  return `
    <li class="col-lg-4 mb-2">
        <div class="card">
              <img src=${news.coverSrc} class="card-img-top" alt="cat" style="height: 200px; object-fit: cover" />
              <div class="card-body">
                  <a href="/news/${news.id}/detail">
                    <h5 class="card-title">${news.title}</h5>
                  </a>
                  <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
                  <p class="card-text">${news.description}</p>
              </div>
        </div>  
    </li>
    `;
};
