'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import Button from '../shared/button'

const SecondStep = ({ miniEvents, setMiniEvents, miniEventsPreview, setMiniEventsPreview, handleMiniEventsPreviewChange }) => {
  return (
    <div className='flex flex-col gap-4 text-sm font-normal text-[#1b1b1b]'>
        <div className='text-[#1B1B1B] text-xl font-extrabold'>Thời gian & loại vé</div>
        <ManageShows
          miniEvents={miniEvents}
          setMiniEvents={setMiniEvents}
          miniEventsPreview={miniEventsPreview}
          setMiniEventsPreview={setMiniEventsPreview}
          handleMiniEventsPreviewChange={handleMiniEventsPreviewChange}
        />
    </div>
  )
}

const ManageShows = ({ miniEvents, setMiniEvents, miniEventsPreview, setMiniEventsPreview, handleMiniEventsPreviewChange }) => {
  const { register, control, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: 'miniEvents',
    control,
  })
  const handleRemoveAllShow = () => {
    setMiniEvents((prev) => ({ ...prev, show_counter: 0 }))
    remove()
    setMiniEventsPreview([])
  }
  const handleAddShow = () => {
    append({ ticketRanks: [] })
    setMiniEvents((prev) => ({
      ...prev,
      show_counter: prev.show_counter + 1,
      show_current_id: prev.show_current_id + 1
    }))
    setMiniEventsPreview((prev) => [...prev, null])
  }
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
          <div className='text-base font-bold'>Tổng buổi diễn: {miniEvents.show_counter}</div>
          <div className='flex gap-6 items-center'>
              {fields.length > 0 && (
              <div className='flex gap-6 items-center'>
                <div
                    onClick={handleRemoveAllShow}
                    className='text-center text-[#ff4d4f] underline underline-offset-4 cursor-pointer hover:text-red-300'
                >
                    Xoá tất cả
                </div>
                <div className='text-base'>|</div>
              </div>
              )}
              <div
                onClick={handleAddShow}
                className='text-center text-[#219ce4] underline underline-offset-4 cursor-pointer hover:text-sky-300'
              >
                Thêm buổi diễn
              </div>
          </div>
      </div>
      {fields.map((show, showIndex) => {
        return (
          <div
            className='px-6 py-2 border-2 border-[#219ce4] rounded-lg flex flex-col gap-4'
            key={show.id}
          >
            <div className='flex items-center justify-between'>
              <div className='text-base font-bold'>Thông tin suất diễn #{showIndex + 1}</div>
              <div
                onClick={() => {
                    // Remove: show index
                    remove(showIndex)
                    setMiniEvents((prev) => ({
                      ...prev,
                      show_counter: prev.show_counter - 1,
                    }))
                    setMiniEventsPreview((prev) => prev.filter((_, i) => i !== showIndex))
                }}
                className='text-center rounded-lg font-bold text-[#FAFAFA] bg-[#ff4d4f] py-1 px-3 cursor-pointer hover:bg-red-600'
              >
                X
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-1 flex-col gap-4'>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Thời gian bắt đầu</span>
                        </div>
                        <input
                            type='time'
                            className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                            {...register(`miniEvents.${showIndex}.startTime`, {required: 'Thời gian bắt đầu là bắt buộc'})}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.startTime?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Ngày bắt đầu</span>
                        </div>
                        <input
                            type='date'
                            className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                            {...register(`miniEvents.${showIndex}.startTime`, {required: 'Ngày bắt đầu là bắt buộc'})}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.startTime?.message}</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Thời gian kết thúc</span>
                    </div>
                    <input
                        type='time'
                        className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                        {...register(`miniEvents.${showIndex}.endTime`, {required: 'Thời gian kết thúc là bắt buộc'})}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.end_time?.message}</p>
                  </div>
                  <div className='flex-1'>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Ngày kết thúc</span>
                    </div>
                    <input
                        type='date'
                        className='w-full p-2 border border-[#219ce4] rounded-lg text-[#1b1b1b]'
                        {...register(`miniEvents.${showIndex}.endTime`, {required: 'Ngày kết thúc là bắt buộc'})}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.end_date?.message}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-1 flex-col flex-grow'>
                  <div className="flex gap-2 mb-2 font-semibold">
                      <span className="text-red-500">*</span>
                      <span>Thông tin thêm</span>
                  </div>
                  <textarea
                      className='w-full p-2 border border-[#219ce4] rounded-lg flex-grow'
                      {...register(`miniEvents.${showIndex}.description`, {required: 'Thông tin thêm là bắt buộc'})}
                  />
                  <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.description?.message}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-2 mb-2 font-semibold">
                <span className="text-red-500">*</span>
                <span>Sơ đồ chỗ ngồi</span>
              </div>
              <div className="relative flex flex-col items-center justify-center border border-[#219ce4] rounded-lg w-full h-56 p-2">
                {miniEventsPreview[showIndex]?.url ? (
                  <img
                    src={miniEventsPreview[showIndex].url}
                    alt="Show Preview"
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <label className="flex flex-col gap-1 items-center cursor-pointer">
                    <img src="/assets/icons/plus.svg" alt="plus" />
                    <span className="text-base font-semibold text-[#B2BCC2]">Thêm ảnh sơ đồ chỗ ngồi</span>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMiniEventsPreviewChange(e, showIndex)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <ManageTickets showIndex={showIndex} miniEvents={miniEvents} setMiniEvents={setMiniEvents} />
          </div>
        )
      })}
    </div>
  )
}

