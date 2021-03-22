<template>
    <div class="full-content">
        <div class="table-content">
            <div id="map" class="map-pack"></div>

            <!-- 地图标点详情 -->
            <info-window ref="infowindow" :class="infoShow ? 'show' : 'hide'" :point-info="pointInfo"> </info-window>

            <!-- 查看视频弹窗 -->
            <video-info ref="VideoInfo" @close="handleClose" :info="videoInfo"> </video-info>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import AMap from 'AMap';
import InfoWindow from '../components/InfoWindow';
import VideoInfo from '../components/VideoInfo';
import gpsTransform from '../../../subtree/utils/gps-transform';

import greenIcon from '../images/camera-green.png';
import redIcon from '../images/camera-red.png';

export default {
    name: 'CameraList',
    components: {
        InfoWindow,
        VideoInfo
    },
    data() {
        return {
            // 地图相关
            infoShow: false,
            pointInfo: {},
            videoInfo: {},
            map: null,
            cameraList: []
        };
    },
    mounted() {
        // 初始化地图
        this.initMap();
        this.getCameraList();
    },
    methods: {
        // 初始化地图
        initMap() {
            this.map = new AMap.Map('map', {
                viewMode: '3D', //开启3D视图,默认为关闭
                buildingAnimation: true, //楼块出现是否带动画
                zoom: 18, //缩放级别
                // center: [116.480784, 39.998302], //地图中心点
                center: [113.6415314733542, 34.68429577415652] //地图中心点
            });
            this.map.setFitView();
        },
        pointChange(pointList) {
            this.map.clearMap();
            let that = this;

            var markers = [];
            for (var i = 0; i < pointList.length; i += 1) {
                var latitude = pointList[i].latitude;
                var longitude = pointList[i].longitude;
                if (longitude == null || longitude == '' || latitude == null || latitude == '') {
                    continue;
                }

                var icon = new AMap.Icon({
                    image: pointList[i].status == 0 ? greenIcon : redIcon,
                    size: new AMap.Size(25, 32),
                    imageSize: new AMap.Size(25, 32)
                });

                var point = gpsTransform.wgs_gcj_encrypts(latitude, longitude);
                var marker = new AMap.Marker({
                    icon: icon,
                    position: [point.lon, point.lat],
                    zIndex: 101,
                    map: that.map
                });
                marker.id = pointList[i].id;
                marker.serialNo = pointList[i].serialNo;
                marker.name = pointList[i].name;
                marker.statusDesc = pointList[i].statusDesc;
                marker.address = pointList[i].address;
                marker.srcUrl = pointList[i].srcUrl;
                marker.extraProperties = pointList[i].extraProperties;

                marker.on('mouseout', function (e) {
                    that.infoShow = false;
                    that.map.clearInfoWindow();
                });
                marker.on('mouseover', function (e) {
                    that.infoShow = true;
                    that.pointInfo = _.cloneDeep(e.target);
                    infoWindow.open(that.map, e.lnglat);
                });
                marker.on('click', function (e) {
                    that.videoInfo = _.cloneDeep(e.target);
                    that.$refs.VideoInfo.dialogVisible = true;
                });
                markers.push(marker);
            }
            let infoWindow = new AMap.InfoWindow({
                isCustom: true, //使用自定义窗体
                offset: new AMap.Pixel(6, -20), //窗体偏移位置
                content: that.$refs.infowindow.$el
            });
            this.map.setFitView();
        },
        handleClose() {
            this.videoInfo = {};
            this.$refs.VideoInfo.dialogVisible = false;
        },
        // 关闭视频
        async closeVideo() {
            let url = this.pointInfo.srcUrl.split('/api/')[0] + 'api/turnOffVideo';
            axios.post(url, JSON.stringify([{ uid: this.pointInfo.id }])).then((res) => {});
        },
        async getCameraList() {
            try {
                let res = await this.$request({
                    url: '/v1/iot/sensor/list',
                    method: 'GET',
                    params: {
                        page: 2,
                        size: 100,
                        appType: 1
                    }
                });
                this.cameraList = _.cloneDeep(res.records);
                // 设置地图数据
                this.pointChange(res.records);
            } catch (error) {}
        }
    }
};
</script>

<style lang="scss" scoped>
// 整屏撑满
.full-content {
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 0;
    background: #f5f7fa;
}
// 表格区域
.table-content {
    background: #ffffff;
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow: hidden;
}

.map-pack {
    width: 98.5%;
    height: 100%;
    margin: 10px;
}
.map {
    width: 100%;
    height: 100%;
}
.amap-info-contentContainer {
    padding-bottom: 8px;
    background-color: #ffffff;
    z-index: 100;
}
.content-window-card {
    background-color: white;
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
}

.content-window-card p {
    height: 2rem;
}

/**
 * 必须要带.map-pack 前缀，要不然其他页面样式会错乱！！！
 */
.map-pack .info-top {
    /* position: relative;
    background: none repeat scroll 0 0 #9aade8;
    border-bottom: 1px solid #9f7474; */
    border-radius: 1px 1px 0 0;
    display: flex;
    width: 310px;
    font-size: 12px;
}

.map-pack .info-top div {
    display: flex;
}

.map-pack .info-middle {
    font-size: 12px;
    padding: 3px 26px;
    line-height: 20px;
    margin-left: 18px;
}

.map-pack .info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
}

.map-pack .info-bottom img {
    position: relative;
    z-index: -1;
}

.map-pack .info-middle img {
    float: left;
    margin-right: 6px;
}
.show {
    display: block;
}
.hide {
    display: none;
}
::v-deep .amap-logo {
    display: none !important;
}
::v-deep .amap-copyright {
    opacity: 0;
}
</style>
