<template>
  <div>
    <h1 style="text-align: center;">Social Login</h1>
    <div class="box">
      <div class="loader" />
    </div>
  </div>
</template>

<script>
import { authService } from '@/services'

export default {
  name: 'LoginSocial',
  data() {
    return {
      loading: false,
      flash: false,
      flashType: null,
      flashMessage: ''
    }
  },
  created() {
    if (!this.$route.query.token) {
      console.error('ResetPassword.init-error:', 'no token')
      this.$message({
        message: 'The link you used did not contain a token. Please click on one of the social media ' +
            'buttons on the login page to login using social media.',
        type: 'error'
      })
    } else {
      this.loginSocial(this.$route.query.token)
    }
  },
  methods: {
    loginSocial(token) {
      this.loading = true

      authService.loginSocial(token)
        .then(response => {
          this.loading = false
          // alert('Login successful')
          this.$router.push('/')
        })
        .catch(error => {
          this.loading = false
          console.error('LoginSocial.loginSocial-error:', error)
          this.$message({
            message: error.data.message,
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    display: flex;
    justify-content: center;
    color: #d60b52;
    font-size: 70px;
    padding: 0;
    border-width: 3px;
    line-height: 200px;
  }

  .loader {
    width: 2em;
    height: 2em;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
    -webkit-perspective: 1000px;
    perspective: 1000px;
    border-radius: 50%;
  }

  .loader:before,
  .loader:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
  }

  .loader:before {
    -webkit-transform: rotateX(70deg);
    transform: rotateX(70deg);
  }

  .loader:after {
    -webkit-transform: rotateY(70deg);
    transform: rotateY(70deg);
    -webkit-animation-delay: .4s;
    animation-delay: .4s;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotate {
    0% {
      -webkit-transform: translate(-50%, -50%) rotateZ(0deg);
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotateZ(360deg);
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @-webkit-keyframes rotateccw {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(-360deg);
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      -webkit-transform: translate(-50%, -50%) rotate(0deg);
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(-50%, -50%) rotate(-360deg);
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @-webkit-keyframes spin {
    0%, 100% {
      box-shadow: .2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: .2em .2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 .2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -.2em .2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -.2em -.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: .2em -.2em 0 0 currentcolor;
    }
  }

  @keyframes spin {
    0%, 100% {
      box-shadow: .2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: .2em .2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 .2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -.2em .2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -.2em -.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: .2em -.2em 0 0 currentcolor;
    }
  }
</style>
