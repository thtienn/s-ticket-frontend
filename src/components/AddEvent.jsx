import { useState } from "react"
import Header from "./ui/shared/header"
import SidebarStep from "./ui/shared/sidebar-step"
import Footer from "./ui/shared/footer"
import FirstStep from "./ui/add-event/first-step"
import { FormProvider, useForm } from "react-hook-form"
import SecondStep from "./ui/add-event/second-step"
import ThirdStep from "./ui/add-event/third-step"
import { addEvent } from "../controllers/eventController"
import FourthStep from "./ui/add-event/fourth-step"

export default function AddEvent() {
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedLocation, setSelectedLocation] = useState({
      province: '',
      district: '',
      ward: '',
    })
    const [shows, setShows] = useState({
      show_counter: 0,
      show_current_id: 0,
      ticket_current_id: 0,
    })
    const methods = useForm({
      defaultValues: {
        approveStatus: 'pending',
        location: {
          province: '',
          district: '',
          ward: ''
        },
        fixed_questions: [
          {
            "optional": "true",
            "question": "name"
          },
          {
            "optional": "true",
            "question": "mail"
          },
          {
            "optional": "true",
            "question": "phone"
          },
          {
            "optional": "true",
            "question": "address"
          }
        ],
      }
    })
    const onSubmit = (data) => {
      console.log("Dữ liệu hợp lệ:", data);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3))
    };
    
    const onError = (errors) => {
      console.log("Các lỗi trong form:", errors);
    }
    
    const handleAddEvent = async (dataForm) => {
      try {
        const convertedData = {
          ...dataForm,
          fixed_questions: dataForm.fixed_questions.map(question => ({
            ...question,
            optional: question.optional === "true", // Chuyển thành boolean
          })),
          shows: dataForm.shows.map(show => ({
            ...show,
            ticket_types: show.ticket_types.map(ticket => ({
              ...ticket,
              price: parseFloat(ticket.price) || 0,
              quantity: parseInt(ticket.quantity) || 0, // Chuyển đổi tại đây
              amount: parseInt(ticket.amount) || 0,
            })),
          })),
        }
        const data = await addEvent(convertedData)
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    const goToNextStep = async() => {
      methods.handleSubmit(onSubmit, onError)();
    }
    const goToPreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
    }
    const Button = () => {
        return (
          <div>
            <div className="flex justify-between text-[#FAFAFA]">
              <div>
                {currentStep > 0 && <button className='bg-[#b2bcc2] p-2 rounded-lg' onClick={goToPreviousStep}>Quay lại</button>}
              </div>
              <div>
                {currentStep < 3 ? (
                  <button className='bg-[#219ce4] p-2 rounded-lg' onClick={goToNextStep}>Tiếp theo</button>
                ) : (
                  <button className='bg-[#219ce4] p-2 rounded-lg' onClick={methods.handleSubmit(handleAddEvent)}>Hoàn tất</button>
                )}
              </div>
            </div>
          </div>
        )
    }
    const debug = () => {
      const debuggg = methods.getValues()
      console.log(debuggg)
    }
    const steps = ["Thông tin sự kiện", "Thời gian & loại vé", "Thông tin đăng ký", "Thông tin thanh toán"]
    return (
        <div className='flex flex-col w-full font-sans'>
            <div className='flex flex-col h-screen'>
                <Header/>
                <div className='flex flex-1 min-h-0 overflow-auto'>
                <SidebarStep currentStep={currentStep} steps={steps}/>
                <FormProvider {...methods}>
                <div className='w-[80%] min-w-[480px] p-4 bg-[#F3F3F3]'>
                    <div className='flex flex-col gap-8 justify-between h-full overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
                    {currentStep == 0 &&
                      <FirstStep 
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                      />
                    }
                    {currentStep == 1 &&
                      <SecondStep
                        shows={shows}
                        setShows={setShows}
                      />
                    }
                    {currentStep == 2 &&
                      <ThirdStep />
                    }
                    {currentStep == 3 &&
                      <FourthStep />
                    }
                    <button className="text-black" onClick={debug}>debug</button>
                    <Button/>
                    </div>
                </div>
                </FormProvider>
                </div>
            </div>
            <Footer/>
        </div>
    )
}