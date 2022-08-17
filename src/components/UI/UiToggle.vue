<template>
    <input @click="this.$emit('clicked')" type="checkbox" id="switch" /><label
        for="switch"
        >Toggle</label
    >
</template>

<script>
export default {
    name: "UiToggle",
    emits: ["clicked"],
};
</script>

<style lang="scss" scoped>
input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
}

label {
    cursor: pointer;
    text-indent: -9999px;
    width: 2.75rem;
    height: 1.5rem;
    background: $color-background-soft;
    display: block;
    border-radius: 0.75rem;
    position: relative;
}

label:after {
    content: "";
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1rem;
    height: 1rem;
    background: $color-btn-pink;
    border-radius: 0.5rem;
    transition: 0.3s;
}

input:checked + label {
    background: $color-background-soft-dark;
}

input:checked + label:after {
    right: calc(100% - 0.25rem);
    transform: translateX(100%);
}

label:active:after {
    width: 1.4rem;
}
</style>
