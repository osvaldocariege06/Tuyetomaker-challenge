export function getIniciais(name: string | undefined) {
  if (typeof name !== 'string') return

  const fullName = name.split(' ')
  const iniciais = fullName.map(name => name[0]).join('')

  return iniciais
}
