<template>
  <footer>
    <div class="foot">
      <router-link to="/index">
        <div class="index">
          <span></span>
          <p>首页</p>
        </div>
      </router-link>
      <router-link to="/car">
        <div class="shopcar">
          <span></span>
          <p>购物车</p>
        </div>
      </router-link>
      <router-link to="/my">
        <div class="my">
          <span></span>
          <p>我的</p>
        </div>
      </router-link>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
footer {
  height: 1.19rem;
  width: 7.5rem;
  box-shadow: 0 0 0.05rem 0.05rem #f9f9f9;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
}
footer .foot {
  width: 6.46rem;
  height: 1.19rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-content: space-around;
  font-size: 0.22rem;
  color: #adadad;
  text-align: center;
}
footer .foot div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
footer a{
    text-decoration: none;
    color: #adadad;
}
footer .foot .index:hover {
  color: #f25200;
}
footer .foot .index:hover span {
  background-image: url(../assets/images/1-2.jpg);
}
footer .foot .index span {
  display: block;
  width: 0.54rem;
  height: 0.54rem;
  background: url(../assets/images/1-1.jpg);
  background-size: 0.54rem 0.54rem;
}
footer .foot .shopcar:hover {
  color: #f25200;
}
footer .foot .shopcar:hover span {
  background-image: url(../assets/images/2-2.jpg);
}
footer .foot .shopcar span {
  display: block;
  width: 0.58rem;
  height: 0.54rem;
  background: url(../assets/images/2-1.jpg);
  background-size: 0.58rem 0.54rem;
}
footer .foot .my:hover {
  color: #f25200;
}
footer .foot .my:hover span {
  background-image: url(../assets/images/3-2.jpg);
}
footer .foot .my span {
  display: block;
  width: 0.51rem;
  height: 0.6rem;
  background: url(../assets/images/3-1.jpg);
  background-size: 0.51rem 0.6rem;
}
</style>