import { defineStore } from 'pinia';
import { ref } from 'vue';
export const themeChangeStore = defineStore('themeStore', () => {
    let theme = ref('chalk');
    function changeTheme() {
        if (theme.value == 'chalk') {
            theme.value = 'vintage';
        } else {
            theme.value = 'chalk';
        }
    }

    return { theme, changeTheme };
});
