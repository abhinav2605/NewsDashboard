import React from 'react'
import './category.css'

export default function Category({name, onClick})
{

    return(
        <>
            <div className='category' onClick={onClick}>
                {name}
            </div>
        </>
    )
}