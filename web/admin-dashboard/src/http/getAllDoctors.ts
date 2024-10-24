import api from "@/lib/axios"


export async function getAllDoctors() {
  await api.get('/all')

}
