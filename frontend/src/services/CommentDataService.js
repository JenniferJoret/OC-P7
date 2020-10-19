import http from "../http-common";
import authHeader from './auth-header';

class CommentDataService {
  getAll(id) {
    return http.get(`/posts/${id}/comments`, {
      headers: authHeader()
    });
  }

  create(id, data) {
    return http.post(`/posts/${id}/comment`, data, {
      headers: authHeader()
    });
  }

  update(id, data) {
    return http.put(`/posts/${id}/comment`, data, {
      headers: authHeader()
    });
  }

  delete(idPost, idComment) {
    return http.delete(`/posts/${idPost}/comment/${idComment}`, {
      headers: authHeader()
    });
  }

}

export default new CommentDataService();