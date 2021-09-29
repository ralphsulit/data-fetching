import React, {useState} from 'react';
import axios from 'axios';

function AddChannel(addChannelOption) {

    const [addChannelState, setAddChannelState] = useState({
        name: '',
        user_ids: []
    })

    const addChannel = () => {
        const channelName =prompt('Please enter a channel name: ');
        const headers = {
            'access-token': localStorage.getItem('access-token'),
            'client': localStorage.getItem('client'),
            'expiry': localStorage.getItem('expiry'),
            'uid': localStorage.getItem('uid'),
        }
        axios.post('http://206.189.91.54//api/v1/channels', 
        {
            'name': channelName,
            'user_ids': []
        },
        {headers}
        )
        .then(res => {
            console.log(res);
            console.log(res.data.data['name']);
        }).catch(err => {
            console.log(err);
        });
    } 


    const selectChannel = () => {} 

    return (
        <button onClick={addChannelOption ? addChannel : selectChannel}>
            AddChannel
        </button>
    )
}

export default AddChannel
