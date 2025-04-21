import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/common/components/ui/popover';
import { Calendar } from '@/common/components/ui/calendar';
import { Button } from '@/common/components/ui/button';
import { CalendarIcon } from 'lucide-react';
// import dayjs from '@/common/lib/dayjs';
import { useState } from 'react';

export function JalaliDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='w-[280px] justify-start text-left font-normal'>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {/* {date ? dayjs(date).format('YYYY/MM/DD') : 'انتخاب تاریخ'} */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
