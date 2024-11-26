'use client'

import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { motion } from "framer-motion"

interface Series {
  _id: string;
  title: string;
  description: string;
  poster: string;
}

export default function FeaturedCollection({ series }: { series: Series[] }) {
  return (
    <div className="relative w-full bg-gradient-to-r from-[#0f0f0f] via-purple-900/40 to-[#0f0f0f] px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            I'll Have What She's Having
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-6">
            Pour some wine, put on your comfiest PJs and laugh-cry your way through these loveable classics.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg">
            VIEW COLLECTION
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {series.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[2/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={item.poster}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg"
                  alt="HBO"
                  width={120}
                        height={40}
                  className="opacity-80"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

