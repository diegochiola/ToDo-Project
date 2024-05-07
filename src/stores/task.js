// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";

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
});
