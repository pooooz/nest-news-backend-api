export const renderNewsForm = (): string => {
  return `
    <form action="/news" method="post" enctype="multipart/form-data" class="p-4">
        <div class="form-group">
              <label for="title">Title</label>
              <input name="title" type="text" class="form-control" id="title" placeholder="News title" />
        </div>
        <div class="form-group">
            <label for="author">Author</label>
            <input name="author" type="text" class="form-control" id="author" placeholder="Enter your name" />
        </div>
        <div class="form-group">
            <label for="coverSrc">Cover link</label>
            <input name="coverSrc" type="text" class="form-control" id="coverSrc" placeholder="https://i.pinimg.com/736x/f4/d2/96/f4d2961b652880be432fb9580891ed62.jpg"/>
        </div>
        <div class="form-group">
            <label for="cover">Cover file</label>
            <input name="cover" type="file" class="form-control" id="cover" placeholder="Description" />
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea name="description" class="form-control" id="description" placeholder="Description"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
    </form>
  `;
};
