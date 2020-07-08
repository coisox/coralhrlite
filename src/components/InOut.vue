<template>
	<div class="vh-100 pw-100 white p-relative">
		<v-menu origin="right top" transition="scale-transition">
			<template v-slot:activator="{ on }">
				<a class="static-menu py-3 px-2" v-on="on"><i class="material-icons-outlined white--text">more_vert</i></a>
			</template>
			<v-list>
				<v-list-item @click="getPredefinedLocation"><v-list-item-title><i class="material-icons-outlined v-middle pr-2 text-primary">where_to_vote</i><span class="v-middle">Add Predefined Location</span></v-list-item-title></v-list-item>
				<v-list-item @click="show.customlocation=true"><v-list-item-title><i class="material-icons-outlined v-middle pr-2 text-primary">create</i><span class="v-middle">Add Custom Location</span></v-list-item-title></v-list-item>
				<v-list-item @click="deleteLocations" :disabled="!totalSelected"><v-list-item-title><i class="material-icons-outlined v-middle pr-2 text-primary">delete</i><span class="v-middle">Delete {{(totalSelected||'')+' '}}Favourite Location{{totalSelected?'s':''}}</span></v-list-item-title></v-list-item>
				<v-list-item @click="childLogout"><v-list-item-title><i class="material-icons-outlined v-middle pr-2 text-primary">https</i><span class="v-middle">Logout</span></v-list-item-title></v-list-item>
			</v-list>
		</v-menu>

		<template v-if="!locations.length">
			<div class="bg-primary vh-100 d-flex align-center text-center white--text">
				<div style="padding:50px">
					<img src="img/welcome.svg">
					<h2 class="my-5">Welcome</h2>
					<p>For starter, click the menu and add location into your favourite list for which you can use for daily check in/out.</p>
				</div>
			</div>
		</template>

		<template v-else>
			<div class="text-center pa-5 white--text bg-primary">
                <v-dialog v-model="show.timepicker">
                    <template v-slot:activator="{ on }">
                        <v-text-field class="time" v-model="timeFormatted" readonly v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-model="time" format="ampm" ampm-in-title>
                        <v-btn text class="bg-primary white--text d-block pw-100" @click="show.timepicker=false">Close</v-btn>
                    </v-time-picker>
                </v-dialog>
                <v-dialog v-model="show.datepicker">
                    <template v-slot:activator="{ on }">
                        <v-text-field class="date" v-model="dateFormatted" readonly v-on="on" @click="replaceIcon"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable prev-icon="mdi-skip-previous" next-icon="mdi-skip-next">
                        <v-btn text class="bg-primary white--text d-block pw-100" @click="show.datepicker=false">Close</v-btn>
                    </v-date-picker>
                </v-dialog>

				<br>Swipe right to check in, left to check out.
			</div>

			<div class="locations-container">
				<template v-for="(item, index) in locations">
					<v-divider :key="'a'+index"/>
					<div class="swiper-container pw-100" :class="'swiper-container-'+index" :key="'b'+index">
						<div class="swiper-wrapper">
							<div class="swiper-slide light-green accent-4 text-right white--text d-flex align-center justify-end"><div class="light-green accent-4 swiper-bar"></div><span>Check In</span><i class="material-icons-outlined">keyboard_arrow_right</i></div>
							<div class="swiper-slide d-flex align-center justify-space-between" @click="toggleSelected(index)">
								<div class="light-green accent-4 swiper-bar"></div>
								<template v-if="totalSelected>0">
									<i class="material-icons selected text-primary pl-3" v-if="item.selected">check_circle</i>
									<i class="material-icons unselected text-disabled pl-3" v-else>check_circle_outline</i>
								</template>
								<div class="pw-100 pl-3">{{item.LHC_NAMA_CAWANGAN}}</div>
								<div class="yellow darken-1 swiper-bar"></div>
							</div>
							<div class="swiper-slide yellow darken-1 white--text d-flex align-center justify-start"><i class="material-icons-outlined">keyboard_arrow_left</i><span>Check Out</span><div class="yellow darken-1 swiper-bar"></div></div>
						</div>
					</div>
				</template>
			</div>

			<v-divider/>

			<v-footer absolute class="white caption grey--text justify-center text-center">To remove locations, hold to select, choose delete from menu.<br>{{version}}</v-footer>

			<v-snackbar v-model="show.checkin" color="light-green accent-4" :timeout="1000">Check in success</v-snackbar>
			<v-snackbar v-model="show.checkout" color="pink accent-3" :timeout="1000">Check out success</v-snackbar>
			<v-snackbar v-model="show.error" color="red" :timeout="3000">{{error}}</v-snackbar>
		</template>

		<v-dialog v-model="show.predefined">
			<v-card>
				<v-list class="predefined">
					<template v-for="(item, index) in predefined">
						<v-list-item v-if="JSON.stringify(locations).indexOf(JSON.stringify(item))<0" @click="addLocations(index)" :key="'c'+index"><v-list-item-title>{{item.LHC_NAMA_CAWANGAN}}</v-list-item-title></v-list-item>
					</template>
					<v-list-item class="d-none"><v-list-item-title>All predefined location has been added</v-list-item-title></v-list-item>
				</v-list>
			</v-card>
		</v-dialog>

        <v-dialog v-model="show.customlocation">
			<v-card>
				<v-form class="pa-5">
                    <v-text-field v-model="customlocation" label="Custom location name"></v-text-field>
                    <v-btn color="success" class="d-block pw-100" @click="addLocations(customlocation, 1)">Add</v-btn>
                </v-form>
			</v-card>
		</v-dialog>

	</div>
