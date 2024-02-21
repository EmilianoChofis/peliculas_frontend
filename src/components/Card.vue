<template>
	<div class="container-fluid">
    <div class="vld-parent" v-show="isLoading">
      <loading :active.sync="isLoading" :is-full-page="fullPage">
      </loading>
    </div>
		<b-row cols="4" v-for="(row, rowIndex) in matrix" :key="'row-'+rowIndex">
			<b-col v-for="(movie, colIndex) in row" :key="'col-'+colIndex" :class="{'drag-item':movie!==null}"
        @dragstart="handleDragStart($event, rowIndex, colIndex)"
        @dragover.prevent
        @drop="handleDrop(rowIndex, colIndex)"
        draggable="true"
      >

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
            <br>
            <b>
              {{ movie.duration}}
            </b>
            <br>
            <b>
              {{ movie.publicationDate}}
            </b>

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
    <Modal @getMovie="getMovie"/>

  </div>
</template>

<script>
import { GetMovies } from '@/services/Movies';
import { UpdateStatusMovie } from '@/services/Movies';
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import UpdateMovie from './UpdateMovie.vue';
import Modal from "@/components/Modal.vue";

export default {
  props: {
    moviesFiltered: {
      required: false,
      type: Array,
    },
  },
	components: {
    Modal,
		Loading,
		UpdateMovie,
	},
	data() {
		return {
			movies: [],
			isLoading: false,
			fullPage: true,
			movieSelected: {},
      matrix: [],
      draggedItem: null,
		};
	},
	mounted() {
		this.getMovies();
	},
  watch: {
    moviesFiltered(newMoviesFiltered) {
      this.movies = newMoviesFiltered // Actualiza la lista de películas
    },
  },
	methods: {
		async getMovies() {
			try {
				this.isLoading = true;
				const data = await GetMovies();
				this.movies = data;
        this.buildMatrix();
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

			} catch (e) {
				console.log(e);
			}finally {
        this.isLoading = false;
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
    //metodo que construa la matrix con las peliculas obtenidas
    buildMatrix() {
      this.matrix = [];
      let row = [];
      for (let i = 0; i < this.movies.length; i++) {
        row.push(this.movies[i]);
        if (row.length === 3) {
          this.matrix.push(row);
          row = [];
        }
      }
      if (row.length > 0) {
        this.matrix.push(row);
      }
    },
    handleDragStart(event, rowIndex, colIndex) {
      // Guardamos el elemento que estamos arrastrando, esta se guarda desde el momento
      // que realizamos el arrastre del objeto
      this.draggedItem = { rowIndex, colIndex };
    },
    handleDrop(rowIndex, colIndex) {

      // Obtenemos el elemento arrastrado
      const { draggedItem } = this;

      // Verificamos si el elemento está siendo arrastrado dentro de la misma matriz
      if (
          draggedItem.rowIndex === rowIndex &&
          draggedItem.colIndex === colIndex
      ) {
        return;
      }

      // Realizamos el intercambio de elementos
      const temp = this.matrix[rowIndex][colIndex];
      this.$set(
          this.matrix[rowIndex],
          colIndex,
          this.matrix[draggedItem.rowIndex][draggedItem.colIndex]
      );
      this.$set(this.matrix[draggedItem.rowIndex], draggedItem.colIndex, temp);

      // Reseteamos draggedItem a null después de soltar
      this.draggedItem = null;
    },
	},
};
</script>
