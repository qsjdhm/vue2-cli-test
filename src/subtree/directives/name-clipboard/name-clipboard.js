import Vue from 'vue';
import _ from 'lodash';

const Clipboard = require('clipboard');
if (!Clipboard) {
    throw new Error('you should npm install `clipboard` --save at first ');
}
function initClipboard(el, binding) {
    let $span;
    if (binding.value.isCopy) {
        el.addEventListener('mouseenter', (e) => {
            let text = e.target.getAttribute('data-txt') || el.innerText;
            $span = document.createElement('span');
            $span.setAttribute('id', 'spanCopy');
            $span.setAttribute('data-clipboard-text', text);
            $span.setAttribute('data-clipboard-action', 'copy');

            $span.innerHTML = `<i class="el-icon-s-order"></i>`;
            $span.addEventListener('mouseenter', (event) => {
                event.stopPropagation();
            });
            $span.addEventListener('mouseleave', (event) => {
                event.stopPropagation();
            });
            $span.addEventListener(
                'click',
                _.debounce((event) => {
                    let clipboard = new Clipboard('#spanCopy');
                    clipboard.on('success', function (e) {
                        Vue.prototype.$message({
                            message: '复制成功',
                            type: 'success',
                            duration: 1500
                        });
                        e.clearSelection();
                        clipboard.destroy();
                    });
                }),
                1200
            );
            el.appendChild($span);
        });

        el.addEventListener('mouseleave', (e) => {
            if ($span) {
                try {
                    el.removeChild($span);
                } catch (e) {}
            }
        });
    }
}

export default {
    inserted(el, binding) {
        initClipboard(el, binding);
    }
};
