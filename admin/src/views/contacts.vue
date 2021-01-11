<template>
  <div class="loader" v-if="is_loading"></div>
  <div id="_contacts" v-else>
    <div class="form-container">
      <i class="fe fe-mail"></i>
      <div class="form-group">
        <input type="text" id="mail" class="form-input"
          :class="{'filled': contacts.mail.name}" v-model="contacts.mail.name">
        <label for="mail" class="form-label">Mail</label>
      </div>
    </div>
    <div class="form-container">
      <i class="fe fe-instagram"></i>
      <div class="form-group">
        <input type="text" id="instagram" class="form-input"
          :class="{'filled': contacts.instagram.name}" v-model="contacts.instagram.name">
        <label for="instagram" class="form-label">Instagram</label>
      </div>
    </div>
    <div class="form-container">
      <i class="fe fe-facebook"></i>
      <div class="form-group">
        <input type="text" id="facebook" class="form-input"
          :class="{'filled': contacts.facebook.name}" v-model="contacts.facebook.name">
        <label for="facebook" class="form-label">Facebook</label>
      </div>
    </div>
    <div class="form-container">
      <i class="fe fe-youtube"></i>
      <div class="form-group">
        <input type="text" id="youtube" class="form-input"
          :class="{'filled': contacts.youtube.name}" v-model="contacts.youtube.name">
        <label for="youtube" class="form-label">YouTube</label>
      </div>
      <div class="form-group">
        <input type="text" id="youtube_link" class="form-input"
          :class="{'filled': contacts.youtube.to}" v-model="contacts.youtube.to">
        <label for="youtube_link" class="form-label">Link</label>
      </div>
    </div>
    <button class="confirm" @click="update">Update</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: {
        mail: {
          name: '',
          to: '',
        },
        instagram: {
          name: '',
          to: '',
        },
        facebook: {
          name: '',
          to: '',
        },
        youtube: {
          name: '',
          to: '',
        },
      },
      is_loading: true,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api(`/${this.uni_type}/contact`).then(({ data }) => {
        this.contacts = data;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
      }).finally(() => {
        this.is_loading = false;
      });
    },
    update() {
      this.is_loading = true;
      this.contacts.mail.to = `mailto:${this.contacts.mail.name}`;
      this.contacts.instagram.to = `https://www.instagram.com/${this.contacts.instagram.name.slice(1)}`;
      this.contacts.facebook.to = `https://www.facebook.com/${this.contacts.facebook.name.slice(1)}/`;
      this.api(`/${this.uni_type}/contact`, this.contacts).then(() => {
        this.$notify({
          type: 'success',
          title: 'Updated',
        });
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$notify({
            type: 'error',
            title: 'Unauthorized',
            text: 'Please login and try again',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'An Error Occurred',
            text: 'Please try again later.',
          });
        }
      }).finally(() => {
        this.is_loading = false;
        this.get();
      });
    },
  },
};
</script>

<style lang="scss">
#_contacts {
  padding: 2rem 5rem;
  .form-container {
    display: flex;
    align-items: center;
    & > i {
      font-size: 1.8rem;
      color: $text-gray;
    }
    .form-group {
      position: relative;
      margin: 1.8rem 0;
      margin-left: 1rem;
      width: 400px;
      * { transition: 300ms; }
      .form-label {
        position: absolute;
        top: 50%;
        left: .8rem;
        font-size: 1.2rem;
        transform: translateY(-50%);
        color: $gray-color;
        background-color: white;
      }
      .form-input {
        box-sizing: border-box;
        width: 100%;
        border: solid 1px $gray-color;
        border-radius: .1rem;
        padding: .8rem;
        font-size: .9rem;
        line-height: 1.2rem;
        &:active, &:focus, &:focus-within, &.filled {
          outline: none;
          border-color: $primary-color;
          border-radius: .4rem;
          &+.form-label {
            top: 0;
            color: $primary-color;
            font-size: .8rem;
            padding: .2rem;
            transform: translateY(-50%);
          }
        }
        &:active, &:focus, &:focus-within {
          border-color: $primary-color !important;
          &+.form-label {
            color: $primary-color !important;
          }
        }
        &.filled {
          border-color: unset;
          &+.form-label {
            color: unset;
          }
        }
      }
    }
  }
  .confirm {
    border-radius: .2rem;
    border: none;
    margin: 1.5rem 0 0;
    padding: .5rem .8rem;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    background-color: $primary-color;
    cursor: pointer;
    &:hover {
      background-color: darken($primary-color, 8%);
    }
    &:active, &:focus {
      outline: none;
    }
  }
  @media screen and (max-width: 425px) {
    padding: 2rem;
    .form-container {
      & > i {
        font-size: 1.5rem;
        margin-right: .5rem;
      }
      .form-group {
        width: 200px;
      }
    }
  }
}
</style>
