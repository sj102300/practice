import { Router } from 'express';
import { CreatePostDTO, UpdatePostDTO, PostsDTO } from '../dto';
import { PostService } from '../service';
import { pagination } from '../../middleware/pagination';


class PostController {
    router;
    path = "/posts";
    postService;

    constructor() {
        this.router = Router();
        this.postService = new PostService();
        this.init();
    }

    //라우팅
    init() {
        this.router.get("/", pagination, this.getPosts.bind(this));
        this.router.get("/:id", this.getPost.bind(this));
        this.router.post("/", this.createPost.bind(this));
        this.router.patch("/:id", this.updatePost.bind(this));
        this.router.delete("/:id", this.deletePost.bind(this));
    }

    async getPosts(req, res, next){
        try {
            const {posts, count} = await this.postService.findPosts({
                skip: req.skip,
                take: req.take
            })
            res.status(200).json({ posts: posts.map((post) => new PostsDTO(post)), count})
        }
        catch(err){
            next(err);
        }
    }

    async getPost(req, res, next){
        try {
            const { id } = req.params
            const post = await this.postService.findPostById(id)
            res.status(200).json({ post: new PostsDTO(post) });
        }
        catch(err){
            next(err);
        }
    }

    async createPost(req, res, next){
        try {
            const createPostDto = new CreatePostDTO(req.body);
            const newPostId = await this.postService.createPost(createPostDto);
            res.status(201).json( { id : newPostId })
        }
        catch(err){
            next(err);
        }
    }
    
    async updatePost(req, res, next){
        try {
            const { id } = req.params
            const updatePostDto = new UpdatePostDTO(req.body);
            const updatePostId = await this.postService.updatePost(id, updatePostDto);
            res.status(204).json({ })
        }
        catch(err){
            next(err);
        }
    }

    async deletePost(req, res, next){
        try {
            const { id } = req.params;
            await this.postService.deletePost(id);
            res.status(204).json({});
        }
        catch(err){
            next(err);
        }
    }

}

const postController = new PostController();
export default postController;


/*

 /user
 /post?userId
 */