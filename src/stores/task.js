// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

// /store/user.js
import router from '@/router'


//declaramos la store como: "tasks"
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() { //función para traer todas las tareas de la base de datos
      const { data: tasks } = await supabase //se conecta con supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
  },
  async addTask( user_id, title, status, description) {
    const { data, error } = await supabase //se conecta con supabase
      .from("tasks")
      .insert({ 
        user_id: user_id,
        title: title, 
        status: status, 
        inserted_at: new Date(),
        description: description
        });

    if (error) throw error
    if (data) router.push('/' )//modificar ruta
  },
});
