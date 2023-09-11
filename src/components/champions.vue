<script>
import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";

export default {
    components: { ConfirmPopup, useConfirm },
    data() {
        return {
            name: "",
            confirm: useConfirm(),
            toast: useToast(),
            localStorageChamps:  localStorage.getItem("campeonesDeleted")? JSON.parse(
                localStorage.getItem("campeonesDeleted")):[],
            showDeleted: false,
        };
    },
    props: ["champions"],
    computed: {
        countAlive() {
            if (this.localStorageChamps) {
                return this.champions.length - this.localStorageChamps.length;
            }
            return this.champions.length;
        },
        championsToShow() {
            if (this.name.length > 0) {
                let newFind = this.champions.filter(
                    (champ) =>
                        champ[1].name
                            .toLocaleLowerCase()
                            .includes(this.name.toLocaleLowerCase()) &&
                        !this.localStorageChamps.some(
                            (campeon) => campeon[0] === champ[0]
                        )
                );

                return newFind;
            } else {
                if (this.localStorageChamps) {
                    return this.champions.filter(
                        (el) =>
                            !this.localStorageChamps.some(
                                (campeon) => campeon[0] === el[0]
                            )
                    );
                } else {
                    return this.champions;
                }
            }
        },
    },
    methods: {
        confirm1(event, champ) {
            if (!showDeleted) {
                this.confirm.require({
                    target: event.currentTarget,
                    acceptLabel: "Sí",
                    message:
                        "Estás seguro de que quieres continuar con la eliminación?",
                    icon: "pi pi-exclamation-triangle",
                    accept: () => {
                        this.insertStorage(champ);
                    },
                    reject: () => {},
                });
            }
        },
        viewDeletedChamps() {
            this.showDeleted = !this.showDeleted;
        },
        insertStorage(champ) {
            // localStorage.clear();
            if (this.localStorageChamps) {
                if (
                    !this.localStorageChamps.some(
                        (campeon) => campeon[0] === champ[0]
                    )
                ) {
                    this.localStorageChamps.push(champ);
                }

                localStorage.setItem(
                    "campeonesDeleted",
                    JSON.stringify(this.localStorageChamps)
                );
            } else {
                localStorage.setItem(
                    "campeonesDeleted",
                    JSON.stringify([champ])
                );
                location.reload();
            }
            this.toast.add({
                severity: "error",
                summary: champ[0] + " eliminado",
                life: 3000,
            });

            // localStorage.clear();
            // location.reload()
        },
    },
};
</script>

<template>
    <div
        style="
            transition: 500ms;
            border-top: 3px solid rgba(43, 188, 255, 0.829);
            box-shadow: inset 0 0 30px rgba(43, 188, 255, 0.829);
            padding: 30px;
            padding-top: 50px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
        "
    >
        <!-- <h3>Nº de campeones:{{ champions.length }}</h3> -->

        <div
            style="
                display: flex;
                width: 100%;
                align-items: center;
                flex-direction: column;
            "
        >
            <input
                type="search"
                style="
                    width: 100%;
                    padding: 10px;
                    border: none;
                    border-radius: 0;
                    height: 100%;
                "
                v-model="name"
                placeholder="Buscar campeón"
            />
            <br />
            <div
                style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 50px; flex-wrap: wrap;
                "
            >
            <h3 style="width: 150px; text-align: center">
                    {{
                       
                          
                             "VIVOS " + countAlive
                    }}
                </h3>
                <h3 style="width: 150px; text-align: center">
                    {{
                       "ELIMINADOS " + localStorageChamps.length
                          
                    }}
                </h3>
               
                <button
                    :class="showDeleted ? 'notshowDeleted' : 'showDeleted'"
                    style="
                        width: 200px;
                        padding: 10px;
                        font-weight: 800;
                        border: none;
                        cursor: pointer;
                    "
                    @click="viewDeletedChamps"
                >
                    {{ showDeleted ? "Ver vivos" : "Ver eliminados" }}
                </button>
            </div>

            <br />
        </div>
        <ConfirmPopup></ConfirmPopup>
        <div
            style="color: black; height: 200px; aspect-ratio: 1"
            @click="confirm1($event, champion)"
            id="pj"
            class="pj"
            v-bind:key="key"
            v-for="(champion, key) in !showDeleted
                ? championsToShow
                : localStorageChamps"
        >
            <div style="z-index: 10">
                <h2>{{ champion[1].name }}</h2>
                <p>{{ champion[1].title }}</p>
            </div>

            <img
                class="img-pj"
                :src="
                    'http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/' +
                    champion[0] +
                    '.png'
                "
            />
        </div>
    </div>
</template>

<style lang="scss">
.pj {
    box-shadow: none;
    position: relative;
    z-index: 10;
    p {
        position: relative;
        z-index: 10;
        text-align: center;
        color: white;
    }
    h2 {
        border-radius: 10px !important;
        box-shadow: inset 0 30px 30px rgb(0, 0, 0);
        padding-top: 5px;
        width: 100%;

        position: relative;
        z-index: 10;
        color: white;
        text-align: center;
    }

    .img-pj {
        border-radius: 10px !important;
        z-index: 1;
        top: 0;
        position: absolute;
        width: 100%;
        filter: opacity(0.5);
    }
}
.pj:hover {
    box-shadow: 0 20px 30px rgb(0, 132, 255);
    // box-shadow: none;
    position: relative;
    z-index: 10;
    cursor: pointer;
    p {
        position: relative;
        z-index: 10;
        text-align: center;
        color: white;
    }
    h2 {
        border-radius: 10px !important;
        box-shadow: inset 0 30px 30px rgb(0, 0, 0);
        padding-top: 5px;
        width: 100%;

        position: relative;
        z-index: 10;
        color: white;
        text-align: center;
    }

    .img-pj {
        border-radius: 10px !important;
        z-index: 1;
        top: 0;
        position: absolute;
        width: 100%;
        filter: opacity(1);
    }
}
.showDeleted {
    background-color: red;
    color: white;
}
.notshowDeleted {
    background-color: greenyellow;
    color: black;
}
</style>
