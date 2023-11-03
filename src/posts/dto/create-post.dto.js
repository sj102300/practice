export class CreatePostDTO{
    title;
    content;
    userId;

    constructor(post){
        this.title = post.title;
        this.content = post.content;
        this.userId = post.userId;
    }
}