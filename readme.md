### Api endpoints

*   GET /post (list all posts)
*   GET /post/:id (get a specific post)
*   POST /post (create a new post)
*   PUT /post/:id (update a post)
*   DELETE /post/:id (delete a post)
*   POST /user/signup (user signup)
*   POST /user/login (user login)
*   POST /user/update (update a user)
*   GET /user/:id (get a user)
*   GET /user/auth (get a user through token)
*   GET /user/bookmarks (get a user bookmarks)
*   GET /user/bookmark (user can bookmark a post)
*   POST /comment (create a comment)
*   POST /comment/:id (reply to a comment)
*   GET /comment/replies/:id (get replies of a comment)

### Features

*   **User Authentication**: Users can register and login to access their accounts securely.
*   **Token-based Authentication**: Utilizes JWT for token-based authentication.
*   **Profile Management**: Users can update their profile information including name and email.
*   **Nested comments**: user can comment on a post and reply to a comment in a nested way just like Reddit.
*   **Blog Management**: CRUD operations for creating, reading, updating, and deleting blogs.
*   **Bookmark Tags**: Users can bookmark a blog.
