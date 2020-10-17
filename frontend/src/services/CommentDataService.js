import http from "../http-common";

class PostDataService {
//   getAll() {
//     return http.get("/posts");
//   }

  getAll(id) {
    return http.get(`/posts/${id}/comments`);
  }

   create(id, data) {
     return http.post(`/posts/${id}/comment`, data);
   }

   update(id, data) {
     return http.put(`/posts/${id}/comment`, data);
   }

   delete(idPost, idComment) {
     return http.delete(`/posts/${idPost}/comment/${idComment}`);
   }

//   deleteAll() {
//     return http.delete(`/posts`);
//   }

//   findByTitle(title) {
//     return http.get(`/posts?title=${title}`);
//   }
}

export default new PostDataService();
