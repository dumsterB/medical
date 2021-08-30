<template>
  <div>
    <v-container fluid>
      <v-row class=" rowForm">
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="form"

        >
          <v-text-field
              v-model="role"
              label="Name"
              required
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
              class=""
              required
          ></v-text-field>

          <v-btn
              color="primary"
              :disabled="!valid"
              class="mr-4"
              @click="enter"
              large
          >
            Зайти
          </v-btn>

        </v-form>
        {{authRoles}}<br><br>
        {{ roles }}
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    password: '',
    role: '',
    authRoles:[],
  }),
  computed: {
    ...mapGetters(['roles'])
  },
  methods: {

    enter() {
      if (this.role === this.authRoles[0].role && this.password === this.authRoles[0].password)  {
         this.$router.replace('/')
      }
      // } else if (this.authRoles[1].role == this.role && this.authRoles[1].password == this.password) {
      //   return   this.$router.push(this.roles[1].path)
      // }

    }
  },
  mounted() {
    axios.get('http://localhost:3000/auth')
        .then(response => (this.authRoles = response.data))
        .catch((err)=>{
      console.log(err)
  })
}
}
</script>

<style scoped>
.rowForm {
  justify-content: center;
  align-items: center;
  align-content: center;
}

.form {
  width: 800px;
  margin-top: 50px;

}
</style>