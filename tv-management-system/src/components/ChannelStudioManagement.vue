<template>
    <div class="channel-studio-management">
      <h1>频道演播室管理</h1>
      <table>
        <thead>
          <tr>
            <th>频道ID</th>
            <th>演播室ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="channelStudio in channelStudios" :key="channelStudio.ChannelID + '-' + channelStudio.StudioID">
            <td>{{ channelStudio.ChannelID }}</td>
            <td>{{ channelStudio.StudioID }}</td>
            <td>
              <button @click="editChannelStudio(channelStudio)">编辑</button>
              <button @click="deleteChannelStudio(channelStudio.ChannelID, channelStudio.StudioID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑频道演播室' : '添加频道演播室' }}</h2>
        <form @submit.prevent="isEditing ? updateChannelStudio() : addChannelStudio()">
          <input v-model="form.ChannelID" placeholder="频道ID" required />
          <input v-model="form.StudioID" placeholder="演播室ID" required />
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
        channelStudios: [],
        form: {
          ChannelID: null,
          StudioID: null
        },
        isEditing: false
      };
    },
    created() {
      this.fetchChannelStudios();
    },
    methods: {
      fetchChannelStudios() {
        axios.get('http://localhost:3000/api/channel-studios')
          .then(response => {
            this.channelStudios = response.data;
          })
          .catch(error => {
            console.error('Error fetching channel studios:', error);
          });
      },
      addChannelStudio() {
        axios.post('http://localhost:3000/api/channel-studios', this.form)
          .then(() => {
            this.fetchChannelStudios();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding channel studio:', error);
          });
      },
      editChannelStudio(channelStudio) {
        this.form = { ...channelStudio };
        this.isEditing = true;
      },
      updateChannelStudio() {
        axios.put(`http://localhost:3000/api/channel-studios/${this.form.ChannelID}/${this.form.StudioID}`, this.form)
          .then(() => {
            this.fetchChannelStudios();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating channel studio:', error);
          });
      },
      deleteChannelStudio(ChannelID, StudioID) {
        axios.delete(`http://localhost:3000/api/channel-studios/${ChannelID}/${StudioID}`)
          .then(() => {
            this.fetchChannelStudios();
          })
          .catch(error => {
            console.error('Error deleting channel studio:', error);
          });
      },
      resetForm() {
        this.form = {
          ChannelID: null,
          StudioID: null
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .channel-studio-management {
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
  