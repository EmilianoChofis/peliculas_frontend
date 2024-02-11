<script setup>

import Card from "@/components/Card.vue";
import Modal from "@/components/Modal.vue";
</script>

<template>
  <div class="container-fluid">
    <h2 class="text-center">
      Peliculas
    </h2>
   <b-card-group deck>
     <Card/>
   </b-card-group>
    <div class="text-center">
      <b-button v-b-modal.modal-prevent-closing>
        <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
      </b-button>
    </div>
    <Modal/>
  </div>
</template>

<style scoped>

</style>