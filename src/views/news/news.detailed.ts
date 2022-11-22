import { CommentEntity } from '../../comments/comments.interfaces';
import { NewsEntity } from '../../news/news.interfaces';

export const renderNewsItemDetailed = (
  news: NewsEntity,
  comments: Array<CommentEntity>,
) => {
  return `
    <div class="p-4 p-md-5 mb-4 rounded text-bg-dark">
        <img src=${
          news.coverSrc
        } class="card-img-top" alt="cat" style="height: 200px; object-fit: cover" />
        <h1 class="display-1 fst-italic">${news.title}</h1>
        <h4 class="card-subtitle mb-2 text-muted">Author: ${news.author}</h4>
        <h5 class="lead my-3">Description: ${news.description}</h5>
    </div>
    <div>
        ${renderCommentsList(comments)}
    </div>
    `;
};

export const renderCommentsList = (comments: Array<CommentEntity>): string => {
  let commentsListHtml = '';

  for (const commentItem in comments) {
    commentsListHtml += renderComment(comments[commentItem]);
  }

  return `
    <p>Comments:</p>
    <ol class="list-group list-group-numbered">
        ${commentsListHtml}
    </ol>
    `;
};

export const renderComment = (comment: CommentEntity) => {
  return `
    <li class="list-group-item d-flex justify-content-between align-items-start mb-2">
        <div class="ms-2 me-auto">
            <div class="fw-bold bold">${comment.author}</div>
            ${comment.text}
        </div>  
    </li>
    `;
};
