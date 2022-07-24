<template>
    <div class="ui-button br-10">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "UiButton",
};
</script>

<style lang="scss" scoped>
.ui-button {
    padding: 0.875rem 0 0.875rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: $font-primary;
    font-style: normal;
    font-weight: $font-weight-bold;
    font-size: 16px;
    line-height: 1rem;
}
</style>
