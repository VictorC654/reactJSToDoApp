import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Another()
{
    const [isFocused, setIsFocusedState] = useState(false);
    function changeFocusStatus()
    {
        if(isFocused === false)
        {
            setIsFocusedState(true);
        }
        else
        {
            setIsFocusedState(false);
        }
    }
        return (
            <div style={{background:'transparent',top:'3em',display:'flex',
                flexDirection:'row', border:isFocused ? '2px solid lightblue' : '',
                borderTopRightRadius:'2em',borderBottomRightRadius:'2em',position:'absolute'}} >
                <button style={{backgroundColor:'white',position:'absolute',zIndex:'0',padding:'1em 2em 1em 2em ',border:'2px solid lightblue',borderTopLeftRadius:'2em', marginTop:'-2px',borderBottomLeftRadius:'2em',outline:'none',color:'black',marginLeft:'-3.4em'}} hidden={!isFocused}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
                <input style={{borderTopLeftRadius:isFocused ? '' : '2em',borderBottomLeftRadius:isFocused ? '' : '2em',zIndex:'1',outline:'none', padding:'1em 1em 1em 2em',border:'none',textDecoration:'none',width:'30em' }}
                       onFocus = { changeFocusStatus }
                       onBlur={ changeFocusStatus }/>
                <button
                    style={{zIndex:'2',padding:'1em 2em 1em 2em ',borderTopRightRadius:'2em', borderBottomRightRadius:'2em',borderLeft:isFocused ? '2px solid lightblue' : '',borderRight:'none',borderBottom:'none',borderTop:'none',outline:"none",background:'white',color:'black',fontWeight:'bold',cursor:'pointer',marginLeft:'-2em'}}>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>
        )
}
