<template>
    <form action="" class="presupuesto">
        <div class="campo">
            <label for="nuevo-presupuesto">Definir Presupuesto</label>
            <input type="number" id="nuevo-presupuesto" class="nuevo-presupuesto" placeholder="Indica tu presupuesto">
        </div>
 <input type="submit" value="Aceptar">

    </form>
</template>

<script setup>

</script>

<style scoped>
.presupuesto {
    width: 100%;
}

.campo {
    display: grid;
    gap: 2rem;
}

.presupuesto label {
    font-size: 2.2rem;
    text-align: center;
    color: var(--azul);
}

.presupuesto input[type="number"] {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
    text-align: center;
}

.presupuesto input[type="submit"] {
    background-color: var(--azul);
    border: none;
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    color: var(--blanco);
    font-weight: 900;
    width: 100%;
    transition: background-color 300ms ease;
}

.presupuesto input[type="submit"]:hover {
    background-color: #1048A4;
    cursor: pointer;
}
</style>