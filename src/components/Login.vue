<template>
	<div class="p-relative pw-100 ph-100">
		<div class="pw-100 p-relative">
			<div class="footer"></div>
			<footer>
				<svg viewBox="0 0 120 28">
					<defs> 
						<path id="wave" d="M 0,10 C 30,10 30,15 60,15 90,15 90,10 120,10 150,10 150,15 180,15 210,15 210,10 240,10 v 28 h -240 z" />
						<linearGradient id="MyGradient" gradientTransform="rotate(90)">
							<stop offset="0%" stop-color="#7986CB"/>
							<stop offset="100%" stop-color="#1E88E5"/>
						</linearGradient>
					</defs> 
					<use id="wave3" class="wave" xlink:href="#wave" x="0" y="-2"/>
					<use id="wave2" class="wave" xlink:href="#wave" x="0" y="0"/>
					<use id="wave1" class="wave" xlink:href="#wave" x="0" y="1"/> 
				</svg>
			</footer>
			<img src="img/CoralHR.svg">
		</div>
		<v-form ref="form" v-model="valid" class="pw-100" lazy-validation>
			<v-text-field v-model="username" :rules="rulesRequired" label="Username" required></v-text-field>
			<v-text-field v-model="password" :rules="rulesRequired" label="Password" required type="password"></v-text-field>
			<v-btn color="success" @click="validate" class="my-5" block>Login</v-btn>
		</v-form>

        <v-snackbar v-model="show.invaliduser" color="pink accent-3" :timeout="1000">Invalid user credential</v-snackbar>
	</div>
</template>

<style scoped>
	form {
		padding: 0 50px;
	}
	#app.theme--light.v-application {
		background-color: white !important;
	}
	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -70%);
		width: 60%;
		z-index: 2;
	}
	.footer {
		position: relative;
		width: 100%;
		height: 20vh;
		background: linear-gradient(0deg, #698FE5 0%, #1E88E5 100%);
		z-index: 1;
	}
	footer {
		width: 100%;
		transform: translateY(-7px) rotateZ(180deg);
	}
	svg {
		width: 100%;
		overflow: visible;
	}
	.wave {
		animation: wave 3s linear;
		animation-iteration-count: infinite;
		fill: url(#MyGradient);
		opacity: .6;
	}
	#wave2 {
		animation-duration:5s;
		animation-direction: reverse;
		fill: #7264F0;
	}
	#wave3 {
		animation-duration: 7s;
		fill: #E6EBFD;
	}
	@keyframes wave {
		to {transform: translateX(-100%);}
	}
</style>

<script>
export default {
	data() {
		return {
			valid: true,
			username: "",
			password: "",
            rulesRequired: [v => !!v || "required"],
            show: {
                invaliduser: false,
            }
		};
	},
	methods: {
		validate() {
            var self = this
			if(self.$refs.form.validate()) {
                var formData = new FormData()
                formData.append('username', self.username)
                formData.append('password', self.password)
            
                fetch('https://coralhr.ansi.com.my/lite/api/getSession.php', {
                    method: 'post',
                    body: formData
                }).then(function(response) {
                    return response.json()
                }).then(function(response) {
                    if(response.status=='ok') {
                        localStorage.setItem('CORALHR_LITE_SESSION', JSON.stringify(response.session))
                        self.$router.push('/')
                    }
                    else {
                        self.show.invaliduser = true
                    }
                })
			}
		},
		reset() {
			this.$refs.form.reset();
		},
		resetValidation() {
			this.$refs.form.resetValidation();
		}
	}
};
</script>
