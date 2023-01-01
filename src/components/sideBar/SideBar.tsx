import SideBarCSS from './sideBar.module.css';
import { useEffect } from 'react';
import axios from 'axios'

function SideBar() {
  // useEffect(() => {
  //   async function createBoard () {
  //     const test = await axios.post('http://localhost:3000/board', {
  //       boardName: 'Board legítima'
  //     }, {
  //       headers: {
  //         Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRvbmtleWtvbmciLCJlbWFpbCI6ImRvbmtleUBleGFtcGxlLmNvbSIsImlhdCI6MTY3MjUwODQ3MX0.GP3-t_4GnM33vQT2qFAUDqAcJc_ph5_U96yeKtkeSZw'
  //       },
  //     })
  //     console.log(test)
  //   }
  //   createBoard()
  // });

  return (
  <nav
    className={ SideBarCSS.bg }
  >
    
  </nav>
  );
}

export default SideBar;