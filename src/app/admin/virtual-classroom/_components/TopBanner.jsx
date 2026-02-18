'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TopBanner(){
    
    function submitForm(e){
       e.preventDefault() 
    }

    return(
         <div className="min-h-82 rounded-3xl bg-[url(/images/dashboard/banner.png)] bg-(--blue2) bg-cover bg-center p-3 flex flex-col justify-center items-center">
                    <h1 className="text-[48px] font-normal text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF_0%,#23A5E7_50%,#23A5E7_100%)]">
                        Train with the Best
                    </h1>
                    <p className="text-[20px] font-normal text-(--grey1) mt-2">
                        Join Thousands of Healthcare Professionals In Live
                    </p>

                    <div className="flex items-center gap-3 mt-8">
                        <Button className='h-12 text-[16px] font-normal'>Start Classroom</Button>
                        <Dialog>
                            <DialogTrigger asChild>

                                <Button variant="secondary" className='h-12 text-[16px] font-normal '>Become an Investor</Button>
                            </DialogTrigger>

                            <DialogContent className='bg-(--dark1) border-2 border-(--dark3) max-w-[40%]'>
                            <form onSubmit={submitForm} >
                                <DialogHeader>
                                    <DialogTitle className='text-[20px] font-semibold text-(--grey1)'>Become an Inverstor</DialogTitle>
                                    <DialogDescription className="sr-only" >
                                     ads
                                    </DialogDescription>
                                    <div className="mt-3">
                                        <label htmlFor="" className="block text-[14px] font-medium text-(--grey1)">Name</label>
                                        <Input type="text" className='h-10 w-full mt-2 bg-(--dark4) border border-(--dark3)' placeholder='Mohsin Khan' />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="" className="block text-[14px] font-medium text-(--grey1)">Your Business Name</label>
                                        <Input type="text" className='h-10 w-full mt-2' placeholder='Ching ping' />
                                    </div>
                                    <div className="mt-3">
                                        <label htmlFor="" className="block text-[14px] font-medium text-(--grey1)">Message</label>
                                     <Textarea className='h-39.75 rounded-[8px] mt-2 resize-none' />
                                    </div>
                                </DialogHeader>
                                <DialogFooter className="flex mt-10">
                                    <DialogClose asChild >
                                        <Button variant="outline" className='w-[50%] h-14.75'  >Cancel</Button>
                                    </DialogClose>
                                        <Button type='submit' className='w-[50%] h-14.75 ' >Send</Button>

                                </DialogFooter>
                            </form>
                            </DialogContent>

                        </Dialog>
                    </div>
                </div>
    )
}