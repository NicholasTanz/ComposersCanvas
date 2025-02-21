<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <!-- Update the link for canvas -->
        <a href="/CanvasView.html">Canvas</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>


</style>
