<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title}}</h1>
        <article-meta :article="article"></article-meta>
        
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
          
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-compenents :article="article"></article-compenents>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleCompenents from './components/article-compenents'

export default {
  // 在路由匹配组件渲染直接会执行中间件处理
  middleware: "authenticated",
  name: "ArticleIndex",
  components:{
    ArticleMeta,
    ArticleCompenents
  },
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: data.article
    }
  },
  head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [
          {
            // 为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为 meta 标签配一个唯一的标识编号
            hid: 'description',
            name: 'description',
            content: this.article.description
          }
        ]
      }
    }
};
</script>

<style>
</style>