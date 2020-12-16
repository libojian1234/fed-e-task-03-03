<template>
  <div>
      <h1>FooPage</h1>
      <div v-for="item in posts" :key="item.id">
         <nuxt-link :to="'/article/'+item.id">{{ item.title }}</nuxt-link>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FooPage',
  props: ['posts'],
}
</script>

<style>

</style>