<template>
    <div class="channel-list">
      <h1>频道列表</h1>
      <table>
        <thead>
          <tr>
            <th>频道ID</th>
            <th>频道名称</th>
            <th>主持人ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="channel in channels" :key="channel.ChannelID">
            <td>{{ channel.ChannelID }}</td>
            <td>{{ channel.ChannelName }}</td>
            <td>{{ channel.HostID }}</td>
            <td>
              <button @click="editChannel(channel)">编辑</button>
              <button @click="deleteChannel(channel.ChannelID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑频道' : '添加频道' }}</h2>
        <form @submit.prevent="isEditing ? updateChannel() : addChannel()">
          <input v-model="form.ChannelName" placeholder="频道名称" required />
          <input v-model="form.HostID" placeholder="主持人ID" />
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
        channels: [],
        form: {
          ChannelID: null,
          ChannelName: '',
          HostID: null
        },
        isEditing: false
      };
    },
    created() {
      this.fetchChannels();
    },
    methods: {
      fetchChannels() {
        axios.get('http://localhost:3000/api/channels')
          .then(response => {
            this.channels = response.data;
          })
          .catch(error => {
            console.error('Error fetching channels:', error);
          });
      },
      addChannel() {
        axios.post('http://localhost:3000/api/channels', this.form)
          .then(() => {
            this.fetchChannels();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding channel:', error);
          });
      },
      editChannel(channel) {
        this.form = { ...channel };
        this.isEditing = true;
      },
      updateChannel() {
        axios.put(`http://localhost:3000/api/channels/${this.form.ChannelID}`, this.form)
          .then(() => {
            this.fetchChannels();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating channel:', error);
          });
      },
      deleteChannel(ChannelID) {
        axios.delete(`http://localhost:3000/api/channels/${ChannelID}`)
          .then(() => {
            this.fetchChannels();
          })
          .catch(error => {
            console.error('Error deleting channel:', error);
          });
      },
      resetForm() {
        this.form = {
          ChannelID: null,
          ChannelName: '',
          HostID: null
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .channel-list {
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
  