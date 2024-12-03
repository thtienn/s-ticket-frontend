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
import { fetchDistricts, fetchProvinces, fetchWards } from '../controllers/provinceController'

const steps = ["Chọn vé", "Thông tin đăng ký", "Thanh toán", "Hoàn tất"]

function getShow(event, showId) {
  const cancel_request = event?.cancel_request
  const show = event?.shows?.find(show => show.show_id === Number(showId))
  const tickets = show?.ticket_types || []
  const start_time = show?.start_time || ''
  const start_date = show?.start_date || ''
  return { tickets, start_time, start_date, cancel_request }
}
export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0)
  const [event, setEvent] = useState(null)
  const [selectedTickets, setSelectedTickets] = useState([])
  const [user, setUser] = useState({
    province: '',
    district: '',
    ward: '',
  })

  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    wards: [],
  })

  const { event_id, show_id } = useParams()

  const methods = useForm({
    defaultValues: {
      user_id: 0,
      name: '',
      email: '',
      phone: '',
      location: {
        province: '',
        district: '',
        ward: '',
        address: '',
      }
    }
  })

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvincesData = async () => {
      const provincesData = await fetchProvinces()
      setLocations((prev) => ({
        ...prev,
        provinces: provincesData,
      }))
    }
    fetchProvincesData()
  }, [])

  // Lấy danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    if (user.province) {
      const fetchDistrictsData = async () => {
        const districtsData = await fetchDistricts(user.province)
        setLocations((prev) => ({
          ...prev,
          districts: districtsData,
        }))
      }
      fetchDistrictsData()
    }
  }, [user.province])

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (user.district) {
      const fetchWardsData = async () => {
        const wardsData = await fetchWards(user.district)
        setLocations((prev) => ({
          ...prev,
          wards: wardsData,
        }))
      }
      fetchWardsData()
    }
  }, [user.district])

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchUser()
      if(userData) {
        methods.setValue('name', userData.name)
        methods.setValue('email', userData.email)
        methods.setValue('phone', userData.phone)
        methods.setValue('user_id', userData.id)
        methods.setValue('location.province', userData.province || '')
        methods.setValue('location.district', userData.district || '')
        methods.setValue('location.ward', userData.ward || '')
        methods.setValue('location.address', userData.address || '')
        setUser((prevUser) => ({
          ...prevUser,
          province: userData.province || '',
          district: userData.district || '',
          ward: userData.ward || '',
        }));
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
  }, [])

  useEffect(() => {
    const { tickets, start_time, start_date, cancel_request } = getShow(event, show_id)
    const initialSelectedTickets = tickets.map((ticket) => ({
      ticket_id: ticket.ticket_id,
      amount: 0,
      max: ticket.amount,
      price: ticket.price,
      name: ticket.name,
      description: ticket.description,
    }))
    methods.setValue('start_time', start_time)
    methods.setValue('start_date', start_date)
    methods.setValue('cancel_request', cancel_request)
    setSelectedTickets(initialSelectedTickets)
  }, [event])

  useEffect(() => {
    const dynamicQuestions = event?.dynamic_questions || []
    dynamicQuestions.forEach((dynamic, dynamicIndex) => {
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
  }, [event]);

  useEffect(() => {
    methods.setValue(
      "tickets",
      selectedTickets.map(ticket => ({
        ticket_id: ticket.ticket_id,
        buy_amount: ticket.amount,
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
  const handleBooking = async (dataForm) => {
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
                    setUser={setUser}
                    locations={locations}
                    setLocations={setLocations}
                    fixedQuestions={event.fixed_questions}
                    dynamicQuestions={event.dynamic_questions}
                  />
                }
                {currentStep == 2 &&
                  <ThirdStep/>
                }
                <Button/>
              </div>
            </div>
            <OrderSummary currentStep={currentStep} selectedTickets={selectedTickets} event={event} handleBooking={handleBooking}/>
          </FormProvider>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
