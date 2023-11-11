<template>
  <div class="home-container">
    <div class="carousel-container">
      <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * (cardWidth + cardMargin)}px)` }">
        <!-- Iterar pelos cards -->
        <div v-for="card in cards" :key="card.id" class="card">
          <img :src="card.image" alt="Card Image">
          <p>{{ card.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      cardWidth: 220, // Largura do card (ajuste conforme necessário)
      cardHeight: 900,
      cardMargin: 10, // Margem entre os cards (ajuste conforme necessário)
      cards: [
        { id: 1, title: 'Card 1', image: 'image1.jpg' },
        { id: 2, title: 'Card 2', image: 'image2.jpg' },
        { id: 3, title: 'Card 3', image: 'image3.jpg' },
        { id: 4, title: 'Card 2', image: 'image2.jpg' },
        { id: 5, title: 'Card 3', image: 'image3.jpg' },
        { id: 6, title: 'Card 2', image: 'image2.jpg' },
        { id: 7, title: 'Card 3', image: 'image3.jpg' },
        { id: 8, title: 'Card 2', image: 'image2.jpg' },
        { id: 9, title: 'Card 3', image: 'image3.jpg' },
        { id: 10, title: 'Card 2', image: 'image2.jpg' },
        // Adicione os dados dos outros cards aqui
      ],
    };
  },
  methods: {
    nextCard() {
      if (this.currentIndex < this.cards.length - 3) {
        this.currentIndex++;
      }
    },
    prevCard() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.home-container {
  text-align: center;
  margin-top: 50px;
}

.carousel-container {
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.card {
  flex: 0 0 auto;
  width: 200px; /* Largura do card (ajuste conforme necessário) */
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.card img {
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.card p {
  padding: 10px;
  margin: 0;
}
</style>
