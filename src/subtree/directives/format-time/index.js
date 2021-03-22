// 使用指令 格式化时间
import moment from 'moment';
const formatTime = {};
formatTime.install = function (Vue) {
    Vue.directive('formatTime', function (el, binding) {
        const { time, format = 'YYYY-MM-DD HH:mm:ss', empty = '暂无' } = binding.value;
        let res = empty;
        if (time) {
            const formatRes = moment(time).format(format);
            res = formatRes !== 'Invalid date' ? formatRes : res;
        }
        el.innerHTML = res;
    });
};

export default formatTime;
