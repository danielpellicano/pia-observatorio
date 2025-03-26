// src/utils/usersStore.ts
export let mockUsers = [
    { id: 1, nome: 'Daniel Pellicano', email: 'admin@teste.com', senha: '123456', perfil: 'admin' },
    { id: 2, nome: 'Nome do Usuário', email: 'user@teste.com', senha: '302*@zQL2k', perfil: 'Gestor' },
  ]
  
  export function addUser(user: any) {
    mockUsers.push({ id: Date.now(), ...user })
  }
  