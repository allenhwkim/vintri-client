<script>
import axios from 'axios';

export default {
  data() {
    return {
      beers: [],
    }
  },
  methods: {
    async getBeers(page = 1) {
      this.beers = axios.get(`/api/beers?per_page=10&page=${page}`)
        .then(response => this.beers = response.data)
    },
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/beers?per_page=10&page=1')
      .then(response => {
        next(vm => (vm.beers = response.data) )
      })
  }
}
</script>

<template>
  <h1>Beers</h1>
  <table class="beers">
    <thead>
      <tr>
        <th>ID</th><th>Name</th><th>Description</th><th>First Brewed</th><th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="beer" v-for="beer in this.beers" :key="beer.id">
        <td class="col">{{beer.id}}</td>
        <td class="col name">{{beer.name}}</td>
        <td class="col description">{{beer.description}}</td>
        <td class="col">{{beer.first_brewed}}</td>
        <td class="col">
          <router-link :to="{name: 'beer', params: {id: beer.id}}">Detail</router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <Paginator :rows="10" :totalRecords="325" @page="getBeers($event.page + 1)"></Paginator>
</template>

<style lang="scss" scoped>
.beers {
  border-collapse: collapse;
  .beer {
  .col {
    min-width: 60px;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &.name {
      max-width: 200px;
    }
  }
  }
}
</style>
