import React from 'react';

function Container(props){
    const {style=null,children} = props;
    return <div className="container" style={style}>
        {children}
    </div>
}

export default Container;