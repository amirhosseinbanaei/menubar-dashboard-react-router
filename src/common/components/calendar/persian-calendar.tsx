import { Calendar } from '@/common/components/ui/calendar';
import { useState } from 'react';
// import dayjs from '@/common/lib/dayjs';

export default function PersianCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  return (
    <div className='w-fit mx-auto'>
      <Calendar
        mode='single'
        selected={selectedDate}
        onSelect={setSelectedDate}
        className='rounded-md border'
      />

      {/* {selectedDate && (
        <div className='mt-4 text-center text-lg font-medium'>
          تاریخ انتخاب شده: {dayjs(selectedDate).format('dddd، D MMMM YYYY')}
        </div>
      )} */}
    </div>
  );
}
