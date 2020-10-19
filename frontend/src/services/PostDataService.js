import http from "../http-common";
import authHeader from './auth-header';
class PostDataService {
  getAll() {
    return http.get("/posts", {
      headers: authHeader()
    });
  }

  get(id) {
    return http.get(`/posts/${id}`, {
      headers: authHeader()
    });
  }

  create(post) {
    return http.post("/posts", {
      userId: post.userId,
      title: post.title,
      content: post.content
    }, {
      headers: authHeader()
    });
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data, {
      headers: authHeader()
    });
  }

  delete(id) {
    return http.delete(`/posts/${id}`, {
      headers: authHeader()
    });
  }

  deleteAll() {
    return http.delete(`/posts`, {
      headers: authHeader()
    });
  }

  findByTitle(title) {
    return http.get(`/posts?title=${title}`, {
      headers: authHeader()
    });
  }

  likePost(id, data) {
    return http.put(`/posts/${id}/like`, {
      like: data.like,
      userId: data.userId
    }, {
      headers: authHeader()
    });
  }

}

export default new PostDataService();