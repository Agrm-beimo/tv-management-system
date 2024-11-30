<template>
  <div id="app">
    <header>
      <h1>电视台管理系统</h1>
      <nav>
        <ul>
          <li><router-link to="/employees">员工管理</router-link></li>
          <li><router-link to="/channels">频道管理</router-link></li>
          <li><router-link to="/advertisements">广告管理</router-link></li>
          <li><router-link to="/studios">演播室管理</router-link></li>
          <li><router-link to="/channel-ads">频道广告管理</router-link></li>
          <li><router-link to="/channel-studios">频道演播室管理</router-link></li>
          <li><router-link to="/channel-staff">频道员工管理</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  components: {
    RouterLink,
    RouterView
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #4CAF50;
  padding: 20px;
  color: white;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin: 0 10px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}
</style>
