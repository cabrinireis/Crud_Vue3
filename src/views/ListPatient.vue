<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from 'vue'
import appForm from '@/components/FormPatient.vue'
import { susStore } from '@/stores'
const store = susStore()
interface DataTableHeader {
  title: string
  key: string
}
interface TypeDataBody {
  name: string
  motherName: string
  phone: number
  actions: string
  id: string
}

const header: DataTableHeader[] = reactive([
  { title: 'Nome do pasciente', key: 'name' },
  { title: 'Nome da mãe', key: 'motherName' },
  { title: 'CPF', key: 'phone' },
  { title: 'Ações', key: 'actions' }
])

const dialogActive = ref<boolean>(false)

const search = ref<string>('')
const awaitingSearch = ref<boolean>(false)

const patientId = ref<string>('')
const mode = ref<string>('')

const list = computed<TypeDataBody[]>(() => {
  return store.patientList
})
const onLoading = computed(() => {
  return store.loading
})

function openModal(typeMode: string) {
  dialogActive.value = !dialogActive.value
  mode.value = typeMode
}

const onGetPatient = async (id: string, mode: string) => {
  try {
    await store.getPatient(id)
    openModal(mode)
  } catch (error) {
    console.log(error)
  }
}

const onUpdate = (id: string, mode: string) => {
  onGetPatient(id, mode)
}
const onRead = (id: string, mode: string) => {
  onGetPatient(id, mode)
}
const onDelete = (id: string, mode: string) => {
  patientId.value = id
  openModal(mode)
}
const onCreate = () => {
  openModal('new')
}

onMounted(async () => {
  await store.getPatients()
})

watch(search, (value: string) => {
  store.setSearch(value)
  if (!awaitingSearch.value) {
    setTimeout(() => {
      store.getPatients()
      awaitingSearch.value = false
    }, 2000)
  }
  awaitingSearch.value = true
})
</script>
<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="4">
        <v-btn color="secondary" @click="onCreate">Cadastrar</v-btn>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="search"
          class="input-search"
          flat
          prependInnerIcon="mdi-magnify"
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
              <th v-for="(item, i) in header" :key="i" class="text-left w-25">{{ item.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="onLoading">
              <td colspan="4" class="h-auto">
                <v-progress-linear :indeterminate="onLoading"></v-progress-linear>
              </td>
            </tr>
            <tr v-else v-for="(item, i) in list" :key="i">
              <td>{{ item.name }}</td>
              <td>{{ item.motherName }}</td>
              <td>{{ item.phone }}</td>
              <td>
                <v-icon @click="onUpdate(item.id, 'edit')">mdi-pencil</v-icon>
                <v-icon class="ml-4" @click="onRead(item.id, 'read')">mdi-eye</v-icon>
                <v-icon class="ml-4" @click="onDelete(item.id, 'remove')">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-if="dialogActive" v-model="dialogActive" width="800" scrollable>
        <appForm
          :data-form="store.patientId"
          :mode="mode"
          :id="patientId"
          @close="dialogActive = false"
        />
      </v-dialog>
    </v-row>
  </v-container>
</template>
