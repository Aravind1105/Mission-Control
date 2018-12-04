// React Template Config File
//-------------------------------

// You can customise the theme with the help of this file

// Change menu background from here, you can place new image also and use it.
import sidebarBGImage from "./assets/img/sidebar-bg/01.jpg";

//Template config options
const templateConfig = {
   sidebar: {      
      size: 'sidebar-md', // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
      backgroundColor: "purple-bliss", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'
      backgroundImage: true, // Options: true, false | Set true to show background image
      backgroundImageURL: "https://static.wixstatic.com/media/f398d0_d3ea1b0e39c54a9b86c91b54d9bb4c3c~mv2.png/v1/fill/w_338,h_785,al_c,q_80,usm_0.66_1.00_0.01/f398d0_d3ea1b0e39c54a9b86c91b54d9bb4c3c~mv2.webp" // Change image from sidebarBGImage import
   }
};

export default templateConfig;
