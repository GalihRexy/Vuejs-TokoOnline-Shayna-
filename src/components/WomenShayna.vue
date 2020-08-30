<template>
	<!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" :autoplay="true" :nav="false" :dots="false">
                        <div class="product-item" v-for="item in products" :key="item.id">
                            <div class="pi-pic">
                                <img v-bind:src="item.galleries[0].photo" alt="" />
                                <ul>
                                    <li class="w-icon active">
                                        <a href="#" @click="tambahKeranjang(item.id, item.name, item.price, item.galleries[0].photo)"><i class="icon_bag_alt">
                                        </i></a>
                                    </li>
                                    <li class="quick-view">
                                        <router-link v-bind:to="'/product/'+item.id">+ Quick View</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ item.name }}</div>
                                <a href="#">
                                    <h5>{{ item.type }}</h5>
                                </a>
                                <div class="product-price">
                                    {{ item.price }}
                                </div>
                            </div>
                        </div>                        
                    </carousel>
                </div>

                <div class="col-lg-12 mt-5" v-else>
                    <p>Data tidak tersedia</p>
                </div>    

            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>

<script>
import carousel from 'vue-owl-carousel';
import axios from 'axios';

export default {

  name: 'WomenShayna',
  components:{
	carousel,
  },
  data () {
    return {
        products: [],
        keranjang: []
    }
  },
  methods:{
    tambahKeranjang(idProduct, namaProduct, hargaProduct, photoProduct){
        const productStore = {
            "id": idProduct,
            "nama": namaProduct,
            "harga": hargaProduct,
            "photo": photoProduct
        }

        this.keranjang.push(productStore);

        const parsed = JSON.stringify(this.keranjang);
        localStorage.setItem('keranjang', parsed);
    }
  },
  mounted(){
    if (localStorage.getItem('keranjang')) {
      try {
        this.keranjang = JSON.parse(localStorage.getItem('keranjang'));
        for (var i = this.keranjang.length - 1; i >= 0; i--) {
            this.totalHarga = this.totalHarga + this.keranjang[i].harga;
        }
      } catch(e) {
        localStorage.removeItem('keranjang');
      }
    }

    axios
    .get('http://localhost:8000/api/products')
    .then(res => (this.products = res.data.data.data))
    .catch(err => console.log(err));
  }
}
</script>

<style lang="css" scoped>
.product-item{
	margin-right: 20px;
}
</style>