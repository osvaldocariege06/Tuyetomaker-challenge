import api from "@/lib/axios"


export async function findAll() {
  await api.get('/appointment/')

}
