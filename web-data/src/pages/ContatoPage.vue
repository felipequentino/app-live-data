<template>
  <div class="contact-container">
    <h1>CONTATO</h1>
    <div class="contact-info">
      <div class="contact-item">
        <font-awesome-icon :icon="['fas', 'envelope']" class="contact-icon" />
        <p>Email: joao.quentino@dcomp.ufs.br</p>
      </div>
      <div class="contact-item">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="contact-icon" />
        <p>Endereço: Campus Universitário “Prof. José Aloísio de Campos” Av. Marechal Rondon, S/N – Bairro Jardim Rosa Elze – São Cristóvão-SE – CEP: 49100-000</p>
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
  margin-bottom: 20px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.contact-icon {
  margin-right: 10px;
}
</style>
