import React, { useEffect, useState } from 'react'
import SidebarStep from './ui/shared/sidebar-step'
import OrderSummary from './ui/booking/order-summary'
import Header from './ui/shared/header'
import Footer from './ui/shared/footer'
import { FormProvider, useForm } from 'react-hook-form'
import FirstStep from './ui/booking/first-step'
import SecondStep from './ui/booking/second-step'
import ThirdStep from './ui/booking/third-step'
import { useParams } from 'react-router-dom'
import { fetchEventById } from '../controllers/eventController'

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
  const steps = ["Chọn vé", "Thông tin đăng ký", "Thanh toán", "Hoàn tất"]
  const [currentStep, setCurrentStep] = useState(0)
  const [payment, setPayment] = useState({ method: 0, option: 0 })
  const [selectedTickets, setSelectedTickets] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
  })
  const methods = useForm({
    defaultValues: user
  })

  useEffect(() => {
    const initialSelectedTickets = tickets.map((ticket) => ({
      ticket_id: ticket.ticket_id,
      amount: 0,
      max: ticket.amount,
    }));
    setSelectedTickets(initialSelectedTickets);
  }, [tickets]);

  const goToNextStep = async() => {
    if (currentStep === 0) {
      const totalTickets = selectedTickets.reduce(
        (sum, ticket) => sum + (ticket.amount || 0),
        0
      )
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
  const debug = () => {
    const debuggg = methods.getValues()
    console.log(debuggg)
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
          <SidebarStep currentStep={currentStep} steps={steps}/>
          <FormProvider {...methods}>
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
                  <SecondStep
                    user={user}
                    setUser={setUser}
                  />
                }
                {currentStep == 2 &&
                  <ThirdStep
                    payment={payment}
                    setPayment={setPayment}
                  />
                }
                <button className="text-black" onClick={debug}>debug</button>
                <Button/>
              </div>
            </div>
            <OrderSummary currentStep={currentStep} selectedTickets={selectedTickets} tickets={tickets} user={user} payment={payment} event={event}/>
          </FormProvider>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
