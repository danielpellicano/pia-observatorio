'use client'

import Image from "next/image"

export default function Footer() {

  return (
    <footer className="w-full bg-[#154388] ">
      <div className="container py-6 flex justify-center">
            <Image src="/logo-branca.png" width={206} height={82} alt="Logo" />
      </div>
      <div className="container py-6 flex justify-center text-white">
            <p>Teste para vaga de Front-End feito por Daniel Curado Pellicano</p>
      </div>
    </footer>



  )
}