const ManageTickets = ({ showIndex, miniEvents, setMiniEvents }) => {
  const { register, control, setValue, formState: { errors } } = useFormContext()
  const { append, remove, fields } = useFieldArray({
    name: `miniEvents.${showIndex}.ticketRanks`,
    control,
  })
  const handleRemoveAllTicket = () => {
    remove()
  }
  const handleAddTicket = () => {
    append({soldNumber: 0})
    setMiniEvents((prev) => ({
      ...prev,
      ticket_current_id: prev.ticket_current_id + 1
    }))
  }
  return (
    <div className='flex flex-col gap-3'>
      {fields.map((ticket, ticketIndex) => {
        return (
          <div key={ticket.id} className='bg-[#cee7f57b] px-8 py-8 rounded-2xl text-[#219ce4]'>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center justify-between'>
                    <div className='text-base font-bold'>Thông tin vé #{ticketIndex + 1}</div>
                    <div
                    onClick={() => {
                      remove(ticketIndex)
                    }}
                    className='text-[#ff4d4f] text-xs text-center underline underline-offset-2 cursor-pointer hover:text-red-300'
                    >
                      Xóa vé
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Tên vé</span>
                        </div>
                        <input
                            type='text'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`miniEvents.${showIndex}.ticketRanks.${ticketIndex}.rankName`, {
                                required: 'Tên vé là bắt buộc'
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.[ticketIndex]?.name?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Giá vé</span>
                        </div>
                        <input
                            type='number'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`miniEvents.${showIndex}.ticketRanks.${ticketIndex}.price`, {
                                required: 'Giá vé là bắt buộc'
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.[ticketIndex]?.price?.message}</p>
                    </div>
                    <div className='flex-1'>
                        <div className="flex gap-2 mb-2 font-semibold">
                            <span className="text-red-500">*</span>
                            <span>Số lượng vé</span>
                        </div>
                        <input
                            type='number'
                            className='w-full p-2 rounded-lg text-[#1b1b1b]'
                            {...register(`miniEvents.${showIndex}.ticketRanks.${ticketIndex}.numberLimit`, {
                                required: 'Số lượng vé là bắt buộc',
                                onChange: (e) => {
                                  setValue(`miniEvents.${showIndex}.ticketRanks.${ticketIndex}.numberLimit`, e.target.value)
                                }
                            })}
                        />
                        <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.[ticketIndex]?.numberLimit?.message}</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2 mb-2 font-semibold">
                        <span className="text-red-500">*</span>
                        <span>Mô tả vé</span>
                    </div>
                    <textarea
                        className='w-full p-2 rounded-lg min-h-20 text-[#1b1b1b]'
                        {...register(`miniEvents.${showIndex}.ticketRanks.${ticketIndex}.description`, {
                            required: 'Mô tả vé là bắt buộc'
                        })}
                    />
                    <p className="text-red-500 text-sm">{errors?.shows?.[showIndex]?.[ticketIndex]?.description?.message}</p>
                </div>
                <div className='text-red-600'>
                </div>
            </div>
          </div>
        )
      })}
        <div className='text-[#FAFAFA] flex w-full items-center justify-center gap-4'>
            <Button title={'Thêm loại vé'} bgColor={'#219ce4'} textColor={'#fafafa'} icon={'add-circle'} isActive onClick={handleAddTicket} style={'flex-1 w-full'}/>
            {fields.length > 0 && (
              <Button title={'Xóa tất cả vé'} bgColor={'#ff4d4f'} textColor={'#fafafa'} icon={'remove-circle'} isActive onClick={handleRemoveAllTicket} style={'flex-1 w-full'}/>
            )}
        </div>
    </div>
  )
}

export default SecondStep