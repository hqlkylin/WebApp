<template>

  <div class="title">
    <h1 v-text="name"></h1>

    <h2>{{pmsg}}</h2>
  </div>

</template>

<script type="text/ecmascript-6">

  export default{

    data: function () {
      return {
        name: "my name is kylin"
      }
    },
    props: ['pmsg']

  }


</script>

<style>
  .title {
    font-size: 24px;
  }

  .title h1 {
    color: #ff0000;
  }
</style>
