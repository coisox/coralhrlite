<template>
	<v-app>
		<v-content>
			<v-container fluid fill-height>
				<router-view @childLogout="logout" v-if="isMobile" :session="session" :version="version"></router-view>
				<div v-else>We're sorry but CoralHR Lite doesn't work properly on non Android/iOS</div>
			</v-container>
		</v-content>
	</v-app>
</template>

<style>
:root {
	--bg-primary: linear-gradient(0deg, rgba(114,100,240,1) 0%, rgba(39,133,247,1) 100%) !important;
}
* {
	user-select: none;
}
#app.theme--light.v-application {
	background: white !important;
    color: #202020 !important;
}
#app.v-application .success,
#app.v-application .primary {
	background: var(--bg-primary);
	border-color: #2785f7 !important;
}
#app.v-application .accent {
    background-color: #7986CB !important;
    border-color: #7986CB !important;
}
.container {
	max-width: 500px !important;
	padding: 0 0 0 0 !important;
	overflow-x: hidden;
	background-color: white;
}
.static-menu {
	position: absolute !important;
	top: 0;
	right: 0;
	background-color: transparent !important;
	box-shadow: none !important;
}
.pw-100 {
	width: 100%;
}
.ph-100 {
	height: 100%;
}
.vw-100 {
	width: 100vw;
}
.vh-100 {
	height: 100vh;
}
.v-middle {
	vertical-align: middle;
}
.v-dialog {
	max-width: 400px !important;
}
.v-snack__content {
	justify-content: center !important;
}
.bg-primary {
	background: var(--bg-primary);
}
.text-primary {
	color: #1E88E5 !important;
}
.text-disabled {
	color: #9E9E9E !important;
}
.v-list-item--disabled .text-primary {
	opacity: .5;
}
.p-relative {
	position: relative;
}
</style>

<script>
export default {
	name: "App",
	data() {
		return {
			session: {},
			isMobile: true,
			version: 'v20200708'
		}
	},
	mounted: function() {
        console.log('version: ', this.version)
		// this.checkIsMobile()
		// window.addEventListener("resize", this.checkIsMobile, { passive: true })
	},
	methods: {
		checkIsMobile() {
			var userAgent = navigator.userAgent || navigator.vendor || window.opera
			if(/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) this.isMobile = true
			else this.isMobile = false
			// this.isBigDevice = window.innerWidth > 600
		},
		checkSession() {
			this.session = JSON.parse(localStorage.getItem("CORALHR_LITE_SESSION") || '{}')
			if(this.session.key && this.$route.path=='/login') this.$router.push("/")
			else if(!this.session.key && this.$route.path!='/login') this.$router.push("/login")
		},
		logout() {
			localStorage.removeItem("CORALHR_LITE_SESSION")
			this.checkSession()
		}
	},
	watch: {
		$route(to, from) {
			this.checkSession()
		}
	}
}
</script>