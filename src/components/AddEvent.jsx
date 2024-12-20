import { useState, useEffect } from "react"
import SidebarStep from "./ui/shared/sidebar-step"
import Footer from "./ui/shared/footer"
import FirstStep from "./ui/add-event/first-step"
import { FormProvider, useForm } from "react-hook-form"
import SecondStep from "./ui/add-event/second-step"
import ThirdStep from "./ui/add-event/third-step"
import { addEvent, addImage } from "../controllers/eventController"
import FourthStep from "./ui/add-event/fourth-step"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { fetchUser } from "../controllers/userController"
import { toast } from "react-toastify"

// const url_storage = "https://vepooluprzkesyzrzzjx.supabase.co/storage/v1/object/public/test/"
const url_storage = "https://vepooluprzkesyzrzzjx.supabase.co/storage/v1/object/public/test/"

export default function AddEvent() {
    const [currentStep, setCurrentStep] = useState(0)
    const [session, setSession] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
      province: '',
      district: '',
      ward: '',
    })
    const [miniEvents, setMiniEvents] = useState({
      show_counter: 0,
      show_current_id: 0,
      ticket_current_id: 0,
    })
    const navigate = useNavigate()
    const methods = useForm({
      defaultValues: {
        status: 'PENDING',
        isOnAd: "False",
        startTime: "2024-12-20T11:30:00Z",
        endTime: "2024-12-20T12:30:00Z",
      }
    })

  const [bannerPreview, setBannerPreview] = useState(null);
  const [logoPreview, setlogoPreview] = useState(null);
  const [miniEventsPreview, setMiniEventsPreview] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
        const { userData, sessionStatus } = await fetchUser()
        if(sessionStatus) {
            methods.setValue('organizationId', userData?.id)
            setSession(true)
        }
    }
    fetchUserData()
  }, [])

  const handleEventPreviewChange = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      const id = uuidv4()
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = { file, id, url: reader.result }
        if (type === "banner") {
          setBannerPreview(fileData)
          methods.setValue('image', id)
        }
        if (type === "logo") {
          setlogoPreview(fileData)
          methods.setValue('organizerImage', id)
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleMiniEventsPreviewChange = (event, index) => {
    const file = event.target.files?.[0]
    if (file) {
      const id = uuidv4()
      const reader = new FileReader()
      reader.onload = () => {
        const fileData = { file, id, url: reader.result }
        setMiniEventsPreview((prev) => {
          const updated = [...prev]
          updated[index] = fileData
          return updated
        })
        methods.setValue(`miniEvents.${index}.image`, id)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAllImages = async (id_folder) => {
    try {
      console.log("bannerPreview?.file")
      if (bannerPreview?.file) {
        await addImage(bannerPreview.file, id_folder, bannerPreview.id);
      }
      if (logoPreview?.file) {
        await addImage(logoPreview.file, id_folder, logoPreview.id);
      }
      for (let i = 0; i < miniEventsPreview.length; i++) {
        const preview = miniEventsPreview[i];
        if (preview?.file) {
          await addImage(preview.file, id_folder, preview.id);
        }
      }
  
      console.log("All images uploaded successfully");
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  }

    const onSubmit = (data) => {
      window.scrollTo(0, 0);
      console.log("Dữ liệu hợp lệ:", data);
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3))
    };
    
    const onError = (errors) => {
      console.log("Các lỗi trong form:", errors);
    }
    
    const handleAddEvent = async (dataForm) => {
      setIsLoading(true);
      let convertedData = null; // Define convertedData in the outer scope
    
      try {
        const id_folder = uuidv4();
        await uploadAllImages(id_folder);
        // Assign the converted data here
        convertedData = {
          ...dataForm,
          image: `${url_storage}${id_folder}/${dataForm.image}`,
          organizerImage: `${url_storage}${id_folder}/${dataForm.organizerImage}`,
          bankAccountName: dataForm.bankAccountName,
          bankAccountNumber: dataForm.bankAccountNumber,
          bankBranch: dataForm.bankBranch,
          bankName: dataForm.bankName,
          miniEvents: dataForm.miniEvents.map(event => ({
            ...event,
            description: event.description,
            image: `${url_storage}${id_folder}/${event.image}`,
            startTime: event.startTime || '',
            endTime: event.endTime || '',
            ticketRanks: event.ticketRanks.map(ticket => ({
              ...ticket,
              rankName: ticket.rankName,
              description: ticket.description,
              price: parseFloat(ticket.price) || 0,
              numberLimit: parseInt(ticket.numberLimit) || 0,
            })),
          })),
        };
        console.log("convertedData: ", convertedData);

        // Add event to backend
        await addEvent(convertedData);
    
        // Navigate on success
        navigate("/event");
        toast.info('Vui lòng chờ quản trị viên duyệt sự kiện!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error("Payload being sent to Supabase:", convertedData);
        console.error(`Error: ${error.message}`);
        toast.error('Lỗi: Không thể thêm sự kiện', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    const goToNextStep = async() => {
      methods.handleSubmit(onSubmit, onError)();
    }
    const goToPreviousStep = () => {
      window.scrollTo(0, 0);
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 0))
    }
    const Button = () => {
        return (
          <div>
            <div className="flex justify-between text-[#FAFAFA]">
              <div>
                {currentStep > 0 && <div className='text-center bg-[#b2bcc2] p-2 rounded-lg cursor-pointer hover:bg-slate-400 min-w-20' onClick={goToPreviousStep}>Quay lại</div>}
              </div>
              <div>
                {currentStep < 3 ? (
                  <div className='text-center bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400 min-w-20' onClick={goToNextStep}>Tiếp theo</div>
                ) : (
                  <div
                    className='text-center bg-[#219ce4] p-2 rounded-lg cursor-pointer hover:bg-sky-400 min-w-20'
                    onClick={!isLoading ? methods.handleSubmit(handleAddEvent) : undefined}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white inline"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Hoàn tất"
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
    }

    if(!session) {
      return <div className="text-black">User not found</div>
    }
    
    const steps = ["Thông tin sự kiện", "Thời gian & loại vé", "Thông tin thanh toán"]
    return (
        <div className='flex flex-col w-full font-sans text-start'>
            <div className='flex flex-col h-full'>
                <div className='flex flex-1 min-h-0 overflow-auto'>
                <SidebarStep currentStep={currentStep} steps={steps}/>
                <FormProvider {...methods}>
                <div className='w-[80%] min-w-[480px] p-4 bg-[#F3F3F3]'>
                    <div className='flex flex-col gap-8 justify-between h-full min-h-[500px] overflow-y-auto bg-[#FAFAFA] rounded-2xl p-5'>
                    {currentStep == 0 &&
                      <FirstStep 
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        handleEventPreviewChange={handleEventPreviewChange}
                        bannerPreview={bannerPreview}
                        logoPreview={logoPreview}
                      />
                    }
                    {currentStep == 1 &&
                      <SecondStep
                        miniEvents={miniEvents}
                        setMiniEvents={setMiniEvents}
                        miniEventsPreview={miniEventsPreview}
                        setMiniEventsPreview={setMiniEventsPreview}
                        handleMiniEventsPreviewChange={handleMiniEventsPreviewChange}
                      />
                    }
                    {/* {currentStep == 2 &&
                      <ThirdStep />
                    } */}
                    {currentStep == 2 &&
                      <FourthStep />
                    }
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