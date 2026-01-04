import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className='flex fex-row gap-4 place-content-evenly'>
        <NavLink
          to="/"
        >
            Home
        </NavLink>
        <NavLink
          to="/paste"
        >
             Pastes
        </NavLink>

</div>

  )
}
