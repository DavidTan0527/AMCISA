<template>
  <div id="_login">
    <div class="login-container">
      <div class="container-title">
        AMCISA
      </div>
      <form class="container-form" @submit.prevent="login">
        <div class="form-group">
          <input type="text" id="username" class="form-input"
            :class="{'filled': username}" v-model="username">
          <label for="username" class="form-label">Username</label>
        </div>
        <div class="form-group">
          <input type="password" id="password" class="form-input"
            :class="{'filled': password}" v-model="password">
          <label for="password" class="form-label">Password</label>
        </div>
        <button class="form-button" type="submit">
          <i class="fe fe-terminal"></i> Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.api('/login', {
        username: this.username,
        password: this.password,
      }).then(({ data }) => {
        window.localStorage.setItem('jwt-token', data.token);
        this.$notify({
          type: 'success',
          title: 'Logged in',
        });
        this.$router.push('/landing');
      }).catch((err) => {
        if (err.response.status === 400
        || err.response.status === 401) {
          this.$notify({
            type: 'error',
            title: 'Login Error',
            text: 'Username or Password invalid',
          });
        } else {
          this.$notify({
            type: 'error',
            title: 'Login Error',
            text: 'An error occurred, please try again later',
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
#_login {
  .login-container {
    position: relative;
    box-sizing: border-box;
    min-width: 280px;
    max-width: 500px;
    width: 30%;
    border-radius: 1rem;
    border: solid 2px $primary-color-dark;
    margin: 50vh auto 0;
    padding: 3rem 3rem 2rem;
    transform: translateY(-50%);
    .container-title {
      position: absolute;
      top: 0;
      left: 50%;
      font-size: 3rem;
      color: $primary-color-dark;
      padding: .8rem;
      transform: translate(-50%, -60%);
      background-color: #fff;
    }

    .container-form {
      & > :first-child {
        margin-top: 0 !important;
      }
      & > :last-child {
        margin-bottom: 0 !important;
      }
      .form-group {
        position: relative;
        margin: 1.8rem 0;
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
          font-size: 1rem;
          line-height: 1.2rem;
          letter-spacing: 1.5px;
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
      .form-button {
        width: 100%;
        border-radius: .2rem;
        border: none;
        margin: 1.5rem 0;
        padding: .6rem .2rem;
        color: #fff;
        font-weight: 500;
        font-size: 1.2rem;
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
  }
}
</style>
