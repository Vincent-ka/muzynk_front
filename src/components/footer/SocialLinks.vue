<template>
  <ul>
    <li>
      <img src="./../../assets/facebook.png" alt="logo de facebook" />
    </li>
    <li>
      <img src="./../../assets/twitter.png" alt="logo de twitter" />
    </li>
    <li>
      <img src="./../../assets/instagram.png" alt="logo d'instagram" />
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
@media screen and (max-width: 320px) {
  .footer > ul > li > img {
    width: 24px;
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .footer > ul {
    display: flex;
    list-style: none;
    margin: auto;
  }
  .footer > ul > li {
    margin-right: 20px;
  }
}

@media screen and (min-width: 481px) {
  .footer > ul {
    margin-top: 2px;
  }
  .footer > ul {
    display: flex;
    list-style: none;
    margin-left: 20px;
  }

  .footer > ul > li {
    margin-right: 20px;
  }
}
</style>