<template>
    <div class="full-content">
        <div id="container"></div>
    </div>
</template>

<script>
import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
export default {
    data() {
        return {
            data: {
                // 节点
                nodes: [
                    {
                        id: 50,
                        type: 'rect',
                        x: 100,
                        y: 150,
                        text: '你好'
                    },
                    {
                        id: 21,
                        type: 'circle',
                        x: 300,
                        y: 150
                    },
                    {
                        id: 10,
                        type: 'rect',
                        x: 120,
                        y: 270,
                        text: '矩形'
                    }
                ],
                // 边
                edges: [
                    {
                        type: 'polyline',
                        sourceNodeId: 50,
                        targetNodeId: 21
                    },
                    {
                        type: 'polyline',
                        sourceNodeId: 10,
                        targetNodeId: 50,
                        // TODO:箭头指向指定节点的右侧标点
                        endPoint: { x: 150, y: 160 }
                    }
                ]
            }
        };
    },
    mounted() {
        const lf = new LogicFlow({
            container: document.querySelector('#container'),
            stopScrollGraph: true,
            stopZoomGraph: true,
            grid: {
                type: 'dot',
                size: 20
            }
        });
        lf.render(this.data);
        // 打印配置关系的数据
        console.info(lf.getGraphData());
    },
    methods: {}
};
</script>

<style scoped lang="scss">
.full-content {
    padding: 10px;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    background: #f5f7fa;
    #container {
        height: 100%;
        overflow: hidden;
        position: relative;
    }
}
</style>
