import { useFormContext } from "react-hook-form"

const Form = ({ setUser, locations, setLocations }) => {
    const { register, setValue, formState: { errors } } = useFormContext()
    return (
        <div className="flex flex-col gap-4 text-[#1B1B1B] text-sm text-start">
            <div>
                <div className='font-semibold mb-2'>Họ và tên</div>
                <input
                className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                {...register('name', { required: 'Họ và tên là bắt buộc' })}
                type="text"
                />
                <p className="text-red-500 text-sm">{errors?.name?.message}</p>
            </div>
            <div className="flex gap-6">
                <div className='flex-1'>
                    <div className='font-semibold mb-2'>Email</div>
                    <input
                        disabled
                        className='w-full p-2 border border-[#1B1B1B] rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
                        {...register('email', {required: 'Email là bắt buộc'})}
                        type="email"
                    />
                    <p className="text-red-500 text-sm">{errors?.email?.message}</p>
                </div>
                <div className='flex-1'>
                    <div className='font-semibold mb-2'>Điện thoại</div>
                    <input
                        className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                        {...register('phoneNumber', {required: 'Số điện thoại là bắt buộc'})}
                        type="text"
                    />
                    <p className="text-red-500 text-sm">{errors?.phone?.message}</p>
                </div>
            </div>
            <div>
                <div className='font-semibold mb-2'>Địa chỉ</div>
                <input
                className='w-full p-2 border border-[#1B1B1B] rounded-lg'
                {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                type="text"
                />
                <p className="text-red-500 text-sm">{errors?.address?.message}</p>
            </div>
            <div>
              <div className='font-semibold mb-2'>Giới tính</div>
              <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                      <input
                          type="radio"
                          className="w-4 h-4"
                          value="male"
                          {...register('gender')}
                      />
                      Nam
                  </label>
                  <label className="flex items-center gap-2">
                      <input
                          type="radio"
                          className="w-4 h-4"
                          value="female"
                          {...register('gender')}
                      />
                      Nữ
                  </label>
                  <label className="flex items-center gap-2">
                      <input
                          type="radio"
                          className="w-4 h-4"
                          value="other"
                          {...register('gender')}
                      />
                      Khác
                  </label>
              </div>
              <p className="text-red-500 text-sm">{errors?.gender?.message}</p>
            </div>
        </div>
    )
}

export default Form