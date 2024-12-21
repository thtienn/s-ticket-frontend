import React, { useEffect, useState } from 'react'
import SidebarStep from './ui/shared/sidebar-step'
import OrderSummary from './ui/booking/order-summary'
import Footer from './ui/shared/footer'
import { FormProvider, useForm } from 'react-hook-form'
import FirstStep from './ui/booking/first-step'
import SecondStep from './ui/booking/second-step'
import ThirdStep from './ui/booking/third-step'
import { useParams } from 'react-router-dom'
import { fetchEventById } from '../controllers/eventController'
import { fetchUser } from '../controllers/userController'
import FourthStep from './ui/booking/fourth-step'
import { useNavigate } from 'react-router-dom';
import { createTransaction } from '../controllers/transactionController'

const steps = ["Chọn vé", "Chọn phương thức", "Thanh toán"]

function getShow(event, showId) {
  const cancel_request = event?.cancel_request
  const event_title = event?.title
  const show = event?.miniEvents?.find(show => show.id === Number(showId))
  const tickets = show?.ticketRanks || []
  const start_time = show?.startTime || ''
  const end_time = show?.endTime || ''
  const show_image = show?.image || ''
  return { tickets, start_time, end_time, cancel_request, event_title, show_image }
}

export default function Booking() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0)
  const [event, setEvent] = useState(null)
  const [showImage, setShowImage] = useState('')
  const [selectedTickets, setSelectedTickets] = useState([])
  const [session, setSession] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60) // 5 phút
  const [transactionId, setTransactionId] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { event_id, show_id } = useParams()

  const methods = useForm({
    defaultValues: {
      user_id: 0,
      name: '',
      email: '',
      phoneNumber: '',
    }
  })


  useEffect(() => {
    const fetchUserData = async () => {
      const { userData, sessionStatus } = await fetchUser()
      if (sessionStatus) {
        if (userData) {
          methods.setValue('name', userData.name)
          methods.setValue('email', userData.email)
          methods.setValue('phoneNumber', userData.phoneNumber)
          methods.setValue('user_id', userData.id)
        }
        setSession(true)
      }
    }
    const fetchEventData = async () => {
      const eventData = await fetchEventById(event_id)
      setEvent(eventData)
    }
    fetchUserData()
    fetchEventData()
    methods.setValue('event_id', event_id)
    methods.setValue('show_id', show_id)
    methods.setValue('isCancelled', false)
  }, [])

  useEffect(() => {
    if (currentStep === 2) {
      setTimeLeft(60 * 10);
    }
  }, [currentStep]);

  useEffect(() => {
    let timer;

    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            navigate('/'); // Điều hướng về trang chủ khi hết thời gian
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Dọn dẹp timer khi component unmount
  }, [timeLeft, navigate]);
  useEffect(() => {
    const { tickets, start_time, end_time, cancel_request, event_title, show_image } = getShow(event, show_id)
    const initialSelectedTickets = tickets.map((ticket) => ({
      ticket_id: ticket.id,
      amount: 0,
      max: ticket.numberLimit,
      price: ticket.price,
      name: ticket.rankName,
      description: ticket.description,
      soldNumber: ticket.soldNumber
    }))
    methods.setValue('event_title', event_title)
    methods.setValue('start_time', start_time)
    methods.setValue('end_time', end_time)
    methods.setValue('cancel_request', cancel_request)
    setSelectedTickets(initialSelectedTickets)
    setShowImage(show_image)
  }, [event])


  useEffect(() => {
    methods.setValue(
      "tickets",
      selectedTickets.map(tickets => ({
        ticket_id: tickets.ticket_id,
        ticket_max: tickets.max,
        buy_amount: tickets.amount,
        price: tickets.price
      }))
    );
  }, [selectedTickets]);

  const goToNextStep = async () => {
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
      const paymentMethod = methods.getValues('payment_method');
      if (!paymentMethod) {
        methods.setError("payment_method", {
          type: "manual",
          message: "Vui lòng chọn hình thức thanh toán",
        });
        return;
      }
      const formData = methods.getValues();
      try {
        setIsSubmitting(true); // Bắt đầu quá trình gửi
        const transactionId = await createTransaction(formData);
        setTransactionId(transactionId);
        console.log('Transaction Created:', transactionId);
      } catch (error) {
        console.error('Transaction creation failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
    methods.clearErrors("formError")
    window.scrollTo(0, 0);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2))
  }


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  const goToPreviousStep = () => {
    methods.clearErrors("formError")
    window.scrollTo(0, 0);
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
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
            {currentStep < 2 && <div className='bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400' onClick={!isSubmitting ? goToNextStep : null} disabled={isSubmitting} >Tiếp theo</div>}
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return <div className="text-black">User not found</div>
  }


  return (
    <div className='flex flex-col w-full font-sans text-start'>
      <div className='flex flex-col h-full'>
        <div className='flex flex-1 min-h-0 overflow-auto'>
          <SidebarStep currentStep={currentStep} steps={steps} />
          <FormProvider {...methods}>
            <div className='w-[55%] min-w-[480px] p-4 bg-[#F3F3F3]'>
              <div className='flex flex-col gap-8 justify-between h-full min-h-[500px] overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
                <div className="text-center mt-4">
                  <span
                    className={`block p-2 text-xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-black'}`}
                    style={{ height: '40px' }}>
                    Thời gian còn lại: {formatTime(timeLeft)}
                  </span>
                </div>
                {currentStep == 0 &&
                  <>

                    <FirstStep
                      selectedTickets={selectedTickets}
                      setSelectedTickets={setSelectedTickets}
                      showImage={showImage}
                    />
                  </>
                }
                {currentStep == 1 &&
                  <ThirdStep />
                }
                {currentStep == 2 &&
                  <FourthStep transactionId={transactionId} />
                }
                <Button />
              </div>
            </div>
            <OrderSummary currentStep={currentStep} selectedTickets={selectedTickets} event={event} onClick={goToNextStep} />
          </FormProvider>
        </div>
      </div>
      <Footer />
    </div>
  )
}
