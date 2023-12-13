import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import UserPanel from '@/components/UserPanel/UserPanel'
import AuthProvider from './AuthProvider/AuthProvider'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EdgyAp',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Navbar 
          links = {[
            {link: '/', name: 'Home', key: 0},
            {link: '/chat', name: 'Chat', key: 1},
          ]}
          />
          <div className='main'>
            <div className='renderedPage'>
              {children} 
            </div>
            <div className='userPanelWrapper'>
              <UserPanel />
            </div>
          </div>
        </body>
      </AuthProvider>
      
    </html>
  )
}
