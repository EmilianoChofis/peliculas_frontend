<template>
	<div class="container-fluid">
		<b-row cols="4">
			<b-col v-for="movie in movies" :key="movie.id">
				<div class="vld-parent" v-if="isLoading">
					<loading :active.sync="isLoading" :is-full-page="fullPage">
					</loading>
				</div>
				<b-card
					img-src="https://picsum.photos/600/300/?image=25"
					img-alt="Image"
					img-top
					tag="article"
					style="max-width: 20rem"
					class="mb-2"
					v-if="!isLoading"
					:border-variant="
						movie.status === true ? 'success' : 'danger'
					"
				>
					<b-card-text>
						<h3>
							<b>
								{{ movie.name }}
							</b>
						</h3>
					</b-card-text>
					<b-card-text>
						{{ movie.director }}
					</b-card-text>
					<b-card-text>
						{{ movie.category.description }}
					</b-card-text>

					<div class="text-center">
						<b-button
							class="m-1"
							v-on:click="putMovie(movie.id)"
							variant="primary"
							@click="openModalUpdateMovie(movie)"
						>
							<b-icon icon="pen-fill"></b-icon>
						</b-button>
						<b-button
							class="m-1"
							v-on:click="updateStatus(movie.id)"
							:variant="
								movie.status === true ? 'success' : 'danger'
							"
						>
							<b-icon
								:icon="
									movie.status === true
										? 'toggle-on'
										: 'toggle-off'
								"
							></b-icon>
						</b-button>
					</div>
				</b-card>
			</b-col>
		</b-row>

		<UpdateMovie @getMovie="getMovie" :movieSelected="movieSelected" />
	</div>
</template>

<script>
import { GetMovies } from '@/services/Movies';
import { UpdateStatusMovie } from '@/services/Movies';
import { PutMovie } from '@/services/Movies';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import UpdateMovie from './UpdateMovie.vue';

export default {
	components: {
		Loading,
		UpdateMovie,
	},
	data() {
		return {
			movies: [],
			isLoading: false,
			fullPage: true,
			movieSelected: {},
		};
	},
	mounted() {
		this.getMovies();
	},
	methods: {
		async getMovies() {
			try {
				this.isLoading = true;
				const data = await GetMovies();
				this.movies = data;
				this.isLoading = false;
			} catch (e) {
				console.log(e);
			}
		},
		async updateStatus(id) {
			try {
				this.isLoading = true;
				await UpdateStatusMovie(id);
				this.getMovies();
				this.isLoading = false;
			} catch (e) {
				console.log(e);
			}
		},
		openModalUpdateMovie(movie) {
			this.movieSelected = JSON.parse(JSON.stringify(movie));
			this.$bvModal.show('update-movie');
		},
		getMovie() {
			this.getMovies();
		},
		async putMovie(id) {
			console.log(id);
		},
	},
};
</script>
