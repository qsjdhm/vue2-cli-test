<template>
    <el-dialog
        v-el-drag-dialog
        title="摄像头监控信息"
        width="800px"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
        <div class="info-pack">
            <span style="margin-right: 20px">摄像头编号：{{ info.serialNo }}</span>
            <span style="margin-right: 20px">摄像头名称：{{ info.name }}</span>
            <span style="margin-right: 20px">摄像头位置：{{ info.address }}</span>
        </div>
        <div class="video-pack">
            <video-player v-if="flag" class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"> </video-player>
        </div>

        <span slot="footer">
            <el-button size="mini" type="primary" @click="handleConfirm">关闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { videoPlayer } from 'vue-video-player';
import 'videojs-contrib-hls';
import 'videojs-flash';

export default {
    components: {
        videoPlayer
    },
    name: 'VideoInfo',
    props: {
        info: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            // 弹窗开关
            dialogVisible: false,
            videoInfo: {},

            closeUrl: '',
            flag: false,
            initialized: false,
            currentTech: '',
            streams: {
                rtmp: '',
                hls: ''
            },
            playerOptions: {}
        };
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        },
        currentStream() {
            return this.currentTech === 'Flash' ? 'RTMP' : 'HLS';
        },
        playsinline() {
            let ua = navigator.userAgent.toLocaleLowerCase();
            // x5内核
            if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
                return false;
            } else {
                // ios端
                return true;
            }
        }
    },
    watch: {
        info: {
            handler(newVal, oldVal) {
                if (Object.keys(newVal).length == 0) {
                    this.playerOptions = {};
                } else {
                    this.flag = true;
                    this.videoInfo = _.cloneDeep(newVal);
                    // 根据id请求真实视频路径
                    this.getUrl(newVal);
                }
            }
        }
    },
    beforeDestroy() {
        this.flag = false;
    },
    methods: {
        // 点击确定按钮
        handleConfirm() {
            this.flag = false;
            this.dialogVisible = false;
            this.$emit('close');
            this.closeVideo();
        },
        // 关闭视频
        async closeVideo() {
            axios.post(this.closeUrl, JSON.stringify([{ id: this.videoInfo.id }])).then((res) => {
                console.info(res);
            });
        },
        // 根据id请求真实视频路径
        getUrl(newVal) {
            let that = this;
            axios.post(`${newVal.srcUrl}`, JSON.stringify([{ id: newVal.id, rtsp: newVal.extraProperties }])).then((res) => {
                if (res.data.code === 0) {
                    let url = res.data.data[0].play;
                    this.closeUrl = res.data.data[0].close;
                    that.playerOptions = {
                        overNative: true,
                        autoplay: true,
                        controls: true,
                        techOrder: ['html5'],
                        sourceOrder: true,
                        loop: true, // 导致视频一结束就重新开始。
                        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                        flash: { hls: { withCredentials: false } },
                        html5: { hls: { withCredentials: false } },
                        sources: [
                            {
                                withCredentials: false,
                                type: 'application/x-mpegURL',
                                src: url
                            }
                        ]
                    };
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.info-pack {
    font-size: #fff;
    font-weight: bold;
    padding: 10px 0;
}
.video-pack {
    margin-bottom: 10px;
}
.video-js .vjs-icon-placeholder {
    width: 100%;
    height: 640px;
    display: block;
}
</style>
