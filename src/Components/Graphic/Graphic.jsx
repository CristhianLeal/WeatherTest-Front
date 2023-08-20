import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import './graphic.css'
import { useState, useEffect } from 'react'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Graphic = (data) => {
  const [scaleMin, setScaleMin] = useState(0)
  const [scaleMax, setScaleMax] = useState(0)
  const date = data?.data?.map(item => item.date)
  let minPrice = Number.POSITIVE_INFINITY
  let maxPrice = Number.NEGATIVE_INFINITY
  const price = data?.data?.map(item => {
    const parsedPrice = parseFloat(item.price)
    minPrice = Math.min(minPrice, parsedPrice)
    maxPrice = Math.max(maxPrice, parsedPrice)
    return parsedPrice
  })
  const midata = {
    labels: date,
    datasets: [
      {
        label: 'precio',
        data: price,
        tension: 0.5,
        borderColor: 'rgb(255, 99, 132)',
        pointRadius: 5,
        pointBorderColor: 'rgba(255, 99, 132)',
        pointBackgroundColor: 'rgba(255, 99, 132)'
      }
    ]
  }
  const scaleInc = () => {
    if (scaleMin < scaleMax) {
      if (scaleMax - 25 <= scaleMin + 25) {
        setScaleMin(scaleMin + (scaleMax - scaleMin) / 2 - 1)
        setScaleMax(scaleMax - (scaleMax - scaleMin) / 2 + 1)
      } else {
        setScaleMin(scaleMin + 25)
        setScaleMax(scaleMax - 25)
      }
    }
  }
  const scaleDec = () => {
    if (scaleMax > scaleMin) {
      setScaleMin(scaleMin - 50)
      setScaleMax(scaleMax + 50)
    }
  }
  const foco = () => {
    setScaleMin(minPrice)
    setScaleMax(maxPrice)
  }
  useEffect(() => {
    setScaleMin(minPrice)
    setScaleMax(maxPrice)
  }, [data])
  useEffect(() => {
  }, [scaleMin, scaleMax])
  const misoptions = {
    scales: {
      y: {
        min: scaleMin,
        max: scaleMax,
        ticks: {
          color: 'rgb(0, 0, 0)'
        }
      },
      x: {
        ticks: {
          color: 'rgb(0, 0, 0)'
        }
      }
    }
  }
  return (
    <div className='d-flex flex-column flex-md-row justify-content-center align-items-center'>
      <Line data={midata} options={misoptions} className='w-100 h-auto'/>
      <div className='d-flex flex-md-column flex-row gap-4 mt-md-0 mt-4'>
      <button onClick={scaleInc}>+</button>
      <button onClick={scaleDec}>-</button>
      <button onClick={foco}>Foco</button>
      </div>
    </div>
  )
}

export default Graphic