</template>

<style>
.time {
    margin-bottom: -35px;
}
.date {
    margin-bottom: -30px;
}
.time input {
    color: white !important;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
}
.date input {
    color: yellow !important;
    font-size: 20px;
    text-align: center;
}
.time.v-text-field > .v-input__control > .v-input__slot:before,
.date.v-text-field > .v-input__control > .v-input__slot:before {
    border: none !important;
}
.locations-container {
	height: calc(100vh - 215px);
    overflow-y: scroll;
}

</style>

<style scoped>
lottie-player {
	width: 200px;
}
img {
	max-width: 300px;
	width: 100%;
}
.swiper-container {
	border-top: 4px solid white;
	border-bottom: 4px solid white;
}
.swiper-bar {
	height: 50px;
	min-width: 4px;
}
.predefined .v-list-item:only-child {
	display: flex !important;
}
.selected, .unselected {
	font-size: 36px;
}
</style>

<script>
import moment from 'moment'
import { nextTick } from 'q'
export default {
	data() {
		return {
			locations: JSON.parse(localStorage.getItem('CORALHR_LITE_LOCATIONS') || '[]'),
			predefined: [],
            time: moment().format('HH:mm'),
            timeFormatted: moment().format('hh:mm A'),
            date: moment().format('YYYY-MM-DD'),
            dateFormatted: moment().format('DD MMM YYYY'),
            picker: null,
            customlocation: null,
			show: {
				checkin: false,
                checkout: false,
                customlocation: false,
                error: false,
                predefined: false,
                datepicker: false,
                timepicker: false,
            },
            error : null,
			timeoutHandle: null,
            swipers: [],
            swiperType: ['checkin', '', 'checkout'],
		}
    },
    props: ['session', 'version'],
	methods: {
		childLogout: function() {
			this.$emit('childLogout')
        },
		initSwiper: function(index) {
            var self = this
            if(index=='reset') {
                for(var i=0; i<self.swipers.length; i++) {
                    self.swipers[i].destroy()
                }
                for(var i=0; i<self.locations.length; i++) {
                    self.initSwiper(i)
                }
            }
            else {
                self.swipers.push()
                self.swipers[index] = new Swiper ('.swiper-container-'+index, {
                    direction: 'horizontal',
                    loop: false,
                    initialSlide: 1,
                }).on('slideChange', function() {
                    if(self.swiperType[self.swipers[index].realIndex]) {
                        var formData = new FormData()
                        formData.append('key', self.session.key)
                        formData.append('type', self.swiperType[self.swipers[index].realIndex])
                        formData.append('KM_TARIKH', self.date)
                        formData.append('KM_MASA', self.time)
                        formData.append('KM_ORG_SUBCODE', self.locations[index].LHC_SINGKATAN)
                        formData.append('KM_ORG_SUBCODE_NEW', self.locations[index].LHC_SINGKATAN?'':self.locations[index].LHC_NAMA_CAWANGAN)
                        formData.append('KM_CAWANGAN_ID', self.locations[index].LHC_ID)
                        fetch('https://coralhr.ansi.com.my/lite/api/getSetAttendance.php', {
                            method: 'post',
                            body: formData
                        }).then(function(response) {
                            return response.json()
                        }).then(function(response) {
                            if(response.status=="ok") {
								self.show[self.swiperType[self.swipers[index].realIndex]] = true
                            }
                            else {
                                self.error = response.message
                                self.show.error = true
                            }
							self.swipers[index].slideTo(1)
							
							self.locations[index].lastswipe = moment().valueOf()
							self.locations.sort(function(a, b) {
								if(!a.lastswipe) a.lastswipe = moment().valueOf()
								if(!b.lastswipe) b.lastswipe = moment().valueOf()

								if(a.lastswipe > b.lastswipe) return -1;
								else if (a.lastswipe < b.lastswipe) return 1;
								else return 0;
							})
							localStorage.setItem('CORALHR_LITE_LOCATIONS', JSON.stringify(self.locations.map(function(item){ item.selected = false; return item })))
                        })
                    }
                }).on('touchStart', function(e) {
                    self.timeoutHandle = setTimeout(function(){
                        self.locations[index].selected = true
                        self.toggleTouchMove(false)
                    }, 600)
                }).on('touchEnd', function() {
                    clearTimeout(self.timeoutHandle)
                })
                .on('touchMove', function() {
                    clearTimeout(self.timeoutHandle)
                })
            }
        },
        toggleTouchMove: function(allowTouchMove) {
            for(var i=0; i<this.swipers.length; i++) {
                this.swipers[i].allowTouchMove = allowTouchMove
            }
            for(var i=0; allowTouchMove && i<this.locations.length; i++) {
                this.locations[i].selected = false
            }
        },
		addLocations: function(index, isCustom) {
            var location = Object.assign({}, this.predefined[index])
            if(isCustom) {
                location = {
                    LHC_ID: '',
                    LHC_NAMA_CAWANGAN: index,
                    LHC_SINGKATAN: '',
					selected: false,
					lastswipe: moment().valueOf()
                }
            }

			this.locations.push(location)
			this.locations.sort(function(a, b) {
				if(!a.lastswipe) a.lastswipe = moment().valueOf()
				if(!b.lastswipe) b.lastswipe = moment().valueOf()

				if(a.lastswipe > b.lastswipe) return -1;
				else if (a.lastswipe < b.lastswipe) return 1;
				else return 0;
			})

            this.show.predefined = false
            this.show.customlocation = false
            this.customlocation = null
            // this.toggleTouchMove(true)
            localStorage.setItem('CORALHR_LITE_LOCATIONS', JSON.stringify(this.locations.map(function(item){ item.selected = false; return item })))
            this.$nextTick(() => { this.initSwiper('reset') })
        },
        deleteLocations: function() {
            for(var i=this.locations.length-1; i>=0; i--) {
                if(this.locations[i].selected) {
                    this.locations.splice(i, 1)
                }
            }
            // this.toggleTouchMove(true)
            localStorage.setItem('CORALHR_LITE_LOCATIONS', JSON.stringify(this.locations.map(function(item){ item.selected = false; return item })))
            this.$nextTick(() => { this.initSwiper('reset') })
        },
		toggleSelected: function(index) {
			if(this.totalSelected) {
				this.locations[index].selected = !this.locations[index].selected
				this.$nextTick(() => { if(!this.totalSelected) this.toggleTouchMove(true) })
			}
        },
        getPredefinedLocation: function() {
            var self = this
            if(self.predefined.length) {
                self.show.predefined = true
            }
            else {
                fetch('https://coralhr.ansi.com.my/lite/api/getPredefinedLocation.php').then(function(response) {
                    return response.json()
                }).then(function(response) {
                    if(response.status=="ok") {
                        self.predefined = response.data
                        for(var i=0; i<self.predefined.length; i++) {
                            self.predefined[i].LHC_NAMA_CAWANGAN = self.predefined[i].LHC_NAMA_CAWANGAN.replace(/  +/g, ' ')
                            self.predefined[i].selected = false
                        }
                        self.show.predefined = true
                    }
                    else {
                        self.error = 'Getting data from server error'
                        self.show.error = true
                    }
                })
            }
        },
        replaceIcon: function() {
            setTimeout(function(){
                var el = document.querySelector('.v-icon.notranslate.mdi.mdi-skip-previous.theme--light')
                if(el) {
                    var newEl = document.createElement('i')
                    newEl.setAttribute('class', 'material-icons-outlined')
                    newEl.innerHTML = 'chevron_left'
                    el.parentNode.replaceChild(newEl, el)

                    el = document.querySelector('.v-icon.notranslate.mdi.mdi-skip-next.theme--light')
                    var newEl = document.createElement('i')
                    newEl.setAttribute('class', 'material-icons-outlined')
                    newEl.innerHTML = 'chevron_right'
                    el.parentNode.replaceChild(newEl, el)
                }
            }, 0)
        }
	},
	computed: {
		totalSelected: function() {
			return this.locations.filter(function(item){ return !!item.selected }).length
        }
	},
	mounted: function() {
        this.initSwiper('reset')
    },
    watch: {
        time(val) {
            this.timeFormatted = moment(this.time, 'HH:mm').format('hh:mm A') 
        },
        date(val) {
            this.dateFormatted = moment(this.date, 'YYYY-MM-DD').format('DD MMM YYYY') 
        },
    },
}
</script>