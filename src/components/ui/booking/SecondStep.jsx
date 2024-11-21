import React, { useEffect, useState } from "react"
import { getDistricts, getProvinces, getWards } from "../../../controllers/provinceController"

const SecondStep = ({user, setUser, register, handleSubmit, getValues, setValue}) => {
  const [locations, setLocations] = useState({
    provinces: [],
    districts: [],
    wards: [],
  })

  const handleUserChange = () => {
    const updatedData = getValues()
    console.log(updatedData)
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }))
  }

  // Lấy danh sách tỉnh/thành
  useEffect(() => {
    const fetchProvincesData = async () => {
      const provincesData = await getProvinces()
      setLocations((prev) => ({
        ...prev,
        provinces: provincesData,
      }))
    }
    fetchProvincesData()
  }, [])

  // Lấy danh sách quận/huyện khi chọn tỉnh/thành
  useEffect(() => {
    if (user.city) {
      const fetchDistrictsData = async () => {
        const districtsData = await getDistricts(user.city)
        setLocations((prev) => ({
          ...prev,
          districts: districtsData,
        }))
      }
      fetchDistrictsData()
    }
  }, [user.city])

  // Lấy danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (user.district) {
      const fetchWardsData = async () => {
        const wardsData = await getWards(user.district)
        setLocations((prev) => ({
          ...prev,
          wards: wardsData,
        }))
      }
      fetchWardsData()
    }
  }, [user.district])

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <div className='text-[#1B1B1B] text-2xl font-extrabold'>Thông tin đăng ký</div>
        <div className='text-[#AEAEAE] text-base font-normal'>Cung cấp cho ban tổ chức một vài thông tin cơ bản về bạn!</div>
      </div>
      <div className="flex flex-col gap-6 text-[#1B1B1B] text-base">
        <div>
          <div className='font-semibold mb-4'>Họ và tên</div>
          <input
            className='w-full p-3 border border-[#1B1B1B] rounded-lg'
            {...register('name', { required: 'Họ và tên là bắt buộc' })}
            type="text"
            onBlur={handleSubmit(handleUserChange)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(handleUserChange)()
              }
            }}
          />
        </div>
        <div className="flex gap-6">
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Email</div>
            <input
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              {...register('email', {required: 'Email là bắt buộc'})}
              type="email"
              onBlur={handleSubmit(handleUserChange)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handleUserChange)()
                }
              }}
            />
          </div>
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Điện thoại</div>
            <input
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              {...register('phone', {required: 'Số điện thoại là bắt buộc'})}
              type="text"
              onBlur={handleSubmit(handleUserChange)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handleUserChange)()
                }
              }}
            />
            </div>
        </div>
        <div className="flex gap-6">
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Tỉnh/thành</div>
            <select
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              disabled={locations.provinces.length === 0}
              {...register('city', {
                required: 'Tỉnh/Thành là bắt buộc',
                onChange: () => {
                  setValue('district', '')
                  setValue('ward', '')
                  setLocations(prev => ({ ...prev, wards: [] }))
                  handleUserChange()
                },
              })}
            >
              <option value="" disabled></option>
              {locations.provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Quận/huyện</div>
            <select
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              disabled={locations.districts.length === 0}
              {...register('district', {
                required: 'Quận/Huyện là bắt buộc',
                onChange: () => {
                  setValue('ward', '')
                  handleUserChange()
                },
              })}
            >
              <option value="" disabled></option>
              {locations.districts.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-6">
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Phường/xã</div>
            <select
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              disabled={locations.wards.length === 0}
              {...register('ward', {
                required: 'Phường/Xã là bắt buộc',
                onChange: handleUserChange
              })}
            >
              <option value="" disabled></option>
              {locations.wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>
          <div className='flex-1'>
            <div className='font-semibold mb-4'>Địa chỉ</div>
            <input
              className='w-full p-3 border border-[#1B1B1B] rounded-lg'
              {...register('address', {required: 'Địa chỉ là bắt buộc'})}
              type="address"
              onBlur={handleSubmit(handleUserChange)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handleUserChange)()
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondStep