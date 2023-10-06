<template>
  <v-container class="justify-center d-flex" fluid fill-height>
    <v-col cols="6">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login SUSnet</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              prepend-icon="mdi-account"
              name="login"
              label="Usuário"
              type="text"
              variant="underlined"
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Senha"
              type="password"
              variant="underlined"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Entrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>
