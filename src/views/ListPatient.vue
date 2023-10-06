<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Ref } from 'vue'
import appForm from '@/components/FormPatient.vue'
interface DataTableHeader {
  title: string
  key: string
}
interface TypeDataBody {
  name: string
  motherName: string
  phone: number
  actions: string
}

const header: DataTableHeader[] = reactive([
  { title: 'Nome do pasciente', key: 'name' },
  { title: 'Nome da mãe', key: 'motherName' },
  { title: 'CPF', key: 'phone' },
  { title: 'Ações', key: 'actions' }
])

const dataBody: Ref<TypeDataBody[]> = ref([
  {
    name: 'Fulana',
    motherName: 'Mae da fulana',
    phone: 1111111111,
    actions: 'mdi-pencil'
  }
])

const dialogActive = ref<boolean>(false)
function openModal() {
  dialogActive.value = !dialogActive.value
}
</script>
<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-btn color="secondary">Cadastrar</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          class="input-search"
          flat
          appendIcon="mdi-magnify"
          label="Buscar..."
          hide-details
          single-line
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th v-for="(item, i) in header" :key="i" class="text-left">{{ item.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in dataBody" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.motherName }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <v-icon @click="openModal">{{ item.actions }}</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-dialog v-if="dialogActive" v-model="dialogActive" width="800" persistent>
      hello
      <appForm />
    </v-dialog>
  </v-container>
</template>
