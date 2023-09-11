<script>
import axios from "axios";
import champions from "./components/champions.vue";
import Informacion from "./views/informacion.vue";
import Ranking from "./views/ranking.vue";
import Eventos from "./views/eventos.vue";
import Toast from "primevue/toast";
import DateUntilRecover from "./components/dateUntilRecover.vue";
// import "./js/simplyCountDown.min.js";
// import updateClock from "./js/countdown.js";

export default {
    components: {
        champions,
        Ranking,
        Eventos,
        Informacion,
        Toast,
        DateUntilRecover,
    },
    data() {
        return {
            champions: [],
            name: "",
            fecha: localStorage.getItem("fecha_final"),
            watchStart: true,
            tab: "campeones",
            tabs: ["campeones", "informacion"],
        };
    },
    mounted() {
        if (this.fecha) {
            this.watchStart = false;
          
        }
    },
    methods: {
        limpiar(){
            localStorage.clear();
        },
        generateDate() {
            localStorage.setItem(
                "fecha_final",
                new Date().getTime() + 7884000000
            );
            this.watchStart = false;
        },
        open(tab) {
            this.tab = tab;
            this.tabs.forEach((element) => {
                document.getElementById(element).classList.remove(element);
            });
            document.getElementById(tab).classList.add(tab);
        },
    },

    async created() {
        await axios
            .get(
                "http://ddragon.leagueoflegends.com/cdn/13.17.1/data/es_ES/champion.json"
            )
            .then((res) => {
                this.champions = Object.entries(res.data.data);

                // var result = datos1.filter(el => !datos2.includes(el));
            });
    },
};
</script>

<template>
    <div>
        <Toast />

        <h1 style="font-weight: 200" class="title-main">
            League of Legens &nbsp;<strong style="color: red">Hardcore</strong>
        </h1>
        <div
            style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            "
        >
            <button
                class="button-start"
                v-if="watchStart"
                @click="generateDate()"
            >
                <h3>EMPEZAR</h3>
            </button>
        </div>

        <span id="countdown"></span>
        <br />
        <div style="display: flex">
            <button @click="open('campeones')" class="menu-button">
                <h3>CAMPEONES</h3>
                <div id="campeones" class="campeones"></div>
            </button>
            <button @click="open('informacion')" class="menu-button">
                <h3>INFORMACIÓN</h3>
                <div id="informacion" class=""></div>
            </button>
            <!-- <button disabled @click="open('ranking')" class="menu-button">
                <h3>RANKING</h3>
                <div id="ranking" class=""></div>
            </button>
            <button disabled @click="open('eventos')" class="menu-button">
                <h3>EVENTOS</h3>
                <div id="eventos" class=""></div>
            </button> -->
        </div>

        <champions
            v-if="tab == 'campeones'"
            id="campeones-list"
            :champions="champions"
        ></champions>
        <informacion v-if="tab == 'informacion'"></informacion>
        <ranking v-if="tab == 'ranking'"></ranking>
        <eventos v-if="tab == 'eventos'"></eventos>
    </div>
</template>

<style lang="scss">
.title-main {
    color: white;
    font-size: 50px;
    text-align: center;
    font-family: "Beau Rivage", cursive;
    font-family: "Josefin Sans", sans-serif;
    font-family: "Teko", sans-serif;
}
.menu-button {
    user-select: none;
    position: relative;
    // z-index: -1;
    width: 100%;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding-top: 15px;
    padding-bottom: 15px;

    h3 {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 10px;
        margin: 0;
        z-index: 100;
        font-weight: 400;
        font-size: 15px;
        font-family: "Josefin Sans", sans-serif;
    }

    .campeones {
        transition: all 350ms;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        clip-path: polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%);
        box-shadow: inset 0 -5px 20px rgba(0, 183, 255, 0.678),
            inset 0 10px 20px rgba(0, 0, 0, 0.514);
        text-shadow: 0 0 20px rgb(43, 188, 255);
    }
    .informacion {
        transition: all 350ms;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        box-shadow: inset 0 -10px 20px rgba(72, 255, 0, 0.678),
            inset 0 10px 20px rgba(0, 0, 0, 0.514);
        text-shadow: 0 0 20px rgb(43, 255, 124);
    }
    .ranking {
        transition: all 350ms;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        box-shadow: inset 0 -10px 20px rgba(255, 38, 0, 0.678),
            inset 0 10px 20px rgba(0, 0, 0, 0.514);
        text-shadow: 0 0 20px rgb(255, 85, 43);
    }
    .eventos {
        transition: all 350ms;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        box-shadow: inset 0 -10px 20px rgba(247, 0, 255, 0.678),
            inset 0 10px 20px rgba(0, 0, 0, 0.514);
        text-shadow: 0 0 20px rgb(255, 43, 220);
    }
}
.menu-button:hover {
    h3 {
        // scale: 1.1;
    }
}
#fecha {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
}
.button-start {
    transition: all 300ms;
    width: 200px;
    height: 80px;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: inset 0px 0 10px red;

    h3 {
        transition: all 300ms;
    }
}
.button-start:hover {
    box-shadow: inset 0px 0 10px rgba(255, 0, 0, 0), 0 0 20px red;
    transition: all 300ms;
    h3 {
        text-shadow: 0 0 10px red;
        font-size: x-large;
        color: rgb(255, 150, 150);
        transition: all 300ms;
    }
}
</style>
