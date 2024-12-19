import { useFormContext } from "react-hook-form";

const FourthStep = () => {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className='flex flex-col gap-4 text-sm font-normal text-[#1b1b1b]'>
      <div className='text-[#1B1B1B] text-xl font-extrabold'>Thông tin thanh toán</div>
      {/* Account Name */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Chủ tài khoản</span>
        </div>
        <input
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("bankAccountName", {required: 'Chủ tài khoản là bắt buộc'})}
          type="text"
        />
        <p className="text-red-500 text-sm">{errors?.bankAccountName?.message}</p>
      </div>
      {/* Account Name */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Số tài khoản</span>
        </div>
        <input
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("bankAccountNumber", {required: 'Số tài khoản là bắt buộc'})}
          type="text"
        />
        <p className="text-red-500 text-sm">{errors?.accountAccountNumber?.message}</p>
      </div>
      {/* Bank Name */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Tên ngân hàng</span>
        </div>
        <input
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("bankName", {required: 'Tên ngân hàng là bắt buộc'})}
          type="text"
        />
        <p className="text-red-500 text-sm">{errors?.bankName?.message}</p>
      </div>
      {/* Branch Name */}
      <div>
        <div className="flex gap-2 mb-2 font-semibold">
          <span className="text-red-500">*</span>
          <span>Chi nhánh</span>
        </div>
        <input
          className='w-full p-2 border border-[#219ce4] rounded-lg'
          {...register("bankBranch", {required: 'Chi nhánh là bắt buộc'})}
          type="text"
        />
        <p className="text-red-500 text-sm">{errors?.bankBranch?.message}</p>
      </div>
    </div>
  )
}

export default FourthStep