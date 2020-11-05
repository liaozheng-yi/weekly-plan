import React, { useRef, useState, useEffect } from 'react';
import { Tree } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dataToTree, doneToKeys, defaultExpandParent, useDrag } from '../../store/action/action.index.js';
import TreeNode from '../../component/treeNode.js';

function WholeWeekContent() {
    const { wholeWeek } = useSelector(store => store.data);
    // console.log('输出的wholeWeek',wholeWeek);
    const dispatch = useDispatch();
    const TreeRef = useRef();
    const drag = useDrag();

    let treeData = dataToTree(wholeWeek)
    // console.log(treeData);

    let checkedKeys = doneToKeys(wholeWeek)
    const onCheck = (checkedKeys) => {
        dispatch({
            type: 'KEYS-TO-DONE',
            keys: checkedKeys
        })
    };

    const [expandedKeys, setExpandedKeys] = useState(defaultExpandParent(wholeWeek));
    const onExpand = (expandedKeys) => {
        setExpandedKeys(expandedKeys);
    };

    

    useEffect(() => {
        drag(TreeRef.current)
    }, [])

    return <div ref={TreeRef}>
        <Tree
            checkable={true} //节点前添加 Checkbox 复选框
            onExpand={onExpand} //展开/收起节点时触发 function(expandedKeys, {expanded: bool, node})
            expandedKeys={expandedKeys}
            onCheck={onCheck} //点击复选框触发 function(checkedKeys, e:{checked: bool, checkedNodes, node, event, halfCheckedKeys})
            checkedKeys={checkedKeys}
            titleRender={nodedata => <TreeNode data={nodedata} />}
            treeData={treeData}
        />
    </div>
}

export default WholeWeekContent;