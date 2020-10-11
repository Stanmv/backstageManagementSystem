
<template>
  <div id="myChart" style="width:100%;height:100%"></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "今年业绩指标" },
        tooltip: {},
        xAxis: {
          data: ["家用电器", "电脑办公", "服饰", "儿童玩具", "手机"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10],
          },
        ],
      });
    },
  },
};
</script>