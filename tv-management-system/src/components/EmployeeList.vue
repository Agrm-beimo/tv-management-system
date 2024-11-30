<template>
    <div class="employee-list">
      <h1>员工列表</h1>
      <table>
        <thead>
          <tr>
            <th>员工ID</th>
            <th>姓名</th>
            <th>职务</th>
            <th>部门</th>
            <th>电话</th>
            <th>邮箱</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.EmployeeID">
            <td>{{ employee.EmployeeID }}</td>
            <td>{{ employee.Name }}</td>
            <td>{{ employee.Position }}</td>
            <td>{{ employee.Department }}</td>
            <td>{{ employee.Phone }}</td>
            <td>{{ employee.Email }}</td>
            <td>
              <button @click="editEmployee(employee)">编辑</button>
              <button @click="deleteEmployee(employee.EmployeeID)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="form">
        <h2>{{ isEditing ? '编辑员工' : '添加员工' }}</h2>
        <form @submit.prevent="isEditing ? updateEmployee() : addEmployee()">
          <input v-model="form.Name" placeholder="姓名" required />
          <input v-model="form.Position" placeholder="职务" />
          <input v-model="form.Department" placeholder="部门" />
          <input v-model="form.Phone" placeholder="电话" />
          <input v-model="form.Email" placeholder="邮箱" />
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
        employees: [],
        form: {
          EmployeeID: null,
          Name: '',
          Position: '',
          Department: '',
          Phone: '',
          Email: ''
        },
        isEditing: false
      };
    },
    created() {
      this.fetchEmployees();
    },
    methods: {
      fetchEmployees() {
        axios.get('http://localhost:3000/api/employees')
          .then(response => {
            this.employees = response.data;
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
          });
      },
      addEmployee() {
        axios.post('http://localhost:3000/api/employees', this.form)
          .then(() => {
            this.fetchEmployees();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error adding employee:', error);
          });
      },
      editEmployee(employee) {
        this.form = { ...employee };
        this.isEditing = true;
      },
      updateEmployee() {
        axios.put(`http://localhost:3000/api/employees/${this.form.EmployeeID}`, this.form)
          .then(() => {
            this.fetchEmployees();
            this.resetForm();
          })
          .catch(error => {
            console.error('Error updating employee:', error);
          });
      },
      deleteEmployee(EmployeeID) {
        axios.delete(`http://localhost:3000/api/employees/${EmployeeID}`)
          .then(() => {
            this.fetchEmployees();
          })
          .catch(error => {
            console.error('Error deleting employee:', error);
          });
      },
      resetForm() {
        this.form = {
          EmployeeID: null,
          Name: '',
          Position: '',
          Department: '',
          Phone: '',
          Email: ''
        };
        this.isEditing = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .employee-list {
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
  