<template>
    <div class="bg-t-white col-xl-6 mx-auto mb-5 ">
        <!-- AJOUT COMMENTAIRE -->
        <div class="d-flex flex-column">
            <label for="content" class="h3 text-center col-12 mx-auto py-4">Ajouter un commentaire</label>
            <div class="form-group d-flex flex-column  flex-md-row justify-content-md-around pb-3">
                <input class="form-control col-10 col-md-9 mx-auto" id="content" required v-model="comment.content"
                    name="content" />
                <button @click="saveComment" class="btn btn-success mt-3 mt-md-0 col-10 col-md-2 mx-auto">Poster
                    !</button>
            </div>
        </div>
        <hr>
        <!-- COMMENTAIRES -->
        <section class="d-flex flex-column py-2 comment" v-for="(comment, index) in comments" :key="index">
            <div class="px-4 pt-3">
                <div class="d-flex justify-content-between">
                    <!-- DATE/UTILISATEUR -->
                    <div class="d-flex flex-column flex-md-row text-left">
                        <p class="date px-md-2 mb-0"><span class="far fa-clock pr-1"></span>Posté
                            {{ getInterval(comment.created_at) }}</p>
                        <p class="user px-md-2 mb-0"><span
                                class="fas fa-user-circle pr-1"></span>{{ comment.user.firstName + ' ' + comment.user.lastName }}
                        </p>
                    </div>
                    <!-- BOUTONS EDITER/SUPPRIMER -->
                    <div class="d-flex flex-column flex-md-row">
                        <button v-if="comment.userId === currentUser.id" class="mx-2 edit-delete"
                            @click="editComment(comment)"><span class="fas fa-edit pr-1"></span> </button>
                        <button v-if="comment.userId === currentUser.id || isAdmin()" class="mx-2 edit-delete"
                            @click="deleteComment(comment)"><span class="fas fa-trash-alt pr-1"></span> </button>
                    </div>
                </div>
                <!-- EDITION COMMENTAIRE -->
                <div class="px-4">
                    <div class="d-flex flex-column col-12 mx-auto" v-if="comment.isEditing">
                        <textarea class="form-control" id="content" required v-model="comment.content" name="content"
                            value="{}"></textarea>
                        <button @click="updateComment(comment)" class="btn btn-success mx-auto my-3">Mettre à jour
                            !</button>
                    </div>
                    <!-- CONTENU COMMENTAIRE -->
                    <p v-else class="mx-auto text-md-justify post-content">{{ comment.content }}</p>
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
        //get all comments with post id
        retrieveComments(id) {
            CommentDataService.getAll(id)
                .then(response => {
                    for (var i = 0, len = response.data.length; i < len; i++) {
                        response.data[i].isEditing = false
                    }
                    this.comments = response.data;
                    this.$store.state.commentsCount = this.comments.length;
                })
        },
        //create a new comment
        saveComment() {
            var data = {
                userId: this.currentUser.id,
                content: this.comment.content
            };
            CommentDataService.create(this.$route.params.id, data)
                .then(response => {
                    response.data.isEditing = false;
                    this.comment.id = response.data.id;
                    this.submitted = true;
                    this.comments.unshift(response.data);
                    this.comment.content = "";
                    this.$store.state.commentsCount = this.comments.length;
                })
        },
        //toggle edit
        editComment(comment) {
            comment.isEditing = !comment.isEditing;
        },
        //update a comment after edit
        updateComment(comment) {
            var data = {
                userId: comment.userId,
                content: comment.content,
                commentId: comment.id
            };
            CommentDataService.update(this.$route.params.id, data)
                .then(response => {
                    comment.content = response.data.content;
                    comment.isEditing = false;
                })
        },
        //delete a comment
        deleteComment(comment) {
            CommentDataService.delete(this.$route.params.id, comment.id)
                .then(() => {
                    this.comments.splice(this.comments.indexOf(comment), 1)
                    this.$store.state.commentsCount = this.comments.length;
                })
        },
        //check if admin
        isAdmin() {
            if (this.currentUser && this.currentUser.roles) {
                return this.currentUser.roles.includes('ROLE_ADMIN');
            }

            return false;
        },
        //get time interval
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

