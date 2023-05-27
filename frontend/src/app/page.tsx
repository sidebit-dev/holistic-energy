import Image from 'next/image'

export default function Home() {
  return (
    <main className={`
    flex justify-center items-center h-screen
    bg-gradient-to-r from-green-500 to-blue-500`}>
      <h1>Home</h1>
    </main>
  )
}
