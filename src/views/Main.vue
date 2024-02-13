<script setup>
import Card from '@/components/Card.vue';
import Modal from '@/components/Modal.vue';
</script>

<template>
	<div class="container">
		<b-card class="mt-3">
			<b-row class="mb-3">
				<b-col cols="10">
					<h2 class="text-center">Peliculas</h2>
				</b-col>
				<b-col>
					<b-button
						v-b-modal.modal-prevent-closing
						class="text-center"
					>
						<b-icon icon="plus-circle" aria-hidden="true"></b-icon>
						Registrar película
					</b-button>
				</b-col>
			</b-row>

			<Card />

			<Modal />
		</b-card>
	</div>
</template>

<style scoped></style>
