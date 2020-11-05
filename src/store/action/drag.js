import { useDispatch } from "react-redux";

let startPos = {};
let content = '';
let box;
let reg = /\s+/g
function giveBox(ref) {
    box = ref;
    // console.dir(box);
}




function useDrag() {
    const dispatch = useDispatch();

    return function drag(ele) {
        ele.addEventListener('mousedown', function (e) {
            // console.dir(e.target);
            if (e.target.nodeName === 'DIV' || e.target.nodeName === 'SPAN') {
                // console.log('内容', content);
                content = e.target.innerText.trim();

                //记录最初的位置
                startPos.x = e.clientX;
                startPos.y = e.clientY;
                // console.log('按下了', startPos);

                document.addEventListener('mousemove', move)

                document.addEventListener('mouseup', function (e) {
                    console.log('抬起了');
                    console.dir(e.target);
                    //添加数据
                    if (e.target.date) {
                        if (e.target.innerText === '周 六' || e.target.innerText === '周 日') {
                            dispatch({
                                type: "ADD-TO-WEEKEND",
                                work: content,
                                date: e.target.date,
                            })
                        } else {
                            dispatch({
                                type: "ATT-TO-HALFDAY",
                                work: content,
                                date: e.target.date,
                                time: e.target.innerText.replace(reg, "")
                            })
                        }
                    }
                    //隐藏box
                    box.style.display = 'none';
                    //移除绑定的事件
                    document.removeEventListener('mousemove', move)
                }, {
                    once: true
                })
            }
        })
    }
}
function move(e) {
    // console.log('移动了');
    if (Math.abs(e.clientX - startPos.x) > 10) {
        //记录内容,给到box
        box.innerText = content;
        //当移动距离超过10的时候，显示box，并把它的位置改变
        box.style.display = 'block';
        box.style.left = (e.clientX + 5) + 'px'; //此行代码是关键！！
        box.style.top = e.clientY + 'px';
    }
    //拖拽的过程中，避免内容选中
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
}


export { useDrag, giveBox };