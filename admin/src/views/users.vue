<template>
  <div id="_users">
    <div class="title-container">
      <h1 class="title">Users <i class="fe fe-plus-circle"></i></h1>
      <div class="filter-container">
        <input class="filter" type="text" placeholder="Search username"
          v-model="filtered_name">
      </div>
    </div>
    <div class="users-container">
      <div class="user" v-for="user in 5" :key="user">
        <div class="username">David</div>
        <!-- <div class="password">admin</div> -->
        <div class="actions">
          <i class="fe fe-edit-3 edit" @click="edit_user(user)"></i>
          <i class="fe fe-trash-2 delete" @click="delete_user(user)"></i>
        </div>
      </div>
    </div>
    <modal ref="modal">
      Editing user {{ selected_user_id }}
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
      selected_user_id: 0,
    };
  },
  methods: {
    edit_user(id) {
      this.selected_user_id = id;
      this.$refs.modl.active = true;
    },
    delete_user(id) {
      this.selected_user_id = id;
      this.$refs.delete_modal.active = true;
    },
    confirm_delete_user() {
      console.log(`Deleted user ${this.selected_user_id}`);
    },
  },
  watch: {
    filtered_name(value) {
      this.display_users = this.original_users.filter((e) => e.name.includes(value));
    },
  },
};
</script>

<style lang="scss">
#_users {
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
      // grid-template-columns: 1fr 1fr minmax(min-content, 120px);
      // max-width: 600px;
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
