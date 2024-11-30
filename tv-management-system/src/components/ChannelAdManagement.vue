<template>
    <div class="channel-ad-management">
      <h1>频道广告管理</h1>
      <table>
        <thead>
          <tr>
            <th>频道ID</th>
            <th>广告ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="channelAd in channelAds" :key="channelAd.ChannelID + '-' + channelAd.AdID">
            <td>{{ channelAd.ChannelID }}</td>
            <td>{{ channelAd.AdID }}</td>
            <td>
              <button @click="editChannelAd(channelAd)">编辑</button>
              <button @click="deleteChannelAd(channelAd.ChannelID, channelAd.AdID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑频道广告' : '添加频道广告' }}</h2>
        <form @submit.prevent="isEditing ? updateChannelAd() : addChannelAd()">
          <input v-model="form.ChannelID" placeholder="频道ID" required />
          <input v-model="form.AdID" placeholder="广告ID" required />
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
        channelAds: [],
        form: {
          ChannelID: null,
          AdID: null
        },
        isEditing: false
      };
    },
    created() {
      this.fetchChannelAds();
    },
    methods: {
      fetchChannelAds() {
        axios.get('http://localhost:3000/api/channel-ads')
          .then(response => {
            this.channelAds = response.data;
          })
          .catch(error => {
            console.error('Error fetching channel ads:', error);
          });
      },
      addChannelAd() {
        axios.post('http://localhost:3000/api/channel-ads', this.form)
          .then(() => {
            this.fetchChannelAds();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding channel ad:', error);
          });
      },
      editChannelAd(channelAd) {
        this.form = { ...channelAd };
        this.isEditing = true;
      },
      updateChannelAd() {
        axios.put(`http://localhost:3000/api/channel-ads/${this.form.ChannelID}/${this.form.AdID}`, this.form)
          .then(() => {
            this.fetchChannelAds();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating channel ad:', error);
          });
      },
      deleteChannelAd(ChannelID, AdID) {
        axios.delete(`http://localhost:3000/api/channel-ads/${ChannelID}/${AdID}`)
          .then(() => {
            this.fetchChannelAds();
          })
          .catch(error => {
            console.error('Error deleting channel ad:', error);
          });
      },
      resetForm() {
        this.form = {
          ChannelID: null,
          AdID: null
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .channel-ad-management {
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
  