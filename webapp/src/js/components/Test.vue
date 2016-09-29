<template>
  <div class="container">
    <header>
      <p>
        hello test
      </p>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
h1 {
  &:hover {
    border: 1px solid #ccc;
  }
  p {
    color: red;
  }
  color: #42b983;
}
.container {
  color: blue;
  p {
    color: red;
  }
}
</style>
