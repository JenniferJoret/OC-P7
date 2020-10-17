import http from "../http-common";

class PostDataService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get(`/posts/${id}`);
  }

  create(post) {
    return http.post("/posts", {
      userId: post.userId,
      title : post.title,
      content : post.content
    });
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  findByTitle(title) {
    return http.get(`/posts?title=${title}`);
  }

  likePost(id, data) {
    return http.put(`/posts/${id}/like`, {
      like: data.like,
      userId : data.userId
    });
  }

}

export default new PostDataService();
