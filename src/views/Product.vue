<template>
	<div class="product">
		<Header/>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more text-left">
                        <a href="./home.html"><i class="fa fa-home"></i> Home</a>
                        <span>Detail</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="product-pic-zoom">
                                <img class="product-big-img" v-bind:src="gambar_default" alt="" />
                            </div>
                            <div class="product-thumbs" v-if="productDetails.galleries.length > 0">
                                <carousel class="product-thumbs-track ps-slider" :dots="false" :nav="false">

                                    <div v-for="ss in productDetails.galleries" :key="ss.id" class="pt" v-on:click="changeImage(ss.photo)" :class="gambar_default == ss.photo ? 'active' : ''">
                                        <img v-bind:src="ss.photo" alt="" />
                                    </div>

                                </carousel>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="product-details text-left">
                                <div class="pd-title">
                                    <span>{{ productDetails['name'] }}</span>
                                    <h3>{{ productDetails['type'] }}</h3>
                                </div>
                                <div class="pd-desc">
                                    <p v-html="productDetails['description']"></p>
                                    <h4>{{ productDetails['price'] }}</h4>
                                </div>
                                <div class="quantity">
                                    <router-link to="/shopping-cart">
                                        <a @click="tambahKeranjang(productDetails.id, productDetails.name, productDetails.price, productDetails.galleries[0].photo)" href="#" class="primary-btn pd-cart">Add To Cart</a>
                                    </router-link>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Product Shop Section End -->

        <RelatedProductShayna/>
		<FooterShayna/>
	</div>
</template>

<script>
import Header from '@/components/Header.vue'
import RelatedProductShayna from '@/components/RelatedProductShayna'
import FooterShayna from '@/components/FooterShayna'
import carousel from 'vue-owl-carousel'
import axios from 'axios'

export default {

  name: 'Product',
  components:{
	Header,
    RelatedProductShayna,
	FooterShayna,
    carousel
  },
  data () {
    return {
        gambar_default: "",
        productDetails: [],
        keranjang: []
    }
  },
  methods:{
    changeImage(urlImage){
        this.gambar_default = urlImage;
    },
    setDataPricture(data){
        this.productDetails = data;
        this.gambar_default = data.galleries[0].photo;
    },
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
      } catch(e) {
        localStorage.removeItem('keranjang');
      }
    }

    axios
    .get('http://localhost:8000/api/products', {
        params: {
            id: this.$route.params.id
        }
    })
    .then(res => (this.setDataPricture(res.data.data)))
    .catch(err => console.log(err));
  }
}
</script>

<style lang="css" scoped>
.product-thumbs .pt{
  margin-right: 10px;
}
</style>