<template>
    <div class="ui-button">
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.ui-button {
    padding: 0.875rem 0 0.875rem  2.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: $font-primary;
    font-style: normal;
    font-weight: $font-weight-bold;
    font-size: 0.75rem;
    line-height: 1rem;
    border-radius: 10px
}
</style>
