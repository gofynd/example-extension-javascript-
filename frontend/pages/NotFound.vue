<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist. Please update relevent path.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  font-size: 5rem;
  margin: 0;
}

p {
  font-size: 1.5rem;
  margin: 1rem 0;
}
</style>
