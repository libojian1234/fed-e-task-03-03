<template>
  <div>
    <form class="card comment-form" @submit.prevent="postComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="textarea"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          :disabled="postCommentDisable"
        >
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleCompenents",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      postCommentDisable: false, //提交按钮是否禁用
      textarea: '' //评论内容
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    console.log(data);
    this.comments = data.comments;
  },
  methods: {
    async postComment() {
      if (!this.textarea) return;
      this.postCommentDisable = true;
      await addComment(this.article.slug, this.textarea);
      this.postCommentDisable = false;
      this.textarea = '';
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
  },
};
</script>

<style>
</style>