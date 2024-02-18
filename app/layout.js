import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar/Navbar'
import connect from '@/utils/mongo'
import UserPanel from '@/components/UserPanel/UserPanel'
import AuthProvider from '@/AuthProvider/AuthProvider'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

await connect();

export const metadata = {
  title: '',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className} id='body'>
          <Navbar />
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
