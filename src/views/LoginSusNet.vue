<script setup lang="ts">
import { susStore } from '@/stores/index'
import { ref } from 'vue'
const store = susStore()
interface typeForm {
  user: string
  pass: string
}
const form = ref<typeForm>({
  user: '',
  pass: ''
})
const valid = ref<boolean | null>(false)

const onSubmit = async (event: typeForm) => {
  if (valid.value) {
    await store.login(event)
  }
}
const userRule = ref([
  (value: string) => {
    if (value) return true
    return 'User is required.'
  },
  (value: string) => {
    if (value?.length <= 10) return true
    // if (!value) return 'Pass is required'
    return 'Name must be less than 10 characters.'
  }
])
const passRule = ref([
  (value: string) => {
    if (value) return true
    return 'Pass is required.'
  }
])
</script>

<template>
  <v-container class="justify-center d-flex" fluid fill-height>
    <v-col cols="6">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login SUSnet</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            v-model="valid"
            data-test="submit"
            validate-on="submit lazy"
            @submit.prevent="onSubmit(form)"
          >
            <v-text-field
              v-model="form.user"
              prepend-icon="mdi-account"
              name="login"
              label="Usuário"
              :rules="userRule"
              type="text"
              id="user"
              data-test="user"
              class="user"
              variant="underlined"
            ></v-text-field>
            <v-text-field
              v-model="form.pass"
              prepend-icon="mdi-lock"
              name="password"
              label="Senha"
              :rules="passRule"
              id="password"
              data-test="password"
              type="password"
              variant="underlined"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary">Entrar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-container>
</template>
