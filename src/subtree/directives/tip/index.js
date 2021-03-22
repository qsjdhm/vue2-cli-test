import Vue from 'vue';

const tip = {
    inserted(el, binding) {
        let $div;
        el.addEventListener('mouseover', (e) => {
            const curStyle = window.getComputedStyle(el, ''); // 获取当前元素的style
            const textSpan = document.createElement('span'); // 创建一个容器来记录文字的width
            // 设置新容器的字体样式，确保与当前需要隐藏的样式相同
            textSpan.style.fontSize = curStyle.fontSize;
            textSpan.style.fontWeight = curStyle.fontWeight;
            textSpan.style.fontFamily = curStyle.fontFamily;
            // 将容器插入body，如果不插入，offsetWidth为0
            document.body.appendChild(textSpan);
            // 设置新容器的文字
            textSpan.innerHTML = el.innerText;
            if (textSpan.offsetWidth >= el.offsetWidth) {
                let text = e.target.getAttribute('data-txt') || el.innerText;
                $div = document.createElement('div');
                $div.setAttribute('class', 'site-tips');
                $div.style.cssText = `
                    max-width:400px;
                    max-height: 400px;
                    overflow: auto;
                    position:absolute;
                    top:${e.clientY - 40}px;
                    left:${e.clientX - 51}px;
                    background: rgba(0, 0 , 0, .6);
                    color:#fff;
                    border-radius:5px;
                    padding:10px;
                    display:inline-block;
                    font-size:12px;
                    z-index:19999
                `;
                $div.innerHTML = text;
                document.body.appendChild($div);
            }
            // 移除刚刚创建的记录文字的容器
            document.body.removeChild(textSpan);
        });
        el.addEventListener('mouseout', (e) => {
            if ($div) {
                try {
                    document.body.removeChild($div);
                } catch (e) {
                    console.log(e);
                }
            }
        });
    }
};

const install = function (Vue) {
    Vue.directive('tip', tip);
};

if (window.Vue) {
    window.tip = tip;
    Vue.use(install); // eslint-disable-line
}

tip.install = install;
export default tip;
