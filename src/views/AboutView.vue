<template>
  <div class="about-container">
    <div class="about-content">
      <h1>E-sportify</h1>
      <p>Somos mais do que uma plataforma; somos uma comunidade apaixonada que acredita no potencial extraordinário dos jogadores profissionais de PUBG. Nosso objetivo é transcender o comum, criando um espaço único e acessível onde os talentos se destacam e as oportunidades surgem.</p>
      <p>Conectamos jogadores dedicados a organizações de esports comprometidas em investir no futuro vitorioso.</p>
    </div>
    <div class="about-image">
      <img src="img.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
}

.about-content {
  flex: 1;
  max-width: 600px;
}

.about-content h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
}

.about-content p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.about-image {
  flex: 1;
  max-width: 400px;
  margin-left: 50px;
}

.about-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
</style>