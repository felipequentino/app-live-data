
<template>
  <div class="contact-container">
    <h1>Entre em Contato</h1>
    <div class="contact-info">
      <div class="contact-item">
        <font-awesome-icon :icon="['fas', 'envelope']" class="contact-icon" />
        <p>joao.quentino@dcomp.ufs.br</p>
      </div>
      <div class="contact-item">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="contact-icon" />
        <p>Campus Universitário “Prof. José Aloísio de Campos” Av. Marechal Rondon, S/N – Bairro Jardim Rosa Elze – São Cristóvão-SE – CEP: 49100-000</p>
      </div>
      <div class="social">
        <h2>Outras formas de me encontrar</h2>
        <a href="https://github.com/felipequentino">
          GITHUB <!-- GITHUB coloque a logo aqui  -->
        </a>
        <a href="https://www.linkedin.com/in/felipequentino">
          LINKEDIN <!-- GITHUB coloque a logo aqui  -->
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContatoPage',
};
</script>

<style scoped>
.contact-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-top: 6rem;
  font-size: 2.5em;
  color: rgb(0, 44, 88);
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4rem;
}

.contact-item {
  display: flex;
  align-items: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;

  font-size: 1.2em;
  font-weight: 500;
}

.contact-icon {
  margin-right: 10px;
  color: rgb(0, 44, 88);
}

.social {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  color: rgb(0, 44, 88);
}

.social a {
  text-decoration: none;
  color:  rgb(0, 44, 88);
  font-size: 1em;
  display: flex;
  align-items: center;

}

</style>
