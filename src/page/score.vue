<template>
  <div class="score">
    <div>{{score}}</div>
    <button class="uk-button uk-button-primary"
@click="navigateToHome">go to home</button>
  </div>
</template>
<script>
  export default {
      computed:{
          score(){
              return this.$store.getters.score;
          }
      },
      methods:{
          navigateToHome(){
              this.$store.dispatch('resetScore');
              this.$router.push('/');
          }
      }
  }
</script>
<style>
  .score> *{
    color:red;
  }
</style>
