import { motion } from 'framer-motion'

interface LoadingCardsProps {
  count: number
}

export default function LoadingCards({ count }: LoadingCardsProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
        >
          {/* Header skeleton */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            {/* Meaning */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>

            {/* LinkedIn Example */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-28 mb-2 animate-pulse"></div>
              <div className="bg-blue-50 border-l-4 border-blue-200 p-4 rounded-r-lg">
                <div className="space-y-2">
                  <div className="h-4 bg-blue-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-blue-100 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div>
              <div className="h-5 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="bg-gradient-to-r from-[#D84E89]/10 to-[#F3735D]/10 border border-[#D84E89]/20 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="h-4 bg-pink-100 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-pink-100 rounded w-4/5 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer skeleton */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-6 bg-green-100 rounded-full w-36 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}