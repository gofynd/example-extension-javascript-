<template>
  <div class="products-container">
    <div class="title">
      This is an example extension home page user interface.
    </div>
    <div class="section">
      <div class="heading">
        Example {{isApplicationLaunch ? "Application API" : "Platform API" }}:
        <a :href="getDocumentPageLink" target="_blank">{{
          isApplicationLaunch ? "getAppProducts" : "getProducts"
        }}</a>
      </div>
      <div class="description">
        This is an illustrative Platform API call to fetch the list of products
        in this company. Check your extension folder’s 'server.js'
        file to know how to call Platform API and start calling API you
        require.
      </div>
    </div> 

    <div class="loader" v-if="pageLoading">
      <img src="../public/assets/gifs/loader.gif" />
    </div>
    <div v-else>
      <div
        v-for="(product, index) in productList"
        :key="index"
        class="product-list-container"
      >
        <div class="flex-row">
          <img
            class="mr-r-12"
            v-if="product.is_active"
            src="../public/assets/green-dot.svg"
          />
          <img class="mr-r-12" v-else src="../public/assets/grey-dot.svg" />
          <div class="card-avatar mr-r-12">
            <img
              :src="productProfileImage(product.media)"
              @error="getErrorImage()"
              alt="text"
            />
          </div>
          <div class="flex-column">
            <div class="flex-row">
              <div class="product-name" :id="`product-name-${index}`">
                {{ product.name }}
              </div>
              <div class="product-item-code">|</div>
              <span v-if="product.item_code" class="product-item-code"
                >Item Code:
                <span class="cl-RoyalBlue" :id="`product-item-code-${index}`">{{
                  product.item_code
                }}</span></span
              >
            </div>
            <div
              class="product-brand-name"
              v-if="product.brand"
              :id="`product-brand-name-${index}`"
            >
              {{ product.brand.name }}
            </div>
            <div
              class="product-brand-name"
              v-if="product.category_slug"
              :id="`product-category-slug-${index}`"
            >
              Category :
              {{ product.category_slug }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* Service imports */
const DOC_URL_PATH =
  "/help/docs/sdk/latest/platform/company/catalog/#getProducts";
const DOC_APP_URL_PATH =
  "/help/docs/sdk/latest/platform/application/catalog#getAppProducts";
import DEFAULT_NO_IMAGE from "../public/assets/default_icon_listing.png";
import axios from "axios";
import urlJoin from "url-join";

const EXAMPLE_MAIN_URL = window.location.origin;

export default {
  name: "fp-extension-homepage",
  data() {
    return {
      productList: [],
      pageLoading: false,
      documentationUrl: 'https://api.fynd.com'
    };
  },
  mounted() {
    if (this.isApplicationLaunch) this.fetchApplicationProducts();
    else this.fetchProducts();
  },
  computed: {
    getDocumentPageLink() {
      return this.documentationUrl
        .replace("api", "partners")
        .concat(this.isApplicationLaunch ? DOC_APP_URL_PATH : DOC_URL_PATH);
    },
    isApplicationLaunch() {
      return this.$route?.params.application_id ? true : false;
    },
    getCompanyId(){
      return this.$route?.params.company_id;
    },
  },
  methods: {
    productProfileImage(media) {
      if (media.length === 0) {
        return DEFAULT_NO_IMAGE;
      }
      const profileImg = media.find((m) => m.type === "image");
      if (!profileImg?.url) {
        return DEFAULT_NO_IMAGE;
      }
      return profileImg.url;
    },
    fetchProducts() {
      this.pageLoading = true;
      axios.get(urlJoin(EXAMPLE_MAIN_URL, '/api/products'),{
        headers: {
          "x-company-id": this.getCompanyId,
        }
      })
        .then(({ data }) => {
          this.productList = data.items;
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
          this.$snackbar.global.showError(
            "Failed to fetch the list of products"
          );
        });
    },
    fetchApplicationProducts() {
      this.pageLoading = true;
      axios.get(urlJoin(EXAMPLE_MAIN_URL, `/api/products/application/${this.$route.params.application_id}`),{
        headers: {
          "x-company-id": this.getCompanyId,
        }
      })
        .then(({ data }) => {
          this.productList = data.items;
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
          this.$snackbar.global.showError(
            "Failed to fetch the list of products"
          );
        });
    },
    getErrorImage() {
      return "/src/public/assets/default_icon_listing.png";
    },
  },
};
</script>

<style lang="less" scoped>
html {
  height: 100%;
  width: 100%;
  font-size: 8px;
}

body {
  margin: 0;
  font-family: Inter;
  background-color: #f8f8f8 !important;
  width: 100%;
  height: 100%;
}

.loader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 100px;
  }
}

.products-container {
  font-family: Inter;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #f3f3f3;
  border-radius: 12px;
  padding: 24px;
  margin: 24px;

  .title {
    font-weight: 700;
    font-size: 25px;
    text-align: center;
  }

  .section {
    margin: 40px 0px 20px 0px;
    .heading {
      font-size: 20px;
      line-height: 21px;
      display: flex;
      flex-direction: row;
      gap: 6px;
      font-weight: 600;
      a {
        text-decoration: none;
        color: #2e31be;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .description {
      font-size: 14px;
      color: #666;
      line-height: 21px;
      padding-top: 8px;
    }
  }

  .product-list-container {
    display: flex;
    border: 1px solid #e4e5e6;
    -webkit-font-smoothing: antialiased;
    min-height: 102px;
    padding: 16px;
    border-radius: 4px;
    margin-bottom: 16px;
    box-sizing: border-box;
    margin: 24px 0;
    .card-avatar {
      min-height: 60px;
      min-width: 60px;
      max-height: 60px;
      max-width: 60px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .product-name {
      font-weight: 600;
      font-size: 14px;
      color: #41434c;
      line-height: 21px;
    }
    .product-item-code {
      font-weight: 400;
      font-size: 12px;
      color: #9b9b9b;
    }
    .product-brand-name {
      font-weight: 400;
      font-size: 12px;
      color: #666;
      line-height: 21px;
      display: flex;
      flex-direction: row;
      gap: 2px;
    }
  }
}

.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.mr-r-12 {
  margin-right: 12px;
}
.cl-RoyalBlue {
  color: #2e31be;
  margin-left: 2px;
}
</style>
