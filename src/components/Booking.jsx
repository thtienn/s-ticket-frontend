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

const steps = ["Chọn vé", "Thông tin đăng ký", "Thanh toán", "Hoàn tất"]

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [eventFindById, setEvent] = useState([])
  const [selectedTickets, setSelectedTickets] = useState([])
  const [user, setUser] = useState({
    province: '',
    district: '',
    ward: '',
  })

  const methods = useForm({
    defaultValues: {
      name: 'a',
      mail: 'a',
      phone: 'a',
      location: {
        province: user.province,
        district: user.district,
        ward: user.ward,
        address: 'a',
      }
    }
  })

  const { event_id, show_id } = useParams()
  const event = eventFindById[0]
  const tickets = event?.shows?.find(show => show.show_id === Number(show_id))?.ticket_types || [];
  const fixedQuestions = event?.fixed_questions || []
  const dynamicQuestions = event?.dynamic_questions || []

  useEffect(() => {
    const fetchEventData = async () => {
      const eventData = await fetchEventById(event_id)
      setEvent(eventData)
    }
    fetchEventData()
    methods.setValue('user_id', 1)
    methods.setValue('event_id', event_id)
    methods.setValue('show_id', show_id)
  }, [])

  useEffect(() => {
    const initialSelectedTickets = tickets.map((ticket) => ({
      ticket_id: ticket.ticket_id,
      amount: 0,
      max: ticket.amount,
      price: ticket.price,
      name: ticket.name,
      description: ticket.description,
    }))
    setSelectedTickets(initialSelectedTickets)
  }, [tickets])

  useEffect(() => {
    dynamicQuestions?.forEach((dynamic, dynamicIndex) => {
      methods.setValue(`answers.${dynamicIndex}.question`, dynamic.question);
      if (dynamic.type === "text" || dynamic.type === "radio") {
        methods.setValue(`answers.${dynamicIndex}.answer`, ['']);
      } else if (dynamic.type === "select") {
        methods.setValue(
          `answers.${dynamicIndex}.answer`,
          dynamic.answer.map(() => '')
        );
      }
    });
  }, [dynamicQuestions]);

  useEffect(() => {
    methods.setValue(
      "tickets",
      selectedTickets.map(ticket => ({
        ticket_id: ticket.ticket_id,
        buy_amount: ticket.amount,
      }))
    );
  }, [selectedTickets]);

  const goToNextStep = async() => {
    if (currentStep === 0) {
      const totalTickets = selectedTickets.reduce(
        (sum, ticket) => sum + (ticket.amount || 0),
        0
      )
      if (totalTickets === 0) {
        methods.setError("formError", {
          type: "manual",
          message: "Vui lòng chọn vé để tiếp tục.",
        })
        return
      }
    }
    if (currentStep === 1) {
      const isValid = await methods.trigger()
      if (!isValid) {
        methods.setError("formError", {
          type: "manual",
          message: "Vui lòng điền đầy đủ thông tin trước khi tiếp tục.",
        })
        return
      }
    }
  
    methods.clearErrors("formError")
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2))
  }
  
  const goToPreviousStep = () => {
    methods.clearErrors("formError")
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
  }
  const handleBooking = (dataForm) => {
    const convertedData = {
      ...dataForm,
      event_id: parseInt(dataForm.event_id),
      show_id: parseInt(dataForm.show_id),
    }
    console.log(convertedData)
  }
  const Button = () => {
    const error = methods.formState.errors?.formError?.message
    return (
      <div>
        <p className="text-red-500 text-base text-center mb-3">{error}</p>
        <div className="flex justify-between text-[#FAFAFA]">
          <div>
            {currentStep > 0 && <div className='bg-[#b2bcc2] p-2 rounded-lg cursor-pointer hover:bg-slate-400' onClick={goToPreviousStep}>Quay lại</div>}
          </div>
          <div>
            {currentStep < 2 && <div className='bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400' onClick={goToNextStep}>Tiếp theo</div>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full font-sans text-start'>
      <div className='flex flex-col h-full'>
        <div className='flex flex-1 min-h-0 overflow-auto'>
          <SidebarStep currentStep={currentStep} steps={steps}/>
          <FormProvider {...methods}>
            <div className='w-[55%] min-w-[480px] p-4 bg-[#F3F3F3]'>
              <div className='flex flex-col gap-8 justify-between h-full overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
                {currentStep == 0 &&
                  <FirstStep
                    selectedTickets={selectedTickets}
                    setSelectedTickets={setSelectedTickets}
                  />
                }
                {currentStep == 1 &&
                  <SecondStep
                    user={user}
                    setUser={setUser}
                    fixedQuestions={fixedQuestions}
                    dynamicQuestions={dynamicQuestions}
                  />
                }
                {currentStep == 2 &&
                  <ThirdStep/>
                }
                <Button/>
              </div>
            </div>
            <OrderSummary currentStep={currentStep} selectedTickets={selectedTickets} event={event}/>
          </FormProvider>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
