export class UpdatePostDTO{
    title;
    content;

    constructor(post){
        this.title = post.title;
        this.content = post.content;
    }
}