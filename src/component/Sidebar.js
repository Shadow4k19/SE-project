import SidebarData from "./SidebarData"
import items from "../data/sidebar.json"

export default function Sidebar(){
    return(
        <div className='sidebar'>
            { items.map((item,index) => <SidebarData key={index} item = {item}/>)}
        </div>
    )
}