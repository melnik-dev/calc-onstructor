import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            inputValue: '',
            currentNumber: '0',
            nextNumber: '',
            operator: '',
            isInput: false,
        }
    },
    getters: {
        getSizeWord(state) {
            return String(state.currentNumber).length > 9 ||
                String(state.inputValue).length > 9
        }
    },
    mutations: {
        enterNumber(state, value) {
            state.isInput = true
            if (value === 'C') {
                store.commit('clear')
            } else if (value === "0") {
                if (state.inputValue === "0") {
                    return;
                } else {
                    state.inputValue += value;
                }
            } else if (value === ",") {
                if (state.inputValue === "") {
                    state.inputValue = '0.';
                } else if (state.inputValue.includes('.')) {
                    return;
                } else {
                    state.inputValue += '.';
                }
            } else {
                if (state.inputValue.length < 17 && state.inputValue !== "0") {
                    state.inputValue = state.inputValue + value
                }
            }
        },
        enterOperator(state, value) {
            state.isInput = false
            console.log(state.operator)
            if (state.operator === '+') {
                store.commit('onPlus')
            } else if (state.operator === '-') {
                store.commit('onMinus')
            } else if (state.operator === 'x') {
                store.commit('onMultiply')
            } else if (state.operator === '/') {
                store.commit('onDivide')
            } else if (state.operator === '=') {
                store.commit('calculate')
            } else {
                state.currentNumber = Number(state.inputValue)
            }
            state.operator = value
            state.inputValue = ''
        },
        onPlus(state) {
            state.nextNumber = Number(state.inputValue)
            state.currentNumber += state.nextNumber
            store.commit('fixedCurrentNumber')
        },
        onMinus(state) {
            state.nextNumber = Number(state.inputValue)
            state.currentNumber -= state.nextNumber
            store.commit('fixedCurrentNumber')
        },
        onMultiply(state) {
            state.nextNumber = Number(state.inputValue)
            state.currentNumber *= state.nextNumber
            store.commit('fixedCurrentNumber')
        },
        onDivide(state) {
            state.nextNumber = Number(state.inputValue)
            if (state.nextNumber === 0) {
                store.commit('clear')
                state.currentNumber = 'Не определено'
            } else {
                state.currentNumber /= state.nextNumber
                store.commit('fixedCurrentNumber')
            }
        },
        calculate(state) {
            store.commit('enterOperator', state.operator)
        },
        clear(state) {
            state.inputValue = ''
            state.currentNumber = '0'
            state.nextNumber = ''
            state.operator = ''
            state.isInput = false
        },
        fixedCurrentNumber(state) {
            if (String(state.currentNumber).length > 15) {
                state.currentNumber = String(state.currentNumber).slice(0, 16);
                state.currentNumber = Math.ceil(+state.currentNumber * 10000000000000000) / 10000000000000000;
            }
        }

    }
})

export default store;