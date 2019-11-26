<template>
    <v-text-field
        ref="field"
        v-model="model"
        :label="label"
        :prefix="prefix"
        :suffix="suffix"
        :rules="componentRules"
        :color="color"
        @focus="isInputActive = true"
        @blur="isInputActive = false"
    ></v-text-field>
</template>

<script>
import AutoNumeric from "autonumeric";

export default {
    props: {
        value: {
            required: true,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
        prefix: {
            type: String,
            default: '',
        },
        suffix: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        },
        color: {
            type: String,
        },
        autocomplete: {
            type: String,
        }
    },
    watch: {
        'currency.rawValue'(val) {
            if(!!this.isInputActive) {
                this.$emit('input', parseFloat(val));
            }
        },
        value(val) {
            this.refreshInput();
        },
        model(val) {
            // clear input when form is reset
            if(!this.isInputActive && !val) {
                this.currency.clear();
            }
        }
    },
    data: (vm) => ({
        model: null,
        isInputActive: false,
        currency: null,
        componentRules: vm.rules,
    }),
    methods: {
        // refreshes input when value prop changes and input is not active
        refreshInput() {
            if(!this.isInputActive) {
                if(!isNaN(parseFloat(this.value))) {
                    /**
                     * Round value to at most 3 decimal places only if necessary (unlike toFixed)
                     * Method provided by Brian Ustas and mrkschan:
                     * 
                     * https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
                     * 
                     */
                    let rounded = Math.round((parseFloat(this.value) + 0.00001) * 1000) / 1000

                    let arr = String(rounded).split('.');
                    if (arr[0].length >= 4) {
                        // add separator for every 3 digits before decimal
                        arr[0] = arr[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
                    }

                    this.model = arr.join(',');
                    this.currency.set(this.model);
                    this.currency.setUnformatted(rounded);
                }
            }
        },
        focus() {
            this.$refs.field.focus();
        },
        blur() {
            this.$refs.field.blur();
        },
    },
    mounted() {
        this.currency = new AutoNumeric(this.$refs.field.$refs.input, {
            decimalCharacter: ",",
            digitGroupSeparator: ".",
            decimalPlaces: 0,
            minimumValue: '0',
            modifyValueOnWheel: false,
            caretPositionOnFocus: 'end',
        });

        this.refreshInput();
    },
}
</script>
