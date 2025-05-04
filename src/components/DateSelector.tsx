
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type DateRangeType = 'monthYear' | 'customRange';

interface DateSelectorProps {
  onDateRangeChange: (startDate: string, endDate: string, folderName: string, sheetName: string) => void;
}

const DateSelector = ({ onDateRangeChange }: DateSelectorProps) => {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('monthYear');
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = currentYear; i >= currentYear - 10; i--) {
      yearList.push(i.toString());
    }
    setYears(yearList);
  }, []);

  useEffect(() => {
    if (dateRangeType === 'monthYear' && selectedYear && selectedMonth) {
      calculateMonthYearDates();
    } else if (dateRangeType === 'customRange' && startDate && endDate) {
      calculateCustomDates();
    }
  }, [dateRangeType, selectedYear, selectedMonth, startDate, endDate]);

  const calculateMonthYearDates = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    
    const startDateStr = formatDateToYYYYMMDD(firstDay);
    const endDateStr = formatDateToYYYYMMDD(lastDay);
    
    const monthPadded = String(month + 1).padStart(2, '0');
    const uniqueId = Date.now();
    
    const folderName = `swiggy_receipts_${year}_${monthPadded}_${uniqueId}`;
    const sheetName = `Swiggy_Summary_${year}_${monthPadded}`;
    
    onDateRangeChange(startDateStr, endDateStr, folderName, sheetName);
  };

  const calculateCustomDates = () => {
    if (!startDate || !endDate) return;
    
    const startDateStr = formatDateToYYYYMMDD(startDate);
    const endDateStr = formatDateToYYYYMMDD(endDate);
    
    const uniqueId = Date.now();
    const folderName = `swiggy_receipts_Custom_${startDateStr}_to_${endDateStr}_${uniqueId}`;
    const sheetName = `Swiggy_Summary_Custom_${startDateStr}_to_${endDateStr}`;
    
    onDateRangeChange(startDateStr, endDateStr, folderName, sheetName);
  };

  const formatDateToYYYYMMDD = (date: Date) => {
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();
    return [year, month, day].join('-');
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="mb-4">
        <RadioGroup 
          defaultValue="monthYear" 
          className="flex flex-wrap gap-6"
          onValueChange={(value) => setDateRangeType(value as DateRangeType)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthYear" id="monthYear" />
            <Label htmlFor="monthYear" className="text-base">Month & Year</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customRange" id="customRange" />
            <Label htmlFor="customRange" className="text-base">Custom Range</Label>
          </div>
        </RadioGroup>
      </div>

      <div className={cn(
        "p-5 rounded-lg bg-white card-shadow transition-all duration-300",
        dateRangeType === 'monthYear' ? "block animate-fade-in" : "hidden"
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="yearSelect" className="mb-2 block text-sm font-medium">Year</Label>
            <Select 
              value={selectedYear} 
              onValueChange={setSelectedYear}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="monthSelect" className="mb-2 block text-sm font-medium">Month</Label>
            <Select 
              value={selectedMonth} 
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">January</SelectItem>
                <SelectItem value="1">February</SelectItem>
                <SelectItem value="2">March</SelectItem>
                <SelectItem value="3">April</SelectItem>
                <SelectItem value="4">May</SelectItem>
                <SelectItem value="5">June</SelectItem>
                <SelectItem value="6">July</SelectItem>
                <SelectItem value="7">August</SelectItem>
                <SelectItem value="8">September</SelectItem>
                <SelectItem value="9">October</SelectItem>
                <SelectItem value="10">November</SelectItem>
                <SelectItem value="11">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className={cn(
        "p-5 rounded-lg bg-white card-shadow transition-all duration-300",
        dateRangeType === 'customRange' ? "block animate-fade-in" : "hidden"
      )}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate" className="mb-2 block text-sm font-medium">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="endDate" className="mb-2 block text-sm font-medium">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DateSelector;
