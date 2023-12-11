import React from 'react';
import './Announcement.css';
import { annoucementSvg } from '../../Utils/Svgs';

const Announcement = () => {
    return (
        <div className='announcement_div'>
            <button> {annoucementSvg} Announcement </button>
            <p> Users are advised to pay attention to read and verify critical information.</p>
        </div>
    )
}
export default Announcement;