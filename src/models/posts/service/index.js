import database from "../../../database";

export class PostService {

    async findPostById(id) {
        const post = await database.post.findUnique({
            where: {
                id
            }
        })
        if (!post) throw { status: 404, message : "유저를 찾을 수 없습니다!" };
        return post
    }

    async findPostsByUserId(userId){
        const posts = await database.post.findMany({
            where: {
                userId
            }
        })
        return posts;
    }

    async findPostWithUserInfo(id){
        const post = await database.post.findUnique({
            where: {
                id
            },
            include: {
                user: true,
            }
        })
        return post;
    }

    async findPosts({skip, take}) {
        const posts = await database.post.findMany({
            skip, take
        });
        const count = await database.post.count();
        return { posts, count }
    }

    async createPost(props) {
        const newPost = await database.post.create({
            data: {
                title: props.title,
                content: props.content,
                userId: props.userId
            }
        })
        return newPost.id;
    }

    async updatePost(id, props) {
        const isExist = await database.post.findUnique({
            where: {
                id,
            }
        });
        if(!isExist) throw {status:404, message:"게시글을 찾을 수 없습니다!"};
        await database.post.update({
            where: {
                id: isExist.id
            },
            data: {
                title: props.title,
                content: props.content,
                userId: props.userId,
            }
        })
    }

    async deletePost(id) {
        const isExist = await database.post.findUnique({
            where: {
                id,
            }
        });
        if (!isExist) throw { status:404, message: "게시글을 찾을 수 없습니다!"};
        await database.post.delete({
            where: {
                id: isExist.id,
            }
        })
    }
}