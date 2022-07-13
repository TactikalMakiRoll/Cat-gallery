<template>
    <div class="app">
        <section class="nav">
            <header class="nav__header">
                <img
                    src="@/assets/icons/logo.svg"
                    alt="PetsPaw logo"
                    class="nav__logo"
                />
                <div class="nav__dark-mode">
                  <img
                      src="@/assets/icons/eye.svg"
                      alt="Dark mode - off"
                      class="nav__mode-icon"
                  />
                  <UiToggle></UiToggle>
                </div>
            </header>
            <h2 class="nav__greetings">Hi intern!</h2>
            <p class="nav__welcome text-accent">Welcome to MI 2022 Front-end test</p>
            <h4 class="text-bold">Lets start using The Cat API</h4>
            <nav role="navigation" class="nav__cards">
                <div>
                  <div class="nav__card nav__card--voting">
                      <img
                          src="@/assets/images/vote-table.png"
                          alt="Open voting"
                      />
                  </div>
                  <UiButton class="nav__button">Voting</UiButton></div>
                <div>
                    <div class="nav__card nav__card--breeds">
                      <img
                          src="@/assets/images/pet-breeds.png"
                          alt="Open breeds"
                      />
                  </div>
                  <UiButton class="nav__button">Breeds</UiButton></div>
                <div>
                  <div class="nav__card nav__card--gallery">
                    <img
                        src="@/assets/images/images-search.png"
                        alt="Open gallery"
                    />
                  </div>
                  <UiButton class="nav__button">Gallery</UiButton>
                </div>
            </nav>
        </section>
        <section class="main-screen">
            <img class="main-screen__placeholder" src="@/assets/images/girl-and-pet.png" alt="" />
            <main class="main-screen__app"></main>
        </section>
    </div>
</template>

<script>
import UiToggle from "../components/UI/UiToggle.vue";
import UiButton from "../components/UI/UiButton.vue";

export default {
    name: "Home",
    components: {
        UiToggle,
        UiButton
    },
};
//document.body.style.backgroundColor = "<your color here>"; night mode switch
</script>

<style lang="scss" scoped>
  $dark-theme: false;
  .app{
    display:flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .nav{
    font-size: 1.25em;
    padding-left: 6em;
    position:sticky;
    align-self: flex-start;
    top: 1.875rem;
    z-index: 99999;

    &__header{
      display:flex;
      justify-content: space-between;
    }

    &__dark-mode{
      display: flex;
    }

    &__mode-icon{
      padding: 4px;

      background-color: white;
      border-radius: 100%;
    }

    &__greetings{
      font-size: 2.2em;
      margin-top: 2.1em;
    }

    &__welcome{
      margin-top:1.2em;
      margin-bottom:3.7em;
    }
    
    &__cards{
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-top:1.4em;
    }

    &__card{
      margin-bottom: 0.5em;
      border: 4px solid;
      border-radius: 20px;
    }

    &__card--voting{
      background-color: rgba(180, 183, 255, 1);
      border-color: rgba(180, 183, 255, 0.4);
    }

    &__card--breeds{
      background-color: rgba(151, 234, 185, 1);
      border-color: rgba(151, 234, 185, 0.4);
    }

    &__card--gallery{
      background-color: rgba(255, 210, 128, 1);
      border-color: rgba(255, 210, 128, 0.4);
    }

    &__button{
      background-color: white;
      color: $color-btn-pink;
    }
  }

  .main-screen{
    max-width: 50%;
    margin-left: 1.875em;
    background-color: $color-background-soft;
    border-radius:20px;

    &__app{
      margin-left: 6.6875em;
    }

    &__placeholder{
      width: 895px;
      height: 1024px;
      position: relative;
      left: -5em;
    }
  }

</style>
