import React, { useEffect, useState } from "react"
import { fetchProvinces, fetchDistricts, fetchWards } from "../../../controllers/provinceController"
import { useFormContext } from "react-hook-form"

const SecondStep = ({ user, setUser, fixedQuestions, dynamicQuestions }) => {
  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    wards: [],
  })
  const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useFormContext()

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

  const isFixedQuestionOptional = (questionName) => {
    return fixedQuestions.some((q) => q.question === questionName && q.optional === false)
  }
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <div className='text-[#1B1B1B] text-xl font-extrabold'>Thông tin đăng ký</div>
        <div className='text-[#AEAEAE] text-base font-normal'>Cung cấp cho ban tổ chức một vài thông tin cơ bản về bạn!</div>
      </div>
      <div className="flex flex-col gap-4 text-[#1B1B1B] text-sm">
        {isFixedQuestionOptional("name") && (
          <div>
            <div className='font-semibold mb-2'>Họ và tên</div>
            <input
              className='w-full p-2 border border-[#1B1B1B] rounded-lg'
              {...register('name', { required: 'Họ và tên là bắt buộc' })}
              type="text"
            />
          </div>
        )}
        <div className="flex gap-6">
          {isFixedQuestionOptional("mail") && (
            <div className='flex-1'>
              <div className='font-semibold mb-2'>Email</div>
              <input
                className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                {...register('mail', {required: 'Email là bắt buộc'})}
                type="email"
              />
            </div>
          )}
          {isFixedQuestionOptional("phone") && (
            <div className='flex-1'>
              <div className='font-semibold mb-2'>Điện thoại</div>
              <input
                className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                {...register('phone', {required: 'Số điện thoại là bắt buộc'})}
                type="text"
              />
            </div>
          )}
        </div>
        {isFixedQuestionOptional("name") && (
          <>
            <div className="flex gap-6">
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Tỉnh/thành</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.provinces.length === 0}
                  {...register('location.province', {
                    required: 'Tỉnh/Thành là bắt buộc',
                    onChange: (e) => {
                      const selectedProvince = locations.provinces.find(
                        (province) => province.name === e.target.value
                      )
                      setValue('location.district', '')
                      setValue('location.ward', '')
                      setLocations(prev => ({ ...prev, wards: [] }))
                      setUser(prev => ({ ...prev, province: selectedProvince.code }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.provinces.map((province) => (
                    <option key={province.code} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Quận/huyện</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.districts.length === 0}
                  {...register('location.district', {
                    required: 'Quận/Huyện là bắt buộc',
                    onChange: (e) => {
                      const selectedDistrict = locations.districts.find(
                        (district) => district.name === e.target.value
                      )
                      setValue('location.ward', '')
                      setUser(prev => ({ ...prev, district: selectedDistrict.code }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.districts.map((district) => (
                    <option key={district.code} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Phường/xã</div>
                <select
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  disabled={locations.wards.length === 0}
                  {...register('location.ward', {
                    required: 'Phường/Xã là bắt buộc',
                    onChange: (e) => {
                      const selectedWard = locations.wards.find(
                      (ward) => ward.name === e.target.value
                      )
                      setUser(prev => ({ ...prev, ward: selectedWard.code }))
                    },
                  })}
                >
                  <option value="" disabled></option>
                  {locations.wards.map((ward) => (
                    <option key={ward.code} value={ward.name}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex-1'>
                <div className='font-semibold mb-2'>Địa chỉ</div>
                <input
                  className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                  {...register('location.address', {required: 'Địa chỉ là bắt buộc'})}
                  type="text"
                />
              </div>
            </div>
          </>
        )}
        {dynamicQuestions?.map((dynamic, dynamicIndex) => {
          return (
            <div key={dynamicIndex}>
              <ManageAnswers dynamic={dynamic} dynamicIndex={dynamicIndex} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ManageAnswers = ({ dynamic, dynamicIndex }) => {
  const { register, setValue, getValues } = useFormContext()
  const handleCheckboxChange = (answer, checked) => {
    const currentAnswers = getValues(`answers.${dynamicIndex}.answer`) || [];
    if (checked) {
      // Add to the answer array
      setValue(`answers.${dynamicIndex}.answer`, [...currentAnswers, answer]);
    } else {
      // Remove from the answer array
      setValue(
        `answers.${dynamicIndex}.answer`, currentAnswers.filter((item) => item !== answer)
      )
    }
  };
  return (
    <>
      {dynamic.type === "text" ? (
        <div>
          <div className='font-semibold mb-2'>{dynamic.question}</div>
          <input
            className='w-full p-2 border border-[#1B1B1B] rounded-lg'
            {...register(`answers.${dynamicIndex}.answer.${0}`, { required: 'Câu hỏi bắt buộc' })}
            type="text"
          />
        </div>
      ) : dynamic.type === "radio" ? (
        <div>
          <div className='font-semibold mb-2'>{dynamic.question}</div>
          <div className="w-full p-2 border border-[#1B1B1B] rounded-lg flex flex-col gap-1">
            {dynamic.answer.map((answer, answerIndex) => (
              <label key={answerIndex} className="cursor-pointer gap-4 flex items-center">
                <input
                  className='w-3 h-3'
                  type="radio"
                  id={answer}
                  name={dynamicIndex}
                  value={answer}
                  {...register(`answers.${dynamicIndex}.answer.${0}`, { required: 'Câu hỏi bắt buộc' })}
                />
                {answer}
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className='font-semibold mb-2'>{dynamic.question}</div>
          <div className="w-full p-2 border border-[#1B1B1B] rounded-lg flex flex-col gap-1">
            {dynamic.answer.map((answer, answerIndex) => (
              <label key={answerIndex} className="cursor-pointer gap-4 flex items-center">
                <input
                  className='w-3 h-3'
                  type="checkbox"
                  id={answer}
                  name={dynamicIndex}
                  value={answer}
                  // onChange={(e) => handleCheckboxChange(answer, e.target.checked)}
                  {...register(`answers.${dynamicIndex}.answer.${answerIndex}`)}
                />
                {answer}
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SecondStep