import database from "../../database";

export class PostService {

    async findPostById(id) {
        const post = await database.post.findUnique({
            where: {
                id
            }
        })
        if (!post) throw { status: 404, message : "유저를 찾을 수 없습니다!" };
        return user
    }

    async findPosts({skip, take}) {
        
    }

    async createUser(props) {
        
    }

    async updateUser(id, props) {
        
    }

    async deleteUser(id) {
        
    }
}