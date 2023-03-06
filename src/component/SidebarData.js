import { useState } from "react"

export default function SidebarData({item}){
    const [open, setOpen] = useState(false)

    
    if(item.childrens){
        return (
            <div className={open ? "sidebar-data open" : "sidebar-data"}>
                <div className="sidebar-title">
                    <span>
                        { item.icon && <i className={item.icon}></i> }
                        {item.title}    
                    </span> 
                    <i className="bi-arrow-down-circle" onClick={() => setOpen(!open)}></i>
                </div>
                <div className="sidebar-content">
                    { item.childrens.map((childrens, index) => <SidebarData key={index} item={childrens} />) }
                </div>
            </div>
        )
    }else{
        return (
            <a href={item.path || "#"} className="sidebar-data plain">
                { item.icon && <i className={item.icon}></i> }
                {item.title}
            </a>
        )
    }
}