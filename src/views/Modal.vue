<template>
  <div id="overlay">
    <div id="content">
      <div class="text-right">
        <button
          type="button"
          v-on:click="$emit('close')"
          class="btn btn-success"
        >
          閉じる <i class="fas fa-times"></i>
        </button>
      </div>
      <div>
        <p>開きました！！</p>
      </div>
    </div>
  </div>
</template>
