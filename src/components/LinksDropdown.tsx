import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { AlignLeft } from 'lucide-react'
import { links } from '~/utils'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '~/store/hooks'

function LinksDropdown() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant={'outline'} size={'icon'}>
          <AlignLeft />
          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden'
        align='start'
        sideOffset={25}
      >
        {
          links.map((link, index) => {
            const restrictedRoutes =
              link.href === 'checkout' || link.href === 'orders';
            if (restrictedRoutes && !user) return null;
            return (
              <div key={index}>
                <DropdownMenuItem
                  key={link.label}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => {
                      return `capitalize w-full ${isActive ? 'text-primary' : ''}`
                    }}
                  > {link.label}</NavLink>
                </DropdownMenuItem>
              </div>

            )
          })
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown