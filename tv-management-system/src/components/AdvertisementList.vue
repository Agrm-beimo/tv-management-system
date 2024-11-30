<template>
    <div class="advertisement-list">
      <h1>广告列表</h1>
      <table>
        <thead>
          <tr>
            <th>广告ID</th>
            <th>广告名称</th>
            <th>编辑ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="advertisement in advertisements" :key="advertisement.AdID">
            <td>{{ advertisement.AdID }}</td>
            <td>{{ advertisement.AdName }}</td>
            <td>{{ advertisement.EditorID }}</td>
            <td>
              <button @click="editAdvertisement(advertisement)">编辑</button>
              <button @click="deleteAdvertisement(advertisement.AdID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑广告' : '添加广告' }}</h2>
        <form @submit.prevent="isEditing ? updateAdvertisement() : addAdvertisement()">
          <input v-model="form.AdName" placeholder="广告名称" required />
          <input v-model="form.EditorID" placeholder="编辑ID" />
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
        advertisements: [],
        form: {
          AdID: null,
          AdName: '',
          EditorID: null
        },
        isEditing: false
      };
    },
    created() {
      this.fetchAdvertisements();
    },
    methods: {
      fetchAdvertisements() {
        axios.get('http://localhost:3000/api/advertisements')
          .then(response => {
            this.advertisements = response.data;
          })
          .catch(error => {
            console.error('Error fetching advertisements:', error);
          });
      },
      addAdvertisement() {
        axios.post('http://localhost:3000/api/advertisements', this.form)
          .then(() => {
            this.fetchAdvertisements();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding advertisement:', error);
          });
      },
      editAdvertisement(advertisement) {
        this.form = { ...advertisement };
        this.isEditing = true;
      },
      updateAdvertisement() {
        axios.put(`http://localhost:3000/api/advertisements/${this.form.AdID}`, this.form)
          .then(() => {
            this.fetchAdvertisements();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating advertisement:', error);
          });
      },
      deleteAdvertisement(AdID) {
        axios.delete(`http://localhost:3000/api/advertisements/${AdID}`)
          .then(() => {
            this.fetchAdvertisements();
          })
          .catch(error => {
            console.error('Error deleting advertisement:', error);
          });
      },
      resetForm() {
        this.form = {
          AdID: null,
          AdName: '',
          EditorID: null
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .advertisement-list {
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
  