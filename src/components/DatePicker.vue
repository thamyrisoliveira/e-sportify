<template>
    <v-text-field
        outlined
        dense
        :label="label"
        v-model="dataFormatada"
        v-mask="'##/##/####'"
        :disabled="disabled"
        ref="datePicker"
        validate-on-blur>
        <template v-slot:prepend-inner>
            <v-menu
                v-model="dataMenu"
                :close-on-content-click="false"
                :nudge-left="15"
                :nudge-bottom="10"
                transition="scale-transition"
                offset-y
                min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">
                  mdi-calendar
                </v-icon>
              </template>
                <v-date-picker
                    v-model="dataPicked"
                    @input="dataMenu = false"
                    locale="pt-br"
                ></v-date-picker>
            </v-menu>
        </template>
    </v-text-field>
</template>

<script>

import moment from "moment";

export default {
    name: "DatePicker",
    props: {
        dataModel: null, 
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {dataMenu: false}
    },
    computed: {
        dataFormatada: {
            get() {
                return this.dataModel ? moment(this.dataModel).format("DD/MM/YYYY") : ""
            },
            set(newValue) {
                if(newValue && newValue.length === 10) {
                    this.dataPicked = moment(newValue, 'DD/MM/YYYY').format('YYYY-MM-DD')
                }
            }
        },
        dataPicked: {
            get() {
                return this.dataModel
            },
            set(newValue) {
                if (newValue) {
                    this.$refs.datePicker.resetValidation()
                }
                this.$emit('update:dataModel', newValue)
            }
        }
    },
    watch: {
      value(v) {
          this.$el.innerHTML = v;
      }
    },
}
</script>