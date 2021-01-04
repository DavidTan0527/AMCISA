<template>
  <div id="_users">
    <div class="title-container">
      <h1 class="title">Users <i class="fe fe-plus-circle"></i></h1>
      <div class="filter-container">
        <input class="filter" type="text" placeholder="Search username"
          v-model="filtered_name" @keyup="filter_users">
      </div>
    </div>
    <div class="users-container">
      <div class="user" v-for="user in display_users" :key="user.id">
        <div class="username">{{ user.username }}</div>
        <!-- <div class="password">admin</div> -->
        <div class="actions">
          <i class="fe fe-edit-3 edit" @click="edit_user(user)"></i>
          <i class="fe fe-trash-2 delete" @click="delete_user(user)"></i>
        </div>
      </div>
    </div>
    <modal class="edit-modal" ref="modal">
      <h2>Edit User</h2>
      <input type="text" v-model="selected_user.username">
      <button class="confirm" @click="update_user">Confirm</button>
    </modal>
    <confirm-modal title="Confirm delete?" ref="delete_modal"
      @confirm="confirm_delete_user"></confirm-modal>
  </div>
</template>

<script>
import modal from '@/components/modal.vue';
import confirmModal from '@/components/confirm_modal.vue';

export default {
  components: {
    modal,
    confirmModal,
  },
  data() {
    return {
      filtered_name: '',
      original_users: [],
      display_users: [],
      selected_user: {
        username: '',
      },
      is_self_user: false,
      is_loading: true,
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get() {
      this.is_loading = true;
      this.api('/user').then(({ data }) => {
        const own_uni_data = data.filter((e) => e.uni === this.uni_type);
        this.original_users = own_uni_data;
        this.display_users = own_uni_data;
      }).catch((err) => {
        this.$notify({
          type: 'error',
          text: err.message,
        });
      }).finally(() => {
        this.is_loading = false;
      });
    },
    edit_user(user) {
      if (user.username === this.current_username) {
        this.is_self_user = true;
      }
      this.selected_user = user;
      this.$refs.modal.active = true;
    },
    update_user() {
      this.is_loading = true;
      this.$refs.modal.active = false;
      this.api('/user', this.selected_user, 'put')
        .then(({ data }) => {
          if (this.is_self_user) {
            window.localStorage.setItem('jwt-token', data.token);
            this.is_self_user = false;
          }
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
              text: err.message,
            });
          }
        }).finally(() => {
          this.is_loading = false;
          this.get();
        });
    },
    delete_user(user) {
      // Cannot delete yourself
      if (user.username === this.current_username) {
        this.$notify({
          type: 'warning',
          title: 'Cannot delete yourself',
        });
        return;
      }
      this.selected_user = user;
      this.$refs.delete_modal.active = true;
    },
    confirm_delete_user() {
      this.is_loading = true;
      this.$refs.delete_modal.active = false;
      this.api('/user', { id: this.selected_user.id }, 'delete')
        .then(() => {
          this.$notify({
            type: 'success',
            title: `Deleted User: ${this.selected_user.username}`,
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
    filter_users() {
      this.display_users = this.original_users
        .filter((e) => e.username.includes(this.filtered_name));
    },
  },
};
</script>

<style lang="scss">
#_users {
  padding: 2rem 4rem;
  @media screen and (max-width: 425px) {
    padding: 2rem 3rem;
  }
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      i {
        margin-left: .8rem;
        color: $primary-color;
        cursor: pointer;
        &:hover {
          color: darken($primary-color, 8%);
        }
      }
    }
    .filter-container .filter {
      font-size: 1rem;
      padding: .3rem .6rem;
      border: solid 1px $gray-color;
      border-radius: .2rem;
      &:focus {
        outline: none;
        border: solid 1px $primary-color;
      }
    }
  }
  .users-container {
    .user {
      display: grid;
      grid-template-columns: 1fr minmax(min-content, 120px);
      max-width: 300px;
      align-items: center;
      text-align: left;
      margin: 2rem 0;
      padding: 1rem 2rem;
      border-radius: .2rem;
      box-shadow: 0 2px 8px rgba(#000, .18);
      .actions {
        display: flex;
        justify-content: space-evenly;
        i {
          cursor: pointer;
          &.edit {
            color: $primary-color-dark;
          }
          &.delete {
            color: $error-color;
          }
        }
      }
    }
  }
  .edit-modal {
    input {
      display: block;
      font-size: 1rem;
      padding: .3rem .6rem;
      border: solid 1px $gray-color;
      border-radius: .2rem;
      &:focus {
        outline: none;
        border: solid 1px $primary-color;
      }
    }
    button {
      float: right;
      border-radius: .2rem;
      border: none;
      margin: 1.5rem 0 0;
      padding: .4rem .6rem;
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
  }
  @media screen and (max-width: 425px) {
    .title-container {
      flex-direction: column;
      align-items: flex-start;
      justify-content: initial;
      margin-bottom: .5rem;
    }
    .users-container {
      .user {
        padding: .5rem .8rem;
      }
    }
  }
}
</style>
