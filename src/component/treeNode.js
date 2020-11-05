import React, { useRef } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';

function TreeNode(props) {
    const { data } = props;
    const dispatch = useDispatch();
    const InputRef = useRef();
    const toDel = () => {
        dispatch({
            type: 'TO-DEL-TREE',
            key: data.key
        })
    }
    
    
    
    return <div className='tree'>
        <span>{data.title}</span>
        <span className='treeBtn'>
            <Button
                shape={'circle'}
                size={'small'}
                onClick={toDel}
                icon={<CloseOutlined />}
            /><span> </span>
            <Button
                shape={'circle'}
                size={'small'}
                icon={<PlusOutlined />}
                onClick={() => {
                    InputRef.current.input.style.display = 'block'
                    InputRef.current.input.focus();
                }}
            />
        </span>
        <Input
            ref={InputRef}
            style={{ display: 'none' }}
            onBlur={() => {
                InputRef.current.input.style.display = 'none'
            }}
            onPressEnter={() => {
                if (InputRef.current.input.value !== '') {
                    dispatch({
                        type: 'ADD-WORK-TO-WHOLE',
                        key: data.key,
                        work: InputRef.current.input.value
                    })
                    InputRef.current.state.value = '';
                }
            }}
        />
    </div>
}

export default TreeNode;