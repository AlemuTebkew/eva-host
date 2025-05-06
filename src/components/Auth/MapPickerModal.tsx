'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

interface MapPickerModalProps {
  open: boolean
  onClose: () => void
  onSelect: (coords: { lat: number; lng: number }) => void
}

export const  MapPickerModal: React.FC<MapPickerModalProps> = ({ open, onClose, onSelect }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>Select location on the map</DialogHeader>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          {/* Replace this with actual map logic (e.g., Leaflet or Google Maps) */}
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={() => {
              onSelect({ lat: 9.03, lng: 38.74 })
              onClose()
            }}
          >
            Simulate Pin on Map
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
