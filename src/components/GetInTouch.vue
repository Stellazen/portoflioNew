<script lang="ts">

</script>

<template>
    <div class="contact">
        <h2 class="contact__title">Entre em Contato</h2>
        <div class="contact__links">
            <a class="contact__link" href="mailto:stellazen.xd@gmail.com">
                Email
            </a>
            <a class="contact__link" href="https://wa.me/5541996538820">
                whats
            </a>
        </div>   
    </div>
    <div class="contact__footer">
    </div>
</template>

<style setup>
    .contact{
        height: 50vh;
        display: flex;
        flex-direction: column;
        
    }
    .contact__title{
        font-size: 2em;
        font-family: var(--font-title);
        text-align: center;
        color: black;
    }
    .contact__links{
        display: flex;
        justify-content: center;
        gap:50px;      
    }
    .contact__link{
        background-color: var(--black);
        padding: 5px;
        border-radius: 5px;
        color: lightgray;
        text-decoration: none;
        margin: 20px 0 20px 0;
        transition: 0.5ms ease-in;
    }
    .contact__link:hover{
        transform: scale(1.2);
        background-color: var(--soft_green);
        color:var(--brown);
        font-weight: 600;
    }
    .contact__footer{
        background-color: black;
        height:100px
    }
</style>