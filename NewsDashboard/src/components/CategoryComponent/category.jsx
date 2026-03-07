import React from 'react'
import './category.css'

export default function Category({name, onClick, isSelected = false})
{

    return(
        <>
            <div className={`category ${isSelected ? 'selected' : ''}`} onClick={onClick}>
                {name}
            </div>
        </>
    )
}