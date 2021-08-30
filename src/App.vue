<template>
  <div id="">
    <!-- App.vue -->

    <v-app>
<!--      <v-navigation-drawer app>-->
<!--      </v-navigation-drawer>-->
      <v-app-bar
          app
          class="blue lighten-1"
          dark
      >
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Medical</v-toolbar-title>

        <v-spacer></v-spacer>

        <h2 class="mr-10">{{date | date('time')}}</h2>

      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "",
  data(){
    return{
      date: new Date(),
      interval: null,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

  },
  // created() {
  //   this.$router.replace({
  //     name:'Auth'
  //   }).catch(()=>{})
  // }

}
</script>
<style lang="scss" scoped>

</style>
