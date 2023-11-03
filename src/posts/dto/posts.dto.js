export class PostsDTO {
    id;
    title;
    content;
    userId;

    constructor(post){
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.userId = post.userId;
    }
}