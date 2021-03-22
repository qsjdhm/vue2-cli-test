<template>
    <div class="shipInfoPop">
        <div class="head" style="color: red; font-size: 16px; border-bottom: 1px solid #d8d8d8">注：点击地图标点，可开启视频</div>
        <div class="content">
            <div class="right">
                <div class="item">
                    <div class="label">编号：</div>
                    <div class="value">{{ pointData.serialNo }}</div>
                </div>
                <div class="item">
                    <div class="label">名称：</div>
                    <div class="value">{{ pointData.name }}</div>
                </div>
                <div class="item">
                    <div class="label">状态：</div>
                    <div class="value">
                        <span v-if="pointData.statusDesc === '正常'" style="color: green">{{ pointData.statusDesc }}</span>
                        <span v-else style="color: red">{{ pointData.statusDesc }}</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">位置：</div>
                    <div class="value">{{ pointData.address }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'InfoWindow',
    props: {
        title: {
            type: String,
            default: () => {
                return '';
            }
        },
        pointInfo: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    watch: {
        pointInfo: {
            handler(newVal, oldVal) {
                this.pointData = newVal;
            }
        }
    },
    data() {
        return {
            pointData: {}
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.shipInfoPop {
    background: #fff;
    border: 1px solid #ddd;
    .head {
        font-size: 16px;
        border-bottom: 1px solid rgb(216, 216, 216);
        padding: 10px;
        width: 380px;
    }
    .content {
        padding: 10px;
        display: flex;
        height: 100%;
        .left {
            margin-right: 20px;
        }
        .right {
            .item {
                margin-bottom: 8px;
                display: flex;
                min-height: 20px;
                line-height: 20px;
                .label {
                    width: 60px;
                }
                .value {
                    flex: 1;
                }
            }
        }
    }
}
</style>
