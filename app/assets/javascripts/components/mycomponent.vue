<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="reverseMessage">Reverse Message</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello, Vue!'
      }
    },
    methods: {
      reverseMessage() {
        this.message = this.message.split('').reverse().join('')
      }
    }
  }
</script>

<style>
  h1 {
    color: blue;
  }
</style>
