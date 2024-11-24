import React, { useEffect, useState } from 'react'
import SidebarStep from './ui/booking/SidebarStep'
import OrderSummary from './ui/booking/OrderSummary'
import Header from './ui/shared/header'
import Footer from './ui/shared/footer'
import { useForm } from 'react-hook-form'
import FirstStep from './ui/booking/FirstStep'
import SecondStep from './ui/booking/SecondStep'
import ThirdStep from './ui/booking/ThirdStep'
import { useLocation, useParams } from 'react-router-dom'
import { fetchEventById } from '../controllers/eventController'

// const tickets = [
//   { id: 1, name: 'VÉ RỐP RẺNG', price: 490000, description: 'Hạng vé ĐỨNG.', amount: 0 },
//   { id: 2, name: 'VÉ THÔNG THẢ', price: 1120000, description: 'Hạng vé ngồi.', amount: 10 },
//   { id: 3, name: 'VÉ SIÊU VIP', price: 5000000, description: 'Hạng vé VIP.', amount: 2 },
// ]
// const event = {
//   id: 1,
//   title: 'YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024 YÊU HÒA BÌNH 2024',
//   category: 'Âm nhạc',
//   image: '/assets/images/yhb.png',
//   date: '5 tháng 10, 2024',
//   price: 599000,
// }
export default function Booking() {
  const { event_id, show_id } = useParams()
  const [eventFindById, setEvent] = useState([])
  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await fetchEventById(event_id)
      setEvent(eventData)
    }
    fetchEventData()
  }, [])
  const event = eventFindById[0]
  const tickets = event?.shows?.find(show => show.show_id === Number(show_id))?.ticket_types || [];

  // const [tickets, setTickets] = useState([])
  // useEffect(() => {
  //   if (event && showId !== undefined) {
  //       setTickets(event.shows[showId]?.tickets || []);
  //   }
  // }, [event, showId]);
  const [currentStep, setCurrentStep] = useState(0)
  const [payment, setPayment] = useState({ method: 0, option: 0 })
  const [selectedTickets, setSelectedTickets] = useState({})
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    name: 'Hồ Tường Anh',
    email: 'khoi@gmail.com',
    phone: '+84281808888',
    city: '',
    district: '',
    ward: '',
    address: '',
  })
  const { register, handleSubmit, getValues, setValue, trigger } = useForm({
    defaultValues: user
  })

  const goToNextStep = async() => {
    if (currentStep === 0) {
      const totalTickets = Object.values(selectedTickets).reduce((sum, count) => sum + count, 0)
      if (totalTickets === 0) {
        setError('Vui lòng chọn vé để tiếp tục.')
        return
      }
    }
  
    if (currentStep === 1) {
      const isValid = await trigger()
      if (!isValid) {
        setError('Vui lòng điền đầy đủ thông tin trước khi tiếp tục.')
        return
      }
    }
  
    setError('')
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2))
  }
  
  const goToPreviousStep = () => {
    setError('')
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }

  const Button = () => {
    return (
      <div>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        <div className="flex justify-between text-[#FAFAFA]">
          <div>
            {currentStep > 0 && <button className='bg-[#b2bcc2] p-2 rounded-lg' onClick={goToPreviousStep}>Quay lại</button>}
          </div>
          <div>
            {currentStep < 2 && <button className='bg-[#219ce4] p-2 rounded-lg' onClick={goToNextStep}>Tiếp theo</button>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full font-sans'>
      <div className='flex flex-col h-screen'>
        <Header/>
        <div className='flex flex-1 min-h-0 overflow-auto'>
          <SidebarStep currentStep={currentStep}/>
          <div className='w-[55%] min-w-[480px] p-4 bg-[#F3F3F3]'>
            <div className='flex flex-col gap-8 justify-between h-full overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
              {currentStep == 0 &&
                <FirstStep
                  selectedTickets={selectedTickets}
                  setSelectedTickets={setSelectedTickets}
                  tickets={tickets}
                />
              }
              {currentStep == 1 &&
                <SecondStep user={user}
                  setUser={setUser}
                  register={register}
                  handleSubmit={handleSubmit}
                  getValues={getValues}
                  setValue={setValue}
                />
              }
              {currentStep == 2 &&
                <ThirdStep
                  payment={payment}
                  setPayment={setPayment}
                />
              }
              <Button/>
            </div>
          </div>
          <OrderSummary currentStep={currentStep} selectedTickets={selectedTickets} tickets={tickets} user={user} payment={payment} event={event}/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
