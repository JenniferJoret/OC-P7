<template>
    <div class=" bg-t-white col-xl-6 mx-auto">
        <div>
            <p class="h3 text-center col-12 mx-auto py-4">Ajouter un commentaire</p>
            
            <div class="form-group d-flex justify-content-around pb-3">
                <input class="form-control col-9" id="content" required v-model="comment.content" name="content" />
                <button @click="saveComment" class="btn btn-success col-2">Poster !</button>
            </div>
        </div>
        <hr>
        <section class="d-flex flex-column py-2 comment" v-for="(comment, index) in comments"
            :key="index">
            <div class="px-4 pt-3">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row ">
                        <div class="px-2">
                            <p><i class="far fa-clock pr-1"></i> Posté {{ getInterval(comment.created_at) }}</p>
                        </div>
                        <div class="user px-2"><i class="fas fa-user-circle pr-1"></i><a
                                >{{ comment.user.firstName +' ' + comment.user.lastName }}</a>
                        </div>
                    </div>
                    <div class="d-flex flex-column ">
                        <button v-if="comment.userId === currentUser.id" class="mx-2 edit-delete" @click="editComment(comment)"><i class="fas fa-edit pr-1"></i></button>
                        <button v-if="comment.userId === currentUser.id || isAdmin" class="mx-2 edit-delete" @click="deleteComment(comment)"><i class="fas fa-trash-alt pr-1"></i></button>
                    </div>

                </div>
                <div class="d-flex px-4 m-auto col-12 justify-content-between">
                    <div class="d-flex flex-row col-9 mx-auto" v-if="comment.isEditing">
                        <input class="form-control" id="content" required v-model="comment.content" name="content" value="{}" />
                        <button @click="updateComment(comment)" class="btn btn-success col-2 mx-auto">Mettre à jour !</button>
                    </div>
                    
                    <p v-else>{{ comment.content }}</p>
                </div>
            </div>
            <hr>
        </section>
    </div>

</template>

<script>
import CommentDataService from "../services/CommentDataService";
import moment from 'moment';
import Comment from '../models/comment';
import 'moment/locale/fr';
moment.locale('fr');

export default {
    name: "comment",
    data() {
        return {
            comments: [],
            comment: new Comment('', ''),
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        retrieveComments(id) {
            CommentDataService.getAll(id)
                .then(response => {
                for (var i = 0, len = response.data.length; i < len; i++) {
                response.data[i].isEditing = false
                }
                this.comments = response.data;
                this.$store.state.commentsCount = this.comments.length;
            }
            )
        },
        saveComment() {
            var data = {
                userId: this.currentUser.id,
                content: this.comment.content
            };
            CommentDataService.create(this.$route.params.id, data)
                .then(response => {
                    this.comment.id = response.data.id;
                    this.submitted = true;
                    this.comments.unshift(response.data);
                    this.comment.content = "";
                    this.$store.state.commentsCount = this.comments.length;
                })
        },
        editComment(comment) {
            comment.isEditing=!comment.isEditing;
        },
        
        deleteComment(comment) {

            CommentDataService.delete(this.$route.params.id, comment.id)
                .then(response => {
                    this.comments.splice(this.comments.indexOf(comment), 1)
                    this.$store.state.commentsCount = this.comments.length;
                })
        },
        updateComment(comment) {
        var data = {
                userId: comment.userId,
                content: comment.content,
                commentId: comment.id
            };
            console.log(data)
            CommentDataService.update(this.$route.params.id, data)
                .then(response => {
                    comment.content = response.data.content;
                    comment.isEditing = false;
                })
        },
            isAdmin() {
                if (this.currentUser && this.currentUser.roles) {
                    return this.currentUser.roles.includes('ROLE_ADMIN');
                }

                return false;
            },
        
    getInterval(date) {
      var interval = moment(date).fromNow();
      return interval
    },
    },

    mounted() {
        this.retrieveComments(this.$route.params.id)
    }
}
</script>

