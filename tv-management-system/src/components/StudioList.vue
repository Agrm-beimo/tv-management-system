<template>
    <div class="studio-list">
      <h1>演播室列表</h1>
      <table>
        <thead>
          <tr>
            <th>演播室ID</th>
            <th>演播室名称</th>
            <th>位置</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="studio in studios" :key="studio.StudioID">
            <td>{{ studio.StudioID }}</td>
            <td>{{ studio.StudioName }}</td>
            <td>{{ studio.Location }}</td>
            <td>
              <button @click="editStudio(studio)">编辑</button>
              <button @click="deleteStudio(studio.StudioID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑演播室' : '添加演播室' }}</h2>
        <form @submit.prevent="isEditing ? updateStudio() : addStudio()">
          <input v-model="form.StudioName" placeholder="演播室名称" required />
          <input v-model="form.Location" placeholder="位置" />
          <button type="submit">{{ isEditing ? '更新' : '添加' }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        studios: [],
        form: {
          StudioID: null,
          StudioName: '',
          Location: ''
        },
        isEditing: false
      };
    },
    created() {
      this.fetchStudios();
    },
    methods: {
      fetchStudios() {
        axios.get('http://localhost:3000/api/studios')
          .then(response => {
            this.studios = response.data;
          })
          .catch(error => {
            console.error('Error fetching studios:', error);
          });
      },
      addStudio() {
        axios.post('http://localhost:3000/api/studios', this.form)
          .then(() => {
            this.fetchStudios();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding studio:', error);
          });
      },
      editStudio(studio) {
        this.form = { ...studio };
        this.isEditing = true;
      },
      updateStudio() {
        axios.put(`http://localhost:3000/api/studios/${this.form.StudioID}`, this.form)
          .then(() => {
            this.fetchStudios();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating studio:', error);
          });
      },
      deleteStudio(StudioID) {
        axios.delete(`http://localhost:3000/api/studios/${StudioID}`)
          .then(() => {
            this.fetchStudios();
          })
          .catch(error => {
            console.error('Error deleting studio:', error);
          });
      },
      resetForm() {
        this.form = {
          StudioID: null,
          StudioName: '',
          Location: ''
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .studio-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    margin-right: 5px;
  }
  
  .form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  input {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #45a049;
  }
  </style>
  