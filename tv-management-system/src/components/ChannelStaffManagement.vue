<template>
    <div class="channel-staff-management">
      <h1>频道员工管理</h1>
      <table>
        <thead>
          <tr>
            <th>频道ID</th>
            <th>员工ID</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="channelStaff in channelStaffs" :key="channelStaff.ChannelID + '-' + channelStaff.EmployeeID">
            <td>{{ channelStaff.ChannelID }}</td>
            <td>{{ channelStaff.EmployeeID }}</td>
            <td>
              <button @click="editChannelStaff(channelStaff)">编辑</button>
              <button @click="deleteChannelStaff(channelStaff.ChannelID, channelStaff.EmployeeID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑频道员工' : '添加频道员工' }}</h2>
        <form @submit.prevent="isEditing ? updateChannelStaff() : addChannelStaff()">
          <input v-model="form.ChannelID" placeholder="频道ID" required />
          <input v-model="form.EmployeeID" placeholder="员工ID" required />
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
        channelStaffs: [],
        form: {
          ChannelID: null,
          EmployeeID: null
        },
        isEditing: false
      };
    },
    created() {
      this.fetchChannelStaffs();
    },
    methods: {
      fetchChannelStaffs() {
        axios.get('http://localhost:3000/api/channel-staffs')
          .then(response => {
            this.channelStaffs = response.data;
          })
          .catch(error => {
            console.error('Error fetching channel staffs:', error);
          });
      },
      addChannelStaff() {
        axios.post('http://localhost:3000/api/channel-staffs', this.form)
          .then(() => {
            this.fetchChannelStaffs();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding channel staff:', error);
          });
      },
      editChannelStaff(channelStaff) {
        this.form = { ...channelStaff };
        this.isEditing = true;
      },
      updateChannelStaff() {
        axios.put(`http://localhost:3000/api/channel-staffs/${this.form.ChannelID}/${this.form.EmployeeID}`, this.form)
          .then(() => {
            this.fetchChannelStaffs();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating channel staff:', error);
          });
      },
      deleteChannelStaff(ChannelID, EmployeeID) {
        axios.delete(`http://localhost:3000/api/channel-staffs/${ChannelID}/${EmployeeID}`)
          .then(() => {
            this.fetchChannelStaffs();
          })
          .catch(error => {
            console.error('Error deleting channel staff:', error);
          });
      },
      resetForm() {
        this.form = {
          ChannelID: null,
          EmployeeID: null
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .channel-staff-management {
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
  